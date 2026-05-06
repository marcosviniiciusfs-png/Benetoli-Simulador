export interface Env {
  META_PIXEL_ID: string;
  META_CAPI_TOKEN: string;
  ALLOWED_ORIGIN?: string;
}

const GRAPH_API_VERSION = "v19.0";

function corsHeaders(origin: string | null, allowed: string | undefined): Record<string, string> {
  const allowOrigin =
    allowed && allowed !== "*" && origin && origin === allowed ? origin : "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

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

function jsonResponse(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("origin");
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, cors);
    }
    if (!env.META_PIXEL_ID || !env.META_CAPI_TOKEN) {
      return jsonResponse(
        {
          error:
            "CAPI not configured: defina META_PIXEL_ID e META_CAPI_TOKEN como secrets do Worker",
        },
        500,
        cors,
      );
    }

    let body: CapiRequestBody;
    try {
      body = (await request.json()) as CapiRequestBody;
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400, cors);
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

    const cfIp = request.headers.get("cf-connecting-ip");
    const xff = request.headers.get("x-forwarded-for");
    const ip = cfIp || (xff ? xff.split(",")[0]?.trim() : undefined);
    if (ip) userData.client_ip_address = ip;
    const ua = request.headers.get("user-agent");
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

    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${env.META_PIXEL_ID}/events?access_token=${encodeURIComponent(
      env.META_CAPI_TOKEN,
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
      return jsonResponse(
        { error: "Falha ao contactar Graph API", detail: String(err) },
        502,
        cors,
      );
    }

    const json = await metaResponse.json().catch(() => ({}));
    return jsonResponse(json, metaResponse.ok ? 200 : 502, cors);
  },
};
