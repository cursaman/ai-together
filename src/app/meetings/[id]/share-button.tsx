"use client";

import { useState } from "react";

export function ShareButton({ title, text }: { title: string; text: string }) {
  const [message, setMessage] = useState("");

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        setMessage("공유했어요.");
      } else {
        await navigator.clipboard.writeText(url);
        setMessage("링크를 복사했어요.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(url);
        setMessage("링크를 복사했어요.");
      } catch {
        setMessage("주소창의 링크를 복사해주세요.");
      }
    }
    window.setTimeout(() => setMessage(""), 2500);
  };

  return (
    <div className="meeting-share">
      <button type="button" onClick={share}><span aria-hidden="true">↗</span> 모임 공유하기</button>
      <p aria-live="polite">{message}</p>
    </div>
  );
}
