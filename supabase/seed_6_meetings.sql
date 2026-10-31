-- AI Together 운영 모임 6개 초기 데이터
-- 주의: ait_meetings 삭제 시 외래 키 ON DELETE CASCADE에 의해
-- 기존 ait_applications 신청 내역도 모두 삭제됩니다.
-- 기존 edu-platform 테이블과 데이터는 변경하지 않습니다.

begin;

delete from public.ait_meetings;

insert into public.ait_meetings (
  title,
  subtitle,
  category,
  icon,
  representative_image_url,
  summary,
  description,
  meeting_date,
  meeting_time,
  location,
  difficulty,
  supplies,
  capacity,
  current_applicants,
  fee,
  recruitment_status,
  color
) values
(
  'AI 이미지 생성 및 앨범 홈페이지 만들기',
  '내가 만든 이미지를 온라인 앨범으로 완성해요',
  '사진',
  '📷',
  '/images/meetings/ai-first-step.webp',
  'AI로 이미지를 만들고 한 페이지 앨범 홈페이지에 직접 올리는 주제 실습입니다.',
  E'이미지 생성 AI의 기본 사용법과 프롬프트 작성법을 익힙니다.\n원하는 주제의 이미지를 만들고 수정한 뒤, 준비된 홈페이지 틀에 적용합니다.\n수업이 끝나면 휴대전화에서도 볼 수 있는 나만의 온라인 앨범 홈페이지를 완성합니다.',
  date '2026-11-07',
  time '15:00',
  '커피긱스 2층 8인룸',
  '처음',
  '개인 노트북',
  8,
  0,
  10000,
  '모집 중',
  'green'
),
(
  'AI 동영상으로 나만의 홈페이지 만들기',
  '짧은 영상을 만들고 홈페이지 첫 화면에 올려요',
  '영상',
  '🎬',
  '/images/meetings/short-video-ideas.webp',
  'AI로 짧은 동영상을 제작하고 영상이 재생되는 홈페이지를 만드는 주제 실습입니다.',
  E'영상 주제와 짧은 장면을 기획하고 AI로 이미지와 동영상을 만듭니다.\n완성한 영상을 준비된 홈페이지에 넣고 제목, 소개 문구와 버튼을 수정합니다.\n수업이 끝나면 나만의 영상이 담긴 한 페이지 홈페이지를 완성합니다.',
  date '2026-11-14',
  time '15:00',
  '커피긱스 2층 8인룸',
  '처음',
  '개인 노트북',
  8,
  0,
  10000,
  '모집 중',
  'coral'
),
(
  'API로 영화 홈페이지 만들기',
  '영화 포스터와 정보를 불러오는 미니 사이트',
  '홈페이지',
  '🎞️',
  '/images/meetings/one-page-site.webp',
  'API를 이용해 영화 정보와 포스터를 보여주는 홈페이지를 만드는 주제 실습입니다.',
  E'API가 무엇인지 쉬운 예제로 알아보고 준비된 영화 데이터 연결 방식을 사용합니다.\nAI와 함께 영화 목록 화면을 만들고 제목, 포스터와 평점 정보를 표시합니다.\nAPI 키는 코드에 직접 넣지 않고 안전하게 설정하는 방법도 함께 익힙니다.',
  date '2026-11-21',
  time '15:00',
  '커피긱스 2층 8인룸',
  '처음',
  '개인 노트북',
  8,
  0,
  10000,
  '모집 중',
  'blue'
),
(
  'AI 블로그·영상 콘텐츠 자동화',
  '주제 하나로 글과 영상 기획을 빠르게 만들어요',
  '자동화',
  '⚡',
  '/images/meetings/easy-automation.webp',
  '반복해서 사용할 수 있는 블로그 글과 영상 기획 자동화 흐름을 만드는 주제 실습입니다.',
  E'콘텐츠 주제를 입력하면 제목, 목차와 본문 초안을 만드는 흐름을 구성합니다.\n같은 주제로 쇼츠 대본과 장면 구성까지 만들고 결과를 검토하는 방법을 익힙니다.\n수업 후에도 다시 사용할 수 있는 개인 맞춤 프롬프트 양식을 완성합니다.',
  date '2026-11-28',
  time '15:00',
  '커피긱스 2층 8인룸',
  '처음',
  '개인 노트북',
  8,
  0,
  10000,
  '모집 중',
  'yellow'
),
(
  'AI 홈페이지 프로젝트 모임',
  '아이디어부터 실제 인터넷 주소까지 함께 완성해요',
  '홈페이지',
  '🖥️',
  '/images/meetings/one-page-site.webp',
  '토요일 18~20시, 회차별로 홈페이지를 만들고 개선합니다. 회당 10,000원이며 음료는 개별 결제합니다.',
  '홈페이지 기획, 화면 제작, 기능 연결과 배포를 각자 진행 상황에 맞춰 실습합니다. 회당 10,000원, 음료 개별 결제입니다. 참여 전 이전 진행 내용과 준비 사항을 문의해주세요.',
  date '2026-11-07',
  time '18:00',
  '커피긱스 2층 8인룸',
  '처음',
  '개인 노트북',
  8,
  0,
  10000,
  '모집 중',
  'blue'
),
(
  'AI 유튜브 프로젝트 모임',
  '채널 기획부터 게시 가능한 첫 영상까지 완성해요',
  '영상',
  '▶️',
  '/images/meetings/short-video-ideas.webp',
  '토요일 18~20시, 회차별로 유튜브 콘텐츠를 만들고 개선합니다. 회당 10,000원이며 음료는 개별 결제합니다.',
  '채널 기획, 대본과 이미지 제작, 영상 편집과 게시를 각자 진행 상황에 맞춰 실습합니다. 회당 10,000원, 음료 개별 결제입니다. 참여 전 이전 진행 내용과 준비 사항을 문의해주세요.',
  date '2026-12-05',
  time '18:00',
  '커피긱스 2층 8인룸',
  '처음',
  '개인 노트북',
  8,
  0,
  10000,
  '모집 중',
  'coral'
);


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

-- 실행 결과 확인
select
  title,
  meeting_date,
  to_char(meeting_time, 'HH24:MI') as meeting_time,
  fee,
  capacity,
  recruitment_status
from public.ait_meetings
order by meeting_date, meeting_time;
