-- 1일 체험 4개 과정의 참가비만 변경합니다.
-- 기존 신청 내역과 4주 과정, edu-platform 데이터는 변경하지 않습니다.
update public.ait_meetings
set fee = 15000, updated_at = now()
where fee = 10000
  and title in (
    'AI 이미지 생성 및 앨범 홈페이지 만들기',
    'AI 동영상으로 나만의 홈페이지 만들기',
    'API로 영화 홈페이지 만들기',
    'AI 블로그·영상 콘텐츠 자동화'
  );
