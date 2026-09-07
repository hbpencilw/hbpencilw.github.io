"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ParallaxText } from "@/components/motion/ParallaxText";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* Section spacer */}
      <div className="h-32 md:h-48" />

      <div className="content-normal mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="text-eyebrow mb-4">01 / About</p>
        </ScrollReveal>

        {/* Editorial layout: giant background word + foreground narrative */}
        <div className="relative">
          {/* Giant background text with parallax */}
          <ParallaxText
            speed={0.15}
            className="absolute -top-16 md:-top-24 left-0 right-0 pointer-events-none select-none"
          >
            <span
              className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-bold text-[var(--color-text-primary)] opacity-[0.03] leading-none tracking-tighter"
              aria-hidden="true"
            >
              ABOUT
            </span>
          </ParallaxText>

          {/* Main content */}
          <div className="relative z-10 pt-16 md:pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left: key facts */}
              <div className="lg:col-span-4">
                <ScrollReveal delay={0.1}>
                  <div className="space-y-6">
                    <div>
                      <p className="text-eyebrow mb-1">Currently</p>
                      <p className="text-body text-[var(--color-text-secondary)]">
                        Bachelor of Business — Business Analytics
                      </p>
                    </div>
                    <div>
                      <p className="text-eyebrow mb-1">Based in</p>
                      <p className="text-body text-[var(--color-text-secondary)]">
                        Melbourne, Australia
                      </p>
                    </div>
                    <div>
                      <p className="text-eyebrow mb-1">Focus</p>
                      <p className="text-body text-[var(--color-text-secondary)]">
                        Data Analytics, Business Intelligence, Software
                        Development
                      </p>
                    </div>
                    <div>
                      <p className="text-eyebrow mb-1">Interests</p>
                      <p className="text-body text-[var(--color-text-secondary)]">
                        Cross-border fintech, voice AI, flight data
                        intelligence
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: narrative */}
              <div className="lg:col-span-8">
                <ScrollReveal delay={0.2}>
                  <div className="max-w-[640px]">
                    <h2 className="text-section-title mb-8">
                      I bridge data,
                      <br />
                      software, and business.
                    </h2>
                    <div className="space-y-6 text-body-large text-[var(--color-text-secondary)]">
                      <p>
                        I&apos;m a Business Analytics student at Monash University
                        who builds tools at the intersection of data analysis
                        and software engineering. My work spans from financial
                        audit data pipelines to cross-border flight price
                        intelligence platforms.
                      </p>
                      <p>
                        Coming from a transfer between Monash Malaysia and
                        Clayton, I bring a cross-cultural perspective to
                        technology. I&apos;m drawn to problems where data meets
                        real business decisions — whether that&apos;s automating
                        audit reconciliation, building real-time fare monitoring
                        systems, or creating voice workflow tools.
                      </p>
                      <p>
                        When I&apos;m not coding, I&apos;m exploring Melbourne&apos;s
                        food scene, tracking market movements, or deep in
                        research rabbit holes on data infrastructure.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-32 md:h-48" />
    </section>
  );
}
