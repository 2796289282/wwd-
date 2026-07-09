function corsHeaders(request) {
  const origin = request?.headers?.get("Origin") || "";
  const allowed =
    origin === "null" ||
    origin === "https://peiwanjie.pages.dev" ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:");

  return {
    ...(allowed ? { "Access-Control-Allow-Origin": origin } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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

function normalizeData(data) {
  return {
    customCards: Array.isArray(data.customCards) ? data.customCards : [],
    drawnCards: Array.isArray(data.drawnCards) ? data.drawnCards : [],
    remainingCards: data.remainingCards && typeof data.remainingCards === "object"
      ? data.remainingCards
      : {},
    letter: typeof data.letter === "string" ? data.letter : "",
    letterHistory: Array.isArray(data.letterHistory) ? data.letterHistory : [],
    todayMoods: data.todayMoods && typeof data.todayMoods === "object" ? data.todayMoods : {},
    announcement: data.announcement && typeof data.announcement === "object" ? data.announcement : {},
    planBook: typeof data.planBook === "string" ? data.planBook : "",
    planNotes: Array.isArray(data.planNotes) ? data.planNotes : [],
    diaryFilter: typeof data.diaryFilter === "string" ? data.diaryFilter : "month",
    diaryDate: typeof data.diaryDate === "string" ? data.diaryDate : "",
    diaryEntries: Array.isArray(data.diaryEntries) ? data.diaryEntries : [],
    notifications: Array.isArray(data.notifications) ? data.notifications : [],
    history: Array.isArray(data.history) ? data.history : [],
    updatedAt: new Date().toISOString(),
    app: data.app && typeof data.app === "object" ? data.app : {},
  };
}

function normalizeLetterHistory(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map((item) => {
      if (typeof item === "string") {
        const text = item.trim();
        return text ? { id: "", text, time: new Date().toISOString() } : null;
      }
      if (!item || typeof item !== "object") return null;
      const text = typeof item.text === "string" ? item.text.trim() : "";
      if (!text) return null;
      const time =
        typeof item.time === "string" && !Number.isNaN(Date.parse(item.time))
          ? item.time
          : new Date().toISOString();
      return {
        id: typeof item.id === "string" ? item.id : "",
        text,
        time,
      };
    })
    .filter(Boolean)
    .filter((item) => {
      const key = item.id || `${item.text}|${item.time}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.time) - new Date(a.time));
}

async function mergeExistingLetterHistory(env, nextData) {
  if (!env.APP_STATE) return nextData;

  try {
    const stored = await env.APP_STATE.get("main");
    if (!stored) return {
      ...nextData,
      letterHistory: normalizeLetterHistory(nextData.letterHistory),
    };

    const currentData = JSON.parse(stored.replace(/^\uFEFF/, ""));
    return {
      ...nextData,
      letterHistory: normalizeLetterHistory([
        ...nextData.letterHistory,
        ...normalizeLetterHistory(currentData?.letterHistory),
      ]),
    };
  } catch {
    return {
      ...nextData,
      letterHistory: normalizeLetterHistory(nextData.letterHistory),
    };
  }
}

export async function onRequestOptions({ request }) {
  return json({}, { status: 204 }, request);
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, { status: 400 }, request);
  }

  let nextData = normalizeData(data);

  if (env.APP_STATE) {
    nextData = await mergeExistingLetterHistory(env, nextData);
    await env.APP_STATE.put("main", JSON.stringify(nextData));
    return json({ data: nextData, storage: "cloudflare-kv" }, {}, request);
  }

  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return json({ error: "Missing cloud storage binding" }, { status: 500 }, request);
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/app_state?on_conflict=id`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify({
          id: "main",
          data: nextData,
          updated_at: nextData.updatedAt,
        }),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      return json({ error: "Supabase save failed", detail }, { status: response.status }, request);
    }

    return json({ data: nextData, storage: "supabase" }, {}, request);
  } catch (error) {
    return json({ error: "Cloud save failed", detail: error.message }, { status: 500 }, request);
  }
}
