const URL = import.meta.env.VITE_FORM_WEBHOOK_URL as string | undefined;
const TOKEN = import.meta.env.VITE_FORM_WEBHOOK_TOKEN as string | undefined;

export interface FormWebhookPayload {
  nome: string;
  telefone: string;
  cidade: string;
  tipo: "IMOVEL";
  tipo_bem: string;
  tempo_aquisicao: string;
  valor_pretendido: string;
  tem_entrada: string;
  valor_entrada: string;
  parcela_ideal: string;
  origem: string;
}

const REQUIRED_FIELDS: (keyof FormWebhookPayload)[] = [
  "nome",
  "telefone",
  "cidade",
  "tipo_bem",
  "tempo_aquisicao",
  "valor_pretendido",
  "tem_entrada",
  "parcela_ideal",
];

export async function sendFormWebhook(payload: FormWebhookPayload): Promise<void> {
  if (!URL || !TOKEN) {
    throw new Error(
      "Webhook não configurado: defina VITE_FORM_WEBHOOK_URL e VITE_FORM_WEBHOOK_TOKEN no .env",
    );
  }

  for (const field of REQUIRED_FIELDS) {
    const value = payload[field];
    if (value === undefined || value === null || String(value).trim() === "") {
      throw new Error(`Campo obrigatório ausente no envio: ${field}`);
    }
  }

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Falha ao enviar lead para o webhook (HTTP ${response.status}): ${errorBody || response.statusText}`,
    );
  }
}
