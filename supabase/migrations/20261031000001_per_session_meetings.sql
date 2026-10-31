-- 회당 10,000원 · 음료 개별 결제, 프로젝트도 날짜별 1회 신청으로 변경합니다.
-- 기존 모임 ID와 신청 내역·신청 인원은 유지하며 추가 회차는 신청 인원 0명으로 생성합니다.
-- 기존 신청자는 기존 날짜에 그대로 남습니다. 다른 회차로 자동 이동하거나 복제하지 않습니다.
begin;
with target(old_title, new_title) as (
  values
    ('AI 이미지 생성 및 앨범 홈페이지 만들기', 'AI 이미지 생성 및 앨범 홈페이지 만들기'),
    ('AI 동영상으로 나만의 홈페이지 만들기', 'AI 동영상으로 나만의 홈페이지 만들기'),
    ('API로 영화 홈페이지 만들기', 'API로 영화 홈페이지 만들기'),
    ('AI 블로그·영상 콘텐츠 자동화', 'AI 블로그·영상 콘텐츠 자동화'),
    ('AI 홈페이지 4주 완성반', 'AI 홈페이지 프로젝트 모임'),
    ('AI 유튜브 4주 완성반', 'AI 유튜브 프로젝트 모임')
)
update public.ait_meetings as meeting
set title = target.new_title,
    fee = 10000,
    summary = case
      when target.new_title like '%프로젝트 모임' then '회차별로 내 프로젝트를 만들고 개선합니다. 회당 10,000원 · 음료 개별 결제.'
      else replace(meeting.summary, '1일 체험', '주제 실습') end,
    description = case
      when target.new_title = 'AI 홈페이지 프로젝트 모임' then '홈페이지 기획, 화면 제작, 기능 연결과 배포를 각자 진행 상황에 맞춰 실습합니다. 회당 10,000원, 음료 개별 결제입니다. 참여 전 이전 진행 내용과 준비 사항을 문의해주세요.'
      when target.new_title = 'AI 유튜브 프로젝트 모임' then '채널 기획, 대본과 이미지 제작, 영상 편집과 게시를 각자 진행 상황에 맞춰 실습합니다. 회당 10,000원, 음료 개별 결제입니다. 참여 전 이전 진행 내용과 준비 사항을 문의해주세요.'
      else meeting.description end,
    updated_at = now()
from target
where meeting.title = target.old_title;

-- 프로젝트 모임도 날짜별 신청과 정원을 따로 관리합니다.
insert into public.ait_meetings (
  title, subtitle, category, icon, representative_image_url, summary, description,
  meeting_date, meeting_time, location, difficulty, supplies, capacity,
  current_applicants, fee, recruitment_status, color
)
select source.title, source.subtitle, source.category, source.icon,
  source.representative_image_url, source.summary, source.description,
  source.meeting_date + offset_week * 7, source.meeting_time,
  source.location, source.difficulty, source.supplies, source.capacity,
  0, 10000, source.recruitment_status, source.color
from public.ait_meetings as source
cross join generate_series(1, 3) as weeks(offset_week)
where ((source.title = 'AI 홈페이지 프로젝트 모임' and source.meeting_date = date '2026-11-07')
    or (source.title = 'AI 유튜브 프로젝트 모임' and source.meeting_date = date '2026-12-05'))
  and not exists (
    select 1 from public.ait_meetings as existing
    where existing.title = source.title
      and existing.meeting_date = source.meeting_date + offset_week * 7
      and existing.meeting_time = source.meeting_time
  );

commit;

select title, meeting_date, meeting_time, fee, current_applicants
from public.ait_meetings
order by meeting_date, meeting_time;
