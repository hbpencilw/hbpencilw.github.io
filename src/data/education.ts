export interface Education {
  institution: string;
  degree: string;
  major: string;
  period: string;
  location: string;
  gpa?: string;
  highlights?: string[];
  coursework?: string[];
}

export const education: Education[] = [
  {
    institution: "Monash University",
    degree: "Bachelor of Business",
    major: "Business Analytics",
    period: "2024 — 2027 (Expected)",
    location: "Clayton, Melbourne",
    highlights: [
      "Transferred from Monash Malaysia campus",
      "S1 2026: FIT1043, FIT1045 completed",
    ],
    coursework: [
      "FIT2094 — Databases (Oracle + MongoDB)",
      "FIT2086 — Modelling for Data Analysis (R)",
      "ETC2420 — Statistical Analysis",
    ],
  },
];
