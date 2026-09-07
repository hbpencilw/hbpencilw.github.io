"use client";

import { useEffect, useRef } from "react";
import {
  registerGSAP,
  gsap,
  ScrollTrigger,
  isReducedMotion,
  isMobileViewport,
} from "@/lib/gsap";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { projects } from "@/data/projects";

/**
 * ProjectVisual — editorial, campaign-style abstract compositions.
 * Fewer UI chrome, larger focal objects, stronger spatial hierarchy.
 * NOT dashboard screenshots. NOT SaaS mocks.
 */
function ProjectVisual({
  project,
}: {
  project: (typeof projects)[0];
}) {
  const visuals: Record<string, React.ReactNode> = {
    farelens: (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Large route arc — the focal object */}
        <svg
          className="absolute w-[80%] max-w-[600px] h-auto opacity-[0.08]"
          viewBox="0 0 600 200"
          fill="none"
        >
          <path
            d="M 50 180 Q 300 -40 550 180"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[var(--color-text-primary)]"
          />
          <circle cx="50" cy="180" r="4" className="fill-[var(--color-accent)]" />
          <circle cx="550" cy="180" r="4" className="fill-[var(--color-accent)]" />
          <circle cx="300" cy="70" r="3" className="fill-[var(--color-text-primary)]" />
        </svg>

        <div className="relative z-10 text-center space-y-6">
          <p className="text-[0.65rem] md:text-[0.75rem] font-mono text-[var(--color-text-tertiary)] uppercase tracking-[0.2em]">
            Cross-border fare intelligence
          </p>
          <div className="flex items-baseline justify-center gap-2 md:gap-3">
            <span className="text-[2.5rem] md:text-[4.5rem] font-bold text-[var(--color-text-primary)] tracking-tighter leading-none">
              KUL
            </span>
            <svg
              className="w-6 h-6 md:w-10 md:h-10 text-[var(--color-accent)] flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="text-[2.5rem] md:text-[4.5rem] font-bold text-[var(--color-text-primary)] tracking-tighter leading-none">
              MEL
            </span>
          </div>
          <p className="text-[0.75rem] md:text-[0.875rem] font-mono text-[var(--color-text-tertiary)]">
            AirAsia · Trip.com · Skyscanner · 携程
          </p>
        </div>
      </div>
    ),
    echord: (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Large waveform — the focal object */}
        <div className="relative z-10 flex flex-col items-center gap-6 md:gap-10">
          <div className="flex items-center gap-[3px] md:gap-1 h-16 md:h-28">
            {[
              15, 25, 35, 50, 65, 80, 90, 100, 95, 85, 70, 55, 40, 30, 20, 15,
              20, 30, 45, 60, 75, 85, 90, 85, 75, 60, 45, 35, 25, 15,
            ].map((h, i) => (
              <div
                key={i}
                className="w-[2px] md:w-[3px] rounded-full"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    i < 15
                      ? "var(--color-accent)"
                      : "rgba(59, 130, 246, 0.3)",
                }}
              />
            ))}
          </div>
          <div className="text-center space-y-2">
            <p className="text-[1rem] md:text-[1.5rem] font-bold text-[var(--color-text-primary)] tracking-tight">
              Voice Workflow
            </p>
            <p className="text-[0.65rem] md:text-[0.75rem] font-mono text-[var(--color-text-tertiary)] uppercase tracking-[0.2em]">
              Provider abstraction · Swift 6 · macOS
            </p>
          </div>
        </div>
      </div>
    ),
  };

  const defaultVisual = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-[8rem] md:text-[12rem] font-bold text-[var(--color-surface-elevated)] select-none opacity-30">
        {project.name.charAt(0)}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-[var(--color-surface-tertiary)]">
      {visuals[project.id] || defaultVisual}
    </div>
  );
}

