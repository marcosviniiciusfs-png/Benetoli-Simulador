
# Plano: Ajustar Logos do Rodapé e Alterar Título

## Resumo
Vou fazer três alterações:
1. Aumentar a logo do Banco Central para 3x o tamanho atual
2. Centralizar verticalmente as duas logos
3. Trocar o título "Por que escolher a CréditoFácil?" para "Por que escolher a Renova?"

## Alterações

### 1. Arquivo: `src/components/Footer.tsx`

**Linhas 13-16 - Ajustar tamanhos e alinhamento das logos:**

```tsx
// De:
<div className="flex items-center gap-4 mb-4">
  <img src={logoBancoCentral} alt="Banco Central do Brasil" className="h-12 w-auto" />
  <img src={logoFooter1} alt="Malta Consórcios" className="h-12 w-auto" />
</div>

// Para:
<div className="flex items-center gap-4 mb-4">
  <img src={logoBancoCentral} alt="Banco Central do Brasil" className="h-36 w-auto" />
  <img src={logoFooter1} alt="Malta Consórcios" className="h-12 w-auto" />
</div>
```

**Explicação técnica:**
- A logo do Banco Central passa de `h-12` (48px) para `h-36` (144px) = 3x maior
- O `items-center` no container flex já garante o alinhamento vertical centralizado entre as logos
- A segunda logo mantém seu tamanho original (`h-12`)

### 2. Arquivo: `src/components/BenefitsSection.tsx`

**Linha 27 - Alterar título:**

```tsx
// De:
Por que escolher a CréditoFácil?

// Para:
Por que escolher a Renova?
```

## Resultado Visual

```text
RODAPÉ - Logos:
┌─────────────────────────────────────┐
│                                     │
│  ┌─────────────┐   ┌─────┐          │
│  │  BANCO      │   │Logo │          │
│  │  CENTRAL    │   │ 2   │ ← centralizada verticalmente
│  │  (3x maior) │   └─────┘          │
│  └─────────────┘                    │
│                                     │
└─────────────────────────────────────┘

SEÇÃO BENEFÍCIOS:
"Por que escolher a Renova?" (novo título)
```
