import "server-only";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export type AdminReview = { id:string; meeting_id:string|null; nickname:string; content:string; result_image_url:string|null; is_published:boolean; created_at:string; ait_meetings:{ title:string }|null };
export async function getAdminReviews(): Promise<AdminReview[]> {
  await requireAdmin();
  const { data, error } = await createAdminClient().from("ait_reviews").select("id,meeting_id,nickname,content,result_image_url,is_published,created_at,ait_meetings(title)").order("created_at", { ascending:false });
  if (error) throw new Error("후기 목록을 불러오지 못했습니다. Supabase 후기 SQL을 먼저 실행해주세요.");
  return data as unknown as AdminReview[];
}

export async function getAdminReview(id:string): Promise<AdminReview|null> {
  await requireAdmin();
  const { data,error }=await createAdminClient().from("ait_reviews").select("id,meeting_id,nickname,content,result_image_url,is_published,created_at,ait_meetings(title)").eq("id",id).maybeSingle();
  if (error) throw new Error("후기 정보를 불러오지 못했습니다.");
  return data as unknown as AdminReview|null;
}
