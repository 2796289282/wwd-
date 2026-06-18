const DEFAULT_DATA = {
  customCards: [],
  drawnCards: [],
  remainingCards: {},
  letter: "",
  history: [],
  updatedAt: "",
};

function json(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(init.headers || {}),
    },
  });
}

export async function onRequestOptions() {
  return json({}, { status: 204 });
}

export async function onRequestGet({ env }) {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return json(
      {
        data: DEFAULT_DATA,
        storage: "none",
        warning: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
      },
      { status: 200 },
    );
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
      return json({ error: "Supabase load failed", detail }, { status: response.status });
    }

    const rows = await response.json();
    return json({ data: rows[0]?.data || DEFAULT_DATA, storage: "supabase" });
  } catch (error) {
    return json({ error: "Cloud load failed", detail: error.message }, { status: 500 });
  }
}
