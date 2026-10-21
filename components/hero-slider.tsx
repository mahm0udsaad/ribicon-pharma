"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

import type { HeroSlide as Slide } from "@/lib/types";

export function HeroSlider({ slides, actions, interval = 6000 }: { slides: Slide[]; actions: ReactNode; interval?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Restarts whenever the slide changes, so a manual pick gets a full interval too.
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => window.clearTimeout(timer);
  }, [active, paused, slides.length, interval]);

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={`${slide.src}-${i}`}
          className={`hero-image hero-slide${i === active ? " is-active" : ""}`}
          src={slide.src}
          alt={i === active ? slide.alt : ""}
          aria-hidden={i !== active}
          fill
          priority={i === 0}
          sizes="100vw"
        />
      ))}
      {/* Every slide's copy shares one grid cell, so the section is always as tall as the
          longest slide and doesn't jump as slides change. Only the active one is visible. */}
      <div className="shell hero-content">
        <div className="hero-copy-stack" aria-live={paused ? "polite" : "off"}>
          {slides.map((slide, i) => {
            const current = i === active;
            const Title = current ? "h1" : "p";
            return (
              <div className={`hero-copy${current ? " is-active" : ""}`} key={`${slide.src}-${i}`} aria-hidden={!current} inert={!current}>
                <p className="eyebrow">{slide.eyebrow}</p>
                <Title className="display-title" id={current ? "hero-title" : undefined}>{slide.title}</Title>
                <p>{slide.body}</p>
                <div className="hero-actions">{actions}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="hero-dots"
        role="group"
        aria-label="Hero slides"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, i) => (
          <button
            key={`${slide.src}-${i}`}
            type="button"
            className={i === active ? "is-active" : undefined}
            aria-label={`Show slide ${i + 1} of ${slides.length}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </>
  );
}
