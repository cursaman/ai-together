# AI Together 운영 체크리스트

## 운영 시작 전

- Vercel Production 환경에 아래 5개 환경변수가 등록되어 있는지 확인합니다.
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `AIT_ADMIN_PASSWORD`
  - `AIT_ADMIN_SESSION_SECRET`
- 환경변수 값은 문서, 소스 코드, GitHub에 기록하지 않습니다.
- Supabase에서 `ait_` 접두사가 붙은 테이블과 함수만 사용되는지 확인합니다.
- 공개 모임의 날짜, 장소, 정원, 모집 상태와 이미지를 확인합니다.
- 관리자 비밀번호는 운영 담당자에게만 공유합니다.

## 배포 후 확인

1. 메인 화면과 모임 목록이 열리는지 확인합니다.
2. 모임 상세 화면의 날짜, 장소, 정원과 신청 버튼을 확인합니다.
3. 테스트용 이메일로 한 번 신청하고 완료 화면이 표시되는지 확인합니다.
4. 같은 이메일로 다시 신청했을 때 중복 신청 안내가 표시되는지 확인합니다.
5. 관리자 로그인 후 신청자가 목록에 보이는지 확인합니다.
6. 신청 상태를 `확정`, `취소`, `신청` 순서로 바꾸고 정원 수가 함께 변경되는지 확인합니다.
7. 로그아웃 후 관리자 주소가 로그인 화면으로 이동하는지 확인합니다.
8. 휴대전화 화면에서도 신청과 관리자 주요 기능을 확인합니다.
9. Vercel Runtime Logs에 새로운 오류가 없는지 확인합니다.

테스트가 끝나면 테스트 신청은 `취소` 상태로 두고 실제 운영 데이터와 구분합니다.

## 일상 운영

- 신청자 목록은 관리자 화면에서 확인하고, 처리한 신청은 상태를 즉시 갱신합니다.
- 신청자 이름, 이메일, 전화번호, 남기실 말은 모임 운영 목적으로만 사용합니다.
- 신청자 개인정보를 화면 캡처나 공개 문서로 공유하지 않습니다.
- 종료한 모임은 모집 상태와 노출 내용을 정리합니다.
- 필요가 끝난 신청자 정보는 Supabase에서 운영 정책에 따라 안전하게 삭제합니다.

## 장애 대응

- 배포 실패: Vercel Deployments에서 실패한 배포의 Build Logs를 확인합니다.
- 화면 오류: Vercel Runtime Logs에서 오류 시간과 경로를 확인합니다.
- 신청 저장 실패: Supabase Logs와 `submit_ait_application` 함수 적용 여부를 확인합니다.
- 관리자 로그인 실패: Vercel Production 환경변수 3개(`SUPABASE_SERVICE_ROLE_KEY`, `AIT_ADMIN_PASSWORD`, `AIT_ADMIN_SESSION_SECRET`)를 확인한 뒤 재배포합니다.
- 심각한 장애: Vercel에서 직전 정상 Production 배포로 Rollback합니다.

## 비밀번호 변경

1. Vercel의 Project Settings > Environment Variables에서 `AIT_ADMIN_PASSWORD`를 새 값으로 변경합니다.
2. `AIT_ADMIN_SESSION_SECRET`도 새 무작위 값으로 변경하면 기존 관리자 세션이 모두 종료됩니다.
3. Production을 재배포합니다.
4. 관리자 로그인 화면에서 새 비밀번호로 로그인합니다.

