"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { registerGSAP, gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 40,
  threshold = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    if (isReducedMotion()) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const from: gsap.TweenVars = { opacity: 0 };
      if (direction === "up") from.y = distance;
      else if (direction === "left") from.x = -distance;
      else if (direction === "right") from.x = distance;
      else if (direction === "scale") from.scale = 0.92;

      gsap.set(el, from);

      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - threshold * 100}%`,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [direction, delay, duration, distance, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
