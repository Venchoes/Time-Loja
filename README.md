# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
## Como rodar localmente

Siga estes passos rápidos para iniciar o projeto em desenvolvimento:

```bash
# instalar dependências (já feito se você clonou e executou antes)
npm install

# iniciar servidor de desenvolvimento (Vite + HMR)
npm run dev
```

O servidor de desenvolvimento roda em: http://localhost:5173

Para parar o servidor, pressione Ctrl+C no terminal onde `npm run dev` foi executado.

## Módulo Loja (Carros)

Este repositório contém o frontend do Time de Loja (vendas de carros). Ele faz parte de um ecossistema maior com múltiplos times (Cadastro, Backoffice, Financiamento, Engajamento). Aqui focamos em:

- Vitrine de carros com listagem
- Página de detalhes do produto
- Carrinho e cálculo de total
- Consumo de API backend para produtos (`/api/products`)
- Estrutura para consumo de API de autenticação (a ser integrada com o Time de Cadastro)

### Estrutura principal

```
app/
	components/        # Componentes reutilizáveis (Navbar, ProductCard, etc.)
	services/          # Serviços para consumo de API (products)
	store/             # Estado global (Zustand) - carrinho
	routes/            # Páginas (home, vitrine, produto.$id, carrinho)
	types/             # Tipos TypeScript (CarProduct, VeiculoType)
```

### Rotas atuais

| Rota | Descrição |
|------|-----------|
| `/` | Vitrine simplificada (primeiros 4 carros) |
| `/vitrine` | Catálogo completo |
| `/produto/:id` | Detalhe de um carro específico |
| `/carrinho` | Itens adicionados e total |

### Estado e Backend

- Carrinho gerenciado com Zustand (`app/store/cart.ts`).
- Produtos buscados via `fetch` do backend (`app/services/products.ts`).
- URL base da API configurável via env var `API_BASE_URL` (padrão: `http://localhost:8080/api`).

### Modelo de Produto

```typescript
type CarProduct = {
  id: string;
  brand: string;
  modelName: string;
  type: VeiculoType; // 'carro' | 'suv' | 'pickup' | 'esportivo' | 'classico' | 'van' | 'hatch' | 'sedan'
  value: number; // valor em centavos BRL
  status: 'disponivel' | 'vendido';
  year: number;
  description?: string;
};
```

### Próximos Passos (Sugestões)

1. Integrar autenticação (consumir endpoints do Time de Cadastro) e proteger rotas de compra para usuários cliente.
2. Consumir pontos reais do serviço de Engajamento.
3. Adicionar filtros e busca na vitrine (marca, ano, faixa de preço, tipo).
4. Implementar paginação ou carregamento incremental.
5. Preparar internacionalização básica (pt-BR / en-US) se necessário.
6. Adicionar testes (React Testing Library + Vitest) para componentes principais.
7. Adicionar imagens de produtos vindas do backend.

### Scripts úteis

```bash
npm run dev       # ambiente desenvolvimento
npm run build     # build de produção
npm run start     # serve build (SSR) usando react-router-serve
npm run typecheck # checagem de tipos
```

### Deploy

Publicação recomendada no Vercel (frontend). Ao integrar com backend, configurar variável de ambiente `API_BASE_URL` para apontar para o domínio dos microserviços de produtos.

---

---
