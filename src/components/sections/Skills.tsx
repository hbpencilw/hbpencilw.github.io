"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { skillCategories } from "@/data/skills";

/**
 * Skills — DENSE section. No pinned scenes, no huge scroll distances.
 * Each category = one content block with generous spacing.
 */
export function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="h-24 md:h-32" />

      <div className="content-normal mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="text-eyebrow mb-4">04 / Skills</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-section-title mb-16 md:mb-24">
            Technical
            <br />
            capabilities.
          </h2>
        </ScrollReveal>

        <div className="space-y-16 md:space-y-24">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal
              key={category.name}
              delay={catIndex * 0.06}
              className="group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-start">
                <div className="md:col-span-5">
                  <h3 className="text-[1.75rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-[var(--color-text-primary)] tracking-tight leading-none uppercase">
                    {category.name}
                  </h3>
                  <div className="h-[2px] w-0 bg-[var(--color-accent)] mt-3 group-hover:w-12 transition-all duration-700" />
                </div>

                <div className="md:col-span-7 flex flex-col gap-1.5 pt-1">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 group/skill"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)] group-hover/skill:bg-[var(--color-accent)] transition-colors duration-300 flex-shrink-0" />
                      <span
                        className="text-[0.95rem] md:text-[1.1rem] font-mono text-[var(--color-text-secondary)] group-hover/skill:text-[var(--color-text-primary)] transition-colors duration-300"
                        style={{
                          transitionDelay: `${skillIndex * 30}ms`,
                        }}
                      >
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="h-24 md:h-32" />
    </section>
  );
}
