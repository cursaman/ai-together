import Link from "next/link";
import { MeetingForm } from "../meeting-form";
import { createMeeting } from "../actions";
import styles from "../../../admin.module.css";

export default function NewMeetingPage() {
  return <main className={styles.adminMain}><Link className={styles.backLink} href="/admin/meetings">← 모임 관리로</Link><div className={styles.formHeading}><p className={styles.kicker}>NEW MEETING</p><h1>새 모임 등록</h1><p>공개 화면에 표시할 모임 정보를 입력해주세요.</p></div><MeetingForm action={createMeeting} /></main>;
}
