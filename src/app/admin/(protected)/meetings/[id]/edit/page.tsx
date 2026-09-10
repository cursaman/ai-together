import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminMeeting } from "@/lib/admin-meetings";
import { MeetingForm } from "../../meeting-form";
import { updateMeeting } from "../../actions";
import styles from "../../../../admin.module.css";

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = await getAdminMeeting(id);
  if (!meeting) notFound();
  const action = updateMeeting.bind(null, meeting.id, meeting.current_applicants);

  return <main className={styles.adminMain}><Link className={styles.backLink} href="/admin/meetings">← 모임 관리로</Link><div className={styles.formHeading}><p className={styles.kicker}>EDIT MEETING</p><h1>모임 수정</h1><p>현재 신청 인원보다 정원을 작게 변경할 수 없습니다.</p></div><MeetingForm action={action} meeting={meeting} /></main>;
}
