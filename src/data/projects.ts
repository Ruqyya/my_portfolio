import behanceData from "./behance-projects.json";
import { caseStudies, type CaseStudy } from "./case-studies";

export interface Project {
  id: number;
  slug: string;
  title: string;
  industry: string;
  summary: string;
  tags: string[];
  color: string;
  year: string;
  coverImage: string;
  behanceUrl: string;
  study: CaseStudy;
}

const INDUSTRY_COLORS: Record<string, string> = {
  Healthcare: "#0EA5E9",
  SaaS: "#6366F1",
  Fintech: "#0F172A",
  "Mobile App": "#14B8A6",
  "Web Design": "#0EA5E9",
  Dental: "#06B6D4",
  Veterinary: "#10B981",
  "Food & Beverage": "#F59E0B",
  "E-Commerce": "#EC4899",
  "Product Design": "#8B5CF6",
};

function build(b: (typeof behanceData.projects)[number]): Project {
  const study = caseStudies[b.slug] ?? {};
  return {
    id: b.id,
    slug: b.slug,
    title: b.title,
    industry: b.industry,
    year: b.year,
    summary: study.summary ?? b.tags.filter((t) => t !== "Case Study").join(" · "),
    coverImage: b.coverImage,
    behanceUrl: b.behanceUrl,
    color: INDUSTRY_COLORS[b.industry] ?? "#0EA5E9",
    tags: b.tags,
    study,
  };
}

export const projects: Project[] = behanceData.projects.map(build);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
