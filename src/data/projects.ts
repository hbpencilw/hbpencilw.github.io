export interface Project {
  id: string;
  name: string;
  year: string;
  role: string;
  description: string;
  longDescription: string;
  tech: string[];
  featured: boolean;
  category: "data" | "web" | "tool" | "analysis";
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
}

export const projects: Project[] = [
  {
    id: "farelens",
    name: "Farelens",
    year: "2026",
    role: "Full-Stack Developer",
    description:
      "Intelligent flight price monitoring platform for cross-border fare arbitrage across Southeast Asian routes.",
    longDescription:
      "Built with Next.js, React, and FastAPI + PostgreSQL, Farelens monitors real-time airfare data from AirAsia, Trip.com, Skyscanner, and Ctrip, surfacing price anomalies and arbitrage opportunities across KUL, MEL, SYD, SIN, BKK, and HKG routes.",
    tech: ["Next.js", "React", "FastAPI", "PostgreSQL", "Python", "Docker"],
    featured: true,
    category: "web",
    imageUrl: "/projects/farelens.png",
  },
  {
    id: "echord",
    name: "Echord",
    year: "2026",
    role: "Lead Developer",
    description:
      "macOS-first cross-platform voice workflow tool with provider abstraction and Apple speech synthesis.",
    longDescription:
      "A Swift 6 / SwiftUI application designed for voice-centric workflows. Features a provider abstraction layer supporting multiple TTS engines, with an incremental delivery strategy targeting a complete voice workflow in v0.0.1 before expanding to Apple ecosystem.",
    tech: ["Swift 6", "SwiftUI", "AVSpeechSynthesizer", "macOS"],
    featured: true,
    category: "tool",
    imageUrl: "/projects/echord.png",
  },
  {
    id: "concert-master",
    name: "Concert Master",
    year: "2026",
    role: "Developer",
    description:
      "Ticket acquisition bot supporting Damai, Maoyan, and Ticketmaster platforms.",
    longDescription:
      "Multi-platform ticket monitoring and acquisition tool with architecture supporting real-time event detection, seat selection automation, and parallel request handling across international ticketing platforms.",
    tech: ["Python", "Selenium", "API Integration", "Async"],
    featured: false,
    category: "tool",
  },
  {
    id: "investoid",
    name: "Investoid",
    year: "2025",
    role: "Developer",
    description:
      "macOS equity analysis application for US stock market intelligence.",
    longDescription:
      "Desktop application providing stock screening, portfolio tracking, and fundamental analysis tools for US equities. Built with a focus on clean data presentation and analytical workflows.",
    tech: ["Swift", "macOS", "Charts", "API Integration"],
    featured: false,
    category: "analysis",
  },
  {
    id: "reddit-scraper",
    name: "Reddit Data Pipeline",
    year: "2025",
    role: "Data Engineer",
    description:
      "Multi-layer anti-scraping research pipeline for academic data collection.",
    longDescription:
      "Researched and implemented six layers of Reddit anti-scraping countermeasures. Optimal solution: browser_cookie3 + OAuth API approach. Completed data collection for ETC2420 and FIT2094 academic research projects using PullPush API.",
    tech: ["Python", "Reddit API", "OAuth", "Data Pipeline"],
    featured: false,
    category: "data",
  },
];
