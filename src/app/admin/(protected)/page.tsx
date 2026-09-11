import Link from "next/link";
import { getAdminDashboard } from "@/lib/admin-dashboard";
import styles from "../admin.module.css";

const cards = (data:Awaited<ReturnType<typeof getAdminDashboard>>) => [
  { label:"전체 신청",value:data.applications.total,unit:"명",detail:`신규 ${data.applications.pending} · 확정 ${data.applications.confirmed}`,href:"/admin/applications",tone:"primary" },
  { label:"확정 신청",value:data.applications.confirmed,unit:"명",detail:`취소 ${data.applications.cancelled}명`,href:"/admin/applications?status=확정",tone:"yellow" },
  { label:"전체 모임",value:data.meetings.total,unit:"개",detail:`모집 중 ${data.meetings.open} · 예정 ${data.meetings.upcoming}`,href:"/admin/meetings",tone:"blue" },
  { label:"마감 확인",value:data.meetings.urgent+data.meetings.closed,unit:"개",detail:`임박 ${data.meetings.urgent} · 마감 ${data.meetings.closed}`,href:"/admin/meetings",tone:"coral" },
  { label:"공개 후기",value:data.reviews.published,unit:"개",detail:data.reviews.ready?`비공개 ${data.reviews.private}개 · 전체 ${data.reviews.total}개`:"후기 테이블 설정 필요",href:"/admin/reviews",tone:"pink" },
];

export default async function AdminPage() {
  const data=await getAdminDashboard();
  return <main className={styles.adminMain} id="main-content">
    <div className={styles.pageHeading}><div><p className={styles.kicker}>ADMIN DASHBOARD</p><h1>오늘의 운영 현황</h1><p>신청자와 모임, 후기 상태를 한눈에 확인하세요.</p></div></div>
    <section className={styles.dashboardGrid} aria-label="운영 현황">{cards(data).map((card)=><Link className={`${styles.dashboardCard} ${styles[card.tone]}`} href={card.href} key={card.label}><span>{card.label}</span><strong>{card.value}<small>{card.unit}</small></strong><p>{card.detail}</p><b>관리하기 →</b></Link>)}</section>
    <section className={styles.dashboardActions} aria-labelledby="quick-actions"><div><p className={styles.kicker}>QUICK ACTIONS</p><h2 id="quick-actions">바로 시작하기</h2></div><div><Link href="/admin/meetings/new"><span aria-hidden="true">＋</span><strong>새 모임 등록</strong><small>일정과 모집 정보를 등록합니다.</small></Link><Link href="/admin/applications"><span aria-hidden="true">✓</span><strong>신청 상태 확인</strong><small>신청자를 확정하거나 취소합니다.</small></Link><Link href="/admin/reviews"><span aria-hidden="true">“</span><strong>후기 등록</strong><small>참여 후기를 공개하고 관리합니다.</small></Link></div></section>
  </main>;
}
