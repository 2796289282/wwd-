import {
  letterHistoryFromNotifications,
  normalizeLetterHistory,
  readLetterStore,
  sameLetterSet,
  writeLetterManifest,
  writeLetterRecords,
} from "./_letter-store.js";

const DEFAULT_DATA = {
  customCards: [],
  drawnCards: [],
  remainingCards: {},
  letter: "",
  letterHistory: [],
  todayMoods: {},
  announcement: {},
  planBook: "",
  planNotes: [],
  diaryFilter: "month",
  diaryDate: "",
  diaryEntries: [],
  notifications: [],
  history: [],
  updatedAt: "",
};

function corsHeaders(request) {
  const origin = request?.headers?.get("Origin") || "";
  const allowed =
    origin === "null" ||
    origin === "https://peiwanjie.pages.dev" ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:");

  return {
    ...(allowed ? { "Access-Control-Allow-Origin": origin } : {}),
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(body, init = {}, request) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(request),
      ...(init.headers || {}),
    },
  });
}

export async function onRequestOptions({ request }) {
  return json({}, { status: 204 }, request);
}

export async function onRequestGet({ env, request }) {
  if (env.APP_STATE) {
    try {
      const stored = await env.APP_STATE.get("main");
      const data = stored ? JSON.parse(stored.replace(/^\uFEFF/, "")) : DEFAULT_DATA;
      const notificationLetters = letterHistoryFromNotifications(data.notifications, data.letterHistory);
      const store = await readLetterStore(env.APP_STATE, notificationLetters, data.letterHistory);
      const letterHistory = normalizeLetterHistory(notificationLetters, data.letterHistory, store.records);
      data.letterHistory = letterHistory;
      if (letterHistory[0]?.text) data.letter = letterHistory[0].text;
      const missingRecords = letterHistory.filter((record) => !store.recordIds.has(record.id));
      if (missingRecords.length) await writeLetterRecords(env.APP_STATE, missingRecords);
      if (missingRecords.length || store.recoveredCount || !sameLetterSet(store.manifestRecords, letterHistory)) {
        await writeLetterManifest(env.APP_STATE, letterHistory);
      }
      return json({ data, storage: "cloudflare-kv" }, {}, request);
    } catch (error) {
      return json({ error: "Cloudflare KV load failed", detail: error.message }, { status: 500 }, request);
    }
  }

  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return json({ data: DEFAULT_DATA, storage: "none" }, { status: 200 }, request);
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/app_state?id=eq.main&select=data`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      return json({ error: "Supabase load failed", detail }, { status: response.status }, request);
    }

    const rows = await response.json();
    return json({ data: rows[0]?.data || DEFAULT_DATA, storage: "supabase" }, {}, request);
  } catch (error) {
    return json({ error: "Cloud load failed", detail: error.message }, { status: 500 }, request);
  }
}
