-- AI Together 전용 테이블만 생성합니다.
-- 기존 edu-platform 테이블은 수정하거나 삭제하지 않습니다.

create table if not exists public.ait_meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null default '',
  category text not null check (category in ('사진', '글쓰기', '여행', '영상', '홈페이지', '자동화')),
  icon text not null default '💡',
  representative_image_url text,
  summary text not null default '',
  description text not null default '',
  meeting_date date not null,
  meeting_time time not null,
  location text not null,
  difficulty text not null default '처음',
  supplies text not null default '스마트폰 또는 노트북',
  capacity integer not null check (capacity > 0),
  current_applicants integer not null default 0 check (current_applicants >= 0 and current_applicants <= capacity),
  fee integer not null default 0 check (fee >= 0),
  recruitment_status text not null default '모집 예정' check (recruitment_status in ('모집 중', '마감 임박', '모집 예정')),
  color text not null default 'green' check (color in ('green', 'yellow', 'coral', 'blue')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ait_applications (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.ait_meetings(id) on delete cascade,
  applicant_name text not null,
  email text not null,
  phone text,
  message text,
  status text not null default '신청' check (status in ('신청', '확정', '취소')),
  created_at timestamptz not null default now()
);

create index if not exists ait_meetings_date_idx on public.ait_meetings(meeting_date);
create index if not exists ait_applications_meeting_id_idx on public.ait_applications(meeting_id);

alter table public.ait_meetings enable row level security;
alter table public.ait_applications enable row level security;

create policy "ait_meetings_public_read"
on public.ait_meetings
for select
to anon, authenticated
using (true);

-- 참가 신청 쓰기 정책과 관리자 정책은 해당 기능 구현 시 별도로 추가합니다.
