"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (registered) return;
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * Single source of truth for motion constants.
 * All components import from here. lib/motion.ts re-exports for backward compat.
 */
export const EASE = {
  outExpo: "expo.out",
  outQuart: "quart.out",
  inOutQuint: "quint.inOut",
  linear: "none",
} as const;

export const DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  medium: 0.5,
  slow: 0.8,
  cinematic: 1.2,
} as const;

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Detect mobile viewport — used for dual timeline decisions. */
export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export { gsap, ScrollTrigger };
