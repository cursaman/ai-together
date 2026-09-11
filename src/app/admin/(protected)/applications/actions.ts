"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export type StatusActionState = { message?: string; success?: boolean };

export async function updateApplicationStatus(applicationId: string, _state: StatusActionState, formData: FormData): Promise<StatusActionState> {
  await requireAdmin();
  const status = formData.get("status");
  if (typeof status !== "string" || !["신청", "확정", "취소"].includes(status)) {
    return { message: "올바른 상태를 선택해주세요." };
  }

  const { error } = await createAdminClient().rpc("update_ait_application_status", {
    p_application_id: applicationId,
    p_status: status,
  });

  if (error?.message.includes("meeting_full")) return { message: "모임 정원이 가득 차 상태를 변경할 수 없습니다." };
  if (error) return { message: "상태를 변경하지 못했습니다." };

  revalidatePath("/admin/applications");
  revalidatePath("/admin/meetings");
  revalidatePath("/meetings");
  return { message: `${status} 상태로 변경했습니다.`, success: true };
}
