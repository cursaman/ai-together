import { getAdminMeetings } from "@/lib/admin-meetings";
import { getAdminReviews } from "@/lib/admin-reviews";
import { createReview,deleteReview,toggleReviewPublished } from "./actions";
import Link from "next/link";
import styles from "../../admin.module.css";

export default async function AdminReviewsPage({searchParams}:{searchParams:Promise<{created?:string;updated?:string;error?:string}>}) {
  const params=await searchParams;
  const [reviews,meetings]=await Promise.all([getAdminReviews(),getAdminMeetings()]);
  const notice=params.created?"후기를 등록했습니다.":params.updated?"후기를 수정했습니다.":params.error==="invalid"?"닉네임과 후기 글자 수를 확인해주세요.":params.error?"후기를 저장하지 못했습니다.":null;
  return <main className={styles.adminMain} id="main-content">
    <div className={styles.pageHeading}><div><p className={styles.kicker}>REVIEW MANAGEMENT</p><h1>후기 관리</h1><p>공개 동의를 확인한 후기만 등록하고 공개해주세요.</p></div></div>
    {notice?<p className={styles.notice}>{notice}</p>:null}
    <form className={styles.reviewForm} action={createReview}>
      <div className={styles.formGrid}><div className={styles.field}><label htmlFor="nickname">닉네임</label><input id="nickname" name="nickname" maxLength={30} required /></div><div className={styles.field}><label htmlFor="meeting_id">참여 모임</label><select id="meeting_id" name="meeting_id"><option value="">선택하지 않음</option>{meetings.map((meeting)=><option value={meeting.id} key={meeting.id}>{meeting.title}</option>)}</select></div></div>
      <div className={styles.field}><label htmlFor="content">후기 내용</label><textarea id="content" name="content" rows={5} minLength={10} maxLength={500} required placeholder="참여자가 남긴 실제 후기를 입력해주세요." /></div>
      <div className={styles.field}><label htmlFor="result_image_url">결과물 이미지 URL (선택)</label><input id="result_image_url" name="result_image_url" type="url" placeholder="https://..." /></div>
      <label className={styles.publishCheck}><input name="is_published" type="checkbox" /> 등록 즉시 공개하기</label><button className={styles.primaryButton} type="submit">후기 등록</button>
    </form>
    <div className={styles.reviewAdminList}>{reviews.map((review)=><article className={styles.reviewAdminCard} key={review.id}><div><span className={review.is_published?styles.published:styles.privateReview}>{review.is_published?"공개":"비공개"}</span><small>{review.ait_meetings?.title??"모임 미지정"}</small></div><h2>{review.nickname}</h2><p>{review.content}</p><div className={styles.reviewActions}><Link className={styles.editReviewLink} href={`/admin/reviews/${review.id}/edit`}>수정</Link><form action={toggleReviewPublished.bind(null,review.id,!review.is_published)}><button type="submit">{review.is_published?"비공개로 전환":"공개하기"}</button></form><form action={deleteReview.bind(null,review.id)}><button className={styles.deleteButton} type="submit">삭제</button></form></div></article>)}</div>
    {reviews.length===0?<p className={styles.empty}>등록된 후기가 없습니다.</p>:null}
  </main>;
}
