import {
  normalizeLetterHistory,
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
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

function parseMain(raw) {
  try {
    return raw ? JSON.parse(raw.replace(/^\uFEFF/, "")) : {};
  } catch {
    return {};
  }
}

async function readAllLetters(env) {
  const main = parseMain(await env.APP_STATE.get("main"));
  const store = await readLetterStore(env.APP_STATE, main.letterHistory);
  return { main, store, records: normalizeLetterHistory(main.letterHistory, store.records) };
}

async function repairLetterStore(env, store, records) {
  const missingRecords = records.filter((record) => !store.recordIds.has(record.id));
  if (missingRecords.length) await writeLetterRecords(env.APP_STATE, missingRecords);
  if (missingRecords.length || store.recoveredCount || !sameLetterSet(store.manifestRecords, records)) {
    await writeLetterManifest(env.APP_STATE, records);
  }
}

export async function onRequestOptions({ request }) {
  return json({}, { status: 204 }, request);
}

export async function onRequestGet({ env, request }) {
  if (!env.APP_STATE) {
    return json({ error: "Missing cloud storage binding" }, { status: 500 }, request);
  }
  try {
    const { store, records } = await readAllLetters(env);
    await repairLetterStore(env, store, records);
    return json({ records, count: records.length, storage: "cloudflare-kv" }, {}, request);
  } catch (error) {
    return json({ error: "Letter history load failed", detail: error.message }, { status: 500 }, request);
  }
}

export async function onRequestPost({ env, request }) {
  if (!env.APP_STATE) {
    return json({ error: "Missing cloud storage binding" }, { status: 500 }, request);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, { status: 400 }, request);
  }

  const incoming = normalizeLetterHistory([
    ...(Array.isArray(body?.records) ? body.records : []),
    ...(body?.record ? [body.record] : []),
  ]);
  if (!incoming.length) {
    return json({ error: "No valid letter records" }, { status: 400 }, request);
  }

  try {
    const { store, records: currentRecords } = await readAllLetters(env);
    const duplicate = incoming.every((record) => (
      store.recordIds.has(record.id) || currentRecords.some((current) => current.id === record.id)
    ));
    const records = normalizeLetterHistory(currentRecords, incoming);
    await writeLetterRecords(env.APP_STATE, incoming);
    await writeLetterManifest(env.APP_STATE, records);
    return json({
      records,
      count: records.length,
      duplicate,
      storage: "cloudflare-kv",
    }, {}, request);
  } catch (error) {
    return json({ error: "Letter history save failed", detail: error.message }, { status: 500 }, request);
  }
}
