const STORAGE_KEY = "benetoli_lead_data";

export interface LeadData {
  tipo: "IMOVEL";
  tipo_bem: string;
  tempo_aquisicao: string;
  valor_pretendido: string;
  valor_pretendido_numero: number;
  tem_entrada: string;
  valor_entrada: string;
  parcela_ideal: string;
  parcela_ideal_numero: number;
  cidade: string;
}

export function parseBRLToNumber(brl: string): number {
  const digits = brl.replace(/\D/g, "");
  if (!digits) return 0;
  return Number(digits) / 100;
}

export function saveLeadData(data: LeadData): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* sessionStorage indisponível (modo privado etc) — não bloqueia o fluxo */
  }
}

export function consumeLeadData(): LeadData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(STORAGE_KEY);
    return JSON.parse(raw) as LeadData;
  } catch {
    return null;
  }
}
