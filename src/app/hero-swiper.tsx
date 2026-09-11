"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  { src: "/images/meetings/ai-first-step.webp", alt: "AI 이미지 만들기 체험" },
  { src: "/images/meetings/short-video-ideas.webp", alt: "AI 숏폼 동영상 만들기 체험" },
  { src: "/images/meetings/one-page-site.webp", alt: "나만의 홈페이지 만들기 체험" },
  { src: "/images/meetings/easy-automation.webp", alt: "AI 콘텐츠 자동화 체험" },
  { src: "/images/meetings/travel-with-ai.webp", alt: "AI와 함께 여행 계획 만들기" },
  { src: "/images/meetings/write-my-story.webp", alt: "AI로 나의 이야기 만들기" },
];

export default function HeroSwiper() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % slides.length), 3000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (direction: number) => setCurrent((index) => (index + direction + slides.length) % slides.length);

  return (
    <div className="hero-swiper" aria-roledescription="carousel" aria-label="AI 같이해요 모임 이미지"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
        touchStart.current = null;
      }}>
      {slides.map((slide, index) => (
        <Image className={`hero-slide${index === current ? " is-active" : ""}`} src={slide.src}
          alt={index === current ? slide.alt : ""} fill priority={index === 0} sizes="100vw" key={slide.src} />
      ))}
      <button className="hero-arrow hero-arrow-prev" type="button" onClick={() => move(-1)} aria-label="이전 이미지">‹</button>
      <button className="hero-arrow hero-arrow-next" type="button" onClick={() => move(1)} aria-label="다음 이미지">›</button>
      <div className="hero-controls">
        <button className="hero-pause" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "슬라이드 자동 재생" : "슬라이드 일시정지"}>{paused ? "▶" : "Ⅱ"}</button>
        <div className="hero-dots" aria-label={`${current + 1} / ${slides.length}`}>
          {slides.map((slide, index) => (
            <button className={index === current ? "is-active" : ""} type="button" onClick={() => setCurrent(index)}
              aria-label={`${index + 1}번 이미지 보기`} aria-current={index === current ? "true" : undefined} key={slide.src} />
          ))}
        </div>
      </div>
    </div>
  );
}
