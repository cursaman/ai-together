"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  { src: "/images/workshop-refresh/product.jpg", alt: "도자기 컵의 상품 사진을 휴대전화로 찍는 모습", position: "center" },
  { src: "/images/workshop-refresh/writing.jpg", alt: "빵 사진과 노트를 펼쳐 놓고 블로그 글을 작성하는 모습", position: "center" },
  { src: "/images/workshop-refresh/site.jpg", alt: "꽃집 홈페이지를 노트북과 휴대전화에서 비교하는 모습", position: "center" },
  { src: "/images/workshop-refresh/video.jpg", alt: "휴대전화 삼각대로 카페 음료의 세로 영상을 촬영하는 모습", position: "center" },
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
    <div className="hero-swiper" aria-roledescription="carousel" aria-label="AI Together 모임 이미지"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
        touchStart.current = null;
      }}>
      {slides.map((slide, index) => (
        <Image className={`hero-slide${index === current ? " is-active" : ""}`} src={slide.src}
          alt={index === current ? slide.alt : ""} style={{ objectPosition: slide.position }} fill priority={index === 0} sizes="100vw" key={slide.src} />
      ))}
      <div className="hero-controls">
        <button className="hero-arrow" type="button" onClick={() => move(-1)} aria-label="이전 이미지">‹</button>
        <button className="hero-pause" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "슬라이드 자동 재생" : "슬라이드 일시정지"}>{paused ? "▶" : "Ⅱ"}</button>
        <div className="hero-dots" aria-label={`${current + 1} / ${slides.length}`}>
          {slides.map((slide, index) => (
            <button className={index === current ? "is-active" : ""} type="button" onClick={() => setCurrent(index)}
              aria-label={`${index + 1}번 이미지 보기`} aria-current={index === current ? "true" : undefined} key={slide.src} />
          ))}
        </div>
        <button className="hero-arrow" type="button" onClick={() => move(1)} aria-label="다음 이미지">›</button>
      </div>
    </div>
  );
}
