-- Run once in the Supabase SQL editor.
create table if not exists contact_messages (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  source       text not null,              -- 'Website form' | 'Chat assistant' | 'Inbound email'
  name         text,
  email        text not null,
  subject      text,
  message      text not null,
  risky        boolean not null default false,   -- possible safeguarding concern
  ai_draft     text,
  auto_replied boolean not null default false,
  action_id    text unique                -- makes a chat confirmation single-use
);
-- No policies: the backend connects as the database owner (bypasses RLS); the public API (anon key) gets no access.
alter table contact_messages enable row level security;
