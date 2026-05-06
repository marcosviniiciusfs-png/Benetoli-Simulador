import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const PIXEL_ID = Deno.env.get("META_PIXEL_ID");
const CAPI_TOKEN = Deno.env.get("META_CAPI_TOKEN");
const GRAPH_API_VERSION = "v19.0";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
  "Access-Control-Max-Age": "86400",
};

async function sha256Hex(value: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value.trim().toLowerCase()),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalizePhoneBR(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length < 10) return null;
  return digits.startsWith("55") ? digits : `55${digits}`;
}

interface CapiRequestBody {
  email?: string;
  phone?: string;
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
  testEventCode?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
  if (!PIXEL_ID || !CAPI_TOKEN) {
    return new Response(
      JSON.stringify({
        error:
          "CAPI not configured: defina META_PIXEL_ID e META_CAPI_TOKEN nos secrets do Supabase",
      }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      },
    );
  }

  let body: CapiRequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const {
    email,
    phone,
    eventName = "Lead",
    eventId,
    eventSourceUrl,
    fbp,
    fbc,
    customData,
    testEventCode,
  } = body;

  const userData: Record<string, unknown> = {};
  if (email && typeof email === "string" && email.includes("@")) {
    userData.em = [await sha256Hex(email)];
  }
  if (phone && typeof phone === "string") {
    const normalized = normalizePhoneBR(phone);
    if (normalized) userData.ph = [await sha256Hex(normalized)];
  }
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const xff = req.headers.get("x-forwarded-for") ?? "";
  const ip = xff.split(",")[0]?.trim();
  if (ip) userData.client_ip_address = ip;
  const ua = req.headers.get("user-agent");
  if (ua) userData.client_user_agent = ua;

  const event: Record<string, unknown> = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: userData,
  };
  if (eventId) event.event_id = eventId;
  if (eventSourceUrl) event.event_source_url = eventSourceUrl;
  if (customData) event.custom_data = customData;

  const payload: Record<string, unknown> = { data: [event] };
  if (testEventCode) payload.test_event_code = testEventCode;

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(
    CAPI_TOKEN,
  )}`;

  let metaResponse: Response;
  try {
    metaResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Erro ao chamar Graph API:", err);
    return new Response(
      JSON.stringify({ error: "Falha ao contactar Graph API", detail: String(err) }),
      {
        status: 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      },
    );
  }

  const json = await metaResponse.json().catch(() => ({}));
  return new Response(JSON.stringify(json), {
    status: metaResponse.ok ? 200 : 502,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
});
