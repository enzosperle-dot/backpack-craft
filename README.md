# Backpack Craft — Site Oficial

Site premium para o mod Backpack Craft do Minecraft. Construído com Next.js 15, TailwindCSS, Framer Motion e Prisma.

## Tecnologias

- **Next.js 15** — App Router, Server Components, API Routes
- **TypeScript** — Tipagem completa
- **TailwindCSS** — Estilização utilitária
- **Framer Motion** — Animações suaves
- **Prisma + PostgreSQL** — Banco de dados
- **bcryptjs + jose** — Autenticação segura

## Pré-requisitos

- Node.js 18+
- PostgreSQL (local ou Neon/Supabase)

## Instalação

### 1. Instale as dependências

```bash
cd backpack-craft
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/backpack_craft"
JWT_SECRET="sua-chave-secreta-aqui"
ADMIN_EMAIL="admin@backpackcraft.com"
ADMIN_PASSWORD="sua-senha-aqui"
```

### 3. Configure o banco de dados

```bash
npm run db:push
npm run db:seed
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Painel Admin

Acesse `/admin/login` com as credenciais configuradas no `.env`.

## Deploy na Vercel

1. Crie um projeto no Vercel
2. Conecte ao repositório
3. Configure as variáveis de ambiente:
   - `DATABASE_URL` (use Neon ou Supabase)
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
4. Deploy!

```bash
vercel deploy
```

Após o deploy, rode o seed:

```bash
vercel env pull .env.local
npm run db:push
npm run db:seed
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── (site)/         # Páginas públicas
│   │   ├── page.tsx    # Home
│   │   ├── versoes/    # Versões disponíveis
│   │   ├── download/   # Página de download
│   │   ├── changelog/  # Histórico de versões
│   │   └── faq/        # Perguntas frequentes
│   ├── admin/          # Painel administrativo
│   │   ├── login/
│   │   ├── versoes/
│   │   ├── galeria/
│   │   ├── changelog/
│   │   ├── faq/
│   │   ├── downloads/
│   │   └── configuracoes/
│   └── api/
│       ├── auth/       # Login/Logout
│       └── admin/      # CRUD endpoints
├── components/
│   ├── layout/         # Header, Footer
│   ├── sections/       # Hero, Features, Gallery...
│   └── admin/          # Sidebar admin
└── lib/
    ├── prisma.ts
    ├── auth.ts
    └── utils.ts
```

## Páginas do Site

| Rota | Descrição |
|------|-----------|
| `/` | Home com todas as seções |
| `/versoes` | Tabela de versões com filtros |
| `/download` | Download com filtros |
| `/changelog` | Histórico de atualizações |
| `/faq` | Perguntas frequentes |
| `/admin` | Dashboard (protegido) |
| `/admin/versoes` | CRUD de versões |
| `/admin/galeria` | CRUD de imagens |
| `/admin/changelog` | Edição de changelogs |
| `/admin/faq` | CRUD de FAQ |
| `/admin/downloads` | Estatísticas |
| `/admin/configuracoes` | Textos e links |
