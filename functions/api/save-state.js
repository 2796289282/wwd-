import {
  readLetterStore,
  sameLetterSet,
  writeLetterManifest,
  writeLetterRecords,
} from "./_letter-store.js";

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

const LEGACY_TIME = "1970-01-01T00:00:00.000Z";

function validTime(value, fallback = LEGACY_TIME) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value)) ? value : fallback;
}

function stableLegacyId(prefix, value) {
  const input = String(value || "");
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${prefix}-legacy-${(hash >>> 0).toString(36)}`;
}

function normalizeTombstones(value) {
  if (!Array.isArray(value)) return [];
  const latest = new Map();
  value.forEach((item) => {
    if (!item || typeof item !== "object") return;
    const entity = typeof item.entity === "string" ? item.entity : "";
    const id = typeof item.id === "string" ? item.id : "";
    const deletedAt = validTime(item.deletedAt, "");
    if (!entity || !id || !deletedAt) return;
    const key = `${entity}:${id}`;
    const previous = latest.get(key);
    if (!previous || Date.parse(deletedAt) > Date.parse(previous.deletedAt)) {
      latest.set(key, { entity, id, deletedAt });
    }
  });
  return [...latest.values()];
}

function normalizeRecord(item, prefix, index = 0) {
  if (typeof item === "string") {
    const text = item.trim();
    if (!text) return null;
    return {
      id: stableLegacyId(prefix, text),
      text,
      time: LEGACY_TIME,
      createdAt: LEGACY_TIME,
      updatedAt: LEGACY_TIME,
    };
  }
  if (!item || typeof item !== "object") return null;
  const createdAt = validTime(item.createdAt, validTime(item.time));
  const updatedAt = validTime(item.updatedAt, validTime(item.time, createdAt));
  const identity = item.text || item.title || item.content || `${createdAt}-${index}`;
  return {
    ...item,
    id: typeof item.id === "string" && item.id
      ? item.id
      : stableLegacyId(prefix, `${identity}|${createdAt}`),
    createdAt,
    updatedAt,
  };
}

function mergeNestedRecords(current = [], incoming = [], prefix) {
  const map = new Map();
  [...current, ...incoming].forEach((item, index) => {
    const record = normalizeRecord(item, prefix, index);
    if (!record) return;
    const previous = map.get(record.id);
    if (!previous || Date.parse(record.updatedAt) >= Date.parse(previous.updatedAt)) {
      map.set(record.id, record);
    }
  });
  return [...map.values()].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
}

function mergeRecords(current = [], incoming = [], {
  entity,
  prefix,
  tombstones = [],
  nestedKey = "",
  nestedPrefix = "nested",
  newestFirst = false,
} = {}) {
  const map = new Map();
  const incomingOrder = [];
  const currentOrder = [];
  const add = (item, index, order, preferIncoming) => {
    const record = normalizeRecord(item, prefix, index);
    if (!record) return;
    if (!order.includes(record.id)) order.push(record.id);
    const previous = map.get(record.id);
    let winner = previous;
    if (!previous || Date.parse(record.updatedAt) > Date.parse(previous.updatedAt) ||
        (preferIncoming && Date.parse(record.updatedAt) === Date.parse(previous.updatedAt))) {
      winner = record;
    }
    if (nestedKey && previous) {
      winner = {
        ...winner,
        [nestedKey]: mergeNestedRecords(previous[nestedKey], record[nestedKey], nestedPrefix),
      };
    }
    map.set(record.id, winner);
  };
  current.forEach((item, index) => add(item, index, currentOrder, false));
  incoming.forEach((item, index) => add(item, index, incomingOrder, true));
  const deleted = new Map(normalizeTombstones(tombstones).map((item) => [`${item.entity}:${item.id}`, item]));
  const order = [...incomingOrder, ...currentOrder.filter((id) => !incomingOrder.includes(id))];
  const records = order
    .map((id) => map.get(id))
    .filter(Boolean)
    .filter((record) => {
      const tombstone = deleted.get(`${entity}:${record.id}`);
      return !tombstone || Date.parse(record.updatedAt) > Date.parse(tombstone.deletedAt);
    });
  return newestFirst
    ? records.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    : records;
}

function mergeStrings(incoming = [], current = []) {
  return [...new Set([...incoming, ...current].filter((item) => typeof item === "string" && item.trim()))];
}

function mergeHistory(incoming = [], current = []) {
  const seen = new Set();
  return [...incoming, ...current].filter((item) => {
    if (!item || typeof item !== "object") return false;
    const key = item.id || `${item.value || ""}|${item.player || ""}|${item.time || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeCloudData(currentData, nextData) {
  const currentApp = currentData?.app && typeof currentData.app === "object" ? currentData.app : {};
  const nextApp = nextData?.app && typeof nextData.app === "object" ? nextData.app : {};
  const requestId = typeof nextApp.requestId === "string" ? nextApp.requestId : "";
  const processedRequestIds = Array.isArray(currentApp.processedRequestIds)
    ? currentApp.processedRequestIds.filter((id) => typeof id === "string")
    : [];
  if (requestId && processedRequestIds.includes(requestId)) return currentData;

  const tombstones = normalizeTombstones([
    ...(currentApp.tombstones || []),
    ...(nextApp.tombstones || []),
  ]);
  const merged = {
    ...currentData,
    ...nextData,
    letterHistory: mergeRecords(currentData.letterHistory, nextData.letterHistory, {
      entity: "letterHistory", prefix: "letter", tombstones, newestFirst: true,
    }),
    planNotes: mergeRecords(currentData.planNotes, nextData.planNotes, {
      entity: "planNotes", prefix: "note", tombstones, nestedKey: "messages", nestedPrefix: "plan-message",
    }),
    diaryEntries: mergeRecords(currentData.diaryEntries, nextData.diaryEntries, {
      entity: "diaryEntries", prefix: "diary", tombstones, nestedKey: "comments", nestedPrefix: "diary-comment", newestFirst: true,
    }),
    notifications: mergeRecords(currentData.notifications, nextData.notifications, {
      entity: "notifications", prefix: "notification", tombstones, newestFirst: true,
    }),
    customCards: mergeStrings(nextData.customCards, currentData.customCards),
    drawnCards: mergeStrings(nextData.drawnCards, currentData.drawnCards),
    history: mergeHistory(nextData.history, currentData.history),
    app: {
      ...currentApp,
      ...nextApp,
      schemaVersion: Math.max(2, Number(currentApp.schemaVersion) || 0, Number(nextApp.schemaVersion) || 0),
      version: (Number(currentApp.version) || 0) + 1,
      tombstones,
      processedRequestIds: [...processedRequestIds, ...(requestId ? [requestId] : [])].slice(-50),
    },
  };
  return merged;
}

async function mergeExistingCloudData(env, nextData) {
  if (!env.APP_STATE) return nextData;
  let currentData = {};
  try {
    const stored = await env.APP_STATE.get("main");
    currentData = stored ? JSON.parse(stored.replace(/^\uFEFF/, "")) : {};
    const store = await readLetterStore(env.APP_STATE, currentData.letterHistory);
    currentData.letterHistory = mergeRecords(
      currentData.letterHistory,
      store.records,
      { entity: "letterHistory", prefix: "letter", newestFirst: true },
    );
    const merged = mergeCloudData(currentData || {}, nextData);
    const missingRecords = merged.letterHistory.filter((record) => !store.recordIds.has(record.id));
    if (missingRecords.length) await writeLetterRecords(env.APP_STATE, missingRecords);
    if (missingRecords.length || store.recoveredCount || !sameLetterSet(store.manifestRecords, merged.letterHistory)) {
      await writeLetterManifest(env.APP_STATE, merged.letterHistory);
    }
    return merged;
  } catch {
    return mergeCloudData(currentData, nextData);
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
    nextData = await mergeExistingCloudData(env, nextData);
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
