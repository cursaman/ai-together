import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminMeetings } from "@/lib/admin-meetings";
import { getAdminReview } from "@/lib/admin-reviews";
import { updateReview } from "../../actions";
import styles from "../../../../admin.module.css";

export default async function EditReviewPage({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{error?:string}>}) {
  const [{id},query]=await Promise.all([params,searchParams]);
  const [review,meetings]=await Promise.all([getAdminReview(id),getAdminMeetings()]);
  if (!review) notFound();
  const action=updateReview.bind(null,review.id);
  return <main className={styles.adminMain} id="main-content">
    <Link className={styles.backLink} href="/admin/reviews">← 후기 관리로</Link>
    <div className={styles.formHeading}><p className={styles.kicker}>EDIT REVIEW</p><h1>후기 수정</h1><p>오탈자와 공개할 내용을 확인한 뒤 저장해주세요.</p></div>
    {query.error?<p className={styles.notice}>{query.error==="invalid"?"닉네임은 1~30자, 후기는 10~500자로 입력해주세요.":"후기를 수정하지 못했습니다."}</p>:null}
    <form className={styles.reviewForm} action={action}>
      <div className={styles.formGrid}><div className={styles.field}><label htmlFor="edit-nickname">닉네임</label><input id="edit-nickname" name="nickname" defaultValue={review.nickname} maxLength={30} required /></div><div className={styles.field}><label htmlFor="edit-meeting">참여 모임</label><select id="edit-meeting" name="meeting_id" defaultValue={review.meeting_id??""}><option value="">선택하지 않음</option>{meetings.map((meeting)=><option value={meeting.id} key={meeting.id}>{meeting.title}</option>)}</select></div></div>
      <div className={styles.field}><label htmlFor="edit-content">후기 내용</label><textarea id="edit-content" name="content" defaultValue={review.content} rows={7} minLength={10} maxLength={500} required /></div>
      <div className={styles.field}><label htmlFor="edit-image">결과물 이미지 URL (선택)</label><input id="edit-image" name="result_image_url" type="url" defaultValue={review.result_image_url??""} placeholder="https://..." /></div>
      <label className={styles.publishCheck}><input name="is_published" type="checkbox" defaultChecked={review.is_published} /> 공개 상태로 저장하기</label>
      <button className={styles.primaryButton} type="submit">수정 내용 저장</button>
    </form>
  </main>;
}
