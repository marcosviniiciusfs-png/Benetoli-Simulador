
# Plano: Adicionar Ícone do Facebook no Rodapé

## Resumo
Vou substituir o texto descritivo ("Sua parceira de confiança...") por um ícone do Facebook com link de redirecionamento para a página oficial da Malta Consórcios no Facebook.

## Alteração

### Arquivo: `src/components/Footer.tsx`

**O que será removido (linhas 14-17):**
```jsx
<p className="text-white/90 leading-relaxed">
  Sua parceira de confiança para realizar o sonho da casa própria e do carro novo. 
  Mais de 1000 famílias contempladas.
</p>
```

**O que será adicionado:**
```jsx
<div className="flex items-center gap-4 mt-2">
  <a 
    href="https://www.facebook.com/maltainvestimentosc?mibextid=wwXIfr&rdid=0yXJ3G3JNtxKmWSN&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BxmFUQvT7%2F%3Fmibextid%3DwwXIfr#"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-white/80 transition-colors"
    aria-label="Facebook da Malta Consórcios"
  >
    <Facebook className="w-8 h-8" />
  </a>
</div>
```

**Import necessário:**
Adicionar `Facebook` ao import do `lucide-react`.

## Resultado Visual

```text
┌─────────────────────────────────────┐
│  [Logo Malta]                       │
│                                     │
│  [f]  ← Ícone do Facebook clicável  │
│                                     │
└─────────────────────────────────────┘
```

## Detalhes Técnicos
- O ícone `Facebook` será importado do `lucide-react`
- O link abrirá em uma nova aba (`target="_blank"`)
- Terá `rel="noopener noreferrer"` por segurança
- Efeito hover para indicar que é clicável
- Atributo `aria-label` para acessibilidade
