# Meta Conversion API Worker

Cloudflare Worker que recebe eventos do frontend (Pixel browser-side bloqueado por adblocker) e os repassa server-side pra Meta Graph API. Combinado com o Pixel client-side, deduplicado via `event_id`, traz match rate de ~25% pra ~85-95%.

## Setup inicial

```bash
# 1. Instalar dependências (uma vez)
cd worker
npm install

# 2. Login no Cloudflare (uma vez por máquina)
npx wrangler login

# 3. Configurar os secrets (uma vez)
npx wrangler secret put META_PIXEL_ID
# Cole o valor: 1772548090518824

npx wrangler secret put META_CAPI_TOKEN
# Cole o valor: EAAXklzIaZCZAg... (token CAPI da Meta)

# Opcional: restringir CORS ao domínio do GitHub Pages
npx wrangler secret put ALLOWED_ORIGIN
# Ex.: https://marcosviniiciusfs-png.github.io

# 4. Deploy
npx wrangler deploy
```

A URL pública será impressa ao final, algo como:
`https://benetoli-meta-event.<seu-subdomínio>.workers.dev`

## Atualizar o frontend

Após o deploy, copie a URL impressa e ajuste em [../src/lib/meta.ts](../src/lib/meta.ts) o fallback do `CAPI_URL`, ou prefira passar via `VITE_META_CAPI_URL` no `.env.local` e como GitHub Secret.

## Validar

```bash
curl -X POST https://<sua-url>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"eventName":"Lead","eventId":"test-001","phone":"(19) 97162-1610","customData":{"value":150000,"currency":"BRL"}}'
```

Esperado: `{"events_received": 1, "messages": [], "fbtrace_id": "..."}`.

## Atualizar o código

Após editar `src/index.ts`, basta:
```bash
npx wrangler deploy
```
