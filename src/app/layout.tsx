import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 같이해요",
  description: "AI 몰라도 괜찮아요. 같이 하나 만들어봐요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
