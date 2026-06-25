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
    planBook: typeof data.planBook === "string" ? data.planBook : "",
    planNotes: Array.isArray(data.planNotes) ? data.planNotes : [],
    diaryFilter: typeof data.diaryFilter === "string" ? data.diaryFilter : "month",
    diaryDate: typeof data.diaryDate === "string" ? data.diaryDate : "",
    diaryEntries: Array.isArray(data.diaryEntries) ? data.diaryEntries : [],
    history: Array.isArray(data.history) ? data.history : [],
    updatedAt: new Date().toISOString(),
    app: data.app && typeof data.app === "object" ? data.app : {},
  };
}

export async function onRequestOptions() {
  return json({}, { status: 204 });
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const nextData = normalizeData(data);

  if (env.APP_STATE) {
    await env.APP_STATE.put("main", JSON.stringify(nextData));
    return json({ data: nextData, storage: "cloudflare-kv" });
  }

  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return json({ error: "Missing cloud storage binding" }, { status: 500 });
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
      return json({ error: "Supabase save failed", detail }, { status: response.status });
    }

    return json({ data: nextData, storage: "supabase" });
  } catch (error) {
    return json({ error: "Cloud save failed", detail: error.message }, { status: 500 });
  }
}
