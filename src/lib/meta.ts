const CAPI_URL = import.meta.env.VITE_META_CAPI_URL as string | undefined;

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return undefined;
  return decodeURIComponent(match.slice(name.length + 1));
}

export function readFbp(): string | undefined {
  return readCookie("_fbp");
}

export function readFbc(): string | undefined {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (!fbclid) return undefined;
  return `fb.1.${Date.now()}.${fbclid}`;
}

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

interface SendCapiArgs {
  eventId: string;
  eventName: string;
  email?: string;
  phone?: string;
  fbp?: string;
  fbc?: string;
  eventSourceUrl?: string;
  customData?: Record<string, unknown>;
  testEventCode?: string;
}

export async function sendCapiEvent(args: SendCapiArgs): Promise<void> {
  if (!CAPI_URL) {
    console.warn(
      "VITE_META_CAPI_URL não configurada — CAPI não vai disparar (Pixel client-side ainda funciona).",
    );
    return;
  }
  try {
    const res = await fetch(CAPI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn(`CAPI retornou status ${res.status}:`, text);
    }
  } catch (err) {
    console.warn("CAPI fetch falhou:", err);
  }
}
