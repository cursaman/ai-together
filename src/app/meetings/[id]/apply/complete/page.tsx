import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings";
import styles from "../page.module.css";

export const metadata: Metadata = { title:"신청 완료 | AI Together", robots:{ index:false,follow:false } };

function calendarUrl(title:string,date?:string,time?:string,location?:string) {
  if (!date||!time) return null;
  const start=new Date(`${date}T${time.slice(0,8)}+09:00`);
  if (Number.isNaN(start.getTime())) return null;
  const end=new Date(start.getTime()+2*60*60*1000);
  const format=(value:Date)=>value.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");
  const query=new URLSearchParams({ action:"TEMPLATE",text:title,dates:`${format(start)}/${format(end)}`,location:location??"",details:"AI Together 모임 신청 일정" });
  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}

export default async function ApplicationCompletePage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  const meeting=await getMeetingById(id);
  if (!meeting) notFound();
  const calendar=calendarUrl(meeting.title,meeting.dateValue,meeting.timeValue,meeting.location);
  const mapUrl=`https://map.kakao.com/link/search/${encodeURIComponent(meeting.location)}`;

  return <main className={styles.completeShell} id="main-content"><section className={styles.completeCard}>
    <span className={styles.completeIcon} aria-hidden="true">✓</span><p className={styles.kicker}>APPLICATION COMPLETE</p>
    <h1>참가 신청이 완료됐어요!</h1><p><strong>{meeting.title}</strong> 모임에 신청해주셔서 감사합니다.<br/>확인 후 입력하신 이메일로 안내드릴게요.</p>
    <div className={styles.completeInfo}><div><span aria-hidden="true">📅</span><dl><dt>날짜와 시간</dt><dd>{meeting.date} · {meeting.time}</dd></dl></div><div><span aria-hidden="true">📍</span><dl><dt>장소</dt><dd>{meeting.location}</dd></dl></div><div><span aria-hidden="true">💻</span><dl><dt>준비물</dt><dd>{meeting.supplies}</dd></dl></div></div>
    <div className={styles.scheduleActions}>{calendar?<a href={calendar} target="_blank" rel="noreferrer">구글 캘린더에 추가 ↗</a>:null}{meeting.location!=="온라인"?<a href={mapUrl} target="_blank" rel="noreferrer">카카오맵에서 장소 보기 ↗</a>:null}</div>
    <p className={styles.completeNotice}>신청은 접수 상태이며, 최종 안내는 입력하신 이메일로 보내드립니다.</p>
    <div className={styles.completeActions}><Link href={`/meetings/${meeting.id}`}>모임 다시 보기</Link><Link href="/meetings">다른 모임 둘러보기</Link></div>
  </section></main>;
}
