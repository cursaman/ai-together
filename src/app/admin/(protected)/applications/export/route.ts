import { getAdminApplications } from "@/lib/admin-applications";

const headers = ["이름", "이메일", "전화번호", "신청 모임", "상태", "남기실 말", "신청일"];

function safeCell(value: unknown) {
  let text = String(value ?? "").replace(/\r?\n/g, " ");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const { applications } = await getAdminApplications(
    params.get("meeting") ?? undefined,
    params.get("status") ?? undefined,
    params.get("q") ?? undefined,
  );
  const rows = applications.map((application) => [
    application.applicant_name,
    application.email,
    application.phone,
    application.ait_meetings?.title ?? "삭제된 모임",
    application.status,
    application.message,
    new Intl.DateTimeFormat("ko-KR", { dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Seoul" }).format(new Date(application.created_at)),
  ]);
  const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(safeCell).join(",")).join("\r\n")}`;
  const date = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type":"text/csv; charset=utf-8",
      "Content-Disposition":`attachment; filename="ai-together-applications-${date}.csv"`,
      "Cache-Control":"private, no-store",
    },
  });
}
