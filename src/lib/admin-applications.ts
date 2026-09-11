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

export async function getAdminApplications(meetingId?: string, status?: string) {
  await requireAdmin();
  let query = createAdminClient()
    .from("ait_applications")
    .select("id,applicant_name,email,phone,message,status,created_at,meeting_id,ait_meetings(title)")
    .order("created_at", { ascending: false })
    .limit(200);

  if (meetingId && uuidPattern.test(meetingId)) query = query.eq("meeting_id", meetingId);
  if (status && ["신청", "확정", "취소"].includes(status)) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw new Error("신청자 목록을 불러오지 못했습니다.");
  return data as unknown as AdminApplication[];
}
