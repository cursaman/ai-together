import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { meetingCategories } from "@/data/meetings";
import { getMeetings } from "@/lib/meetings";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "모임 둘러보기 | AI 같이해요",
  description: "AI를 몰라도 즐겁게 참여할 수 있는 작은 모임을 찾아보세요.",
};

type MeetingsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const { category } = await searchParams;
  const meetings = await getMeetings();
  const selectedCategory = meetingCategories.includes(
    category as (typeof meetingCategories)[number],
  )
    ? category ?? "전체"
    : "전체";
  const visibleMeetings =
    selectedCategory === "전체"
      ? meetings
      : meetings.filter((meeting) => meeting.category === selectedCategory);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navShell}>
          <Link className={styles.brand} href="/">
            <span aria-hidden="true">같이</span>
            AI 같이해요
          </Link>
          <nav aria-label="주요 메뉴">
            <Link className={styles.activeNav} href="/meetings">모임</Link>
            <Link href="/guide">처음 오셨나요?</Link>
            <Link href="/reviews">후기</Link>
            <Link href="/contact">문의</Link>
          </nav>
          <Link className={styles.homeLink} href="/">홈으로</Link>
        </div>
      </header>

      <main id="main-content">
        <section className={styles.intro}>
          <p className={styles.kicker}>FIND YOUR TOGETHER</p>
          <h1>이번에는 뭘<br className={styles.mobileBreak} /> 같이 만들어볼까요?</h1>
          <p>관심 가는 주제를 골라보세요. 모든 모임은 AI가 처음인 분도 편하게 참여할 수 있어요.</p>
        </section>

        <section className={styles.listSection} aria-labelledby="meeting-list-title">
          <div className={styles.filters} aria-label="카테고리 필터">
            {meetingCategories.map((item) => (
              <Link
                className={selectedCategory === item ? styles.selectedFilter : ""}
                href={item === "전체" ? "/meetings" : `/meetings?category=${encodeURIComponent(item)}`}
                key={item}
                aria-current={selectedCategory === item ? "page" : undefined}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className={styles.listHeading}>
            <h2 id="meeting-list-title">{selectedCategory === "전체" ? "모든 모임" : `${selectedCategory} 모임`}</h2>
            <p><strong>{visibleMeetings.length}</strong>개의 모임이 있어요</p>
          </div>

          <div className={styles.grid}>
            {visibleMeetings.map((meeting) => {
              const percentage = Math.round((meeting.applicants / meeting.capacity) * 100);

              return (
                <article className={styles.card} key={meeting.id}>
                  <Link className={styles.cardLink} href={`/meetings/${meeting.id}`} aria-label={`${meeting.title} 상세보기`}>
                    <div className={`${styles.cardArt} ${styles[meeting.color]}`}>
                      <Image className={styles.cardImage} src={meeting.imageUrl} alt="" fill sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw" />
                      <span className={styles.status}>{meeting.status}</span>
                      <span className={styles.category}>{meeting.category}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.badges}><span>{meeting.fee}</span><span>난이도 · {meeting.difficulty}</span></div>
                      <h3>{meeting.title}</h3>
                      <p className={styles.subtitle}>{meeting.subtitle}</p>
                      <dl className={styles.details}>
                        <div><dt aria-label="날짜">📅</dt><dd>{meeting.date} · {meeting.time}</dd></div>
                        <div><dt aria-label="장소">📍</dt><dd>{meeting.location}</dd></div>
                      </dl>
                      <div className={styles.capacity}>
                        <div><span>신청 {meeting.applicants}명</span><span>정원 {meeting.capacity}명</span></div>
                        <div className={styles.progress} aria-label={`정원 ${percentage}% 신청`}><span style={{ width: `${percentage}%` }} /></div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          {visibleMeetings.length === 0 && <p className={styles.empty}>아직 등록된 모임이 없어요. 곧 재미있는 모임으로 찾아올게요.</p>}
        </section>

        <section className={styles.guideBanner}>
          <div><span aria-hidden="true">🌱</span><div><strong>어떤 모임을 골라야 할지 고민되나요?</strong><p>처음 참여하는 분을 위한 안내를 먼저 읽어보세요.</p></div></div>
          <Link href="/guide">초보자 안내 보기 →</Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><Link className={styles.brand} href="/">AI 같이해요</Link><p>AI로 재미있는 것을 같이 만들어보는 모임</p></div>
        <small>© 2026 AI Together</small>
      </footer>
    </>
  );
}
