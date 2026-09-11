create table if not exists public.ait_reviews (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid references public.ait_meetings(id) on delete set null,
  nickname text not null check (char_length(nickname) between 1 and 30),
  content text not null check (char_length(content) between 10 and 500),
  result_image_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists ait_reviews_published_created_idx on public.ait_reviews(is_published, created_at desc);
alter table public.ait_reviews enable row level security;
drop policy if exists "ait_reviews_public_read" on public.ait_reviews;
create policy "ait_reviews_public_read" on public.ait_reviews for select to anon, authenticated using (is_published = true);
revoke all on table public.ait_reviews from anon, authenticated;
grant select on table public.ait_reviews to anon, authenticated;
