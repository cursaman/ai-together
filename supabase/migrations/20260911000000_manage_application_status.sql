-- AI Together 신청 상태와 모임 신청 인원을 하나의 트랜잭션으로 변경합니다.
-- 기존 edu-platform 테이블과 데이터는 변경하지 않습니다.

create or replace function public.update_ait_application_status(
  p_application_id uuid,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_meeting_id uuid;
  v_old_status text;
  v_capacity integer;
  v_current_applicants integer;
  v_was_counted boolean;
  v_will_be_counted boolean;
begin
  if p_status not in ('신청', '확정', '취소') then
    raise exception using errcode = '22023', message = 'invalid_application_status';
  end if;

  select meeting_id, status
  into v_meeting_id, v_old_status
  from public.ait_applications
  where id = p_application_id
  for update;

  if not found then
    raise exception using errcode = 'P0002', message = 'application_not_found';
  end if;

  if v_old_status = p_status then
    return;
  end if;

  select capacity, current_applicants
  into v_capacity, v_current_applicants
  from public.ait_meetings
  where id = v_meeting_id
  for update;

  if not found then
    raise exception using errcode = 'P0002', message = 'meeting_not_found';
  end if;

  v_was_counted := v_old_status in ('신청', '확정');
  v_will_be_counted := p_status in ('신청', '확정');

  if not v_was_counted and v_will_be_counted and v_current_applicants >= v_capacity then
    raise exception using errcode = 'P0001', message = 'meeting_full';
  end if;

  update public.ait_applications
  set status = p_status
  where id = p_application_id;

  if v_was_counted and not v_will_be_counted then
    update public.ait_meetings
    set current_applicants = greatest(current_applicants - 1, 0), updated_at = now()
    where id = v_meeting_id;
  elsif not v_was_counted and v_will_be_counted then
    update public.ait_meetings
    set current_applicants = current_applicants + 1, updated_at = now()
    where id = v_meeting_id;
  end if;
end;
$$;

revoke all on function public.update_ait_application_status(uuid, text) from public, anon, authenticated;
grant execute on function public.update_ait_application_status(uuid, text) to service_role;
