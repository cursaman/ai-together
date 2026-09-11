import "server-only";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type PublicReview = { id:string; nickname:string; content:string; result_image_url:string|null; created_at:string; ait_meetings:{ title:string }|null };

export async function getPublishedReviews(): Promise<PublicReview[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await (await createClient()).from("ait_reviews").select("id,nickname,content,result_image_url,created_at,ait_meetings(title)").eq("is_published", true).order("created_at", { ascending:false });
  if (error) { console.error("공개 후기 조회 실패", error.message); return []; }
  return data as unknown as PublicReview[];
}
