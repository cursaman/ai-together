"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function createReview(formData: FormData) {
  await requireAdmin();
  const nickname=String(formData.get("nickname")??"").trim();
  const content=String(formData.get("content")??"").trim();
  const meeting_id=String(formData.get("meeting_id")??"").trim()||null;
  const result_image_url=String(formData.get("result_image_url")??"").trim()||null;
  if (nickname.length<1||nickname.length>30||content.length<10||content.length>500) redirect("/admin/reviews?error=invalid");
  const { error }=await createAdminClient().from("ait_reviews").insert({ nickname,content,meeting_id,result_image_url,is_published:formData.get("is_published")==="on" });
  if (error) redirect("/admin/reviews?error=save");
  revalidatePath("/reviews"); redirect("/admin/reviews?created=1");
}
export async function toggleReviewPublished(id:string,nextPublished:boolean) {
  await requireAdmin();
  await createAdminClient().from("ait_reviews").update({is_published:nextPublished,updated_at:new Date().toISOString()}).eq("id",id);
  revalidatePath("/reviews"); revalidatePath("/admin/reviews");
}
export async function deleteReview(id:string) {
  await requireAdmin();
  await createAdminClient().from("ait_reviews").delete().eq("id",id);
  revalidatePath("/reviews"); revalidatePath("/admin/reviews");
}
