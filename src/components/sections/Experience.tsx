"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-[var(--color-surface-secondary)]"
    >
      <div className="h-32 md:h-48" />

      <div className="content-normal mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="text-eyebrow mb-4">02 / Experience</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-section-title mb-16 md:mb-24">
            Where I&apos;ve
            <br />
            contributed.
          </h2>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-[var(--color-border)]" />

          {experiences.map((exp, index) => (
            <ScrollReveal
              key={exp.id}
              delay={index * 0.15}
              direction="left"
              className="relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pb-20 md:pb-28 last:pb-0 group">
                {/* Timeline indicator */}
                <div className="absolute left-0 md:left-8 top-1 -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-surface-secondary)] border border-[var(--color-text-tertiary)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-colors duration-500" />
                </div>

                {/* Period */}
                <div className="md:col-span-3 pl-6 md:pl-20">
                  <p className="text-caption text-[var(--color-text-tertiary)] mt-1">
                    {exp.period}
                  </p>
                  <p className="text-caption text-[var(--color-text-tertiary)] mt-0.5">
                    {exp.location}
                  </p>
                </div>

                {/* Company + Role */}
                <div className="md:col-span-4 pl-6 md:pl-0">
                  <h3 className="text-[1.5rem] md:text-[1.75rem] font-semibold text-[var(--color-text-primary)] group-hover:translate-x-1 transition-transform duration-300">
                    {exp.company}
                  </h3>
                  <p className="text-body text-[var(--color-accent)] mt-1">
                    {exp.role}
                  </p>
                </div>

                {/* Description */}
                <div className="md:col-span-5 pl-6 md:pl-0">
                  <p className="text-body text-[var(--color-text-secondary)] mb-4">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[0.9rem] text-[var(--color-text-tertiary)]"
                      >
                        <span className="text-[var(--color-accent)] mt-0.5 text-xs">
                          →
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono tracking-wide text-[var(--color-text-tertiary)] border border-[var(--color-border)] rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="h-32 md:h-48" />
    </section>
  );
}
