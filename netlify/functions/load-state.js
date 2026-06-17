const DEFAULT_DATA = {
  customCards: [],
  drawnCards: [],
  remainingCards: {},
  letter: "",
  history: [],
  updatedAt: "",
};

async function loadFromBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  const store = getStore("wanwan-picker");
  return (await store.get("main", { type: "json" })) || DEFAULT_DATA;
}

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

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    try {
      return json(200, { data: await loadFromBlobStore(), storage: "netlify-blobs" });
    } catch (error) {
      return json(500, { error: "Cloud load failed", detail: error.message });
    }
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
      return json(response.status, { error: "Supabase load failed", detail });
    }

    const rows = await response.json();
    return json(200, { data: rows[0]?.data || DEFAULT_DATA, storage: "supabase" });
  } catch (error) {
    try {
      return json(200, { data: await loadFromBlobStore(), storage: "netlify-blobs" });
    } catch (fallbackError) {
      return json(500, {
        error: "Cloud load failed",
        detail: error.message,
        fallback: fallbackError.message,
      });
    }
  }
};
