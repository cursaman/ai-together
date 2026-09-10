# AI Together 개발 지침

이 문서는 `AI 같이해요 (AI Together)` 프로젝트를 수정하는 모든 Codex 작업의 기준이다.

## 프로젝트 목적

AI를 처음 접하는 사람도 부담 없이 참여해 자신이 관심 있는 것을 AI로 직접 만들어보는 모임 플랫폼을 만든다. 단순히 AI를 공부하는 강의 사이트가 아니라, **AI로 재미있는 것을 함께 만드는 곳**을 지향한다.

핵심 메시지: **“AI 몰라도 괜찮아요. 같이 하나 만들어봐요.”**

## 작업 원칙

1. 1차 MVP 범위를 최우선으로 한다.
2. 사용자가 요구하지 않은 기능을 임의로 추가하지 않는다.
3. 새로운 아이디어는 즉시 구현하지 않고 2차 기능 후보로 문서에 기록한다.
4. 정상 동작하는 기존 기능과 기존 파일을 보호한다.
5. 변경 전 관련 파일과 프로젝트 구조를 먼저 확인한다.
6. 변경이 기존 기능에 미치는 영향을 확인한다.
7. 요청 범위와 관계없는 리팩터링은 하지 않는다.
8. 복잡한 코드보다 이해하고 유지보수하기 쉬운 구조를 우선한다.
9. 모바일 화면을 우선 고려하고, 초보자도 쉽게 이해할 수 있는 UI를 만든다.

## MVP 범위

- 메인 페이지
- 모임 목록
- 모임 상세
- 참가 신청
- 관리자 모임 관리
- 관리자 신청자 관리

결제, 실시간 채팅, 댓글, 좋아요, SNS 기능, 복잡한 회원 등급 및 운영자 권한, 알림, 카카오 로그인, 지도 API, 추천 알고리즘은 1차 MVP에서 제외한다.

## 데이터베이스 및 Supabase 보호 원칙

- Supabase는 기존 `edu-platform` 프로젝트를 공유할 예정이다.
- 기존 edu 관련 테이블은 수정하거나 삭제하지 않는다.
- AI Together 전용 신규 테이블에는 반드시 `ait_` 접두사를 사용한다.
- 1차 MVP의 우선 테이블은 `ait_meetings`, `ait_applications`이다.
- 데이터베이스 변경이나 SQL 실행 전에는 대상과 영향 범위를 반드시 확인한다.

## 환경변수 및 비밀정보

- API 키, 비밀번호, 토큰, Supabase 비밀키 등은 코드나 문서에 직접 작성하지 않는다.
- 환경별 값은 환경변수로 관리한다.
- `.env*` 파일과 비밀정보가 Git에 포함되지 않도록 확인한다.
- 로그와 작업 결과에도 비밀정보를 노출하지 않는다.

## 작업 완료 보고

모든 작업을 마친 뒤 다음 내용을 보고한다.

- 생성한 파일 목록
- 수정한 파일 목록
- 각 변경의 목적과 핵심 내용
- 실행한 테스트 또는 검증 명령과 결과
- 실행하지 못한 테스트와 그 이유
- 발견한 기존 파일, 위험 요소 또는 다음 작업의 주의사항


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
