// Case-study content, one entry per project slug (see src/data/behance-projects.json).
//
// Rules for this file:
//  - Only wording that already appears in the owner's own case-study films, decks or LinkedIn is used.
//  - "delivered" describes what the final design provides. It is NOT a measured result.
//  - "measured" is for numbers that have a source. Leave it out until real analytics exist.
//  - Every field is optional. A section on the project page only shows when its data is present.

// A numbered callout placed on a screenshot. x and y are percentages of the image.
export interface Note {
  x: number;
  y: number;
  text: string;
}
export interface Insight {
  title: string;
  doing?: string; // journey map: what the person does at this stage
  feeling?: { label: string; level: number }; // level 0 (lowest) to 1 (highest), read off the journey map
  shot?: Shot; // the screen that answers this stage
  text?: string;
  thought?: string; // what the user is thinking at this stage
  response?: string; // what the design does about it
}
export interface Shot {
  src: string; // path inside public/, e.g. "case/oladoc/home.webp"
  alt: string;
  caption?: string;
  notes?: Note[];
}
// One decision, written as a record: what was wrong, how we know, what changed, what it is meant to do, and whether that is measured.
export interface DecisionRecord {
  problem: string;
  evidence: string;
  decision: string;
  benefit: string; // intended, never presented as a result
  outcome: string; // "Not measured" unless a sourced number exists
  tradeoff?: string;
}
export interface Task {
  id: string;
  label: string;
  title: string;
  text: string;
  kind: "phones" | "flow" | "wide" | "single";
  shots: Shot[];
}
export interface Outcomes {
  quantitative: { value: string; label: string; source: string; status: string }[];
  qualitative: string[]; // documented findings
  intended: string[]; // what the design is meant to improve: not measured
  notVerified: string[]; // what does not exist in the project files
  reflection: string[]; // written in the first person
}
export interface Signal {
  skill: string;
  evidence: string;
  to?: string; // section id on the page
}
export interface Decision {
  title: string;
  text: string;
  shots?: Shot[];
  record?: DecisionRecord;
  kind?: "phone" | "wide";
}
export interface Person {
  name: string;
  tag?: string;
  quote?: string;
  items?: string[];
}
export interface Step {
  label: string;
  text?: string;
}

export interface CaseStudy {
  summary?: string;
  video?: string;
  preview?: string;
  poster?: string;
  cover?: string;

  // header facts
  role?: string;
  deliverables?: string[];
  platforms?: string[];
  duration?: string;
  tools?: string[];

  // "60-second" summary
  tldr?: { problem: string; approach: string; result: string };

  context?: { text: string; facts?: string[]; note?: string };
  problem?: { headline: string; points: Insight[]; why?: string };
  users?: { text?: string; people: Person[] };
  research?: { text?: string; insights?: Insight[]; shot?: Shot; documented?: string[]; notDocumented?: string[] };
  decisions?: Decision[];
  // Shown only when real material exists. Do not fill from guesses: see docs/07-CASE-STUDY-QUESTIONS.md.
  tradeoffs?: Insight[]; // what was weighed and what was given up
  validation?: { text?: string; items?: Insight[] }; // testing, feedback and what changed because of it
  lessons?: string[];
  flow?: { title: string; steps: Step[]; shot?: Shot };
  before?: Shot;
  after?: Shot;
  stills?: Shot[];
  system?: { palette: { hex: string; name: string }[]; type?: string; notes?: string[]; shot?: Shot };
  features?: Insight[];
  delivered?: string[];
  measured?: { value: string; label: string; source: string }[];
  overview?: { k: string; v: string }[]; // six cells, readable in 15 seconds
  heroShots?: Shot[]; // images composed beside the title
  tasks?: Task[]; // the finished experience, organised by what a user is trying to do
  outcomes?: Outcomes;
  signals?: Signal[]; // skills shown, each tied to evidence on the page
  shows?: string[];
  imageNote?: string;
}

const still = (k: string, n: string, alt: string, caption?: string): Shot => ({ src: `case/${k}/${n}.webp`, alt, caption });
const NOTE = "Stills from the project film. Screens are my design; photography is stock or client-supplied.";

import { oladocStory } from "./oladoc-story";

