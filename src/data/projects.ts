import behanceData from "./behance-projects.json";

export interface Project {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  duration: string;
  tools: string[];
  tags: string[];
  results: { label: string; value: string }[];
  color: string;
  year: string;
  overview: string;
  challenge: string;
  research: string[];
  competitors: { name: string; note: string }[];
  personas: { name: string; role: string; goal: string; frustration: string }[];
  wireframeNotes: string[];
  designSystemNotes: string[];
  testingNotes: string[];
  outcome: string;
  lessons: string;
  coverImage: string;
  behanceUrl: string;
}

const INDUSTRY_COLORS: Record<string, string> = {
  Healthcare: "#2563EB",
  Fintech: "#7C3AED",
  "Mobile App": "#14B8A6",
  "Web Design": "#0EA5E9",
  "Food & Beverage": "#F59E0B",
  "Product Design": "#6366F1",
};

function buildCaseStudy(b: (typeof behanceData.projects)[number]): Project {
  const color = INDUSTRY_COLORS[b.industry] ?? "#2563EB";

  return {
    slug: b.slug,
    title: b.title,
    industry: b.industry,
    year: b.year,
    summary: b.summary,
    coverImage: b.coverImage,
    behanceUrl: b.behanceUrl,
    color,
    role: "Lead UI/UX Designer",
    duration: "4–8 weeks",
    tools: ["Figma", "FigJam", "Maze"],
    tags: b.tags,
    results: [
      { label: "Behance views", value: String(b.views) },
      { label: "Appreciations", value: String(b.appreciations) },
      { label: "Deliverables", value: "Full UI" },
    ],
    problem: `The client needed a modern, trustworthy digital experience for ${b.title} that would improve usability, strengthen brand credibility, and convert visitors into engaged users.`,
    solution: `Designed a clean, user-centered interface with clear information hierarchy, accessible typography, and a visual system aligned to the ${b.industry.toLowerCase()} domain — optimized for both desktop and mobile.`,
    overview: `${b.title} is a ${b.industry.toLowerCase()} design project focused on creating an intuitive, polished experience from research through high-fidelity UI. The work spans layout structure, visual design, and interaction patterns tailored to the product's audience.`,
    challenge: `Balancing clarity and visual appeal while meeting industry-specific expectations — ensuring the design feels premium, easy to navigate, and ready for development handoff.`,
    research: [
      "Reviewed competitor and reference products in the same industry.",
      "Mapped primary user tasks and prioritized the most critical flows.",
      "Defined layout patterns that reduce friction on key conversion paths.",
    ],
    competitors: [
      { name: "Industry leaders", note: "Strong visual polish but often dense navigation." },
      { name: "Local alternatives", note: "Functional layouts with inconsistent branding." },
    ],
    personas: [
      {
        name: "Primary user",
        role: "End customer",
        goal: "Complete their task quickly with confidence in the product.",
        frustration: "Cluttered screens and unclear next steps.",
      },
      {
        name: "Business stakeholder",
        role: "Client / product owner",
        goal: "A credible design that supports growth and trust.",
        frustration: "Previous designs looked outdated or generic.",
      },
    ],
    wireframeNotes: [
      "Structured key screens around a single primary action per view.",
      "Validated navigation depth before moving into visual design.",
    ],
    designSystemNotes: [
      "Established type scale, spacing rhythm, and reusable UI components in Figma.",
      "Applied consistent color, iconography, and button styles across all screens.",
    ],
    testingNotes: [
      "Reviewed flows for clarity and reduced steps where possible.",
      "Checked contrast, tap targets, and readability on mobile breakpoints.",
    ],
    outcome: `The final design delivers a cohesive, production-ready UI for ${b.title}, with a clear visual identity and flows built for real-world use.`,
    lessons: `Strong ${b.industry.toLowerCase()} products start with clarity — when hierarchy and trust signals are right, the interface feels simpler even with rich content.`,
  };
}

export const projects: Project[] = behanceData.projects.map(buildCaseStudy);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
