import { Navigation } from "@/components/navigation/Navigation";
import { Hero } from "@/components/sections/Hero";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { About } from "@/components/sections/About";
import { AnalyticsWorkspace } from "@/components/sections/AnalyticsWorkspace";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/**
 * Section rhythm:
 *
 * Hero          IMMERSIVE (dark)    Peak 1
 * ScrollStory   IMMERSIVE (dark)
 * About         QUIET (dark)
 * Analytics     IMMERSIVE (dark)    Peak 2
 * Projects      IMMERSIVE (light)   Peak 3 — dark→light transition
 * Skills        DENSE (dark)
 * Education     QUIET (dark)
 * Contact       IMMERSIVE (dark)
 * Footer        (dark)
 *
 * Note: Experience section hidden — no confirmed experiences yet.
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ScrollStory />
        <About />
        <AnalyticsWorkspace />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
