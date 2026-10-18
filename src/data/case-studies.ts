// Real case-study details, added one project at a time.
// Key = project slug (see src/data/behance-projects.json). Every field is optional:
// a section on the project page only shows when you fill it in.
export interface CaseStudy {
  summary?: string;
  // Path inside public/, e.g. "videos/oladoc.mp4". Replaces the cover image everywhere once set.
  video?: string;
  role?: string;
  duration?: string;
  tools?: string[];
  problem?: string;
  solution?: string;
  outcome?: string;
  results?: { label: string; value: string }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  // "oladoc-healthcare-app-ui-ux-design": {
  //   summary: "One line on what you designed and for whom.",
  //   role: "Lead Product Designer",
  //   duration: "6 weeks",
  //   tools: ["Figma", "FigJam"],
  //   problem: "…",
  //   solution: "…",
  //   outcome: "…",
  //   results: [{ label: "Booking completion", value: "+18%" }],
  // },
};
