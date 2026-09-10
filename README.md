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
**Day 2 - Next.js Setup (진행 중)**  
**Day 3 - Main Page ✅**  
**Day 4 - Meetings List ✅**  
**Day 5 - Meeting Detail ✅**
**Day 6 - Supabase Connection Setup ✅**
**Day 7 - Database Connection (환경변수 입력 대기)**

프로젝트 기획 문서를 기준으로 Next.js, React, TypeScript, App Router 개발환경과 실행 확인용 기본 메인 화면을 구성했습니다. Supabase와 배포 설정은 아직 연결하지 않았습니다.

남은 확인: Git remote 설정 및 첫 커밋, 브라우저 시각 검증  
다음 작업: **Supabase 환경변수 입력 및 migration 실행 확인**

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
