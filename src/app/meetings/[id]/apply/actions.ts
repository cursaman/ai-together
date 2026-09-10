"use server";

import { redirect } from "next/navigation";
import { getMeetingById } from "@/lib/meetings";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type ApplicationState = {
  message?: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "message" | "privacy", string>>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\-\s]{8,20}$/;

function readText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitApplication(
  meetingId: string,
  _previousState: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  const name = readText(formData, "name");
  const email = readText(formData, "email").toLowerCase();
  const phone = readText(formData, "phone");
  const message = readText(formData, "message");
  const privacy = formData.get("privacy") === "on";
  const website = readText(formData, "website");
  const errors: ApplicationState["errors"] = {};

  if (website) return { message: "신청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요." };
  if (name.length < 2 || name.length > 40) errors.name = "이름은 2~40자로 입력해주세요.";
  if (!emailPattern.test(email) || email.length > 254) errors.email = "올바른 이메일 주소를 입력해주세요.";
  if (phone && !phonePattern.test(phone)) errors.phone = "전화번호 형식을 확인해주세요.";
  if (message.length > 500) errors.message = "남기실 말은 500자 이하로 입력해주세요.";
  if (!privacy) errors.privacy = "개인정보 수집 및 이용에 동의해주세요.";

  if (Object.keys(errors).length > 0) {
    return { errors, message: "입력 내용을 확인해주세요." };
  }
  if (!isSupabaseConfigured()) {
    return { message: "현재 신청 시스템 연결을 준비하고 있습니다. 잠시 후 다시 시도해주세요." };
  }

  const meeting = await getMeetingById(meetingId);
  if (!meeting) return { message: "신청할 모임을 찾을 수 없습니다." };
  if (meeting.status === "모집 예정") return { message: "아직 모집이 시작되지 않은 모임입니다." };
  if (meeting.applicants >= meeting.capacity) return { message: "신청이 마감된 모임입니다." };

  const supabase = await createClient();
  const { error } = await supabase.from("ait_applications").insert({
    meeting_id: meeting.id,
    applicant_name: name,
    email,
    phone: phone || null,
    message: message || null,
  });

  if (error) {
    return { message: "신청을 저장하지 못했습니다. 잠시 후 다시 시도해주세요." };
  }

  redirect(`/meetings/${meeting.id}/apply/complete`);
}
