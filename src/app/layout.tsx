import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import "./editorial.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Together",
  description: "부산 소상공인·개인사업자를 위한 1:1 AI 교습. 매일 오전 10시와 오후 3시에 블로그 글, 상품 사진, 홈페이지 제작을 함께 실습합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${notoSerifKr.variable}`}>
      <body><a className="skip-link" href="#main-content">본문 바로가기</a>{children}</body>
    </html>
  );
}
