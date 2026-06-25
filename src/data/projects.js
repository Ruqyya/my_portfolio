/**
 * Portfolio projects — add new entries here to publish case studies.
 * Each project needs: id, slug, title, category, featured, thumbnail, gallery, etc.
 */
const projects = [
  {
    id: "healthcare-retention-redesign",
    slug: "healthcare-retention-redesign",
    title: "Healthcare App Retention Redesign",
    category: "Healthcare",
    categories: ["Healthcare", "Mobile App"],
    featured: true,
    year: "2023",
    client: "AppSol360",
    deliverables: ["UX Flow Optimization", "Mobile UI Design", "User Research"],
    tools: ["Figma", "Adobe XD", "InVision"],
    thumbnail: null,
    cardSize: "large",
    description:
      "Increased healthcare app user retention by 65% through strategic UX improvements.",
    excerpt:
      "Strategic UX improvements and optimized user flows that dramatically improved retention for a healthcare mobile app.",
    process: `The healthcare app was losing users after the first few sessions — engagement dropped sharply once users hit complex onboarding and appointment flows. I started with user research and journey mapping to identify the highest-friction moments.

I redesigned the core user flows with progressive disclosure, clearer health-data entry patterns, and mobile-first navigation that reduced cognitive load. Working closely with the Flutter development team, I ensured pixel-perfect implementation across devices. The result was a 65% increase in user retention and significantly fewer support tickets related to navigation confusion.`,
    gallery: [],
  },
  {
    id: "ecommerce-conversion-redesign",
    slug: "ecommerce-conversion-redesign",
    title: "E-commerce Conversion Redesign",
    category: "E-commerce",
    categories: ["E-commerce", "Web App"],
    featured: true,
    year: "2023",
    client: "AppSol360",
    deliverables: ["Conversion-Focused UI", "A/B Test Designs", "Design System"],
    tools: ["Figma", "Adobe XD"],
    thumbnail: null,
    cardSize: "medium",
    description:
      "Boosted monthly revenue by $50K+ with a 40% conversion rate increase.",
    excerpt:
      "A conversion-focused e-commerce redesign that turned browsing into buying — backed by A/B testing and user research.",
    process: `The e-commerce platform had traffic but wasn't converting. I conducted competitive analysis and A/B testing on key checkout and product-detail flows to understand where users dropped off.

I redesigned the product browsing experience, streamlined checkout to fewer steps, and introduced trust signals and clearer CTAs at decision points. The conversion-focused redesign achieved a 40% increase in conversion rates and boosted monthly revenue by over $50K. Component patterns from this project were added to a shared Figma library used across future e-commerce clients.`,
    gallery: [],
  },
  {
    id: "enterprise-design-system",
    slug: "enterprise-design-system",
    title: "Enterprise Design System",
    category: "Design Systems",
    categories: ["Design Systems", "SaaS"],
    featured: true,
    year: "2024",
    client: "SQSOL",
    deliverables: ["Scalable Design System", "High-Fidelity Prototypes", "Design Standards"],
    tools: ["Figma", "Adobe XD"],
    thumbnail: null,
    cardSize: "small",
    description:
      "Scalable design systems and standards for enterprise clients across the UK.",
    excerpt:
      "Led end-to-end UX/UI for enterprise clients — scalable systems, high-fidelity prototypes, and mentored junior designers.",
    process: `Enterprise clients needed consistency at scale — multiple products with different designers producing inconsistent UI. I led the creation of a comprehensive design system in Figma with reusable components, design tokens, and documented interaction patterns.

I established design standards across the team, mentored junior designers on modern UX methodologies, and ran usability testing to validate system components before rollout. The system now serves 10+ products, improving design consistency and reducing design-to-development time significantly.`,
    gallery: [],
  },
  {
    id: "67-challenge-edtech",
    slug: "67-challenge-edtech",
    title: "67 Challenge — Kids EdTech App",
    category: "EdTech",
    categories: ["EdTech", "Mobile App"],
    featured: true,
    year: "2026",
    client: "JJLoLo",
    deliverables: ["Mobile UI Design", "Onboarding Flows", "Gamified Dashboard"],
    tools: ["Figma", "Principle"],
    thumbnail: "/images/projects/67-challenge/dashboard.png",
    cardSize: "large",
    description:
      "Daily math and science missions for kids — playful UI with streak tracking and grade-level onboarding.",
    excerpt:
      "A gamified learning app where Prof. Prime guides kids through daily missions, science labs, and cipher challenges.",
    process: `The goal was to make daily math and science practice feel like an adventure, not homework. I designed a dark-mode group selection screen with bold orange branding, a kid-friendly profile creation flow with grade-level segmentation, and a mission dashboard that uses streaks, points, and character-driven storytelling to keep engagement high.

Every screen balances playfulness with clarity — large touch targets, readable type, and a navigation system that scales as more modules unlock. The visual language uses electric orange as a single accent against neutral dark surfaces, keeping the experience energetic without visual noise.`,
    gallery: [
      {
        src: "/images/projects/67-challenge/group-select.png",
        alt: "67 Challenge app group selection screen with dark theme and orange star branding",
        width: 1290,
        height: 2796,
      },
      {
        src: "/images/projects/67-challenge/landing.png",
        alt: "67 Challenge landing page with sign-up and subscription options",
        width: 1290,
        height: 2796,
      },
      {
        src: "/images/projects/67-challenge/create-profile.png",
        alt: "Create profile screen with grade level selection buttons in orange",
        width: 1290,
        height: 2796,
      },
      {
        src: "/images/projects/67-challenge/dashboard.png",
        alt: "Gamified dashboard showing daily mission, streak counter, and quick launch modules",
        width: 1290,
        height: 2796,
      },
      {
        src: "/images/projects/67-challenge/mission.png",
        alt: "Today's mission screen with Prof. Prime character and challenge task list",
        width: 1290,
        height: 2796,
      },
    ],
  },
  {
    id: "bilingual-language-app",
    slug: "bilingual-language-app",
    title: "Bilingual Language Learning App",
    category: "Mobile App",
    categories: ["Mobile App", "EdTech"],
    featured: false,
    year: "2026",
    client: "Personal Project",
    deliverables: ["Mobile UI Design", "Course Explorer", "Dark Mode Interface"],
    tools: ["Figma", "Canva"],
    thumbnail: "/images/projects/language-app/explore.png",
    cardSize: "medium",
    description:
      "Dark-mode course explorer for Urdu-to-English fluency practice with locked progression states.",
    excerpt:
      "A bilingual learning platform UI — course cards, progression locks, and a confident typographic hierarchy.",
    process: `I designed an Explore screen for a language learning product focused on Urdu-to-English fluency. The interface uses a deep dark palette with electric green CTAs and purple accent highlights for navigation states.

Course cards communicate progression clearly — locked states, bilingual labels, and a single "Continue" action per card. The bottom navigation keeps Explore, Library, and Profile within thumb reach. Typography does the heavy lifting: oversized headlines paired with restrained body copy for a premium, focused learning environment.`,
    gallery: [
      {
        src: "/images/projects/language-app/explore.png",
        alt: "Dark mode language learning app explore screen with course cards and green continue buttons",
        width: 1290,
        height: 2796,
      },
    ],
  },
  {
    id: "tax-onboarding-flow",
    slug: "tax-onboarding-flow",
    title: "Multi-Step Tax Onboarding Flow",
    category: "SaaS",
    categories: ["SaaS", "Web App"],
    featured: false,
    year: "2026",
    client: "SaaS Client",
    deliverables: ["Multi-Step Form UI", "Progress Stepper", "Validation States"],
    tools: ["Figma", "Adobe XD"],
    thumbnail: "/images/projects/tax-onboarding/federal-tax.png",
    cardSize: "small",
    description:
      "Six-step tax filing wizard with progress tracking, W-4 form mapping, and accessible form patterns.",
    excerpt:
      "A complex payroll tax onboarding flow broken into scannable steps — welcome, personal info, federal tax, state tax, payment, documents.",
    process: `Tax onboarding is inherently complex — users need guidance without feeling overwhelmed. I designed a six-step progress stepper that maps directly to real tax filing stages, with each step focused on a single decision cluster.

Form sections mirror W-4 structure (filing status, multiple jobs, exemptions, adjustments) with clear labels and inline validation. Error states are prominent but non-blocking, giving users a path forward. The layout works across desktop and mobile viewports with consistent spacing and touch-friendly controls.`,
    gallery: [
      {
        src: "/images/projects/tax-onboarding/federal-tax.png",
        alt: "Desktop tax onboarding step 3 federal tax form with progress stepper",
        width: 1290,
        height: 2796,
      },
      {
        src: "/images/projects/tax-onboarding/federal-tax-mobile.png",
        alt: "Mobile view of federal tax form with filing status dropdown and adjustment fields",
        width: 1290,
        height: 2796,
      },
    ],
  },
  {
    id: "myriad-campus-app",
    slug: "myriad-campus-app",
    title: "The Myriad — Campus App UI",
    category: "Mobile App",
    categories: ["Mobile App"],
    featured: false,
    year: "2026",
    client: "The Myriad",
    deliverables: ["Location Finder UI", "Support Contact Flow", "Bottom Navigation"],
    tools: ["Figma"],
    thumbnail: "/images/projects/myriad-app/locate-us.png",
    cardSize: "medium",
    description:
      "Campus location finder with support contact cards for Dubai and Muscat locations.",
    excerpt:
      "Clean card-based location UI with iconography, chevron navigation, and a five-tab bottom nav.",
    process: `The Myriad needed a simple way for students and parents to find campus locations across Dubai and Muscat. I designed a card-based Locate Us screen with building icons, location subtitles, and a dedicated support contact entry.

The bottom navigation anchors five core sections — Home, Account, Events, Notifications, and Locate Us — with the active state highlighted in brand red. The layout prioritizes scannability: one action per card, generous padding, and a visual hierarchy that works at a glance.`,
    gallery: [
      {
        src: "/images/projects/myriad-app/locate-us.png",
        alt: "The Myriad campus app locate us screen with Dubai and Muscat location cards",
        width: 1290,
        height: 2796,
      },
    ],
  },
];

/** All unique categories for filter pills */
export const categories = [
  "All",
  ...new Set(projects.flatMap((p) => p.categories)),
];

export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug) => {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
};

export const featuredProjects = projects.filter((p) => p.featured);

export default projects;
