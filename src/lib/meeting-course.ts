export function getCourseType(title: string) {
  return title.includes("4주") || title.includes("프로젝트 모임") ? "프로젝트 모임" : "주제 실습";
}
