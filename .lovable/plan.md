
# Plano: Atualizar Informações de Contato no Rodapé

## Resumo
Vou atualizar as informações de localização e telefone no rodapé com os dados reais da Malta Consórcios.

## Alterações

### Arquivo: `src/components/Footer.tsx`

**Seção "Fale Conosco" - Telefone e WhatsApp:**
- Alterar de `(11) 99999-9999` para `(81) 99483-6614`
- O mesmo número será usado para Telefone e WhatsApp

**Seção "Localização" - Endereço:**
- Alterar o título do endereço para `EMPRESARIAL LAURA MACIEL`
- Alterar o endereço de:
  - `Rua das Empresas, 123 – Centro, São Paulo/SP – CEP: 01000-000`
- Para:
  - `Rua Professora Laura Maciel, 23 – Universitário, Caruaru/PE`

## Resultado Final

```text
Fale Conosco:
├── Telefone: (81) 99483-6614
└── WhatsApp: (81) 99483-6614

Localização:
├── EMPRESARIAL LAURA MACIEL
│   Rua Professora Laura Maciel, 23 – Universitário
│   Caruaru/PE
└── Horário de Atendimento (mantido)
```
