import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { meetings } from "@/data/meetings";
import { getMeetingById } from "@/lib/meetings";
import styles from "./page.module.css";

type MeetingDetailPageProps = {
  params: Promise<{ id: string }>;
};

const activityByCategory: Record<string, string[]> = {
  사진: ["원하는 분위기를 말로 표현하기", "AI로 이미지 만들어보기", "결과를 함께 보고 다듬기"],
  글쓰기: ["쓰고 싶은 이야기 찾기", "AI와 첫 문장 시작하기", "나만의 표현으로 다듬기"],
  여행: ["가고 싶은 여행 이야기하기", "AI와 일정 초안 만들기", "내 취향에 맞게 계획 완성하기"],
  영상: ["재미있는 소재 찾기", "30초 장면 구성하기", "서로의 아이디어 나누기"],
  홈페이지: ["담고 싶은 내용 정하기", "한 페이지 구성 만들기", "내 화면을 직접 완성하기"],
  자동화: ["반복하는 일 찾아보기", "AI 활용 방법 함께 설계하기", "작은 자동화 흐름 완성하기"],
};

export function generateStaticParams() {
  return meetings.map((meeting) => ({ id: meeting.id }));
}

export async function generateMetadata({ params }: MeetingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(id);

  if (!meeting) {
    return { title: "모임을 찾을 수 없어요 | AI 같이해요" };
  }

  return {
    title: `${meeting.title} | AI 같이해요`,
    description: meeting.subtitle,
  };
}

export default async function MeetingDetailPage({ params }: MeetingDetailPageProps) {
  const { id } = await params;
  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  const activities = activityByCategory[meeting.category] ?? [];
  const remainingSeats = Math.max(meeting.capacity - meeting.applicants, 0);
  const percentage = Math.round((meeting.applicants / meeting.capacity) * 100);
  const isUpcoming = meeting.status === "모집 예정";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navShell}>
          <Link className={styles.brand} href="/"><span aria-hidden="true">같이</span>AI 같이해요</Link>
          <nav aria-label="주요 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link></nav>
          <Link className={styles.listLink} href="/meetings">목록으로</Link>
        </div>
      </header>

      <main>
        <div className={styles.breadcrumb}><Link href="/">홈</Link><span aria-hidden="true">/</span><Link href="/meetings">모임</Link><span aria-hidden="true">/</span><strong>{meeting.category}</strong></div>

        <section className={styles.hero}>
          <div className={`${styles.art} ${styles[meeting.color]}`} aria-hidden="true">
            <span className={styles.artCategory}>{meeting.category}</span>
            <div className={styles.circle} />
            <span className={styles.icon}>{meeting.icon}</span>
            <p>좋아하는 것 <strong>＋ AI</strong></p>
          </div>

          <div className={styles.summary}>
            <div className={styles.tags}><span>{meeting.status}</span><span>{meeting.fee}</span><span>난이도 · {meeting.difficulty}</span></div>
            <h1>{meeting.title}</h1>
            <p className={styles.subtitle}>{meeting.subtitle}</p>
            <dl className={styles.quickInfo}>
              <div><dt>📅 날짜</dt><dd>{meeting.date}</dd></div>
              <div><dt>🕒 시간</dt><dd>{meeting.time}</dd></div>
              <div><dt>📍 장소</dt><dd>{meeting.location}</dd></div>
              <div><dt>🎒 준비물</dt><dd>스마트폰 또는 노트북</dd></div>
            </dl>
          </div>
        </section>

        <div className={styles.contentLayout}>
          <div className={styles.mainContent}>
            <section aria-labelledby="introduction-title">
              <p className={styles.kicker}>ABOUT THIS MEETING</p>
              <h2 id="introduction-title">이런 모임이에요</h2>
              <p>AI를 한 번도 사용하지 않았어도 참여할 수 있어요. 어려운 용어를 배우거나 정답을 맞히는 시간이 아니라, 관심 있는 주제로 직접 작은 결과물을 만드는 시간입니다.</p>
              <div className={styles.quote}>“잘해야 참여하는 모임이 아니라,<br />함께 해보기 위해 모이는 자리예요.”</div>
            </section>

            <section aria-labelledby="activity-title">
              <p className={styles.kicker}>WHAT WE DO</p>
              <h2 id="activity-title">함께 이렇게 해봐요</h2>
              <ol className={styles.activities}>
                {activities.map((activity, index) => <li key={activity}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{activity}</strong><p>진행자와 참가자들이 천천히 이야기하며 함께 해봅니다.</p></div></li>)}
              </ol>
            </section>

            <section aria-labelledby="beginner-title">
              <p className={styles.kicker}>FOR BEGINNERS</p>
              <h2 id="beginner-title">이런 분께 잘 맞아요</h2>
              <ul className={styles.checkList}><li>AI가 궁금하지만 어디서 시작할지 모르겠는 분</li><li>강의보다 직접 만들어보며 배우고 싶은 분</li><li>비슷한 관심사를 가진 사람과 편하게 이야기하고 싶은 분</li><li>작더라도 내 손으로 결과물을 완성해보고 싶은 분</li></ul>
            </section>

            <section className={styles.notice} aria-labelledby="notice-title">
              <span aria-hidden="true">🌱</span><div><h2 id="notice-title">부담 없이 오세요</h2><p>노트북이 없어도 스마트폰만 있으면 참여할 수 있어요. 사용하는 AI 서비스가 없어도 현장에서 함께 안내합니다.</p></div>
            </section>
          </div>

          <aside className={styles.applyCard} aria-label="참가 신청 정보">
            <p className={styles.cardLabel}>{meeting.status}</p>
            <div className={styles.seats}><strong>{isUpcoming ? "곧 모집을 시작해요" : `${remainingSeats}자리 남았어요`}</strong><span>{meeting.applicants}명 신청 · 정원 {meeting.capacity}명</span></div>
            <div className={styles.progress} aria-label={`정원 ${percentage}% 신청`}><span style={{ width: `${percentage}%` }} /></div>
            <dl><div><dt>참가비</dt><dd>{meeting.fee}</dd></div><div><dt>난이도</dt><dd>{meeting.difficulty}</dd></div><div><dt>준비물</dt><dd>스마트폰 또는 노트북</dd></div></dl>
            <button type="button" disabled>{isUpcoming ? "모집 예정이에요" : "참가 신청 준비 중"}</button>
            <p className={styles.buttonNote}>참가 신청 기능은 곧 열릴 예정이에요.</p>
          </aside>
        </div>

        <section className={styles.bottomBanner}><div><p className={styles.kicker}>MORE TOGETHER</p><h2>다른 모임도 둘러보세요</h2><p>사진부터 여행, 글쓰기, 홈페이지까지 재미있는 주제가 기다리고 있어요.</p></div><Link href="/meetings">모든 모임 보기 →</Link></section>
      </main>

      <footer className={styles.footer}><Link className={styles.brand} href="/">AI 같이해요</Link><small>© 2026 AI Together</small></footer>
    </>
  );
}
