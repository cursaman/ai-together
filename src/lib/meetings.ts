import "server-only";

import { meetings as sampleMeetings } from "@/data/meetings";
import type { Meeting, MeetingStatus } from "@/types/meeting";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type MeetingRow = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  representative_image_url: string | null;
  meeting_date: string;
  meeting_time: string;
  location: string;
  difficulty: string;
  supplies: string;
  capacity: number;
  current_applicants: number;
  fee: number;
  recruitment_status: MeetingStatus;
  color: Meeting["color"];
};

const categoryImages: Record<string, string> = {
  사진: "/images/meetings/ai-first-step.webp",
  여행: "/images/meetings/travel-with-ai.webp",
  글쓰기: "/images/meetings/write-my-story.webp",
  홈페이지: "/images/meetings/one-page-site.webp",
  영상: "/images/meetings/short-video-ideas.webp",
  자동화: "/images/meetings/easy-automation.webp",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date(`${value}T00:00:00`));
}

function formatTime(value: string) {
  const [hour = "0", minute = "0"] = value.split(":");
  const numericHour = Number(hour);
  const period = numericHour < 12 ? "오전" : "오후";
  const displayHour = numericHour % 12 || 12;

  return `${period} ${displayHour}:${minute}`;
}

function withDerivedStatus(meeting: Meeting): Meeting {
  if (meeting.status === "모집 예정") return meeting;
  const remainingSeats = meeting.capacity - meeting.applicants;
  const status: MeetingStatus = remainingSeats <= 0 ? "모집 마감" : remainingSeats <= 2 ? "마감 임박" : "모집 중";
  return { ...meeting, status };
}

function toMeeting(row: MeetingRow): Meeting {
  return withDerivedStatus({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    category: row.category,
    icon: row.icon,
    imageUrl: row.representative_image_url || categoryImages[row.category] || "/images/meetings/ai-first-step.webp",
    date: formatDate(row.meeting_date),
    time: formatTime(row.meeting_time),
    location: row.location,
    difficulty: row.difficulty,
    supplies: row.supplies,
    capacity: row.capacity,
    applicants: row.current_applicants,
    fee: row.fee === 0 ? "무료" : `${row.fee.toLocaleString("ko-KR")}원`,
    status: row.recruitment_status,
    color: row.color,
  });
}

export async function getMeetings(): Promise<Meeting[]> {
  if (!isSupabaseConfigured()) {
    return sampleMeetings.map(withDerivedStatus);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ait_meetings")
    .select("id,title,subtitle,category,icon,representative_image_url,meeting_date,meeting_time,location,difficulty,supplies,capacity,current_applicants,fee,recruitment_status,color")
    .order("meeting_date", { ascending: true });

  if (error) {
    console.error("ait_meetings 조회 실패", error.message);
    return sampleMeetings.map(withDerivedStatus);
  }

  return (data as MeetingRow[]).map(toMeeting);
}

export async function getMeetingById(id: string): Promise<Meeting | undefined> {
  if (!isSupabaseConfigured()) {
    const meeting = sampleMeetings.find((item) => item.id === id);
    return meeting ? withDerivedStatus(meeting) : undefined;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ait_meetings")
    .select("id,title,subtitle,category,icon,representative_image_url,meeting_date,meeting_time,location,difficulty,supplies,capacity,current_applicants,fee,recruitment_status,color")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("ait_meetings 상세 조회 실패", error.message);
    const meeting = sampleMeetings.find((item) => item.id === id);
    return meeting ? withDerivedStatus(meeting) : undefined;
  }

  return data ? toMeeting(data as MeetingRow) : undefined;
}
