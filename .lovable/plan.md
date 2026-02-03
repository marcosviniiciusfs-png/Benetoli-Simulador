

# Plano: Carrossel de Imagens dos Clientes Contemplados

## Resumo
Vou substituir a seção atual de "Clientes Contemplados" por um carrossel de imagens rotativo automático, usando as 10 fotos que você enviou. O carrossel vai girar automaticamente, mas pausará quando o usuário clicar ou segurar (no mobile).

## O Que Será Feito

### 1. Salvar as Imagens no Projeto
As 10 fotos enviadas serão copiadas para a pasta `src/assets/clientes/`:
- cliente-1.jpeg
- cliente-2.jpeg
- cliente-3.jpeg
- cliente-4.jpeg
- cliente-5.jpeg
- cliente-6.jpeg
- cliente-7.jpeg
- cliente-8.jpeg
- cliente-9.jpeg
- cliente-10.jpeg

### 2. Instalar Plugin de Autoplay
Adicionar o pacote `embla-carousel-autoplay` que permite rotação automática com controle de pausa.

### 3. Redesenhar a Seção
A nova estrutura terá:
- Titulo "Clientes Contemplados" centralizado
- Subtitulo com quantidade de familias atendidas
- Carrossel horizontal com as imagens em formato de cards
- Indicadores de navegacao (bolinhas) abaixo do carrossel
- Setas de navegacao nas laterais (desktop)

### 4. Comportamento do Carrossel
- Rotacao automatica a cada 3 segundos
- Loop infinito (quando chega ao fim, volta ao inicio)
- Pausa ao clicar/tocar
- Retoma rotacao ao soltar
- Multiplas imagens visiveis por vez (3 no desktop, 2 no tablet, 1 no mobile)

---

## Detalhes Tecnicos

### Dependencia a Instalar
```
embla-carousel-autoplay
```

### Arquivo a Modificar
- `src/components/TestimonialsSection.tsx` - Reescrever completamente com o novo carrossel

### Arquivos a Criar
- `src/assets/clientes/cliente-1.jpeg` ate `cliente-10.jpeg` (copias das imagens enviadas)

### Configuracao do Autoplay
```text
Autoplay({
  delay: 3000,           // 3 segundos entre slides
  stopOnInteraction: true,  // Pausa ao clicar
  stopOnMouseEnter: true,   // Pausa ao passar o mouse
  stopOnFocusIn: true       // Pausa ao focar
})
```

### Estrutura do Carrossel
```text
+------------------------------------------+
|        Clientes Contemplados             |
|  Mais de 1000 familias ja realizaram...  |
|                                          |
|  [<]  [IMG1] [IMG2] [IMG3]  [>]          |
|                                          |
|          o  o  o  o  o  o                |
+------------------------------------------+
```

### Responsividade
- Desktop (>1024px): 3 imagens visiveis
- Tablet (768-1024px): 2 imagens visiveis  
- Mobile (<768px): 1 imagem visivel

