-- AI Together 참가 신청을 하나의 트랜잭션으로 처리합니다.
-- 기존 edu-platform 테이블과 데이터는 변경하지 않습니다.

drop policy if exists "ait_applications_public_insert" on public.ait_applications;
revoke insert on table public.ait_applications from anon, authenticated;

create or replace function public.submit_ait_application(
  p_meeting_id uuid,
  p_applicant_name text,
  p_email text,
  p_phone text default null,
  p_message text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_application_id uuid;
  v_status text;
  v_capacity integer;
  v_current_applicants integer;
  v_name text := btrim(p_applicant_name);
  v_email text := lower(btrim(p_email));
  v_phone text := nullif(btrim(p_phone), '');
  v_message text := nullif(btrim(p_message), '');
begin
  if char_length(v_name) not between 2 and 40
    or char_length(v_email) not between 3 and 254
    or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or (v_phone is not null and (char_length(v_phone) not between 8 and 20 or v_phone !~ '^[0-9+() -]+$'))
    or (v_message is not null and char_length(v_message) > 500)
  then
    raise exception using errcode = '22023', message = 'invalid_application';
  end if;

  select recruitment_status, capacity, current_applicants
  into v_status, v_capacity, v_current_applicants
  from public.ait_meetings
  where id = p_meeting_id
  for update;

  if not found then
    raise exception using errcode = 'P0002', message = 'meeting_not_found';
  end if;

  if v_status = '모집 예정' then
    raise exception using errcode = 'P0001', message = 'meeting_not_open';
  end if;

  if v_current_applicants >= v_capacity then
    raise exception using errcode = 'P0001', message = 'meeting_full';
  end if;

  if exists (
    select 1
    from public.ait_applications
    where meeting_id = p_meeting_id
      and lower(email) = v_email
      and status in ('신청', '확정')
  ) then
    raise exception using errcode = '23505', message = 'duplicate_application';
  end if;

  insert into public.ait_applications (
    meeting_id,
    applicant_name,
    email,
    phone,
    message
  ) values (
    p_meeting_id,
    v_name,
    v_email,
    v_phone,
    v_message
  )
  returning id into v_application_id;

  update public.ait_meetings
  set current_applicants = current_applicants + 1,
      updated_at = now()
  where id = p_meeting_id;

  return v_application_id;
end;
$$;

revoke all on function public.submit_ait_application(uuid, text, text, text, text) from public;
grant execute on function public.submit_ait_application(uuid, text, text, text, text) to anon, authenticated;
