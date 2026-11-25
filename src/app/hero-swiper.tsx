"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/workshop-product-photo.jpg",
    alt: "도자기 공방에서 스마트폰으로 상품 사진을 촬영하는 모습",
    position: "70% center",
  },
  {
    src: "/images/workshop-blog-writing.jpg",
    alt: "빵집 테이블에서 노트북과 사진을 보며 블로그 글을 준비하는 모습",
    position: "65% center",
  },
  {
    src: "/images/workshop-homepage-design.jpg",
    alt: "꽃집 홈페이지를 노트북과 스마트폰에서 함께 확인하는 모습",
    position: "68% center",
  },
  {
    src: "/images/workshop-promo-video.jpg",
    alt: "카페에서 커피 내리는 장면을 스마트폰으로 촬영하는 모습",
    position: "72% center",
  },
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
