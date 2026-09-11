import Link from "next/link";
import { MeetingForm } from "../meeting-form";
import { createMeeting } from "../actions";
import { getAdminMeeting } from "@/lib/admin-meetings";
import styles from "../../../admin.module.css";

export default async function NewMeetingPage({searchParams}:{searchParams:Promise<{duplicate?:string}>}) {
  const {duplicate}=await searchParams;
  const source=duplicate?await getAdminMeeting(duplicate):null;
  const copiedMeeting=source?{...source,id:undefined,current_applicants:0,meeting_date:"",recruitment_status:"모집 예정"}:undefined;
  return <main className={styles.adminMain} id="main-content"><Link className={styles.backLink} href="/admin/meetings">← 모임 관리로</Link><div className={styles.formHeading}><p className={styles.kicker}>{source?"DUPLICATE MEETING":"NEW MEETING"}</p><h1>{source?"모임 복제":"새 모임 등록"}</h1><p>{source?`‘${source.title}’ 내용을 복사했습니다. 새 날짜를 선택하고 저장해주세요.`:"공개 화면에 표시할 모임 정보를 입력해주세요."}</p></div>{source?<p className={styles.copyNotice}>신청 인원은 0명, 모집 상태는 ‘모집 예정’으로 새로 시작합니다. 원본 모임은 변경되지 않습니다.</p>:null}<MeetingForm action={createMeeting} meeting={copiedMeeting} /></main>;
}
