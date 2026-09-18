-- 개천절과 과정 간 시간 중복을 피해 4주 완성반 일정을 조정합니다.
-- 홈페이지반: 10월 10일, 17일, 24일, 31일
-- 유튜브반: 11월 7일, 14일, 21일, 28일

update public.ait_meetings
set
  meeting_date = date '2026-10-10',
  description = replace(
    description,
    '과정 기간: 2026년 10월 3일~10월 24일',
    '과정 기간: 2026년 10월 10일~10월 31일'
  ),
  updated_at = now()
where title = 'AI 홈페이지 4주 완성반'
  and meeting_date = date '2026-10-03';

update public.ait_meetings
set
  meeting_date = date '2026-11-07',
  description = replace(
    description,
    '과정 기간: 2026년 10월 31일~11월 21일',
    '과정 기간: 2026년 11월 7일~11월 28일'
  ),
  updated_at = now()
where title = 'AI 유튜브 4주 완성반'
  and meeting_date = date '2026-10-31';
