export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: "gt-audit",
    company: "Grant Thornton",
    role: "Financial Audit Intern",
    period: "2025 — 2026",
    location: "China",
    description:
      "Financial audit engagements for mid-market enterprises, performing substantive testing, data extraction, and analytical procedures.",
    highlights: [
      "Data-driven audit procedures using SQL and Python",
      "Supported audit teams across multiple engagement groups",
    ],
    tags: ["Audit", "SQL", "Python", "Data Analysis"],
  },
  {
    id: "monash-tutor",
    company: "Monash University",
    role: "Peer Tutor — Data Analytics",
    period: "2026",
    location: "Melbourne, Australia",
    description:
      "Peer tutoring for undergraduate data analytics courses — SQL, R, and statistical modelling.",
    highlights: [
      "Weekly tutoring sessions for analytics students",
      "Created practice datasets and guided analytical problem-solving",
    ],
    tags: ["Teaching", "SQL", "R", "Statistics"],
  },
];
