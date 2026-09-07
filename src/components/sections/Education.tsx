"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ParallaxText } from "@/components/motion/ParallaxText";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="relative overflow-hidden">
      <div className="h-32 md:h-48" />

      <div className="content-normal mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="text-eyebrow mb-4">05 / Education</p>
        </ScrollReveal>

        {education.map((edu) => (
          <div key={edu.institution} className="relative">
            {/* Giant background institution name with parallax */}
            <ParallaxText
              speed={0.1}
              className="absolute -top-8 md:-top-16 left-0 right-0 pointer-events-none select-none overflow-hidden"
            >
              <span
                className="text-[4rem] md:text-[7rem] lg:text-[9rem] font-bold text-[var(--color-text-primary)] opacity-[0.04] leading-none tracking-tighter whitespace-nowrap"
                aria-hidden="true"
              >
                {edu.institution.toUpperCase()}
              </span>
            </ParallaxText>

            <div className="relative z-10 pt-20 md:pt-28">
              <ScrollReveal delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                  {/* Left: metadata */}
                  <div className="md:col-span-4">
                    <p className="text-caption text-[var(--color-text-tertiary)]">
                      {edu.period}
                    </p>
                    <p className="text-caption text-[var(--color-text-tertiary)] mt-1">
                      {edu.location}
                    </p>
                  </div>

                  {/* Right: details */}
                  <div className="md:col-span-8">
                    <h3 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-text-primary)] tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-body-large text-[var(--color-accent)] mt-2">
                      {edu.major}
                    </p>

                    {edu.highlights && (
                      <ul className="mt-6 space-y-2">
                        {edu.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-body text-[var(--color-text-tertiary)]"
                          >
                            <span className="text-[var(--color-accent)] mt-0.5 text-xs">
                              →
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {edu.coursework && (
                      <div className="mt-8">
                        <p className="text-eyebrow mb-3">Selected Coursework</p>
                        <div className="space-y-2">
                          {edu.coursework.map((course, i) => (
                            <p
                              key={i}
                              className="text-[0.9rem] font-mono text-[var(--color-text-tertiary)]"
                            >
                              {course}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        ))}
      </div>

      <div className="h-32 md:h-48" />
    </section>
  );
}