export function Projects() {
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (isReducedMotion()) return;

    const mobile = isMobileViewport();
    const container = featuredRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // P3: Transition zone — scroll-driven background reveal
      const tzBg = document.querySelector(".transition-bg") as HTMLElement;
      const tzTitle = document.querySelector(".transition-title") as HTMLElement;
      if (tzBg && tzTitle) {
        gsap.to(tzBg, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".transition-zone",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
        gsap.fromTo(
          tzTitle,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ".transition-zone",
              start: "top 60%",
              end: "center center",
              scrub: 0.3,
            },
          }
        );
      }

      const cards = container.querySelectorAll(".featured-card");
      cards.forEach((card) => {
        const img = card.querySelector(".featured-image") as HTMLElement;
        const caption = card.querySelector(".featured-caption") as HTMLElement;
        if (!img) return;

        gsap.fromTo(
          img,
          { scale: mobile ? 0.97 : 0.92, borderRadius: "28px" },
          {
            scale: 1,
            borderRadius: "12px",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 20%",
              scrub: 0.5,
            },
          }
        );

        if (caption) {
          gsap.fromTo(
            caption,
            { opacity: 0, y: mobile ? 20 : 30 },
            {
              opacity: 1,
              y: 0,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top 60%",
                end: "top 20%",
                scrub: 0.3,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const secondaryProjects = projects.filter((p) => !p.featured);

  return (
    <>
      {/* P3: Transition zone — dark → light via scroll-driven background */}
      <div
        ref={useRef<HTMLDivElement>(null)}
        className="relative h-[50vh] md:h-[80vh] transition-zone"
        aria-hidden="true"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div className="transition-bg absolute inset-0" />
          <p className="relative z-10 text-headline text-[var(--color-text-primary)] transition-title opacity-0">
            Selected
            <br />
            work.
          </p>
        </div>
      </div>

      {/* P4: Projects section — light theme */}
      <section id="projects" className="relative bg-[var(--color-surface-warm)]">
        <div className="h-24 md:h-40" />

        <div className="content-wide mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-eyebrow mb-4 text-[var(--color-text-dark-secondary)]">
              03 / Projects
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-section-title mb-16 md:mb-24 text-[var(--color-text-dark)]">
              Selected
              <br />
              work.
            </h2>
          </ScrollReveal>

          <div ref={featuredRef} className="space-y-24 md:space-y-40">
            {featuredProjects.map((project, i) => (
              <div key={project.id} className="featured-card relative">
                <div className="featured-image relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[28px] border border-[var(--color-border-light)]">
                  <ProjectVisual project={project} />
                </div>

                <div className="featured-caption mt-6 md:mt-8 px-2 md:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                    <div className="md:col-span-8">
                      <p className="text-eyebrow mb-2 text-[var(--color-text-dark-secondary)]">
                        {project.year} — {project.role}
                      </p>
                      <h3 className="text-section-title text-[var(--color-text-dark)]">
                        {project.name}
                      </h3>
                      <p className="text-body-large text-[var(--color-text-dark-secondary)] mt-3 max-w-[540px]">
                        {project.description}
                      </p>
                    </div>
                    <div className="md:col-span-4 flex flex-col justify-end">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono tracking-wide text-[var(--color-text-dark-secondary)] border border-[var(--color-border-light)] rounded-full px-3 py-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {secondaryProjects.length > 0 && (
            <div className="mt-20 md:mt-32">
              <ScrollReveal>
                <p className="text-eyebrow mb-8 text-[var(--color-text-dark-secondary)]">
                  Also built
                </p>
              </ScrollReveal>
              <div className="space-y-0 divide-y divide-[var(--color-border-light)]">
                {secondaryProjects.map((project, index) => (
                  <ScrollReveal key={project.id} delay={index * 0.1}>
                    <div className="group py-6 md:py-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-4">
                          <h3 className="text-[1.25rem] md:text-[1.5rem] font-semibold text-[var(--color-text-dark)] group-hover:translate-x-1 transition-transform duration-300">
                            {project.name}
                          </h3>
                          <span className="text-caption text-[var(--color-text-dark-secondary)]">
                            {project.year}
                          </span>
                        </div>
                        <p className="text-body text-[var(--color-text-dark-secondary)] mt-1">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 md:flex-shrink-0">
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono tracking-wide text-[var(--color-text-dark-secondary)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-24 md:h-40" />
      </section>
    </>
  );
}