export const caseStudies: Record<string, CaseStudy> = {
  /* ───────── Oladoc ───────── */
  "oladoc-healthcare-app-ui-ux-design": {
    summary: "Patient app, doctor portal and front desk, designed end to end on one design system.",
    video: "videos/oladoc.mp4",
    preview: "videos/oladoc-preview.mp4",
    poster: "videos/oladoc-poster.jpg",
    cover: "videos/oladoc-cover.jpg",
    role: "UX and UI design, end to end",
    deliverables: ["Patient app", "Doctor portal", "Front desk portal", "Design system"],
    platforms: ["Mobile", "Desktop"],
    tools: ["Figma"],
    tldr: {
      problem: "Patients know how they feel, not which doctor to see, and clinic staff worked in tools built only for the doctor.",
      approach: "Start from the symptom, put trust signals before booking, and give each of the three user types its own structure.",
      result: "47 screens, 3 portals, 4 clickable journeys and 6 research insights, all on one design system.",
    },
    context: {
      text: "Oladoc is a healthcare marketplace. I designed the whole product: the patient app, the doctor portal and the front desk, so that a booking made by a patient shows up correctly for the doctor and the clinic.",
      facts: ["Healthcare marketplace", "3 user types", "Mobile and desktop"],
    },
    problem: {
      headline: "What gets in the way of care",
      points: [
        { title: "Patients know how they feel, not which doctor to see" },
        { title: "300+ results and no help deciding" },
        { title: "The front desk runs the clinic, but tools are built for the doctor" },
      ],
      why: "“I just need to find the right doctor quickly, and actually trust that they're good.” That is the primary persona from the research, and it is the test every screen had to pass.",
    },
    users: {
      text: "One primary persona, and two desktop roles that the booking depends on.",
      people: [
        { name: "Ayesha Rahman, 32, Gulberg, Lahore", tag: "Primary persona", quote: "I just need to find the right doctor quickly, and actually trust that they're good.", items: ["The time-poor family health manager", "Marketing coordinator and mother of two", "Smartphone-first and cost-conscious", "Scenario: two days of chest discomfort; wants a cardiologist this week and tests and medicines without more trips"] },
        { name: "Patient app", tag: "Mobile", items: ["Home", "Search", "Visits", "Records", "Profile"] },
        { name: "Doctor portal", tag: "Desktop", items: ["Dashboard", "Appointments", "Patients", "Consultations", "Availability", "Earnings"] },
        { name: "Front desk", tag: "Desktop", items: ["Dashboard", "Front desk queue", "Appointments", "Patients", "Billing"] },
      ],
    },
    research: {
      text: "One persona, six stages. Each stage links a pain point to the screen that solves it.",
      insights: [
        { title: "Notice a symptom", thought: "I hope this isn't something serious.", text: "She does not know which specialist to see.", response: "A symptom-first entry on Home: “Not sure who to see?” suggests a specialist." },
        { title: "Search and self-educate", thought: "I don't even know which specialty I need.", text: "300+ results and no help deciding.", response: "Search by symptom: Chest pain points to Cardiologist and shows verified doctors nearby." },
        { title: "Compare doctors", thought: "Can I actually trust these reviews?", text: "Trust signals are scattered, and a higher fee may not mean better care.", response: "The profile puts PMDC verification, rating, fee and clinics up front." },
        { title: "Book", thought: "I don't have time to visit three clinics.", text: "Surprise costs at reception.", response: "One decision per screen, the fee and the 15% online discount stated before payment, and a clear total." },
        { title: "Consult", thought: "Will they take me and my concern seriously?", text: "Repeating her history at every new doctor.", response: "A structured, signed prescription saved to Records, so her history travels with her." },
        { title: "Follow up", thought: "Will I have to repeat all this again?", text: "Care stops at the clinic door, so tests and medicines mean more trips.", response: "Lab tests and medicines start from the prescription, and reports return to Records." },
      ],
      shot: { src: "case/oladoc/journey.webp", alt: "Journey map with six stages, linking each pain point to the screen that answers it.", caption: "The journey map: every pain point has an answer on screen." },
    },
    decisions: [
      {
        title: "Start from a symptom, not a specialty",
        text: "Trust signals come before booking: verification, rating and fee are the first things a patient sees on a doctor.",
        kind: "phone",
        shots: [
          { src: "case/oladoc/home.webp", alt: "Patient app home screen with a symptom prompt.", caption: "Home" },
          { src: "case/oladoc/sym.webp", alt: "Search by symptom screen.", caption: "Search by symptom" },
          { src: "case/oladoc/profile.webp", alt: "Doctor profile with verification, rating and fee.", caption: "Doctor profile" },
        ],
      },
      {
        title: "One decision per screen",
        text: "Booking is four short steps: choose the type of visit, pick a clinic, select a time, see the total.",
        kind: "phone",
        shots: [
          { src: "case/oladoc/type.webp", alt: "Choose type of consultation.", caption: "1 · Choose type" },
          { src: "case/oladoc/clinic.webp", alt: "Select a clinic.", caption: "2 · Pick a clinic" },
          { src: "case/oladoc/date.webp", alt: "Select date and time.", caption: "3 · Select a time" },
          { src: "case/oladoc/payment.webp", alt: "Payment screen with the total.", caption: "4 · See the total" },
        ],
      },
      {
        title: "Care does not stop at the clinic door",
        text: "The app continues after the visit: video consultations, digital prescriptions, lab tests and medicines.",
        kind: "phone",
        shots: [
          { src: "case/oladoc/video.webp", alt: "Video visit screen.", caption: "Video visit" },
          { src: "case/oladoc/rx.webp", alt: "Digital prescription.", caption: "Digital prescription" },
          { src: "case/oladoc/lab.webp", alt: "Lab tests ordering.", caption: "Lab tests" },
          { src: "case/oladoc/meds.webp", alt: "Medicines ordering.", caption: "Medicines" },
        ],
      },
      {
        title: "Built for speed, not exploration",
        text: "The desktop portals are for people who use them all day. The doctor sees the day at a glance; the front desk sees check-in status on every row.",
        kind: "wide",
        shots: [
          { src: "case/oladoc/docdash.webp", alt: "Doctor portal dashboard.", caption: "Doctor portal: the day at a glance" },
          { src: "case/oladoc/frontdesk.webp", alt: "Front desk queue with check-in status on every row.", caption: "Front desk: check-in on every row" },
          { src: "case/oladoc/consult.webp", alt: "Doctor consultation screen.", caption: "Consultation workspace" },
        ],
      },
    ],
    flow: {
      title: "Three users, three structures",
      steps: [
        { label: "Patient app", text: "Home, Search, Visits, Records, Profile" },
        { label: "Doctor portal", text: "Dashboard, Appointments, Patients, Consultations, Availability, Earnings" },
        { label: "Front desk", text: "Dashboard, Front desk queue, Appointments, Patients, Billing" },
      ],
      shot: { src: "case/oladoc/ia.webp", alt: "Information architecture for the three user types.", caption: "Information architecture" },
    },
    system: {
      palette: [
        { hex: "#21205F", name: "Indigo" },
        { hex: "#FCA025", name: "Orange" },
        { hex: "#F2F2F9", name: "Surface" },
        { hex: "#16A34A", name: "Success" },
        { hex: "#DC2626", name: "Danger" },
      ],
      type: "Inter, four weights",
      notes: ["Live components for buttons, badges and navigation, reused on every screen", "Status badges: Confirmed, Pending, Arrived, Waiting, With doctor, Done"],
      shot: { src: "case/oladoc/ds.webp", alt: "Design system board.", caption: "The design system board" },
    },
    delivered: ["47 screens across three products", "4 clickable journeys", "One design system shared by patient, doctor and front-desk screens", "6 research insights, each tied to a screen"],
    shows: ["Designing for several user types inside one product", "Turning research into screen-level decisions", "Keeping mobile and desktop products consistent through a design system"],
    ...oladocStory,
  },

  /* ───────── Marham ───────── */
  "marham-pk-healthcare-platform-redesign": {
    summary: "Web and mobile UX/UI redesign of the Marham.pk healthcare platform.",
    video: "videos/marham.mp4",
    preview: "videos/marham-preview.mp4",
    poster: "videos/marham-poster.jpg",
    cover: "videos/marham-cover.jpg",
    role: "UI/UX design",
    deliverables: ["Responsive website", "Mobile layouts", "Key feature screens"],
    platforms: ["Web", "Mobile"],
    tldr: {
      problem: "An outdated design that did not build trust, with weak hierarchy and an inconsistent experience across devices.",
      approach: "Research-led structure, trust signals and social proof, mobile-first layouts and a focus on accessibility.",
      result: "A modern, clean and trustworthy interface for finding a doctor, booking and consulting online, on every screen size.",
    },
    context: {
      text: "Marham.pk connects patients with verified doctors, clinics and healthcare services.",
      facts: ["Find a doctor", "Video consultation", "Lab tests", "Health packages"],
      note: "Product context from marham.pk. This is a redesign of the existing platform.",
    },
    problem: {
      headline: "A platform people had to trust before they could use it",
      points: [
        { title: "Outdated design that didn't build trust" },
        { title: "Poor information hierarchy" },
        { title: "Low trust signals and social proof" },
        { title: "Inconsistent experience across devices" },
      ],
    },
    decisions: [
      { title: "In-depth user research", text: "The structure started from what people come to the platform to do." },
      { title: "Simplified information architecture", text: "Fewer, clearer routes to the three things patients want most: a doctor, a lab test, a consultation." },
      { title: "Modern, clean visual design", text: "A calm, light interface that lets doctor information lead.", kind: "wide", shots: [{ src: "case/marham/solution.webp", alt: "Redesigned Marham homepage on laptop and phone.", caption: "The redesigned homepage" }] },
      { title: "Strong trust signals and social proof", text: "Verification and credibility appear where decisions are made." },
      { title: "Mobile-first experience", text: "Designed for the phone first, then scaled up.", kind: "wide", shots: [{ src: "case/marham/trio.webp", alt: "Marham redesign across desktop and two phone screens.", caption: "One system across screen sizes" }] },
      { title: "Accessibility and usability", text: "Clear contrast, readable type and obvious controls throughout." },
    ],
    before: { src: "case/marham/old_site.webp", alt: "The previous Marham.pk site: dark banner, dense feed and small doctor cards.", caption: "Before" },
    after: { src: "case/marham/laptop.webp", alt: "The redesigned Marham.pk homepage with a clear search and trust signals.", caption: "After" },
    flow: {
      title: "Simple steps to better healthcare",
      steps: [
        { label: "Search", text: "Find the right doctor" },
        { label: "Book", text: "Choose a time that suits you" },
        { label: "Consult", text: "Connect online or visit a clinic" },
        { label: "Get better", text: "Follow up and stay healthy" },
      ],
    },
    features: [
      { title: "Smart doctor search", text: "Find the right doctor easily" },
      { title: "Video consultation", text: "Consult with doctors from home" },
      { title: "Health packages", text: "Book lab tests and packages online" },
      { title: "Health articles", text: "Read expert health tips" },
      { title: "Secure and trusted", text: "Verified doctors" },
      { title: "24/7 support", text: "We're here to help anytime" },
      { title: "Mobile friendly", text: "Access care anytime, anywhere" },
      { title: "Instant notifications", text: "Updates on appointments and test results" },
    ],
    stills: [
      still("marham", "home", "Marham redesign homepage still."),
      still("marham", "journey", "Marham user journey still."),
      still("marham", "responsive", "Marham responsive layouts still."),
    ],
    delivered: ["A modern, clean and trustworthy design", "A clear search, book, consult journey", "Consistent layouts from phone to desktop"],
    shows: ["Redesigning a live, high-traffic platform without losing familiar tasks", "Building trust through hierarchy and proof", "Designing one experience that holds across devices"],
    imageNote: "Before and after images are from the original site and my redesign. Stills are from the project film.",
  },

  /* ───────── Shumaila's London ───────── */
  "shumaila-s-london-clinic-website-redesign": {
    summary: "Website redesign for Shumaila's London, aesthetic and laser clinics in London and Essex.",
    video: "videos/shumailas.mp4",
    preview: "videos/shumailas-preview.mp4",
    poster: "videos/shumailas-poster.jpg",
    cover: "videos/shumailas-cover.jpg",
    role: "UI/UX design",
    deliverables: ["Homepage", "Treatment and booking journey", "Mobile layouts"],
    platforms: ["Web", "Mobile"],
    tldr: {
      problem: "An old website that looked cluttered and dated, hid information and did not work well on mobile.",
      approach: "A premium visual refresh with clearer treatment discovery and a shorter path to a free consultation.",
      result: "A calm, confident homepage and booking journey that works across desktop, tablet and phone.",
    },
    context: {
      text: "Aesthetic and laser clinics in London and Essex.",
      facts: ["Established 2004", "3000+ reviews", "9+ clinics in the UK"],
      note: "Figures as published on shumailas.com.",
    },
    problem: {
      headline: "What held the old site back",
      points: [
        { title: "Outdated design", text: "The old website looked cluttered and dated" },
        { title: "Weak information hierarchy", text: "Information was difficult to find and navigate" },
        { title: "Low trust signals", text: "Limited proof elements reduced credibility" },
        { title: "Not mobile optimized", text: "The site did not perform well on mobile devices" },
      ],
    },
    decisions: [
      { title: "Premium visual refresh", text: "A modern, elegant, trustworthy look.", shots: [still("shumailas", "direction", "Design direction: palette and type.", "Direction: premium, calm and clear")], kind: "wide" },
      { title: "The team and the promise up front", text: "The hero puts the team, the promise and Book Online in the first screen.", shots: [still("shumailas", "home", "Homepage hero and sections.", "A calm, confident first impression")], kind: "wide" },
      { title: "Clearer treatment discovery", text: "Six clear paths to the right treatment, then four reasons to feel confident." },
      { title: "A free consultation, one click away", text: "The next step is always visible." },
    ],
    flow: {
      title: "From curious to booked",
      steps: [{ label: "Explore treatments" }, { label: "Compare" }, { label: "Book a free consultation" }],
      shot: still("shumailas", "journey", "Booking journey across desktop and mobile."),
    },
    system: {
      palette: [
        { hex: "#0E7C86", name: "Teal" },
        { hex: "#4AA3AC", name: "Soft teal" },
        { hex: "#DCEEEF", name: "Mist" },
        { hex: "#0B1B3A", name: "Navy" },
        { hex: "#C9A24B", name: "Gold" },
      ],
      type: "Serif headings, Inter body",
      notes: ["Elegant and authoritative headings", "Clean and readable body text"],
    },
    features: [
      { title: "Treatment pages", text: "Detailed pages for all treatments" },
      { title: "Before and after gallery", text: "Real results to build trust" },
      { title: "Why choose us", text: "Clear reasons to feel confident" },
      { title: "Easy booking", text: "A simple, quick online booking" },
      { title: "FAQs", text: "Answers to common questions" },
      { title: "Offers and promotions", text: "Exclusive offers for patients" },
      { title: "Testimonials", text: "Patient reviews that reflect quality" },
      { title: "Contact and support", text: "Multiple ways to reach the clinic" },
    ],
    stills: [still("shumailas", "responsive", "Responsive layouts for desktop, tablet and mobile.", "A beautiful experience everywhere")],
    delivered: ["Premium brand presence", "Better treatment discovery", "Stronger trust signals", "A clearer path to booking"],
    shows: ["Raising perceived quality for a premium service brand", "Structuring a large treatment catalogue so it can be scanned", "Designing a conversion path that stays calm"],
    imageNote: NOTE,
  },

  /* ───────── Sehat Kahani ───────── */
  "sehat-kahani-telemedicine-ui-ux-design": {
    summary: "Telehealth website UI/UX design for Sehat Kahani.",
    video: "videos/sehat-kahani.mp4",
    preview: "videos/sehat-kahani-preview.mp4",
    poster: "videos/sehat-kahani-poster.jpg",
    cover: "videos/sehat-kahani-cover.jpg",
    role: "UI/UX design",
    deliverables: ["Homepage", "Consultation journey", "Mobile layouts"],
    platforms: ["Web", "Mobile"],
    tldr: {
      problem: "The existing experience lacked clarity and did not communicate the platform's scale, trust and patient-first access.",
      approach: "A clear, calm, credible interface with a 60-second promise up front and trust built through real professionals.",
      result: "Simpler routes from a health problem to a doctor, and a modern identity that can scale.",
    },
    context: {
      text: "A telehealth platform that connects patients to doctors online.",
      facts: ["60 sec to connect", "24/7 consultations", "7,500+ healthcare professionals"],
      note: "Figures as published on sehatkahani.com.",
    },
    problem: {
      headline: "What stood in the way",
      points: [
        { title: "Outdated presentation", text: "A dated, inconsistent visual hierarchy" },
        { title: "Scattered information", text: "Services and value propositions were hard to scan" },
        { title: "Weak booking guidance", text: "Too little help taking the next step" },
        { title: "Limited trust building", text: "Doctors, access and credibility were not highlighted" },
      ],
    },
    decisions: [
      { title: "A 60-second promise, front and centre", text: "The first screen states the promise and lets the patient pick a problem or a specialist.", kind: "wide", shots: [still("sehat", "home", "Homepage with the 60-second promise.", "A clear, welcoming first screen")] },
      { title: "Service discovery", text: "Four clear paths: app, e-clinics, corporate care and mental health." },
      { title: "Trust and access", text: "Six reasons to feel confident, shown with the platform's scale." },
      { title: "Credible doctors", text: "Real professionals, up front." },
    ],
    flow: {
      title: "From a problem to a doctor, in seconds",
      steps: [{ label: "Discover" }, { label: "Choose" }, { label: "Connect" }, { label: "Keep care going, 24/7" }],
      shot: still("sehat", "journey", "Patient journey screens."),
    },
    system: {
      palette: [
        { hex: "#81B528", name: "Lime green" },
        { hex: "#8BB65F", name: "Fresh green" },
        { hex: "#C9E1C9", name: "Mint" },
        { hex: "#CFD7C1", name: "Sage" },
        { hex: "#333332", name: "Charcoal" },
      ],
      type: "Playfair Display headings, Inter body",
      notes: ["Accessible UX", "Clean hierarchy", "Trust-focused", "Modern healthcare"],
    },
    features: [
      { title: "Online doctor consultation", text: "Instant digital access to care" },
      { title: "Service categories", text: "App, e-clinics, corporate care, mental health" },
      { title: "Healthcare professionals", text: "Credible doctor discovery" },
      { title: "Accessible care", text: "A simple and inclusive experience" },
      { title: "Booking journey", text: "Clear action points and decisions" },
      { title: "Trust and reach", text: "Highlights platform scale and impact" },
    ],
    stills: [still("sehat", "responsive", "Responsive layouts.", "The same care on every screen")],
    delivered: ["Clearer healthcare messaging", "Simpler routes to consultation", "Easier service discovery", "A modern, scalable identity"],
    shows: ["Making a large service platform understandable at a glance", "Designing for access and trust in healthcare", "Building a flexible visual identity"],
    imageNote: NOTE,
  },

  /* ───────── Zental ───────── */
  "zental-dental-luxury-website-ui-ux": {
    summary: "Website UI/UX for Zental, a private dental group.",
    video: "videos/zental.mp4",
    preview: "videos/zental-preview.mp4",
    poster: "videos/zental-poster.jpg",
    cover: "videos/zental-cover.jpg",
    role: "UI/UX design",
    deliverables: ["Homepage", "Booking and clinic finder", "Mobile layouts"],
    platforms: ["Web", "Mobile"],
    tldr: {
      problem: "Private patients choose on trust, atmosphere and ease, so the site could not feel cold or clinical.",
      approach: "A refined, warm look, services and locations in a clear order, and a calm route to booking.",
      result: "A refined, trustworthy private dental brand across desktop and mobile.",
    },
    context: {
      text: "Four treatment areas and six clinics across London and Milton Keynes, with one promise: feel no pain physically, emotionally or financially.",
      facts: ["Earl's Court", "Knightsbridge", "Milton Keynes", "Cricklewood", "Bexleyheath", "Barnet"],
      note: "Locations and wording as listed on zental.uk.",
    },
    problem: {
      headline: "Private patients choose on trust, atmosphere and ease",
      points: [
        { title: "Trust", text: "Premium, never cold or overly clinical" },
        { title: "Structure", text: "Services, locations and FAQs in clear order" },
        { title: "Conversion", text: "A calm, frictionless route to booking" },
      ],
      why: "Goal: build trust, present services clearly, and make booking effortless.",
    },
    decisions: [
      { title: "Luxury feel", text: "Refined details and warm tones.", kind: "wide", shots: [still("zental", "direction", "Design direction for Zental.", "Refined, warm and quietly premium")] },
      { title: "Calm and welcoming", text: "Soft blush and generous white space." },
      { title: "Patient-first clarity", text: "One clear next step at a time.", kind: "wide", shots: [still("zental", "home", "Homepage with callouts: hero, quick actions, trust signals, booking CTA.", "Hero, quick actions, trust signals, booking CTA")] },
    ],
    flow: {
      title: "Book, find and explore your care",
      steps: [{ label: "Book online" }, { label: "Find a clinic" }, { label: "Explore treatments" }],
      shot: still("zental", "journey", "Booking, clinic finder and treatments on mobile."),
    },
    system: {
      palette: [
        { hex: "#FBF3EE", name: "Ivory" },
        { hex: "#F2E2D3", name: "Soft beige" },
        { hex: "#EBC9BE", name: "Muted blush" },
        { hex: "#B89683", name: "Warm taupe" },
        { hex: "#7A5446", name: "Deep cocoa" },
      ],
      type: "Elegant serif headings, clean sans body",
    },
    features: [
      { title: "Treatments overview", text: "Clear service discovery" },
      { title: "Patient reviews", text: "Build social proof" },
      { title: "Clinic locations", text: "Help users find nearby clinics" },
      { title: "Dentist profiles", text: "Show expertise and credentials" },
      { title: "FAQs", text: "Answer common patient concerns" },
      { title: "Contact and booking", text: "Encourage easy action" },
    ],
    stills: [still("zental", "responsive", "Responsive layouts.", "Calm on every screen size")],
    delivered: ["Premium brand presence", "Clear service discovery", "A stronger booking journey", "A calm, welcoming feel"],
    shows: ["Translating a brand promise into interface decisions", "Designing for emotional trust in a high-anxiety service", "Structuring a multi-location business"],
    imageNote: NOTE,
  },

  /* ───────── Goddard ───────── */
  "goddard-veterinary-website-redesign": {
    summary: "Website redesign for Goddard Veterinary Group in London.",
    video: "videos/goddard.mp4",
    preview: "videos/goddard-preview.mp4",
    poster: "videos/goddard-poster.jpg",
    cover: "videos/goddard-cover.jpg",
    role: "UI/UX design",
    deliverables: ["Homepage", "Practice finder and booking", "Mobile layouts"],
    platforms: ["Web", "Mobile"],
    tldr: {
      problem: "A website that did not show trust or a clear path to action for pet owners.",
      approach: "Warm, pet-first visuals, simpler navigation and trust signals that make expertise visible.",
      result: "A trusted, modern vet experience with a simpler booking flow.",
    },
    context: {
      text: "London's trusted vet group, since 1952.",
      facts: ["44 practices", "3 emergency hospitals", "Since 1952", "RCVS accredited"],
      note: "Facts as listed on goddardvetgroup.co.uk.",
    },
    problem: {
      headline: "A website that didn't show trust or a clear path",
      points: [
        { title: "Outdated design", text: "The old website lacked a premium feel" },
        { title: "Poor hierarchy", text: "Important information was hard to scan" },
        { title: "Booking friction", text: "Contact and appointment steps weren't simplified" },
      ],
      why: "Opportunity: make key services easy to find and the path to action simple.",
    },
    decisions: [
      { title: "Pet-first visuals", text: "Warm imagery that builds emotional trust.", kind: "wide", shots: [still("goddard", "direction", "Design direction for Goddard.", "Warm, trusted and pet-first")] },
      { title: "Clear navigation", text: "Simpler structure, faster decisions." },
      { title: "Trust signals", text: "Locations and expertise made visible.", kind: "wide", shots: [still("goddard", "home", "Homepage with hero, trust stats, service cards and practice finder.", "A visual-first homepage that helps pet parents")] },
    ],
    flow: {
      title: "Book, find and explore care",
      steps: [{ label: "Book an appointment" }, { label: "Find a practice" }, { label: "Our services" }],
      shot: still("goddard", "journey", "Booking journey across devices."),
    },
    system: {
      palette: [
        { hex: "#0B2A5B", name: "Navy" },
        { hex: "#12807F", name: "Teal" },
        { hex: "#E5484D", name: "Heart red" },
        { hex: "#F8F4EC", name: "Cream" },
        { hex: "#FFFFFF", name: "White" },
      ],
      type: "Elegant serif headings, clean sans body",
    },
    features: [
      { title: "Register your pet", text: "A quick, simple sign-up" },
      { title: "Book appointment", text: "Choose a date and time" },
      { title: "Practice finder", text: "Find a practice near you" },
      { title: "Pet health advice", text: "Search health topics" },
      { title: "Emergency care", text: "Urgent help when it matters most" },
      { title: "Our services", text: "Explore every service" },
    ],
    stills: [still("goddard", "responsive", "Responsive layouts.")],
    delivered: ["Stronger presence", "Better user experience", "A simpler booking flow", "Peace of mind for pet parents"],
    shows: ["Designing trust for a large multi-site organisation", "Simplifying a service catalogue into clear paths", "Using warmth without losing professionalism"],
    imageNote: NOTE,
  },

  /* ───────── Bond Vet ───────── */
  "bondvet-veterinary-website-ui-ux-design": {
    summary: "Landing page redesign for Bond Vet, a veterinary care brand.",
    video: "videos/bond-vet.mp4",
    preview: "videos/bond-vet-preview.mp4",
    poster: "videos/bond-vet-poster.jpg",
    cover: "videos/bond-vet-cover.jpg",
    role: "UI/UX design",
    deliverables: ["Landing page", "Booking and care-finder journey", "Mobile-first layouts"],
    platforms: ["Web", "Mobile"],
    tldr: {
      problem: "A busy, text-heavy homepage where the next step was easy to miss.",
      approach: "Pet-first visuals, scannable service sections and a single clear call to action.",
      result: "A welcoming, trust-driven first screen and a more intuitive booking path.",
    },
    context: {
      text: "Primary and urgent care for pets, with walk-ins welcome and virtual visits.",
      facts: ["Walk-ins welcome", "Virtual care", "Pet portal"],
    },
    problem: {
      headline: "A homepage that wasn't telling the full story",
      points: [
        { title: "Busy, text-heavy layout", text: "Too much to read before taking action" },
        { title: "Weak visual hierarchy", text: "Hard to tell what mattered most" },
        { title: "Calls to action lacked focus", text: "The next step was easy to miss" },
      ],
      why: "Opportunity: create a more visual, premium, and conversion-focused experience.",
    },
    decisions: [
      { title: "Pet-first visuals", text: "Warm imagery with pets and owners at the centre.", kind: "wide", shots: [still("bond", "direction", "Design approach for Bond Vet.", "Thoughtful by design. Built for better care.")] },
      { title: "Clear service discovery", text: "Scannable sections help users find care quickly." },
      { title: "Easy booking", text: "Strong calls to action simplify the path to appointments.", kind: "wide", shots: [still("bond", "home", "Homepage with quick actions, service cards and locations.", "A welcoming, trust-driven first screen")] },
    ],
    flow: {
      title: "Book, find and manage care",
      steps: [{ label: "Book a visit" }, { label: "Find a location" }, { label: "Manage in the Pet Portal" }],
      shot: still("bond", "journey", "Booking, locations and the pet portal."),
    },
    system: {
      palette: [
        { hex: "#0B1F4A", name: "Navy" },
        { hex: "#E8383D", name: "Red" },
        { hex: "#2E9C9A", name: "Teal" },
        { hex: "#FAF8F5", name: "Ivory" },
        { hex: "#FDEBEB", name: "Soft red" },
      ],
      type: "Warm serif headings, clean sans body",
    },
    features: [
      { title: "Book a visit", text: "Schedule appointments online in minutes" },
      { title: "Telehealth", text: "Talk to a vet from the comfort of home" },
      { title: "Find a clinic", text: "Locate the nearest clinic" },
      { title: "Pet Portal", text: "Manage visits, records and reminders" },
      { title: "Emergency care", text: "Get urgent care when it matters most" },
    ],
    stills: [still("bond", "responsive", "Mobile-first layouts.", "Care should be just a tap away")],
    delivered: ["Stronger visual trust", "Cleaner navigation", "More intuitive booking", "A design built for higher engagement"],
    shows: ["Turning a text-heavy page into a clear visual hierarchy", "Designing one primary action per screen", "Mobile-first thinking"],
    imageNote: NOTE,
  },

  /* ───────── Lumina ───────── */
  "lumina-dental-website-ui-ux-design": {
    summary: "Dental landing page design for Lumina Dental, built around full mouth rehabilitation.",
    video: "videos/lumina.mp4",
    preview: "videos/lumina-preview.mp4",
    poster: "videos/lumina-poster.jpg",
    cover: "videos/lumina-cover.jpg",
    role: "UI/UX design",
    deliverables: ["Landing page", "Treatment narrative", "Mobile layouts"],
    platforms: ["Web", "Mobile"],
    tldr: {
      problem: "A complex, high-value treatment for anxious patients, where credibility and clarity decide the enquiry.",
      approach: "Editorial hierarchy, trust-first storytelling and a clear route to a consultation.",
      result: "A premium landing page that guides interest to a confident consultation request.",
    },
    context: {
      text: "A premium landing page for full mouth rehabilitation, built around trust, treatment clarity and patient conversion.",
      facts: ["Invisalign", "Conscious sedation", "Full mouth dentistry"],
      note: "The testimonial shown in the film is sample copy.",
    },
    problem: {
      headline: "A complex treatment for anxious patients",
      points: [
        { title: "Credibility", text: "Premium care without losing clinical credibility" },
        { title: "Complexity", text: "A long treatment journey, simplified for anxious patients" },
        { title: "Conversion", text: "Guide interest to consultation with confidence" },
      ],
      why: "Clinical goals: natural-looking smile design, restored function and bite, long-term confidence.",
    },
    decisions: [
      { title: "Editorial hierarchy", text: "Large elegant type and premium white space.", kind: "wide", shots: [still("lumina", "direction", "Design direction for Lumina.", "Editorial, elegant and trust-first")] },
      { title: "Trust-first storytelling", text: "Clinical goals, results and a testimonial set expectations." },
      { title: "Conversion clarity", text: "FAQs and direct calls to action.", kind: "wide", shots: [still("lumina", "home", "Landing page: hero, the Lumina way, clinical process, proof and CTA.", "A luxury first screen that earns trust")] },
    ],
    flow: {
      title: "From curiosity to consultation",
      steps: [{ label: "Clinical process" }, { label: "Before and after proof" }, { label: "Book a consultation" }],
      shot: still("lumina", "journey", "Journey from process to consultation."),
    },
    system: {
      palette: [
        { hex: "#FAF7F2", name: "Ivory" },
        { hex: "#F4ECDD", name: "Champagne" },
        { hex: "#D9B574", name: "Soft gold" },
        { hex: "#9A6F2B", name: "Gold" },
        { hex: "#17181C", name: "Ink" },
      ],
      type: "Elegant serif headings, clean sans body",
    },
    features: [
      { title: "Hero and value proposition", text: "A premium first impression" },
      { title: "Trust and clinical goals", text: "Set clear expectations" },
      { title: "The clinical process", text: "Three simple phases" },
      { title: "Before and after proof", text: "See the transformation" },
      { title: "Patient testimonial", text: "Social proof and reassurance" },
      { title: "FAQ and consultation CTA", text: "Answers, then a next step" },
    ],
    stills: [still("lumina", "responsive", "Responsive layouts.")],
    delivered: ["A premium first impression", "A clear treatment narrative", "Trust through proof", "Confident conversion paths"],
    shows: ["Designing for a high-consideration, high-anxiety decision", "Breaking a long clinical process into three phases", "Using restraint to signal quality"],
    imageNote: NOTE,
  },

  /* ───────── Mint Dental ───────── */
  "mint-dental-clinic-website-redesign": {
    summary: "Website redesign for Mint Dental London, a private dental practice.",
    video: "videos/mint.mp4",
    preview: "videos/mint-preview.mp4",
    poster: "videos/mint-poster.jpg",
    cover: "videos/mint-cover.jpg",
    role: "UI/UX design",
    deliverables: ["Homepage", "Treatment and booking journey", "Mobile layouts"],
    platforms: ["Web", "Mobile"],
    tldr: {
      problem: "The old site lacked clarity and did not communicate the clinic's premium, patient-first care.",
      approach: "Clean aesthetics, a calming palette, a clear hierarchy and trust signals directly under the hero.",
      result: "A calm, trustworthy first impression and a simpler path to booking.",
    },
    context: { text: "A private dental clinic in Elephant & Castle, London.", facts: ["Private dentistry", "Elephant & Castle, London"] },
    problem: {
      headline: "Why the old site fell short",
      points: [
        { title: "Outdated design", text: "The old look didn't reflect the clinic's premium standard" },
        { title: "Poor information hierarchy", text: "Important services and patient information were hard to scan" },
        { title: "Friction in booking", text: "Too many steps and weak calls to action" },
        { title: "Low emotional trust", text: "The experience didn't reassure anxious patients enough" },
      ],
    },
    decisions: [
      { title: "Calm, clear and reassuring", text: "Clean aesthetics, a calming palette, patient-friendly UX and clear hierarchy.", kind: "wide", shots: [still("mint", "direction", "Design direction for Mint Dental.", "Calm, clear, and reassuring")] },
      { title: "Trust signals under the hero", text: "CQC, reviews and finance, right where the patient is deciding." },
      { title: "Four easy-to-scan paths", text: "A treatment grid with visible next steps.", kind: "wide", shots: [still("mint", "home", "Homepage with hero, trust signals, treatment grid and booking.", "A welcoming first impression")] },
    ],
    flow: {
      title: "From curious to booked",
      steps: [{ label: "Discover" }, { label: "Choose a treatment" }, { label: "Book, then smile" }],
      shot: still("mint", "journey", "Journey from discovery to booking."),
    },
    system: {
      palette: [
        { hex: "#043335", name: "Deep teal" },
        { hex: "#91B9AA", name: "Mint" },
        { hex: "#D8E1DA", name: "Soft sage" },
        { hex: "#F5EFE7", name: "Ivory" },
        { hex: "#383937", name: "Charcoal" },
      ],
      type: "Serif headings, Plus Jakarta Sans body",
    },
    features: [
      { title: "Treatment pages", text: "Easy service discovery with clear, detailed information" },
      { title: "Online booking", text: "A simple, secure appointment flow" },
      { title: "Patient stories", text: "Testimonials that build trust" },
      { title: "Awards and recognition", text: "Industry awards and accreditations" },
      { title: "Transparent pricing", text: "Clear fee guidance to plan with confidence" },
      { title: "Location and contact", text: "Clinic details, map and contact options" },
    ],
    stills: [still("mint", "responsive", "Responsive layouts.", "A calm experience on every device")],
    delivered: ["A calm, trustworthy first impression", "Clear, scannable information", "A simpler path to booking", "A consistent, premium brand"],
    shows: ["Reassuring anxious users through hierarchy and tone", "Removing friction from a booking path", "Keeping a brand consistent across screen sizes"],
    imageNote: NOTE,
  },

  /* ───────── Victoria Road ───────── */
  "victoria-road-dental-website-redesign": {
    summary: "Website UI/UX for Victoria Road Dental Practice in Exmouth, serving NHS and private patients.",
    video: "videos/victoria-road.mp4",
    preview: "videos/victoria-road-preview.mp4",
    poster: "videos/victoria-road-poster.jpg",
    cover: "videos/victoria-road-cover.jpg",
    role: "UI/UX design",
    deliverables: ["Homepage", "Treatments and booking", "Mobile layouts"],
    platforms: ["Web", "Mobile"],
    tldr: {
      problem: "Patients decide on trust, clarity and ease of booking, and the site had to feel professional without feeling cold.",
      approach: "A calm direction: friendly feel, clear hierarchy and generous white space.",
      result: "A reliable, welcoming clinic online with a clearer path to booking.",
    },
    context: {
      text: "NHS and private dentistry, from routine check-ups and hygiene to implants, veneers and smile design.",
      facts: ["Exmouth, Devon", "NHS and private", "14 treatments listed", "CQC, NHS and BDA listed"],
      note: "Practice details as listed on victoriaroaddental.co.uk.",
    },
    problem: {
      headline: "Patients decide on trust, clarity and ease of booking",
      points: [
        { title: "Trust", text: "Feel professional without feeling cold" },
        { title: "Structure", text: "Services, fees and info in a clear order" },
        { title: "Conversion", text: "Less friction on the way to booking" },
      ],
      why: "Goal: build trust, present services clearly, and make booking effortless.",
    },
    decisions: [
      { title: "A friendly feel", text: "Approachable, never intimidating.", kind: "wide", shots: [still("victoria", "direction", "Design direction for Victoria Road.", "A calm direction for everyday trust")] },
      { title: "Clear hierarchy", text: "Easy to scan, easy to act on." },
      { title: "A welcoming first screen that leads to booking", text: "Hero, clinic intro, service grid and trust signals.", kind: "wide", shots: [still("victoria", "home", "Homepage with hero, clinic intro, service grid and trust signals.")] },
    ],
    flow: {
      title: "From first look to booked visit",
      steps: [{ label: "Book an appointment" }, { label: "Explore treatments" }, { label: "Call or visit" }],
      shot: still("victoria", "journey", "Journey from first look to booked visit."),
    },
    system: {
      palette: [
        { hex: "#FFFFFF", name: "White" },
        { hex: "#C9BFE8", name: "Lavender" },
        { hex: "#E4E7EC", name: "Light grey" },
        { hex: "#66788F", name: "Slate" },
        { hex: "#2B2B33", name: "Charcoal" },
      ],
      type: "Elegant serif headings, clean sans body",
    },
    features: [
      { title: "Treatments", text: "Clear service discovery" },
      { title: "Testimonials", text: "Build patient confidence" },
      { title: "0% finance", text: "Explain affordability" },
      { title: "Dental plan", text: "Communicate ongoing care benefits" },
      { title: "Reviews", text: "Add social proof" },
      { title: "Contact and location", text: "Make the next step easy" },
    ],
    stills: [still("victoria", "responsive", "Responsive layouts.")],
    delivered: ["Clear service discovery", "Stronger patient trust", "A better booking journey", "Clear calls to action"],
    shows: ["Designing for a mixed NHS and private audience", "Presenting fees and finance clearly", "Calm, trustworthy local-business design"],
    imageNote: NOTE,
  },
};
