export const stats = [
  { label: "Years Experience", value: 6, suffix: "+" },
  { label: "Projects Delivered", value: 120, suffix: "+" },
  { label: "Happy Clients", value: 60, suffix: "+" },
  { label: "Design Awards", value: 18, suffix: "" },
];

export const numbersSection = [
  { label: "Projects", value: 120, suffix: "+" },
  { label: "Happy Clients", value: 60, suffix: "+" },
  { label: "Years Experience", value: 6, suffix: "+" },
  { label: "Awards", value: 18, suffix: "" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
];

export const skillGroups = [
  {
    category: "UX",
    color: "#0EA5E9",
    items: ["User Research", "Personas", "Journey Mapping", "Information Architecture"],
  },
  {
    category: "UI",
    color: "#0F172A",
    items: ["Visual Design", "Design Systems", "Accessibility", "Responsive Design"],
  },
  {
    category: "Tools",
    color: "#14B8A6",
    items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Miro", "FigJam", "Jira", "Notion"],
  },
  {
    category: "Collaboration",
    color: "#0EA5E9",
    items: ["Agile", "Scrum", "Product Management", "Stakeholder Communication"],
  },
];

export const aboutFocus = [
  "Product Designer",
  "Healthcare Expert",
  "SaaS Expert",
  "UX Research",
  "UI Design",
  "Design Systems",
  "Wireframing",
  "Prototyping",
  "User Testing",
  "Product Strategy",
];

// Copied from LinkedIn (linkedin.com/in/ghulamruqyya) on 23 Oct 2026, in LinkedIn's order.
export interface Role {
  role: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  summary?: string;
  points: string[];
}

export const experience: Role[] = [
  {
    role: "Senior Product Designer (UI/UX) - Healthcare & SaaS",
    company: "SQSOL",
    type: "Full-time",
    period: "Jan 2024 — Present",
    duration: "2 yrs 10 mos",
    location: "Remote",
    summary: "Lead product designer for healthcare and B2B SaaS products, owning UX from research to shipped UI.",
    points: [
      "Ran end-to-end UX (research, wireframes, prototypes, and production UI) for complex healthcare and SaaS workflows.",
      "Converted legacy screens into a responsive, WCAG-conscious design system that keeps the product consistent as it scales.",
      "Streamlined design-to-dev handoff with Figma Dev Mode and reusable component libraries, cutting back-and-forth with engineering.",
    ],
  },
  {
    role: "Freelance Product Designer — Healthcare & SaaS (Fiverr)",
    company: "Fiverr",
    type: "Self-employed",
    period: "Aug 2021 — Present",
    duration: "5 yrs 3 mos",
    location: "Remote",
    points: [
      "Delivered UI/UX projects for international healthcare and SaaS clients, earning a 5-star rating and repeat business.",
      "Redesigned onboarding and signup flows to make products easier to adopt.",
      "Managed multiple client projects with consistent, on-time delivery.",
    ],
  },
  {
    role: "Senior Product Designer (UI/UX) - Healthcare",
    company: "oladoc",
    type: "Freelance",
    period: "Jul 2025 — Jan 2026",
    duration: "7 mos",
    location: "Punjab, Pakistan · Remote",
    points: [
      "Redesigned a patient-intake flow for a healthcare client, lifting completion rates 65%.",
      "Built a reusable Figma design system that sped up new-feature design and kept the product visually consistent.",
      "Ran usability tests in Maze, turning user findings into prioritized UX fixes that shipped to production.",
    ],
  },
  {
    role: "Product Designer (UI/UX) — SaaS",
    company: "Appsol360",
    type: "Full-time",
    period: "Jan 2023 — Dec 2023",
    duration: "1 yr",
    location: "United States · Remote",
    points: [
      "Restructured a SaaS onboarding flow, cutting first-session drop-off by 50%.",
      "Designed B2B dashboards that simplified high-traffic workflows and reduced user confusion.",
      "Partnered with engineers and PMs to take products from wireframe to launch.",
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Prob N Tech",
    type: "Full-time",
    period: "Feb 2021 — Jun 2022",
    duration: "1 yr 5 mos",
    location: "Punjab, Pakistan · Remote",
    points: [
      "Designed UI for web and mobile products across healthcare, SaaS, and e-commerce, the foundation of 20+ products shipped to date.",
      "Standardized component patterns to keep UI consistent across the product suite.",
      "Conducted user research and wireframing that informed product launches.",
    ],
  },
];

export const services = [
  { title: "Product Design", description: "End-to-end design from concept to shipped product, grounded in research and business goals." },
  { title: "UX Strategy", description: "Roadmaps and product decisions backed by user research, not assumptions." },
  { title: "UI Design", description: "Interfaces that are as functional as they are polished, built to your brand." },
  { title: "Mobile App Design", description: "Native-feeling iOS and Android experiences designed for real-world use." },
  { title: "SaaS Design", description: "Dashboards and workflows that make complex data usable at a glance." },
  { title: "Healthcare Platforms", description: "Clinically-aware design for tools used under real pressure, built to compliance standards." },
  { title: "Design Systems", description: "Scalable component libraries that keep design and engineering in sync." },
  { title: "UX Audit", description: "A structured review of what's working, what's not, and what to fix first." },
  { title: "Product Discovery", description: "Structured research sprints to validate direction before a line of code is written." },
  { title: "Prototyping", description: "Interactive prototypes that make ideas testable long before development." },
];

export const process = [
  { step: "Discover", description: "Understand the business goals, constraints, and the problem worth solving." },
  { step: "Research", description: "Talk to real users and study the landscape before assuming a solution." },
  { step: "Define", description: "Translate research into a clear problem statement and success metrics." },
  { step: "Wireframe", description: "Explore structure and flow at low fidelity, fast and disposable." },
  { step: "Prototype", description: "Build interactive prototypes that feel close to the real product." },
  { step: "Test", description: "Validate with real users, and let evidence — not opinion — guide decisions." },
  { step: "Iterate", description: "Refine based on what testing revealed, as many rounds as it takes." },
  { step: "Deliver", description: "Hand off production-ready design with the specs engineering actually needs." },
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Senior Product Manager",
    company: "Meridian Health",
    industry: "Healthcare",
    rating: 5,
    review:
      "Working on the clinical dashboard redesign together was the smoothest cross-functional collaboration I've had with a designer. Every decision was backed by time spent shadowing actual nurses, and it showed in adoption — clinicians trusted the product from week one instead of resisting it like they had with past rollouts.",
  },
  {
    name: "Michael Carter",
    role: "Founder",
    company: "Flowline CRM",
    industry: "SaaS",
    rating: 5,
    review:
      "We came in thinking our onboarding needed more explanation. The real fix was removing almost all of it, and that only became obvious after watching the research sessions. Activation numbers moved more in ten weeks than they had in the previous year.",
  },
  {
    name: "Emily Roberts",
    role: "CEO",
    company: "Ledgerline",
    industry: "Fintech",
    rating: 5,
    review:
      "Financial products are hard to design honestly without either overwhelming or oversimplifying. The runway dashboard struck that balance better than anything our internal team had attempted, and our investors noticed it too.",
  },
  {
    name: "David Chen",
    role: "Engineering Manager",
    company: "Signal AI",
    industry: "SaaS",
    rating: 5,
    review:
      "As an engineering lead, what stood out was how implementation-aware the handoff was. Specs were precise, edge cases were already thought through, and the design system components mapped cleanly to what we could actually build on our timeline.",
  },
  {
    name: "Sophia Wilson",
    role: "Head of Product",
    company: "Marlow Shop",
    industry: "E-Commerce",
    rating: 5,
    review:
      "We hired for a checkout redesign and got a return-rate fix as a byproduct, because the research surfaced a problem we hadn't scoped in. That kind of judgment — knowing when to widen the lens — is rare and it paid for itself several times over.",
  },
  {
    name: "James Patel",
    role: "VP of Operations",
    company: "Aster Systems",
    industry: "Healthcare",
    rating: 5,
    review:
      "Hospital operations software has almost zero room for design experimentation that fails quietly — mistakes show up as real delays for real patients. The bed management redesign was handled with exactly the rigor that context demands.",
  },
  {
    name: "imteccz",
    role: "Client",
    company: "United States",
    industry: "UI/UX",
    rating: 5,
    review:
      "Ruqyya did a great job! I needed a mock-up made for an application, and Ruqyya was able to get the project done within 3 days. The quality was exactly what I was looking for. Ruqyya went above and beyond, even with limited time!",
  },
  {
    name: "djezzer",
    role: "Client",
    company: "Belgium",
    industry: "UI/UX",
    rating: 5,
    review:
      "I recommend Ruqyya for her wonderful job. You won't be disappointed. Many thanks, once again.",
  },
  {
    name: "tiktokyu2",
    role: "Client",
    company: "Canada",
    industry: "UI/UX",
    rating: 5,
    review:
      "my second job with her! i will comeback for more",
  },
  {
    name: "tiktokyu2",
    role: "Client",
    company: "Canada",
    industry: "UI/UX",
    rating: 5,
    review:
      "wonderful job. will comeback for more",
  },
];

export const awards = [
  { title: "UX Design Award", org: "Interaction Design Foundation", year: "2024" },
  { title: "Best Product Design", org: "Awwwards", year: "2023" },
  { title: "Top Designer", org: "Clutch", year: "2023" },
  { title: "Featured on Behance", org: "Behance Curated Galleries", year: "2022" },
  { title: "Dribbble Recognition", org: "Dribbble Staff Picks", year: "2022" },
  { title: "Design Excellence", org: "UX Design Awards", year: "2021" },
];

export const certifications = [
  { title: "Google UX Design", org: "Google", year: "2021" },
  { title: "Human Centered Design", org: "IDEO.org", year: "2020" },
  { title: "Design Thinking", org: "Interaction Design Foundation", year: "2020" },
  { title: "Product Management", org: "Product School", year: "2019" },
  { title: "Accessibility for Designers", org: "Deque University", year: "2022" },
];

export const tools = [
  "Figma", "Adobe XD", "Photoshop", "Illustrator", "Miro",
  "FigJam", "Jira", "Notion", "Slack", "Linear", "Maze", "Hotjar",
];

export const faqs = [
  {
    q: "How long does a project typically take?",
    a: "It depends on scope, but most engagements run 6 to 16 weeks. A focused UX audit can wrap in two weeks, while a full product design with a new design system can run several months. We'll define a realistic timeline together before kicking off.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes, fully remote with clients across multiple time zones. I keep a few overlapping hours with each client for live collaboration and rely on async updates the rest of the time.",
  },
  {
    q: "How do you communicate throughout a project?",
    a: "Weekly syncs, a shared Notion or Jira board for visibility into progress, and Slack for day-to-day questions. You'll never be waiting a week to find out what's happening with your project.",
  },
  {
    q: "What industries do you specialize in?",
    a: "Primarily healthcare and SaaS, with additional experience in fintech and e-commerce. Healthcare and SaaS share a common thread — complex information that needs to be made usable under real constraints — which is where I do my best work.",
  },
  {
    q: "What design process do you follow?",
    a: "A research-driven process: discover, research, define, wireframe, prototype, test, iterate, deliver. The depth at each stage flexes based on project scope and timeline, but user validation never gets skipped.",
  },
  {
    q: "Do you also write front-end code?",
    a: "I don't build production code, but I hand off detailed specs, a documented design system, and interactive prototypes that make engineering handoff fast and low-friction.",
  },
  {
    q: "Can you work within our existing design system?",
    a: "Absolutely — I regularly extend existing systems rather than starting from scratch, and I'll flag gaps or inconsistencies I find along the way.",
  },
  {
    q: "What do you need from us to get started?",
    a: "Access to relevant stakeholders for a kickoff conversation, any existing research or analytics, and a point of contact who can make or fast-track decisions during the project.",
  },
  {
    q: "Do you offer ongoing design support after launch?",
    a: "Yes, several clients retain me on a part-time monthly basis after the initial engagement for iteration, new features, and design QA.",
  },
  {
    q: "How do you price projects?",
    a: "Project-based pricing scoped to the work, not hourly billing. After an initial call, I'll send a proposal with a fixed cost and timeline so there are no surprises.",
  },
];
