-- ─────────────────────────────────────────────
--  ASSI from Korea — Supabase 스키마
--  Supabase 대시보드 → SQL Editor 에 붙여넣고 RUN 하세요.
--  (회원 정보는 Supabase Auth(auth.users)가 관리 — 별도 테이블 불필요.
--   사용자 이름은 user_metadata.name 에 저장됩니다.)
-- ─────────────────────────────────────────────

-- 장바구니
create table if not exists public.cart_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  product_id  text not null,
  quantity    int  not null default 1 check (quantity > 0),
  created_at  timestamptz not null default now(),
  unique (user_id, product_id)
);

-- Row Level Security: 사용자는 자신의 장바구니만 접근 가능
alter table public.cart_items enable row level security;

drop policy if exists "select own cart" on public.cart_items;
drop policy if exists "insert own cart" on public.cart_items;
drop policy if exists "update own cart" on public.cart_items;
drop policy if exists "delete own cart" on public.cart_items;

create policy "select own cart" on public.cart_items
  for select using (auth.uid() = user_id);
create policy "insert own cart" on public.cart_items
  for insert with check (auth.uid() = user_id);
create policy "update own cart" on public.cart_items
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own cart" on public.cart_items
  for delete using (auth.uid() = user_id);
