

# Substituir laranja e azul por #005E69

A cor `#005E69` convertida para HSL é aproximadamente `176 100% 20%`.

## Arquivos a alterar

### 1. `src/index.css` — variáveis CSS (raiz de tudo)
- `--primary`: de `202 100% 11%` para `176 100% 20%`
- `--primary-hover`: de `202 100% 16%` para `176 100% 25%`
- `--secondary`: de `206 68% 93%` para `176 30% 93%`
- `--secondary-foreground`: de `202 100% 11%` para `176 100% 20%`
- `--accent`: de `206 68% 73%` para `176 50% 60%`
- `--accent-foreground`: de `202 100% 11%` para `176 100% 20%`
- `--ring`: de `202 100% 11%` para `176 100% 20%`
- `--gradient-primary`: atualizar os dois valores hsl para usar `176 100% 20%` e `176 100% 25%`
- `--shadow-hover`: atualizar rgba para tom de #005E69
- `--header-footer`: de `6 93% 62%` para `176 100% 20%`
- `--orange`: de `6 93% 62%` para `176 100% 20%`
- Dark mode: atualizar as variáveis correspondentes (`--primary`, `--accent`, `--ring`, `--sidebar-primary`, `--sidebar-ring`)

### 2. Nenhuma alteração nos componentes
Todos os componentes (Header, Footer, Simulator, BenefitsSection, Progress) já usam as variáveis CSS (`bg-orange`, `text-orange`, `hsl(var(--header-footer))`, `bg-primary`, etc.), então vão herdar a nova cor automaticamente.

### 3. `tailwind.config.ts` — sem alteração
A config já referencia as variáveis CSS, nada precisa mudar.

