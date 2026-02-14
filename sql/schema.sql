-- Accountabili schema for Supabase Postgres.
-- Run in Supabase SQL editor after enabling auth.

-- Goals table stores each accountability challenge.
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 120),
  description text not null check (char_length(description) between 10 and 2000),
  duration_days integer not null check (duration_days between 1 and 3650),
  start_date date not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

-- Goal updates table keeps one or more text posts per day.
create table if not exists public.goal_updates (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references public.goals(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  update_date date not null,
  content text not null check (char_length(content) between 2 and 1500),
  created_at timestamptz not null default now()
);

create index if not exists goals_user_id_idx on public.goals(user_id);
create index if not exists goals_public_created_idx on public.goals(is_public, created_at desc);
create index if not exists updates_goal_date_idx on public.goal_updates(goal_id, update_date desc);

-- Enable Row Level Security.
alter table public.goals enable row level security;
alter table public.goal_updates enable row level security;

-- Goals policies.
create policy "Public goals are readable" on public.goals
  for select using (is_public = true or auth.uid() = user_id);

create policy "Users can insert own goals" on public.goals
  for insert with check (auth.uid() = user_id);

create policy "Users can update own goals" on public.goals
  for update using (auth.uid() = user_id);

create policy "Users can delete own goals" on public.goals
  for delete using (auth.uid() = user_id);

-- Updates policies.
create policy "Public updates are readable for public goals" on public.goal_updates
  for select using (
    exists (
      select 1 from public.goals g
      where g.id = goal_id and (g.is_public = true or g.user_id = auth.uid())
    )
  );

create policy "Users can insert updates for own goals" on public.goal_updates
  for insert with check (
    auth.uid() = user_id
    and exists (select 1 from public.goals g where g.id = goal_id and g.user_id = auth.uid())
  );

create policy "Users can update own updates" on public.goal_updates
  for update using (auth.uid() = user_id);

create policy "Users can delete own updates" on public.goal_updates
  for delete using (auth.uid() = user_id);
