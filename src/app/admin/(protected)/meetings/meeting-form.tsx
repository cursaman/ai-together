"use client";

import { useActionState } from "react";
import type { AdminMeeting } from "@/lib/admin-meetings";
import type { MeetingFormState } from "./actions";
import styles from "../../admin.module.css";

type FormValues = Partial<AdminMeeting>;
type Props = { action: (state: MeetingFormState, formData: FormData) => Promise<MeetingFormState>; meeting?: FormValues };

const categories = ["사진", "글쓰기", "여행", "영상", "홈페이지", "자동화"];
const statuses = ["모집 중", "마감 임박", "모집 예정"];

export function MeetingForm({ action, meeting = {} }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const error = (name: string) => state.errors?.[name];

  return (
    <form className={styles.meetingForm} action={formAction}>
      <div className={styles.formGrid}>
        <Field label="모임 제목" name="title" error={error("title")}><input id="title" name="title" defaultValue={meeting.title} maxLength={80} required /></Field>
        <Field label="부제" name="subtitle" error={error("subtitle")}><input id="subtitle" name="subtitle" defaultValue={meeting.subtitle} maxLength={120} /></Field>
        <Field label="카테고리" name="category" error={error("category")}><select id="category" name="category" defaultValue={meeting.category ?? "사진"}>{categories.map((item) => <option key={item}>{item}</option>)}</select></Field>
        <Field label="아이콘" name="icon"><input id="icon" name="icon" defaultValue={meeting.icon ?? "💡"} maxLength={8} /></Field>
        <Field label="날짜" name="meeting_date" error={error("meeting_date")}><input id="meeting_date" name="meeting_date" type="date" defaultValue={meeting.meeting_date} required /></Field>
        <Field label="시간" name="meeting_time" error={error("meeting_time")}><input id="meeting_time" name="meeting_time" type="time" defaultValue={meeting.meeting_time?.slice(0, 5)} required /></Field>
        <Field label="장소" name="location" error={error("location")}><input id="location" name="location" defaultValue={meeting.location} maxLength={100} required /></Field>
        <Field label="난이도" name="difficulty"><input id="difficulty" name="difficulty" defaultValue={meeting.difficulty ?? "처음"} maxLength={30} /></Field>
        <Field label="정원" name="capacity" error={error("capacity")}><input id="capacity" name="capacity" type="number" min={Math.max(meeting.current_applicants ?? 1, 1)} max="1000" defaultValue={meeting.capacity ?? 8} required /></Field>
        <Field label="참가비(원)" name="fee" error={error("fee")}><input id="fee" name="fee" type="number" min="0" max="10000000" step="1000" defaultValue={meeting.fee ?? 0} required /></Field>
        <Field label="모집 상태" name="recruitment_status" error={error("recruitment_status")}><select id="recruitment_status" name="recruitment_status" defaultValue={meeting.recruitment_status ?? "모집 예정"}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></Field>
        <Field label="대표 색상" name="color" error={error("color")}><select id="color" name="color" defaultValue={meeting.color ?? "green"}><option value="green">초록</option><option value="yellow">노랑</option><option value="coral">코랄</option><option value="blue">파랑</option></select></Field>
      </div>
      <Field label="준비물" name="supplies"><input id="supplies" name="supplies" defaultValue={meeting.supplies ?? "개인 노트북과 충전기"} maxLength={120} /></Field>
      <Field label="간단 설명" name="summary"><textarea id="summary" name="summary" defaultValue={meeting.summary} rows={3} maxLength={500} /></Field>
      <Field label="상세 설명" name="description"><textarea id="description" name="description" defaultValue={meeting.description} rows={7} maxLength={5000} /></Field>
      {state.message ? <p className={styles.formMessage} role="alert">{state.message}</p> : null}
      <button className={styles.primaryButton} type="submit" disabled={pending}>{pending ? "저장 중..." : meeting.id ? "수정 내용 저장" : "모임 등록"}</button>
    </form>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return <div className={styles.field}><label htmlFor={name}>{label}</label>{children}{error ? <p className={styles.error}>{error}</p> : null}</div>;
}
