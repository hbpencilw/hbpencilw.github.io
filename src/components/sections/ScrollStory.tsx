"use client";

import { useEffect, useRef } from "react";
import {
  registerGSAP,
  gsap,
  ScrollTrigger,
  isReducedMotion,
  isMobileViewport,
} from "@/lib/gsap";

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const container = containerRef.current;
    if (!container) return;
    if (isReducedMotion()) return;

    const mobile = isMobileViewport();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: ".scroll-story-pin",
          scrub: mobile ? 0.3 : 0.8,
        },
      });

      if (mobile) {
        // ── Mobile: 150vh, reduced blur, faster beats ──
        tl.fromTo(
          ".story-beat-1",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.8 },
          0
        )
          .to(
            ".story-beat-1",
            { opacity: 0, y: -40, duration: 0.4 },
            0.7
          )
          .fromTo(
            ".story-beat-2",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.9
          )
          .to(
            ".scroll-story-bg",
            { backgroundColor: "#111111", duration: 1.0 },
            0.7
          )
          .to(
            ".story-beat-2",
            { opacity: 0, y: -40, duration: 0.4 },
            1.6
          )
          .fromTo(
            ".story-beat-3",
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.6 },
            1.8
          )
          .to(
            ".scroll-story-bg",
            { backgroundColor: "#0a0a0a", duration: 1.0 },
            1.8
          )
          .to(
            ".story-beat-3",
            { opacity: 0, scale: 1.03, duration: 0.4 },
            2.5
          );
      } else {
        // ── Desktop: 250vh, full blur effects ──
        tl.fromTo(
          ".story-beat-1",
          { opacity: 0, scale: 0.85, filter: "blur(8px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 },
          0
        )
          .to(
            ".story-beat-1",
            { opacity: 0, y: -80, scale: 1.05, filter: "blur(4px)", duration: 0.5 },
            0.8
          )
          .fromTo(
            ".story-beat-2",
            { opacity: 0, y: 60, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
            1.0
          )
          .to(
            ".scroll-story-bg",
            { backgroundColor: "#111111", duration: 1.5 },
            0.8
          )
          .to(
            ".story-beat-2",
            { opacity: 0, y: -60, filter: "blur(4px)", duration: 0.5 },
            1.8
          )
          .fromTo(
            ".story-beat-3",
            { opacity: 0, scale: 0.9, filter: "blur(8px)" },
            { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8 },
            2.0
          )
          .to(
            ".scroll-story-bg",
            { backgroundColor: "#0a0a0a", duration: 1.5 },
            2.0
          )
          .to(
            ".story-beat-3",
            { opacity: 0, scale: 1.08, filter: "blur(6px)", duration: 0.6 },
            3.0
          );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative scroll-story-container"
    >
      <div className="scroll-story-pin sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="scroll-story-bg absolute inset-0 bg-[var(--color-surface-primary)]" />

        <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto">
          <div className="story-beat-1 absolute inset-0 flex items-center justify-center">
            <h2 className="text-headline">Data tells stories.</h2>
          </div>

          <div className="story-beat-2 absolute inset-0 flex items-center justify-center opacity-0">
            <div className="max-w-[600px]">
              <p className="text-eyebrow mb-6">The mission</p>
              <p className="text-section-title text-[var(--color-text-secondary)]">
                I translate numbers into
                <br />
                decisions.
              </p>
            </div>
          </div>

          <div className="story-beat-3 absolute inset-0 flex items-center justify-center opacity-0">
            <div className="max-w-[600px]">
              <p className="text-headline text-[var(--color-text-secondary)]">
                Between analytics
                <br />
                <span className="text-[var(--color-accent)]">
                  and engineering.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-text-tertiary)] to-transparent" />
        </div>
      </div>
    </div>
  );
}
