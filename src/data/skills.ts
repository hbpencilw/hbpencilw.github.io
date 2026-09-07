export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Data & Analytics",
    icon: "📊",
    skills: [
      "Power BI",
      "Tableau",
      "RFM Analysis",
      "Funnel Analysis",
      "Cohort / Retention",
      "Statistical Modelling",
    ],
  },
  {
    name: "Programming",
    icon: "⚡",
    skills: ["Python", "R", "SQL", "Swift / SwiftUI", "TypeScript", "React"],
  },
  {
    name: "Databases",
    icon: "🗄️",
    skills: [
      "PostgreSQL",
      "Oracle",
      "MongoDB",
      "SQLite",
      "Query Optimization",
    ],
  },
  {
    name: "Tools & Platforms",
    icon: "🛠️",
    skills: [
      "Next.js",
      "FastAPI",
      "Git / GitHub",
      "Docker",
      "Linux",
      "VS Code",
    ],
  },
  {
    name: "Cloud & APIs",
    icon: "☁️",
    skills: [
      "Azure AI",
      "REST APIs",
      "Web Scraping",
      "Whisper ASR",
      "OAuth / Auth Flows",
    ],
  },
];
