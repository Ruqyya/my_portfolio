// Real case-study details, added one project at a time.
// Key = project slug (see src/data/behance-projects.json). Every field is optional:
// a section on the project page only shows when you fill it in.
export interface CaseStudy {
  summary?: string;
  // Path inside public/, e.g. "videos/oladoc.mp4". Replaces the cover image everywhere once set.
  video?: string;
  // Small silent loop used on cards and previews (keeps the page light). Falls back to `video`.
  preview?: string;
  // Still frame shown before the video plays, e.g. "videos/oladoc-poster.jpg".
  poster?: string;
  // Cover image for cards and lists, replacing the Behance cover, e.g. "videos/oladoc-cover.jpg".
  cover?: string;
  role?: string;
  duration?: string;
  tools?: string[];
  problem?: string;
  solution?: string;
  outcome?: string;
  results?: { label: string; value: string }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "oladoc-healthcare-app-ui-ux-design": {
    summary: "Patient app, doctor portal and front desk, designed end to end. 47 screens, 3 portals, 4 journeys.",
    video: "videos/oladoc.mp4",
    preview: "videos/oladoc-preview.mp4",
    poster: "videos/oladoc-poster.jpg",
    cover: "videos/oladoc-cover.jpg",
    results: [
      { label: "Screens", value: "47" },
      { label: "Portals", value: "3" },
      { label: "User journeys", value: "4" },
    ],
  },
  "marham-pk-healthcare-platform-redesign": {
    summary: "Web and mobile UX/UI redesign of the Marham.pk healthcare platform.",
    video: "videos/marham.mp4",
    preview: "videos/marham-preview.mp4",
    poster: "videos/marham-poster.jpg",
    cover: "videos/marham-cover.jpg",
  },
  "mint-dental-clinic-website-redesign": {
    summary: "Website redesign for Mint Dental London, a private dental practice.",
    video: "videos/mint.mp4",
    preview: "videos/mint-preview.mp4",
    poster: "videos/mint-poster.jpg",
    cover: "videos/mint-cover.jpg",
  },
  "sehat-kahani-telemedicine-ui-ux-design": {
    summary: "Telehealth website UI/UX design for Sehat Kahani.",
    video: "videos/sehat-kahani.mp4",
    preview: "videos/sehat-kahani-preview.mp4",
    poster: "videos/sehat-kahani-poster.jpg",
    cover: "videos/sehat-kahani-cover.jpg",
  },
  "victoria-road-dental-website-redesign": {
    summary: "Website UI/UX for Victoria Road Dental Practice in Exmouth, serving NHS and private patients.",
    video: "videos/victoria-road.mp4",
    preview: "videos/victoria-road-preview.mp4",
    poster: "videos/victoria-road-poster.jpg",
    cover: "videos/victoria-road-cover.jpg",
  },
  "zental-dental-luxury-website-ui-ux": {
    summary: "Website UI/UX for Zental, a private dental group.",
    video: "videos/zental.mp4",
    preview: "videos/zental-preview.mp4",
    poster: "videos/zental-poster.jpg",
    cover: "videos/zental-cover.jpg",
  },
  "bondvet-veterinary-website-ui-ux-design": {
    summary: "Landing page redesign for Bond Vet, a veterinary care brand.",
    video: "videos/bond-vet.mp4",
    preview: "videos/bond-vet-preview.mp4",
    poster: "videos/bond-vet-poster.jpg",
    cover: "videos/bond-vet-cover.jpg",
  },
  "lumina-dental-website-ui-ux-design": {
    summary: "Dental landing page design for Lumina Dental, built around full mouth rehabilitation.",
    video: "videos/lumina.mp4",
    preview: "videos/lumina-preview.mp4",
    poster: "videos/lumina-poster.jpg",
    cover: "videos/lumina-cover.jpg",
  },
  "goddard-veterinary-website-redesign": {
    summary: "Website redesign for Goddard Veterinary Group in London.",
    video: "videos/goddard.mp4",
    preview: "videos/goddard-preview.mp4",
    poster: "videos/goddard-poster.jpg",
    cover: "videos/goddard-cover.jpg",
  },
  "shumaila-s-london-clinic-website-redesign": {
    summary: "Website redesign for Shumaila's London, aesthetic and laser clinics in London and Essex.",
    video: "videos/shumailas.mp4",
    preview: "videos/shumailas-preview.mp4",
    poster: "videos/shumailas-poster.jpg",
    cover: "videos/shumailas-cover.jpg",
  },
  // "example-project-slug": {
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
