import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

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
  description: "부산 소상공인·개인사업자를 위한 AI 홍보 실습 모임. 내 가게의 블로그 글과 홈페이지를 직접 만들고 운영합니다. 회당 10,000원, 음료 개별 결제.",
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
