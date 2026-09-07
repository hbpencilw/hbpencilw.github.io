"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function Contact() {
  return (
    <section id="contact" className="relative">
      <div className="h-24 md:h-32" />

      <div className="content-normal mx-auto px-6 md:px-12 text-center">
        <ScrollReveal>
          <p className="text-eyebrow mb-4">06 / Contact</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-headline mt-6 mb-6">
            Let&apos;s build
            <br />
            something.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-body-large text-[var(--color-text-secondary)] max-w-[480px] mx-auto mb-10">
            Open to internships, graduate roles, and collaborations
            in data analytics and software development.
          </p>
        </ScrollReveal>
      </div>

      <div className="h-24 md:h-32" />
    </section>
  );
}
