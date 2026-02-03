

# Plano: Atualizar Logo do Rodapé e Texto da Seção de Clientes

## Resumo
Vou fazer duas alterações:
1. Substituir a logo atual do rodapé (Malta) pela nova logo "Multimarcas" enviada
2. Alterar o texto na seção de clientes contemplados

## Alterações

### 1. Arquivo: `src/components/Footer.tsx`

**Adicionar nova logo:**
- Copiar a imagem `IMG_2039.PNG` para `src/assets/multimarcas-logo.png`
- Importar a nova logo no componente
- Substituir a logo Malta pela logo Multimarcas

**Linha 2 - Alterar import:**
```jsx
// De:
import maltaLogo from "@/assets/malta-logo.png";
// Para:
import multimarcasLogo from "@/assets/multimarcas-logo.png";
```

**Linha 13 - Alterar imagem:**
```jsx
// De:
<img src={maltaLogo} alt="Malta Consórcios" className="h-12 w-auto" />
// Para:
<img src={multimarcasLogo} alt="Multimarcas" className="h-12 w-auto" />
```

### 2. Arquivo: `src/components/TestimonialsSection.tsx`

**Linha 78 - Alterar texto:**
```jsx
// De:
Mais de 1000 famílias já realizaram o sonho da casa própria e do carro novo.
// Para:
Muitas famílias já realizaram o sonho da casa própria e do carro novo.
```

## Resultado Final

**Rodapé:**
```text
┌─────────────────────────────────────┐
│  [Logo Multimarcas]  ← Nova logo    │
│  [f]  ← Ícone Facebook              │
└─────────────────────────────────────┘
```

**Seção Clientes Contemplados:**
```text
Clientes Contemplados
"Muitas famílias já realizaram o sonho da casa própria e do carro novo."
```

