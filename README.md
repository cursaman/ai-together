# AI Together

> AI 몰라도 괜찮아요. 같이 하나 만들어봐요.

AI 경험이 없는 사람도 관심 있는 주제로 직접 결과물을 만들어보는 참여형 모임 플랫폼입니다.

## 프로젝트 목적

단순히 AI를 공부하는 곳이 아니라, 초보자도 부담 없이 참여해 사진, 글쓰기, 여행 계획, 영상 아이디어, 홈페이지, 자동화 등 재미있는 것을 함께 만드는 경험을 제공합니다.

## 기술 스택

- Frontend / Backend: Next.js
- Database / Auth: Supabase
- Deployment: Vercel
- Version Control: Git / GitHub

## 현재 진행 상태

**Day 1 - Planning ✅**  
**Day 2 - Next.js Setup ✅**
**Day 3 - Main Page ✅**  
**Day 4 - Meetings List ✅**  
**Day 5 - Meeting Detail ✅**
**Day 6 - Supabase Connection Setup ✅**
**Day 7 - Database Connection ✅**
**Day 8 - Participant Application ✅**
**Day 9 - Application Flow Completion ✅**
**Day 10 - Admin Meeting Management ✅**
**Day 11 - Admin Application Management ✅**
**Day 12 - Responsive UI and Accessibility ✅**
**Day 13 - Vercel Deployment and QA ✅**
**Day 14 - Production Readiness ✅**
**Day 15 - Guide, Reviews and Contact Pages ✅**

모임 조회와 참가 신청 화면을 Supabase에 연결했습니다. 신청 정보는 서버에서 검증하고, 공개 사용자는 신청 등록만 가능하도록 RLS 정책을 분리했습니다.

1차 MVP 개발 일정과 운영 준비를 완료했습니다. 실제 운영 절차는 `OPERATIONS.md`에서 확인할 수 있습니다.

## Supabase 로컬 설정

Day 6에는 Supabase SSR 클라이언트 구조만 준비했습니다. 기존 `edu-platform` 테이블이나 데이터는 변경하지 않았습니다.

1. `.env.example`을 복사해 `.env.local`을 만듭니다.
2. 기존 Supabase 프로젝트의 URL과 publishable key를 입력합니다.
3. `.env.local`은 Git에 포함하지 않습니다.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Day 7에는 `ait_meetings` 조회 모듈과 `ait_meetings`·`ait_applications` migration을 준비했습니다. 환경변수가 없을 때는 기존 샘플 데이터를 안전하게 사용합니다.

Day 8에는 참가 신청 폼과 완료 화면을 추가했습니다. `ait_applications`에는 공개 `INSERT`만 허용하고 공개 조회·수정·삭제 권한은 제공하지 않습니다.

Day 9에는 신청 저장과 신청 인원 증가를 하나의 DB 트랜잭션으로 묶고, 같은 이메일의 중복 신청과 정원 초과를 방지했습니다. 공개 사용자는 테이블에 직접 쓰지 않고 제한된 신청 함수만 실행할 수 있습니다.

Day 10에는 서버 전용 관리자 로그인과 모임 목록·등록·수정 화면을 추가했습니다. 관리자 작업은 매 Server Action에서 세션을 확인하고 Supabase Service Role 키는 서버에서만 사용합니다.

Day 11에는 관리자 신청자 목록, 모임·상태별 필터와 신청·확정·취소 상태 변경을 추가했습니다. 취소와 재활성화 시 모임 신청 인원도 DB 트랜잭션으로 함께 조정합니다.

Day 12에는 모바일 레이아웃과 터치 영역을 보완하고, 키보드 본문 바로가기·포커스 표시·동작 줄이기 설정·모바일 폼 확대 방지를 적용했습니다.

Day 13에는 Vercel 프로덕션 배포·공개 화면·관리자 접근 차단·런타임 오류를 점검했습니다. QA에서 발견한 관리자 신청자 목록의 관계 조회 오류 가능성을 제거하고 서버 결합 방식으로 보완했습니다.

Day 14에는 최신 프로덕션 배포와 핵심 공개 경로, 관리자 접근 차단, 런타임 오류를 다시 확인하고 운영 전·배포 후·일상 운영·장애 대응·비밀번호 변경 절차를 체크리스트로 정리했습니다.

Day 15에는 처음 방문자를 위한 참여 안내, 실제 후기만 공개하기 위한 후기 준비 화면, 당근 문의와 교육 장소·카카오맵을 제공하는 문의 화면을 추가했습니다.

## 향후 계획

- Day 2 - Next.js 프로젝트 초기화
- Day 3 - 메인 페이지
- Day 4 - 모임 목록
- Day 5 - 모임 상세
- Day 6 - Supabase 연결
- Day 7 - DB 연결
- Day 8 - 참가 신청
- Day 9 - 신청 흐름 완성
- Day 10 - 관리자 모임 관리
- Day 11 - 신청자 관리
- Day 12 - 반응형/UI
- Day 13 - Vercel 배포 및 QA
- Day 14 - 실제 운영 준비

## 기준 문서

- `AGENTS.md`: Codex와 개발 작업자가 따라야 할 프로젝트 개발 지침
- `00_project_overview.md`: 프로젝트 기획과 MVP 범위를 정리한 기준 문서
