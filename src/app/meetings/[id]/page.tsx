import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ResourceBar from "../../resource-bar";
import SiteHeader from "../../site-header";
import { notFound } from "next/navigation";
import { meetings } from "@/data/meetings";
import { getMeetingById } from "@/lib/meetings";
import styles from "./page.module.css";
import { ShareButton } from "./share-button";

type MeetingDetailPageProps = {
  params: Promise<{ id: string }>;
};

const activityByCategory: Record<string, string[]> = {
  사진: ["상품·서비스 사진과 가게 분위기 정리하기", "AI로 홍보 이미지·소개 문구 만들기", "실제 상품 정보와 다른 부분 확인하기"],
  글쓰기: ["고객이 궁금해하는 주제 찾기", "AI와 블로그 글 초안 작성하기", "실제 경험·사진·문의 정보를 넣어 다듬기"],
  여행: ["가고 싶은 여행 이야기하기", "AI와 일정 초안 만들기", "내 취향에 맞게 계획 완성하기"],
  영상: ["가게와 서비스의 강점 정리하기", "짧은 홍보 영상의 대본과 장면 만들기", "상품 정보와 문의 안내 점검하기"],
  홈페이지: ["서비스·가격·위치·문의 정보 정리하기", "가게 홈페이지 제작·모바일 화면 점검하기", "공개 후 직접 수정하고 운영하기"],
  자동화: ["블로그·홍보 콘텐츠 주제 정리하기", "글·이미지·영상 초안 제작 흐름 만들기", "사실 확인 후 직접 수정하고 게시하기"],
};

export function generateStaticParams() {
  return meetings.map((meeting) => ({ id: meeting.id }));
}

