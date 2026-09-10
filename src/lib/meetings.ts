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
  meeting_date: string;
  meeting_time: string;
  location: string;
  difficulty: string;
  capacity: number;
  current_applicants: number;
  fee: number;
  recruitment_status: MeetingStatus;
  color: Meeting["color"];
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

function toMeeting(row: MeetingRow): Meeting {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    category: row.category,
    icon: row.icon,
    date: formatDate(row.meeting_date),
    time: formatTime(row.meeting_time),
    location: row.location,
    difficulty: row.difficulty,
    capacity: row.capacity,
    applicants: row.current_applicants,
    fee: row.fee === 0 ? "무료" : `${row.fee.toLocaleString("ko-KR")}원`,
    status: row.recruitment_status,
    color: row.color,
  };
}

export async function getMeetings(): Promise<Meeting[]> {
  if (!isSupabaseConfigured()) {
    return sampleMeetings;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ait_meetings")
    .select("id,title,subtitle,category,icon,meeting_date,meeting_time,location,difficulty,capacity,current_applicants,fee,recruitment_status,color")
    .order("meeting_date", { ascending: true });

  if (error) {
    console.error("ait_meetings 조회 실패", error.message);
    return sampleMeetings;
  }

  return (data as MeetingRow[]).map(toMeeting);
}

export async function getMeetingById(id: string): Promise<Meeting | undefined> {
  if (!isSupabaseConfigured()) {
    return sampleMeetings.find((meeting) => meeting.id === id);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ait_meetings")
    .select("id,title,subtitle,category,icon,meeting_date,meeting_time,location,difficulty,capacity,current_applicants,fee,recruitment_status,color")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("ait_meetings 상세 조회 실패", error.message);
    return sampleMeetings.find((meeting) => meeting.id === id);
  }

  return data ? toMeeting(data as MeetingRow) : undefined;
}
