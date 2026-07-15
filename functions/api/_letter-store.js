export const LETTER_HISTORY_KEY = "letter_history_v2";
export const LETTER_RECORD_PREFIX = "letter_history_v2:record:";

const LEGACY_TIME = "1970-01-01T00:00:00.000Z";

function validTime(value, fallback = LEGACY_TIME) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value)) ? value : fallback;
}

function stableLegacyId(text, time) {
  const input = `${text}|${time}`;
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `letter-legacy-${(hash >>> 0).toString(36)}`;
}

export function normalizeLetterHistory(...sources) {
  const records = new Map();
  sources.flatMap((source) => Array.isArray(source) ? source : []).forEach((item) => {
    const source = typeof item === "string" ? { text: item } : item;
    if (!source || typeof source !== "object") return;
    const text = typeof source.text === "string" ? source.text.trim() : "";
    if (!text) return;
    const time = validTime(source.time, validTime(source.createdAt));
    const createdAt = validTime(source.createdAt, time);
    const updatedAt = validTime(source.updatedAt, time);
    const id = typeof source.id === "string" && source.id
      ? source.id
      : stableLegacyId(text, time);
    const record = { id, text, time, createdAt, updatedAt };
    const previous = records.get(id);
    if (!previous || Date.parse(updatedAt) >= Date.parse(previous.updatedAt)) {
      records.set(id, record);
    }
  });
  return [...records.values()].sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
}

function parseManifest(raw) {
  try {
    const value = raw ? JSON.parse(raw.replace(/^\uFEFF/, "")) : {};
    return normalizeLetterHistory(Array.isArray(value) ? value : value.records);
  } catch {
    return [];
  }
}

function recordKey(id) {
  return `${LETTER_RECORD_PREFIX}${encodeURIComponent(id)}`;
}

function idFromRecordKey(key) {
  try {
    return decodeURIComponent(key.slice(LETTER_RECORD_PREFIX.length));
  } catch {
    return "";
  }
}

async function listRecordKeys(kv) {
  if (typeof kv?.list !== "function") return [];
  const keys = [];
  let cursor = "";
  do {
    const page = await kv.list({
      prefix: LETTER_RECORD_PREFIX,
      ...(cursor ? { cursor } : {}),
    });
    keys.push(...(Array.isArray(page?.keys) ? page.keys : []));
    if (page?.list_complete !== false || !page.cursor) break;
    cursor = page.cursor;
  } while (cursor);
  return keys;
}

export async function readLetterStore(kv, ...knownSources) {
  const [manifestRaw, keys] = await Promise.all([
    kv.get(LETTER_HISTORY_KEY),
    listRecordKeys(kv),
  ]);
  const manifestRecords = parseManifest(manifestRaw);
  const knownRecords = normalizeLetterHistory(...knownSources, manifestRecords);
  const knownIds = new Set(knownRecords.map((record) => record.id));
  const recordIds = new Set(keys.map((key) => idFromRecordKey(key.name)).filter(Boolean));
  const missingKeys = keys.filter((key) => {
    const id = idFromRecordKey(key.name);
    return id && !knownIds.has(id);
  });
  const recoveredRecords = normalizeLetterHistory(await Promise.all(
    missingKeys.map(async (key) => {
      try {
        const raw = await kv.get(key.name);
        return raw ? JSON.parse(raw.replace(/^\uFEFF/, "")) : null;
      } catch {
        return null;
      }
    }),
  ));
  return {
    records: normalizeLetterHistory(knownRecords, recoveredRecords),
    manifestRecords,
    recordIds,
    recoveredCount: recoveredRecords.length,
  };
}

export async function writeLetterRecords(kv, records) {
  const normalized = normalizeLetterHistory(records);
  await Promise.all(normalized.map((record) => (
    kv.put(recordKey(record.id), JSON.stringify(record))
  )));
  return normalized;
}

export async function writeLetterManifest(kv, records) {
  const normalized = normalizeLetterHistory(records);
  await kv.put(LETTER_HISTORY_KEY, JSON.stringify({
    records: normalized,
    updatedAt: new Date().toISOString(),
  }));
  return normalized;
}

export function sameLetterSet(left, right) {
  const signature = (records) => normalizeLetterHistory(records)
    .map((record) => `${record.id}:${record.updatedAt}`)
    .sort()
    .join("|");
  return signature(left) === signature(right);
}
