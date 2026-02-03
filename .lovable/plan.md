
# Plano: Substituir Logo do Rodapé por Duas Novas Logos

## Resumo
Vou remover a logo atual (Multimarcas) do rodapé e substituí-la pelas duas novas logos enviadas, posicionando-as lado a lado conforme solicitado.

## Detalhes das Imagens

- **Imagem 1** (`Design_sem_nome_17.png`): Logo branca que ficará à direita
- **Imagem 2** (`Cópia_de_Hurtz_Company_-_LOGO_3.png`): Logo do Banco Central que ficará à esquerda

## Alterações

### 1. Copiar as novas imagens para o projeto

Copiar as duas imagens enviadas para a pasta `src/assets/`:
- `user-uploads://Design_sem_nome_17.png` → `src/assets/logo-footer-1.png`
- `user-uploads://Cópia_de_Hurtz_Company_-_LOGO_3.png` → `src/assets/logo-banco-central.png`

### 2. Atualizar `src/components/Footer.tsx`

**Modificar imports:**
```typescript
// Remover:
import multimarcasLogo from "@/assets/multimarcas-logo.png";

// Adicionar:
import logoFooter1 from "@/assets/logo-footer-1.png";
import logoBancoCentral from "@/assets/logo-banco-central.png";
```

**Modificar a seção de logos (linhas 11-14):**

De:
```jsx
<div className="flex items-center gap-2 mb-4">
  <img src={multimarcasLogo} alt="Multimarcas" className="h-12 w-auto" />
</div>
```

Para:
```jsx
<div className="flex items-center gap-4 mb-4">
  <img src={logoBancoCentral} alt="Banco Central do Brasil" className="h-12 w-auto" />
  <img src={logoFooter1} alt="Malta Consórcios" className="h-12 w-auto" />
</div>
```

## Resultado Visual

```text
┌────────────────────────────────────────────────────────────┐
│  RODAPÉ                                                    │
│                                                            │
│  [Logo Banco Central] [Logo 1]     Fale Conosco    Local.  │
│  (esquerda)           (direita)                            │
│                                                            │
│  [Facebook]                                                │
└────────────────────────────────────────────────────────────┘
```

As duas logos ficarão lado a lado na primeira coluna do rodapé, com a logo do Banco Central à esquerda e a outra logo à direita.
