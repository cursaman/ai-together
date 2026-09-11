import "server-only";

import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getAdminDashboard() {
  await requireAdmin();
  const supabase = createAdminClient();
  const [applicationResult, meetingResult, reviewResult] = await Promise.all([
    supabase.from("ait_applications").select("status"),
    supabase.from("ait_meetings").select("capacity,current_applicants,recruitment_status"),
    supabase.from("ait_reviews").select("is_published"),
  ]);

  if (applicationResult.error || meetingResult.error) {
    console.error("관리자 대시보드 조회 실패", { applications:applicationResult.error?.code, meetings:meetingResult.error?.code });
    throw new Error("대시보드 정보를 불러오지 못했습니다.");
  }

  const applicationStatuses = applicationResult.data.map((item) => item.status);
  const meetings = meetingResult.data;
  const meetingStatus = meetings.reduce((counts, meeting) => {
    if (meeting.recruitment_status === "모집 예정") counts.upcoming += 1;
    else {
      const remaining = meeting.capacity - meeting.current_applicants;
      if (remaining <= 0) counts.closed += 1;
      else if (remaining <= 2) counts.urgent += 1;
      else counts.open += 1;
    }
    return counts;
  }, { open:0,urgent:0,closed:0,upcoming:0 });

  const reviews = reviewResult.error ? [] : reviewResult.data;
  return {
    applications: {
      total:applicationStatuses.length,
      pending:applicationStatuses.filter((status) => status === "신청").length,
      confirmed:applicationStatuses.filter((status) => status === "확정").length,
      cancelled:applicationStatuses.filter((status) => status === "취소").length,
    },
    meetings:{ total:meetings.length,...meetingStatus },
    reviews:{
      ready:!reviewResult.error,
      total:reviews.length,
      published:reviews.filter((review) => review.is_published).length,
      private:reviews.filter((review) => !review.is_published).length,
    },
  };
}
