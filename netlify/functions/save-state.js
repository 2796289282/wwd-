function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

async function saveToBlobStore(nextData) {
  const { getStore } = await import("@netlify/blobs");
  const storeOptions = process.env.NETLIFY_SITE_ID && process.env.NETLIFY_AUTH_TOKEN
    ? {
        name: "wanwan-picker",
        siteID: process.env.NETLIFY_SITE_ID,
        token: process.env.NETLIFY_AUTH_TOKEN,
      }
    : "wanwan-picker";
  const store = getStore(storeOptions);
  await store.setJSON("main", nextData);
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const nextData = {
    customCards: Array.isArray(data.customCards) ? data.customCards : [],
    drawnCards: Array.isArray(data.drawnCards) ? data.drawnCards : [],
    remainingCards: data.remainingCards && typeof data.remainingCards === "object"
      ? data.remainingCards
      : {},
    letter: typeof data.letter === "string" ? data.letter : "",
    history: Array.isArray(data.history) ? data.history : [],
    updatedAt: new Date().toISOString(),
    app: data.app && typeof data.app === "object" ? data.app : {},
  };

  if (!supabaseUrl || !supabaseKey) {
    try {
      await saveToBlobStore(nextData);
      return json(200, { data: nextData, storage: "netlify-blobs" });
    } catch (error) {
      return json(500, { error: "Cloud save failed", detail: error.message });
    }
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
      return json(response.status, { error: "Supabase save failed", detail });
    }

    return json(200, { data: nextData, storage: "supabase" });
  } catch (error) {
    try {
      await saveToBlobStore(nextData);
      return json(200, { data: nextData, storage: "netlify-blobs" });
    } catch (fallbackError) {
      return json(500, {
        error: "Cloud save failed",
        detail: error.message,
        fallback: fallbackError.message,
      });
    }
  }
};
