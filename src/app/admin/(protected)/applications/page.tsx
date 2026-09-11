import Link from "next/link";
import { getAdminApplications } from "@/lib/admin-applications";
import { getAdminMeetings } from "@/lib/admin-meetings";
import { updateApplicationStatus } from "./actions";
import { StatusForm } from "./status-form";
import styles from "../../admin.module.css";

type SearchParams = { meeting?: string; status?: string; q?: string };

const dateTimeFormatter = new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" });

export default async function AdminApplicationsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const [{ applications, totalCount }, meetings] = await Promise.all([
    getAdminApplications(params.meeting, params.status, params.q),
    getAdminMeetings(),
  ]);

  const hrefFor = (meeting?: string, status?: string, search = params.q) => {
    const query = new URLSearchParams();
    if (meeting) query.set("meeting", meeting);
    if (status) query.set("status", status);
    if (search?.trim()) query.set("q", search.trim());
    const value = query.toString();
    return value ? `/admin/applications?${value}` : "/admin/applications";
  };

  const exportQuery = new URLSearchParams();
  if (params.meeting) exportQuery.set("meeting", params.meeting);
  if (params.status) exportQuery.set("status", params.status);
  if (params.q?.trim()) exportQuery.set("q", params.q.trim());
  const exportHref = `/admin/applications/export${exportQuery.size ? `?${exportQuery.toString()}` : ""}`;

  return <main className={styles.adminMain} id="main-content">
    <div className={styles.pageHeading}><div><p className={styles.kicker}>APPLICATION MANAGEMENT</p><h1>신청자 관리</h1><p>최근 신청 200건을 확인하고 상태를 관리합니다.</p></div></div>
    <div className={styles.applicationFilters}>
      <form className={styles.applicationSearch} action="/admin/applications" method="get">
        {params.meeting ? <input type="hidden" name="meeting" value={params.meeting} /> : null}
        {params.status ? <input type="hidden" name="status" value={params.status} /> : null}
        <label htmlFor="application-search">이름 또는 이메일 검색</label>
        <div><input id="application-search" name="q" type="search" defaultValue={params.q ?? ""} maxLength={100} placeholder="예: 홍길동 또는 email@example.com" /><button type="submit">검색</button>{params.q ? <Link href={hrefFor(params.meeting, params.status, "")}>초기화</Link> : null}</div>
      </form>
      <div className={styles.applicationSummary} aria-live="polite"><div><span>전체 신청 <strong>{totalCount}</strong>명</span><span>현재 결과 <strong>{applications.length}</strong>명</span></div><a className={styles.csvButton} href={exportHref}>CSV 다운로드 ↓</a></div>
      <div className={styles.filterLinks} aria-label="모임 필터"><Link className={!params.meeting ? styles.activeFilter : ""} href={hrefFor(undefined, params.status)}>전체 모임</Link>{meetings.map((meeting) => <Link className={params.meeting === meeting.id ? styles.activeFilter : ""} href={hrefFor(meeting.id, params.status)} key={meeting.id}>{meeting.title}</Link>)}</div>
      <div className={styles.filterLinks} aria-label="신청 상태 필터">{["", "신청", "확정", "취소"].map((status) => <Link className={(params.status ?? "") === status ? styles.activeFilter : ""} href={hrefFor(params.meeting, status || undefined)} key={status || "전체"}>{status || "전체 상태"}</Link>)}</div>
    </div>
    <div className={styles.applicationList}>{applications.map((application) => {
      const action = updateApplicationStatus.bind(null, application.id);
      return <article className={styles.applicationCard} key={application.id}>
        <div className={styles.applicationTop}><div><span className={styles.status}>{application.status}</span><small>{dateTimeFormatter.format(new Date(application.created_at))}</small></div><strong>{application.ait_meetings?.title ?? "삭제된 모임"}</strong></div>
        <dl><div><dt>이름</dt><dd>{application.applicant_name}</dd></div><div><dt>이메일</dt><dd><a href={`mailto:${application.email}`}>{application.email}</a></dd></div><div><dt>전화번호</dt><dd>{application.phone ? <a href={`tel:${application.phone}`}>{application.phone}</a> : "-"}</dd></div><div className={styles.messageRow}><dt>남기실 말</dt><dd>{application.message || "-"}</dd></div></dl>
        <div className={styles.contactActions}><a href={`mailto:${application.email}?subject=${encodeURIComponent(`[AI Together] ${application.ait_meetings?.title ?? "모임"} 안내`)}`}><span aria-hidden="true">✉</span> 이메일 보내기</a>{application.phone ? <a href={`tel:${application.phone.replace(/[^0-9+]/g, "")}`}><span aria-hidden="true">☎</span> 전화 걸기</a> : <span className={styles.noPhone}>전화번호 없음</span>}</div>
        <StatusForm action={action} currentStatus={application.status} />
      </article>;
    })}</div>
    {applications.length === 0 ? <p className={styles.empty}>조건에 맞는 신청자가 없습니다.</p> : null}
  </main>;
}
