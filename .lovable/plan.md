

# Plano: Aplicar Cor Laranja aos Elementos e Remover Telefone Duplicado

## Resumo
Vou fazer duas alterações principais:
1. Aplicar a cor laranja (mesma do cabeçalho/rodapé) aos ícones da seção de benefícios, à barra de progresso e aos botões do formulário
2. Remover um dos números de telefone duplicados na seção "Fale Conosco" do rodapé

## Alterações Detalhadas

### 1. Arquivo: `src/index.css`
Adicionar uma nova variável CSS para a cor laranja reutilizável:
```css
--orange: 6 93% 62%;
```

### 2. Arquivo: `tailwind.config.ts`
Adicionar a cor laranja ao tema do Tailwind para fácil uso:
```js
orange: {
  DEFAULT: "hsl(var(--orange))",
}
```

### 3. Arquivo: `src/components/ui/progress.tsx`
Alterar a cor da barra de progresso de `bg-primary` para `bg-[hsl(var(--header-footer))]` (laranja)

### 4. Arquivo: `src/components/Simulator.tsx`
Alterar os botões "Próximo" e "Finalizar Simulação":
- De: `bg-primary hover:bg-primary-hover`
- Para: `bg-[hsl(var(--header-footer))] hover:bg-[hsl(6,93%,55%)]`

Alterar os botões de seleção "Sim" quando selecionados para usar a cor laranja

### 5. Arquivo: `src/components/BenefitsSection.tsx`
Alterar a cor dos ícones:
- De: `text-primary` e `bg-primary/10`
- Para: `text-[hsl(var(--header-footer))]` e `bg-[hsl(var(--header-footer))]/10`

### 6. Arquivo: `src/components/Footer.tsx`
Remover a seção duplicada de Telefone (linhas 32-38), mantendo apenas o WhatsApp:

**Antes:**
```
Fale Conosco:
├── Telefone: (81) 99483-6614
└── WhatsApp: (81) 99483-6614
```

**Depois:**
```
Fale Conosco:
└── WhatsApp: (81) 99483-6614
```

## Resultado Visual

```text
┌─────────────────────────────────────────────┐
│  BARRA DE PROGRESSO                         │
│  [████████████░░░░░░░░]  ← Laranja          │
├─────────────────────────────────────────────┤
│  BOTÕES DO FORMULÁRIO                       │
│  [    Próximo    ]       ← Laranja          │
│  [Finalizar Simulação]   ← Laranja          │
├─────────────────────────────────────────────┤
│  ÍCONES DE BENEFÍCIOS                       │
│  (💬) (💰) (📄)          ← Laranja          │
├─────────────────────────────────────────────┤
│  RODAPÉ - FALE CONOSCO                      │
│  WhatsApp: (81) 99483-6614  ← Apenas 1 item │
└─────────────────────────────────────────────┘
```

