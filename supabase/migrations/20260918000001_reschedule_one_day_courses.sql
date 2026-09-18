-- 개천절을 피해 1일 체험 과정을 10월 10일부터 매주 토요일로 순연합니다.
-- 수업 시간은 기존과 동일하게 15:00~17:00입니다.

update public.ait_meetings
set meeting_date = date '2026-10-10', updated_at = now()
where title = 'AI 이미지 생성 및 앨범 홈페이지 만들기'
  and meeting_date = date '2026-10-03';

update public.ait_meetings
set meeting_date = date '2026-10-17', updated_at = now()
where title = 'AI 동영상으로 나만의 홈페이지 만들기'
  and meeting_date = date '2026-10-10';

update public.ait_meetings
set meeting_date = date '2026-10-24', updated_at = now()
where title = 'API로 영화 홈페이지 만들기'
  and meeting_date = date '2026-10-17';

update public.ait_meetings
set meeting_date = date '2026-10-31', updated_at = now()
where title = 'AI 블로그·영상 콘텐츠 자동화'
  and meeting_date = date '2026-10-24';
