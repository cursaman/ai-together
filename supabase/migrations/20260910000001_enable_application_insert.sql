-- AI Together 신청 테이블에 필요한 최소 공개 권한만 허용합니다.
-- 기존 edu-platform 테이블과 데이터는 변경하지 않습니다.

revoke all on table public.ait_meetings from anon, authenticated;
grant select on table public.ait_meetings to anon, authenticated;

revoke all on table public.ait_applications from anon, authenticated;
grant insert (meeting_id, applicant_name, email, phone, message)
on table public.ait_applications to anon, authenticated;

drop policy if exists "ait_applications_public_insert" on public.ait_applications;

create policy "ait_applications_public_insert"
on public.ait_applications
for insert
to anon, authenticated
with check (
  status = '신청'
  and char_length(btrim(applicant_name)) between 2 and 40
  and char_length(btrim(email)) between 3 and 254
  and (phone is null or char_length(btrim(phone)) between 8 and 20)
  and (message is null or char_length(message) <= 500)
);
