export type MeetingStatus = "모집 중" | "마감 임박" | "모집 예정";

export type Meeting = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  date: string;
  time: string;
  location: string;
  difficulty: string;
  capacity: number;
  applicants: number;
  fee: string;
  status: MeetingStatus;
  color: "green" | "yellow" | "coral" | "blue";
};
