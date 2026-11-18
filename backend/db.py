"""Optional Postgres storage (Supabase Postgres, direct connection via asyncpg).

Set DATABASE_URL to the Supabase connection string. On Vercel (serverless) use the *pooler* string
(Supabase > Connect > Transaction pooler, port 6543); it's why statement caching is off below.
When DATABASE_URL is missing every call is a no-op. Failures are logged and swallowed: a database
outage must never stop a message being answered.
"""
import os

import asyncpg

DSN = os.getenv("DATABASE_URL") or ""
enabled = bool(DSN)
_pool: asyncpg.Pool | None = None


class Duplicate(Exception):
    """The unique action_id already exists (a chat confirmation was reused)."""


# Created automatically on first use (idempotent, safe to run on every cold start).
SCHEMA = """
create table if not exists contact_messages (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  source       text not null,
  name         text,
  email        text not null,
  subject      text,
  message      text not null,
  risky        boolean not null default false,
  ai_draft     text,
  auto_replied boolean not null default false,
  action_id    text unique
);
alter table contact_messages enable row level security;
"""


async def _get_pool() -> asyncpg.Pool:
    global _pool
    if _pool is None:
        pool = await asyncpg.create_pool(DSN, min_size=0, max_size=2, statement_cache_size=0, timeout=10, command_timeout=10)
        await pool.execute(SCHEMA)
        _pool = pool  # only cached once the tables exist, so a failed setup is retried next request
    return _pool


async def insert(row: dict) -> str | None:
    """Stores a message and returns its id (None if disabled or failed). Raises Duplicate on a reused action_id."""
    if not enabled:
        return None
    try:
        pool = await _get_pool()
        rid = await pool.fetchval(
            "insert into contact_messages (source, name, email, subject, message, risky, action_id) "
            "values ($1, $2, $3, $4, $5, $6, $7) returning id",
            row["source"], row["name"], row["email"], row["subject"], row["message"], row["risky"], row.get("action_id"),
        )
        return str(rid)
    except asyncpg.UniqueViolationError:
        raise Duplicate()
    except Exception as e:
        print("postgres insert error:", e)
        return None


async def update(row_id: str | None, fields: dict) -> None:
    """Records the AI draft and whether it was sent automatically."""
    if not enabled or not row_id:
        return
    try:
        pool = await _get_pool()
        await pool.execute("update contact_messages set ai_draft = $2, auto_replied = $3 where id = $1::uuid",
                           row_id, fields.get("ai_draft"), bool(fields.get("auto_replied")))
    except Exception as e:
        print("postgres update error:", e)
