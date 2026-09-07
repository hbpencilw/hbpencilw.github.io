"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { registerGSAP, gsap, isReducedMotion } from "@/lib/gsap";

interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxText({
  children,
  className = "",
  speed = 0.3,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * -100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
