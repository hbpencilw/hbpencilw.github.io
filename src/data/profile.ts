export const profile = {
  name: "Hongbo Wang",
  firstName: "Hongbo",
  lastName: "Wang",
  tagline: "Business Analytics. Technology. Data.",
  description:
    "Business Analytics student at Monash University, building at the intersection of data, software, and business strategy.",
  location: "Melbourne, Australia",
  status: "Open to opportunities",
} as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;
