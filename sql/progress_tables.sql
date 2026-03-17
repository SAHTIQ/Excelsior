create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  session_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.task_progress (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(task_id, user_id)
);
