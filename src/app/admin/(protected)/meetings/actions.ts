"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export type MeetingFormState = { message?: string; errors?: Record<string, string> };

const categories = new Set(["사진", "글쓰기", "여행", "영상", "홈페이지", "자동화"]);
const statuses = new Set(["모집 중", "마감 임박", "모집 예정"]);
const colors = new Set(["green", "yellow", "coral", "blue"]);

function textValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function parseMeeting(formData: FormData, minimumCapacity = 1) {
  const values = {
    title: textValue(formData, "title"),
    subtitle: textValue(formData, "subtitle"),
    category: textValue(formData, "category"),
    icon: textValue(formData, "icon") || "💡",
    summary: textValue(formData, "summary"),
    description: textValue(formData, "description"),
    meeting_date: textValue(formData, "meeting_date"),
    meeting_time: textValue(formData, "meeting_time"),
    location: textValue(formData, "location"),
    difficulty: textValue(formData, "difficulty") || "처음",
    supplies: textValue(formData, "supplies") || "스마트폰 또는 노트북",
    capacity: Number(textValue(formData, "capacity")),
    fee: Number(textValue(formData, "fee")),
    recruitment_status: textValue(formData, "recruitment_status"),
    color: textValue(formData, "color"),
  };
  const errors: Record<string, string> = {};

  if (values.title.length < 2 || values.title.length > 80) errors.title = "제목은 2~80자로 입력해주세요.";
  if (values.subtitle.length > 120) errors.subtitle = "부제는 120자 이하로 입력해주세요.";
  if (!categories.has(values.category)) errors.category = "카테고리를 선택해주세요.";
  if (!values.meeting_date) errors.meeting_date = "날짜를 입력해주세요.";
  if (!values.meeting_time) errors.meeting_time = "시간을 입력해주세요.";
  if (values.location.length < 2 || values.location.length > 100) errors.location = "장소는 2~100자로 입력해주세요.";
  if (!Number.isInteger(values.capacity) || values.capacity < minimumCapacity || values.capacity > 1000) errors.capacity = `정원은 ${minimumCapacity}~1000명으로 입력해주세요.`;
  if (!Number.isInteger(values.fee) || values.fee < 0 || values.fee > 10000000) errors.fee = "참가비는 0~10,000,000원으로 입력해주세요.";
  if (!statuses.has(values.recruitment_status)) errors.recruitment_status = "모집 상태를 선택해주세요.";
  if (!colors.has(values.color)) errors.color = "색상을 선택해주세요.";

  return { values, errors };
}

export async function createMeeting(_state: MeetingFormState, formData: FormData): Promise<MeetingFormState> {
  await requireAdmin();
  const { values, errors } = parseMeeting(formData);
  if (Object.keys(errors).length) return { message: "입력 내용을 확인해주세요.", errors };

  const { error } = await createAdminClient().from("ait_meetings").insert(values);
  if (error) return { message: "모임을 등록하지 못했습니다. 잠시 후 다시 시도해주세요." };

  revalidatePath("/meetings");
  revalidatePath("/admin/meetings");
  redirect("/admin/meetings?created=1");
}

export async function updateMeeting(id: string, currentApplicants: number, _state: MeetingFormState, formData: FormData): Promise<MeetingFormState> {
  await requireAdmin();
  const { values, errors } = parseMeeting(formData, Math.max(currentApplicants, 1));
  if (Object.keys(errors).length) return { message: "입력 내용을 확인해주세요.", errors };

  const { error } = await createAdminClient().from("ait_meetings").update(values).eq("id", id);
  if (error) return { message: "모임을 수정하지 못했습니다. 잠시 후 다시 시도해주세요." };

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  revalidatePath("/admin/meetings");
  redirect("/admin/meetings?updated=1");
}
