import { getCourseType } from "@/lib/meeting-course";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ResourceBar from "../resource-bar";
import SiteHeader from "../site-header";
import SubpageHero from "../subpage-hero";
import { meetingCategories } from "@/data/meetings";
import { getMeetings } from "@/lib/meetings";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "모임 둘러보기 | AI Together",
  description: "소상공인·개인사업자를 위한 블로그 글, 홍보 이미지와 홈페이지 제작 실습을 찾아보세요.",
};

type MeetingsPageProps = {
  searchParams: Promise<{ category?: string; course?: string }>;
};

const courseTypes = ["전체", "주제 실습", "프로젝트 모임"] as const;



export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const { category, course } = await searchParams;
  const meetings = await getMeetings();
  const selectedCategory = meetingCategories.includes(
    category as (typeof meetingCategories)[number],
  )
    ? category ?? "전체"
    : "전체";
  const selectedCourse = courseTypes.includes(course as (typeof courseTypes)[number]) ? course ?? "전체" : "전체";
  const visibleMeetings =
    meetings.filter((meeting) => {
      const matchesCategory = selectedCategory === "전체" || meeting.category === selectedCategory;
      const matchesCourse = selectedCourse === "전체" || getCourseType(meeting.title) === selectedCourse;
      return matchesCategory && matchesCourse;
    });

  function filterHref(nextCourse: string, nextCategory: string) {
    const query = new URLSearchParams();
    if (nextCourse !== "전체") query.set("course", nextCourse);
    if (nextCategory !== "전체") query.set("category", nextCategory);
    const value = query.toString();
    return value ? `/meetings?${value}` : "/meetings";
  }

  return (
    <>
      <ResourceBar />
      <SiteHeader />

      <main id="main-content">
        <SubpageHero
          eyebrow="FIND YOUR TOGETHER"
          title={<>내 가게에 필요한<br />홍보 작업을 골라요.</>}
          description="블로그 글·가게 사진·홈페이지를 직접 만드는 모임입니다. 회당 10,000원, 음료 개별 결제이며 프로젝트 모임은 이전 진행 내용을 확인해주세요."
          image="/images/subpages/meetings-hero.png"
          imageAlt="노트북으로 창작 프로젝트를 함께 만드는 소규모 모임"
          standalone
        />

        <section className={styles.listSection} aria-labelledby="meeting-list-title">
          <div className={styles.courseFilters} aria-label="과정 유형 필터">
            {courseTypes.map((item) => <Link className={selectedCourse === item ? styles.selectedCourse : ""} href={filterHref(item, selectedCategory)} key={item} aria-current={selectedCourse === item ? "page" : undefined}><span>{item === "주제 실습" ? "2시간" : item === "프로젝트 모임" ? "회차별 신청" : "모두 보기"}</span><strong>{item}</strong></Link>)}
          </div>
          <div className={styles.filters} aria-label="카테고리 필터">
            {meetingCategories.map((item) => (
              <Link
                className={selectedCategory === item ? styles.selectedFilter : ""}
                href={filterHref(selectedCourse, item)}
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
              const percentage = Math.min(Math.round((meeting.applicants / meeting.capacity) * 100), 100);
              const courseType = getCourseType(meeting.title);

              return (
                <article className={styles.card} key={meeting.id}>
                  <Link className={styles.cardLink} href={`/meetings/${meeting.id}`} aria-label={`${meeting.title} 상세보기`}>
                    <div className={`${styles.cardArt} ${styles[meeting.color]}`}>
                      <Image className={styles.cardImage} src={meeting.imageUrl} alt="" fill sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw" />
                      <span className={`${styles.status} ${meeting.status === "마감 임박" ? styles.statusUrgent : ""} ${meeting.status === "모집 마감" ? styles.statusClosed : ""}`}>{meeting.status}</span>
                      <span className={styles.category}>{meeting.category}</span>
                      <span className={styles.courseType}>{courseType}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardTop}><div className={styles.badges}><span>난이도 · {meeting.difficulty}</span><span>1회 참여</span></div><strong className={styles.fee}>{meeting.fee} / 회</strong></div>
                      <h3>{meeting.title}</h3>
                      <p className={styles.subtitle}>{meeting.subtitle}</p>
                      <p className={styles.result}><span>완성 결과</span>{meeting.subtitle}</p>
                      <dl className={styles.details}>
                        <div><dt aria-label="날짜">📅</dt><dd>{meeting.date} · {meeting.time}</dd></div>
                        <div><dt aria-label="장소">📍</dt><dd>{meeting.location}</dd></div>
                        <div><dt aria-label="준비물">💻</dt><dd>{meeting.supplies}</dd></div>
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
          <Link href="/guide">참여·준비물 안내 →</Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><Link className={styles.brand} href="/" aria-label="AI Together 홈"><span>AI</span><span>Together</span></Link><p>내 가게의 블로그·홈페이지를 AI로 함께 만드는 모임</p></div>
        <small>© 2026 AI Together</small>
      </footer>
    </>
  );
}
