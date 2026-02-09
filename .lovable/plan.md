
# Prevenir Duplo Clique no Botão "Finalizar Simulação"

## Problema
Quando o lead clica no botão "Finalizar Simulação", cliques duplos (intencionais ou acidentais) fazem com que os dados sejam enviados mais de uma vez para o Make.

## Solução
Adicionar um controle no botão que:
- Desabilita o botão imediatamente após o primeiro clique
- Mostra "Enviando..." como feedback visual
- Só permite novo clique se houver erro

## Alterações

### Arquivo: `src/components/Simulator.tsx`

1. **Novo estado `isSubmitting`** para controlar se já está enviando
2. **Na função `handleFinish`**: verificar se já está enviando e bloquear envios duplicados
3. **No botão "Finalizar Simulação"**: desabilitar enquanto estiver enviando e trocar o texto para "Enviando..."

```text
Fluxo:
  Clique em "Finalizar"
       |
  Botao fica desabilitado ("Enviando...")
       |
  Envia dados para o Make (1 unica vez)
       |
  Sucesso --> Redireciona para /obrigado
  Erro    --> Botao volta ao normal para tentar de novo
```

Nenhum arquivo novo sera criado. Apenas o `Simulator.tsx` sera modificado.
