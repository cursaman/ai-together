import "server-only";

import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export type AdminMeeting = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  summary: string;
  description: string;
  meeting_date: string;
  meeting_time: string;
  location: string;
  difficulty: string;
  supplies: string;
  capacity: number;
  current_applicants: number;
  fee: number;
  recruitment_status: string;
  color: string;
};

const fields = "id,title,subtitle,category,icon,summary,description,meeting_date,meeting_time,location,difficulty,supplies,capacity,current_applicants,fee,recruitment_status,color";

export async function getAdminMeetings() {
  await requireAdmin();
  const { data, error } = await createAdminClient().from("ait_meetings").select(fields).order("meeting_date");
  if (error) throw new Error("관리자 모임 목록을 불러오지 못했습니다.");
  return data as AdminMeeting[];
}

export async function getAdminMeeting(id: string) {
  await requireAdmin();
  const { data, error } = await createAdminClient().from("ait_meetings").select(fields).eq("id", id).maybeSingle();
  if (error) throw new Error("관리자 모임 정보를 불러오지 못했습니다.");
  return data as AdminMeeting | null;
}
