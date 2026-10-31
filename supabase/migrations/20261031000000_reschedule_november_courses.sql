-- 2026년 11월 1일 체험·홈페이지반, 12월 유튜브반 일정으로 변경합니다.
-- 대상: 기존 운영 모임 6개의 일정 및 설명. 신청 내역·인원·참가비는 유지합니다.
-- 초기 데이터 seed 파일 대신 이 SQL을 실행하세요.
begin;

with schedule(title, previous_date, next_date) as (
  values
    ('AI 이미지 생성 및 앨범 홈페이지 만들기', date '2026-10-10', date '2026-11-07'),
    ('AI 동영상으로 나만의 홈페이지 만들기', date '2026-10-17', date '2026-11-14'),
    ('API로 영화 홈페이지 만들기', date '2026-10-24', date '2026-11-21'),
    ('AI 블로그·영상 콘텐츠 자동화', date '2026-10-31', date '2026-11-28'),
    ('AI 홈페이지 4주 완성반', date '2026-10-10', date '2026-11-07'),
    ('AI 유튜브 4주 완성반', date '2026-11-07', date '2026-12-05')
)
update public.ait_meetings as meeting
set meeting_date = schedule.next_date,
    description = case meeting.title
      when 'AI 홈페이지 4주 완성반' then replace(
        meeting.description,
        '과정 기간: 2026년 10월 10일~10월 31일',
        '과정 기간: 2026년 11월 7일~11월 28일'
      )
      when 'AI 유튜브 4주 완성반' then replace(
        meeting.description,
        '과정 기간: 2026년 11월 7일~11월 28일',
        '과정 기간: 2026년 12월 5일~12월 26일'
      )
      else meeting.description
    end,
    updated_at = now()
from schedule
where meeting.title = schedule.title
  and meeting.meeting_date = schedule.previous_date
returning meeting.title, meeting.meeting_date, meeting.meeting_time;

commit;
