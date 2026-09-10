import Link from "next/link";
import { getAdminMeetings } from "@/lib/admin-meetings";
import styles from "../../admin.module.css";

export default async function AdminMeetingsPage({ searchParams }: { searchParams: Promise<{ created?: string; updated?: string }> }) {
  const [meetings, params] = await Promise.all([getAdminMeetings(), searchParams]);
  const notice = params.created ? "새 모임을 등록했습니다." : params.updated ? "모임 정보를 수정했습니다." : null;

  return <main className={styles.adminMain}>
    <div className={styles.pageHeading}><div><p className={styles.kicker}>MEETING MANAGEMENT</p><h1>모임 관리</h1><p>등록된 모임의 일정과 모집 상태를 관리합니다.</p></div><Link className={styles.primaryLink} href="/admin/meetings/new">새 모임 등록</Link></div>
    {notice ? <p className={styles.notice} role="status">{notice}</p> : null}
    <div className={styles.tableWrap}><table><thead><tr><th>모임</th><th>일정</th><th>신청</th><th>상태</th><th><span className={styles.srOnly}>관리</span></th></tr></thead><tbody>{meetings.map((meeting) => <tr key={meeting.id}><td><strong>{meeting.title}</strong><small>{meeting.category} · {meeting.location}</small></td><td>{meeting.meeting_date}<small>{meeting.meeting_time.slice(0, 5)}</small></td><td>{meeting.current_applicants} / {meeting.capacity}명</td><td><span className={styles.status}>{meeting.recruitment_status}</span></td><td><Link className={styles.editLink} href={`/admin/meetings/${meeting.id}/edit`}>수정</Link></td></tr>)}</tbody></table></div>
    {meetings.length === 0 ? <p className={styles.empty}>등록된 모임이 없습니다.</p> : null}
  </main>;
}
