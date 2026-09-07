"use client";

import { useEffect, useRef, useState } from "react";
import { registerGSAP, gsap, isReducedMotion } from "@/lib/gsap";
import { profile } from "@/data/profile";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Australia/Melbourne",
        })
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    registerGSAP();
    const container = containerRef.current;
    if (!container) return;

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Set initial states
      tl.set(".hero-eyebrow", { opacity: 0, y: 20, filter: "blur(8px)" })
        .set(".hero-line", { opacity: 0, y: 60, filter: "blur(12px)" })
        .set(".hero-desc", { opacity: 0, y: 30 })
        .set(".hero-cta", { opacity: 0, y: 20 })
        .set(".hero-meta", { opacity: 0 })
        .set(".hero-abstract", { opacity: 0, scale: 0.95 })
        .set(".hero-side", { opacity: 0, x: 20 })
        .set(".hero-status", { opacity: 0 });

      // Staggered entrance
      tl.to(".hero-abstract", { opacity: 1, scale: 1, duration: 1.4 }, 0.1)
        .to(".hero-eyebrow", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.2)
        .to(".hero-line", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.12 }, 0.35)
        .to(".hero-desc", { opacity: 1, y: 0, duration: 0.7 }, 0.75)
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6 }, 0.9)
        .to(".hero-meta", { opacity: 1, duration: 0.6 }, 1.05)
        .to(".hero-side", { opacity: 1, x: 0, duration: 0.8 }, 1.1)
        .to(".hero-status", { opacity: 1, duration: 0.5 }, 1.2);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex flex-col justify-center overflow-hidden min-h-[100svh]"
    >
      {/* Background — abstract glow + grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="hero-absolute absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, var(--color-accent), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(var(--color-text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-tertiary) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="content-wide mx-auto w-full px-6 md:px-12 lg:px-16 relative z-10">
        <p className="hero-eyebrow text-eyebrow mb-6 md:mb-8">
          {profile.location} — {profile.status}
        </p>

        <h1 className="mb-8 md:mb-10">
          <span className="hero-line block text-display text-[var(--color-text-primary)]">
            {profile.firstName}
          </span>
          <span className="hero-line block text-display text-[var(--color-text-tertiary)]">
            {profile.lastName}
          </span>
        </h1>

        <div className="hero-desc max-w-[640px]">
          <p className="text-body-large text-[var(--color-text-secondary)] leading-relaxed">
            {profile.tagline}
          </p>
          <p className="text-body text-[var(--color-text-tertiary)] mt-3 max-w-[520px]">
            {profile.description}
          </p>
        </div>

        <div className="hero-cta flex items-center gap-6 mt-10 md:mt-12">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 text-[13px] font-mono tracking-wide text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-full px-6 py-3 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
          >
            View Work
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-meta absolute bottom-8 left-6 md:left-12 lg:left-16">
        <p className="text-[11px] font-mono text-[var(--color-text-tertiary)] tracking-wider uppercase">
          Scroll to explore
        </p>
      </div>

      <div className="hero-side absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent" />
        <p className="text-[10px] font-mono text-[var(--color-text-tertiary)] tracking-widest [writing-mode:vertical-lr]">
          Portfolio 2026
        </p>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      {/* JetBrains-style status bar */}
      <div className="hero-status absolute bottom-8 right-6 md:right-12 lg:right-16 hidden md:flex items-center gap-4 text-[10px] font-mono text-[var(--color-text-tertiary)]">
        <span>{time} AEST</span>
        <span className="w-[1px] h-3 bg-[var(--color-border)]" />
        <span>MEL</span>
      </div>
    </section>
  );
}