export async function generateMetadata({ params }: MeetingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(id);

  if (!meeting) {
    return { title: "모임을 찾을 수 없어요 | AI Together" };
  }

  return {
    title: `${meeting.title} | AI Together`,
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
  const percentage = Math.min(Math.round((meeting.applicants / meeting.capacity) * 100), 100);
  const isUpcoming = meeting.status === "모집 예정";
  const isClosed = meeting.status === "모집 마감";

  return (
    <>
      <ResourceBar />
      <SiteHeader />

      <main id="main-content">
        <div className={styles.breadcrumb}><Link href="/">홈</Link><span aria-hidden="true">/</span><Link href="/meetings">모임</Link><span aria-hidden="true">/</span><strong>{meeting.category}</strong></div>

        <section className={styles.hero}>
          <div className={`${styles.art} ${styles[meeting.color]}`} aria-hidden="true">
            <Image className={styles.heroImage} src={meeting.imageUrl} alt="" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
            <span className={styles.artCategory}>{meeting.category}</span>
          </div>

          <div className={styles.summary}>
            <div className={styles.tags}><span>{meeting.status}</span><span>{meeting.fee}</span><span>난이도 · {meeting.difficulty}</span></div>
            <h1>{meeting.title}</h1>
            <p className={styles.subtitle}>{meeting.subtitle}</p>
            <dl className={styles.quickInfo}>
              <div><dt>📅 날짜</dt><dd>{meeting.date}</dd></div>
              <div><dt>🕒 시간</dt><dd>{meeting.time}</dd></div>
              <div><dt>📍 장소</dt><dd>{meeting.location}</dd></div>
              <div><dt>🎒 준비물</dt><dd>{meeting.supplies}</dd></div>
            </dl>
          </div>
        </section>

        <div className={styles.contentLayout}>
          <div className={styles.mainContent}>
            <section aria-labelledby="introduction-title">
              <p className={styles.kicker}>ABOUT THIS MEETING</p>
              <h2 id="introduction-title">이런 모임이에요</h2>
              <p>{meeting.summary || "소상공인·개인사업자가 내 가게의 블로그와 홈페이지를 직접 만드는 모임입니다. 필요한 작업부터 시작하고 프로젝트 모임의 이전 진행 내용은 먼저 문의해주세요."}</p>
              <div className={styles.quote}>“잘해야 참여하는 모임이 아니라,<br />함께 해보기 위해 모이는 자리예요.”</div>
            </section>

            <section aria-labelledby="activity-title">
              <p className={styles.kicker}>WHAT WE DO</p>
              <h2 id="activity-title">함께 이렇게 해봐요</h2>
              {meeting.description ? <p className={styles.sessionDescription}>{meeting.description}</p> : null}
              <ol className={styles.activities}>
                {activities.map((activity, index) => <li key={activity}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{activity}</strong><p>진행자와 참가자들이 천천히 이야기하며 함께 해봅니다.</p></div></li>)}
              </ol>
            </section>

            <section aria-labelledby="beginner-title">
              <p className={styles.kicker}>FOR YOUR BUSINESS</p>
              <h2 id="beginner-title">이런 분께 잘 맞아요</h2>
              <ul className={styles.checkList}><li>내 가게의 블로그·홈페이지를 직접 만들고 싶은 분</li><li>상품·서비스 소개 글과 홍보 사진을 준비하고 싶은 분</li><li>외주 이후에도 홈페이지 내용을 직접 수정하고 싶은 분</li><li>사업을 준비하며 소개 페이지가 필요한 예비 창업자</li></ul>
            </section>

            <section className={styles.notice} aria-labelledby="notice-title">
              <span aria-hidden="true">☕</span><div><h2 id="notice-title">가게 자료와 노트북을 준비해주세요</h2><p>참가비는 회당 10,000원입니다. 음료는 각자 주문하고 카페에 직접 결제해주세요. 가게 소개·상품 사진·개인 노트북과 충전기를 준비하고, 프로젝트 모임은 이전 진행 내용과 준비 사항을 참여 전에 확인해주세요.</p></div>
            </section>
          </div>

          <aside className={styles.applyCard} aria-label="참가 신청 정보">
            <p className={styles.cardLabel}>{meeting.status}</p>
            <div className={styles.seats}><strong>{isUpcoming ? "곧 모집을 시작해요" : isClosed ? "신청이 마감됐어요" : `${remainingSeats}자리 남았어요`}</strong><span>{meeting.applicants}명 신청 · 정원 {meeting.capacity}명</span></div>
            <div className={styles.progress} aria-label={`정원 ${percentage}% 신청`}><span style={{ width: `${percentage}%` }} /></div>
            <dl><div><dt>회당 참가비</dt><dd>{meeting.fee} · 음료 별도</dd></div><div><dt>난이도</dt><dd>{meeting.difficulty}</dd></div><div><dt>준비물</dt><dd>{meeting.supplies}</dd></div></dl>
            {isUpcoming || isClosed ? (
              <button type="button" disabled>{isUpcoming ? "모집 예정이에요" : "모집이 마감됐어요"}</button>
            ) : (
              <Link className={styles.applyButton} href={`/meetings/${meeting.id}/apply`}>참가 신청하기</Link>
            )}
            <p className={styles.buttonNote}>{isUpcoming ? "모집이 시작되면 신청할 수 있어요." : isClosed ? "다른 모임의 남은 자리를 확인해주세요." : "신청 정보를 안전하게 입력해주세요."}</p>
            <ShareButton title={`${meeting.title} | AI Together`} text={`${meeting.date} ${meeting.time} · ${meeting.location}`} />
          </aside>
        </div>

        <section className={styles.bottomBanner}><div><p className={styles.kicker}>MORE TOGETHER</p><h2>다른 모임도 둘러보세요</h2><p>블로그 글, 홍보 이미지, 홈페이지 중 내 사업에 필요한 작업을 골라보세요.</p></div><Link href="/meetings">모든 모임 보기 →</Link></section>
      </main>

      <footer className={styles.footer}><Link className={styles.brand} href="/" aria-label="AI Together 홈"><span>AI</span><span>Together</span></Link><small>© 2026 AI Together</small></footer>
      <aside className={styles.mobileApplyBar} aria-label="모바일 참가 신청">
        <div><strong>{meeting.fee}</strong><span>{isUpcoming ? "모집 예정" : isClosed ? "모집 마감" : `${remainingSeats}자리 남음`}</span></div>
        {isUpcoming || isClosed ? <button type="button" disabled>{isUpcoming ? "모집 예정" : "모집 마감"}</button>:<Link href={`/meetings/${meeting.id}/apply`}>참가 신청하기</Link>}
      </aside>
    </>
  );
}
