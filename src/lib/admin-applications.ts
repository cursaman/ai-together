import "server-only";

import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export type AdminApplication = {
  id: string;
  applicant_name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: "신청" | "확정" | "취소";
  created_at: string;
  meeting_id: string;
  ait_meetings: { title: string } | null;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function getAdminApplications(meetingId?: string, status?: string, search?: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  let applicationQuery = supabase
    .from("ait_applications")
    .select("id,applicant_name,email,phone,message,status,created_at,meeting_id")
    .order("created_at", { ascending: false })
    .limit(200);

  if (meetingId && uuidPattern.test(meetingId)) applicationQuery = applicationQuery.eq("meeting_id", meetingId);
  if (status && ["신청", "확정", "취소"].includes(status)) applicationQuery = applicationQuery.eq("status", status);

  const [applicationResult, meetingResult, countResult] = await Promise.all([
    applicationQuery,
    supabase.from("ait_meetings").select("id,title"),
    supabase.from("ait_applications").select("id", { count: "exact", head: true }),
  ]);

  if (applicationResult.error || meetingResult.error || countResult.error) {
    console.error("관리자 신청자 조회 실패", {
      applications: applicationResult.error?.code,
      meetings: meetingResult.error?.code,
      count: countResult.error?.code,
    });
    throw new Error("신청자 목록을 불러오지 못했습니다.");
  }

  const meetingTitles = new Map(meetingResult.data.map((meeting) => [meeting.id, meeting.title]));
  const applications = applicationResult.data.map((application) => ({
    ...application,
    ait_meetings: meetingTitles.has(application.meeting_id)
      ? { title: meetingTitles.get(application.meeting_id) as string }
      : null,
  })) as AdminApplication[];

  const keyword = search?.trim().toLocaleLowerCase("ko-KR") ?? "";
  const filteredApplications = keyword
    ? applications.filter((application) =>
        application.applicant_name.toLocaleLowerCase("ko-KR").includes(keyword)
        || application.email.toLocaleLowerCase("ko-KR").includes(keyword))
    : applications;

  return {
    applications: filteredApplications,
    totalCount: countResult.count ?? applications.length,
  };
}
