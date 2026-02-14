# Accountabili

Accountabili is a public accountability board where users create goals and post daily progress updates. This project uses Next.js App Router, Tailwind CSS, and Supabase Auth/Postgres, and is deployment-ready for Vercel.

## Features

- Email/password authentication (signup, login, logout)
- Goal CRUD with title, description, duration, and start date
- Daily text updates for each goal
- Computed streak, completion percentage, and missed days
- Public goal pages and discovery feed
- RESTful API routes for goals and updates
- Validation and API error handling with Zod

## Project structure

```txt
app/
  api/
    goals/
      [id]/
        updates/route.ts
        route.ts
      route.ts
    updates/
      [id]/route.ts
  auth/
    login/page.tsx
    signup/page.tsx
  dashboard/page.tsx
  goals/
    new/page.tsx
    [id]/
      edit/page.tsx
      page.tsx
  public/
    goals/[id]/page.tsx
    page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  auth-form.tsx
  button.tsx
  goal-card.tsx
  goal-form.tsx
  logout-button.tsx
  navbar.tsx
  update-form.tsx
lib/
  env.ts
  goalStats.ts
  supabaseClient.ts
  supabaseServer.ts
  validations.ts
sql/
  schema.sql
types/
  db.ts
.env.example
middleware.ts
```

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Set Supabase values in `.env.local`.
4. Run SQL from `sql/schema.sql` in your Supabase SQL editor.
5. Start development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000`.

## Deploy to Vercel

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel env settings.
4. Deploy.

## Security notes

- RLS policies lock writes to owners and limit reads for private goals.
- Input validation is enforced in API routes via Zod.
- Auth sessions are handled with Supabase SSR cookies.
