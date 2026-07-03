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
}

export const projects: Project[] = [
  {
    slug: "healthcare-dashboard",
    title: "Meridian Health Dashboard",
    industry: "Healthcare",
    year: "2024",
    summary:
      "A unified clinical dashboard that gives care teams a single view of patient vitals, medication schedules, and lab results.",
    problem:
      "Clinicians at a mid-size hospital network were switching between five disconnected systems to assemble a full picture of a patient's status, adding an estimated 40 minutes of administrative work to every shift.",
    solution:
      "Designed a role-aware dashboard that consolidates vitals, labs, medications, and care notes into a single scannable view, with configurable alert thresholds and a timeline that mirrors how nurses actually narrate a shift handoff.",
    role: "Lead Product Designer",
    duration: "16 weeks",
    tools: ["Figma", "FigJam", "Maze", "Jira"],
    tags: ["Healthcare", "Dashboard", "Design System", "B2B"],
    results: [
      { label: "Charting time reduced", value: "34%" },
      { label: "Shift handoff time saved", value: "11 min" },
      { label: "Clinician satisfaction", value: "4.7 / 5" },
    ],
    color: "#2563EB",
    overview:
      "Meridian Health partnered with our team to replace a patchwork of legacy tools with one clinical workspace. The goal was to reduce cognitive load during high-pressure shifts while meeting strict compliance and accessibility requirements.",
    challenge:
      "Nurses and physicians had fundamentally different information needs, and any misstep in hierarchy could mean a missed alert. The system also had to work on shared hospital workstations with inconsistent screen sizes and remain usable during 12-hour shifts.",
    research: [
      "Shadowed 14 shifts across ICU, general medicine, and the ER to map real handoff conversations.",
      "Ran contextual interviews with 22 nurses, physicians, and unit clerks.",
      "Audited three years of incident reports tied to missed or delayed information.",
    ],
    competitors: [
      { name: "Epic Hyperspace", note: "Powerful but dense; buries vitals under multiple clicks." },
      { name: "Cerner PowerChart", note: "Strong charting depth, weaker at-a-glance summary views." },
    ],
    personas: [
      {
        name: "Renata, RN",
        role: "Charge Nurse, Med-Surg",
        goal: "Get a trustworthy snapshot of every patient on the floor within the first ten minutes of a shift.",
        frustration: "Has to open three separate systems to confirm a single medication interaction.",
      },
      {
        name: "Dr. Osei",
        role: "Attending Physician",
        goal: "Spot deteriorating patients before they trigger a rapid response.",
        frustration: "Critical lab trends are buried in a flat table with no visual context.",
      },
    ],
    wireframeNotes: [
      "Low-fidelity flows tested the tradeoff between a card-based patient list and a dense table; nurses preferred table density, physicians preferred cards for rounding.",
      "Landed on a hybrid: compact table by default, expandable into a card view for rounding mode.",
    ],
    designSystemNotes: [
      "Built a clinical-grade color system where red, amber, and blue map exclusively to acuity, never decoration, to protect color-coded meaning.",
      "Typography scale tuned for readability at arm's length on shared workstation monitors.",
    ],
    testingNotes: [
      "Moderated usability sessions with 9 clinicians using a working prototype against real (de-identified) patient scenarios.",
      "Measured time-to-first-decision on three deteriorating-patient scenarios, down from 52 seconds to 19 seconds.",
    ],
    outcome:
      "The dashboard rolled out to three units before a full-hospital launch. Post-launch surveys showed a marked drop in reported near-misses tied to missed information during handoff.",
    lessons:
      "Clinical software has to earn trust before it earns adoption — every design decision was tested against 'would a nurse trust this at 3am,' not just 'is this usable.'",
  },
  {
    slug: "telemedicine-platform",
    title: "Northwind Telecare",
    industry: "Healthcare",
    year: "2023",
    summary:
      "An end-to-end virtual care platform connecting patients with primary care physicians, from booking through post-visit follow-up.",
    problem:
      "A regional health system needed a telehealth product to launch within a single quarter, replacing an unreliable third-party video vendor that patients were abandoning mid-call.",
    solution:
      "Designed a streamlined booking-to-visit flow with pre-visit device checks, an in-call layout built around clinical note-taking, and automated after-visit summaries patients could actually understand.",
    role: "Senior Product Designer",
    duration: "12 weeks",
    tools: ["Figma", "Maze", "Notion"],
    tags: ["Healthcare", "Mobile App", "Video", "Consumer"],
    results: [
      { label: "Call drop-off rate", value: "-62%" },
      { label: "Booking completion", value: "89%" },
      { label: "App Store rating", value: "4.6" },
    ],
    color: "#7C3AED",
    overview:
      "Northwind needed to move fast without cutting corners on trust or accessibility, given a patient base that skewed older and less comfortable with video calling apps.",
    challenge:
      "Balancing an aggressive 12-week timeline against the accessibility and reliability bar required for a healthcare product used by patients over 60 on unfamiliar devices.",
    research: [
      "Usability tested the incumbent vendor's flow to catalog every point of failure.",
      "Recruited patients aged 58–79 for moderated first-use sessions.",
    ],
    competitors: [
      { name: "Teladoc", note: "Smooth booking, but generic and impersonal in-call experience." },
      { name: "Amwell", note: "Strong clinical tooling, confusing account setup for new patients." },
    ],
    personas: [
      {
        name: "Harold",
        role: "Patient, 71",
        goal: "See his doctor without driving 40 minutes each way.",
        frustration: "Previous app required a browser plugin he didn't understand how to install.",
      },
    ],
    wireframeNotes: [
      "Prioritized a device-check screen before every call so failures happened before, not during, the appointment.",
      "Simplified the in-call UI to three controls maximum, with everything else tucked behind a single overflow menu.",
    ],
    designSystemNotes: [
      "Increased default type size and touch targets by 20% over standard mobile guidelines given the older patient demographic.",
    ],
    testingNotes: [
      "Ran five rounds of rapid usability testing over the 12-week sprint, adjusting the booking flow after each round.",
    ],
    outcome:
      "Launched on schedule across two hospital campuses, with call drop-off falling well below the health system's target threshold within the first month.",
    lessons:
      "Speed and accessibility aren't in tension if you test with your actual users early — the fastest path to 'fast' was catching failure points in week two, not week eleven.",
  },
  {
    slug: "hospital-management-system",
    title: "Aster Hospital OS",
    industry: "Healthcare",
    year: "2023",
    summary:
      "A modular back-office system for bed management, staff scheduling, and resource allocation across a multi-site hospital network.",
    problem:
      "Bed managers relied on whiteboards and phone calls to track availability across five hospital campuses, causing avoidable transfer delays.",
    solution:
      "Designed a real-time bed-status board with predictive discharge indicators and a scheduling module that surfaces staffing gaps before they become critical.",
    role: "Product Designer",
    duration: "20 weeks",
    tools: ["Figma", "Miro", "Jira"],
    tags: ["Healthcare", "Enterprise", "Design System"],
    results: [
      { label: "Bed turnover time", value: "-27%" },
      { label: "Transfer delay incidents", value: "-41%" },
      { label: "Modules shipped", value: "6" },
    ],
    color: "#14B8A6",
    overview:
      "Aster's operations team needed visibility across campuses that no single spreadsheet or legacy tool could provide in real time.",
    challenge:
      "Reconciling data from four legacy hospital information systems into one coherent, trustworthy real-time view without a full backend rewrite.",
    research: [
      "Mapped the end-to-end bed-turnover process across all five campuses with operations leadership.",
      "Interviewed bed managers, environmental services staff, and unit charge nurses.",
    ],
    competitors: [
      { name: "TeleTracking", note: "Feature-rich but heavy, with a steep onboarding curve for new staff." },
    ],
    personas: [
      {
        name: "Marcus",
        role: "Bed Manager",
        goal: "Place incoming ER patients without calling five units to check availability.",
        frustration: "Whiteboard data is often twenty minutes out of date by the time he acts on it.",
      },
    ],
    wireframeNotes: [
      "Designed a campus-level map view alongside a list view, letting operations staff toggle between spatial and tabular thinking.",
    ],
    designSystemNotes: [
      "Extended the core design system with a dedicated 'operations' density mode with tighter spacing for high-information screens.",
    ],
    testingNotes: [
      "Piloted the bed-status module on one campus for six weeks before expanding, using real usage data to prioritize the remaining five modules.",
    ],
    outcome:
      "All six planned modules shipped across the network, with the bed-status board becoming the default reference point in daily operations huddles.",
    lessons:
      "Enterprise healthcare tools succeed when they replace a trusted analog habit (the whiteboard) rather than asking staff to trust a black box.",
  },
  {
    slug: "electronic-health-records",
    title: "Clarity EHR Redesign",
    industry: "Healthcare",
    year: "2022",
    summary:
      "A ground-up redesign of a legacy electronic health records system used by over 3,000 clinicians daily.",
    problem:
      "The existing EHR had accumulated fifteen years of feature additions with no consistent design language, contributing to documented clinician burnout.",
    solution:
      "Led a phased redesign anchored in a new design system, starting with the highest-friction workflow — clinical note entry — before expanding system-wide.",
    role: "Lead Product Designer",
    duration: "9 months",
    tools: ["Figma", "FigJam", "Jira", "Maze"],
    tags: ["Healthcare", "Enterprise", "Design System", "Accessibility"],
    results: [
      { label: "Clicks per note", value: "-48%" },
      { label: "Reported burnout score", value: "-19%" },
      { label: "Components shipped", value: "140+" },
    ],
    color: "#2563EB",
    overview:
      "Clinician burnout tied to documentation burden was a top organizational priority, and the EHR was identified as a leading contributor.",
    challenge:
      "Redesigning a system this large without disrupting clinical operations required a phased rollout strategy and rigorous change management alongside the design work.",
    research: [
      "Analyzed six months of support tickets to identify the highest-friction workflows.",
      "Partnered with a physician advisory board that reviewed every major flow before build.",
    ],
    competitors: [
      { name: "Epic", note: "Industry benchmark for depth, but frequently cited as the burnout example to design against." },
    ],
    personas: [
      {
        name: "Dr. Alvarez",
        role: "Family Medicine Physician",
        goal: "Finish documentation before leaving the clinic, not after dinner.",
        frustration: "Note entry requires navigating six tabs for a routine visit.",
      },
    ],
    wireframeNotes: [
      "Prototyped a single-pane note entry flow that eliminated tab-switching for the 80% most common visit types.",
    ],
    designSystemNotes: [
      "Established the organization's first accessibility-audited component library, now used across four other internal products.",
    ],
    testingNotes: [
      "Ran a six-week pilot with 40 physicians before system-wide rollout, tracking documentation time as the primary success metric.",
    ],
    outcome:
      "The redesigned note-entry workflow rolled out to all 3,000+ clinicians, with the design system now the standard for all new internal healthcare tools.",
    lessons:
      "In systems this entrenched, sequencing matters as much as the design itself — starting with the highest-pain workflow built the trust needed to redesign everything else.",
  },
  {
    slug: "saas-crm-platform",
    title: "Flowline CRM",
    industry: "SaaS",
    year: "2024",
    summary:
      "A pipeline-first CRM built for small sales teams who found existing tools too heavy for their workflow.",
    problem:
      "Early users were abandoning setup within the first session, overwhelmed by configuration options before they'd added a single deal.",
    solution:
      "Redesigned onboarding around a single guided action — import your first ten deals — and rebuilt the pipeline view as the product's home screen instead of a buried tab.",
    role: "Senior Product Designer",
    duration: "10 weeks",
    tools: ["Figma", "Maze", "Linear"],
    tags: ["SaaS", "B2B", "Onboarding", "Web App"],
    results: [
      { label: "Activation rate", value: "+58%" },
      { label: "Time to first deal", value: "-71%" },
      { label: "Trial-to-paid conversion", value: "+22%" },
    ],
    color: "#7C3AED",
    overview:
      "Flowline's founders wanted a CRM that felt like a spreadsheet a sales rep already loved, not a system administrators configure on their behalf.",
    challenge:
      "Simplifying without hiding power-user functionality that existing customers relied on required careful progressive disclosure rather than removal.",
    research: [
      "Analyzed onboarding funnel drop-off with the founding engineering team.",
      "Ran five moderated first-use sessions with sales reps who had never seen the product.",
    ],
    competitors: [
      { name: "HubSpot CRM", note: "Generous free tier but a configuration-heavy first-run experience." },
      { name: "Pipedrive", note: "Strong pipeline visualization, weaker guided onboarding." },
    ],
    personas: [
      {
        name: "Jules",
        role: "Founder-led sales, 3-person team",
        goal: "Start tracking deals within the first five minutes of signing up.",
        frustration: "Most CRMs ask her to define custom fields before she's added a single contact.",
      },
    ],
    wireframeNotes: [
      "Replaced a settings-first onboarding wizard with a single import screen and smart defaults for everything else.",
    ],
    designSystemNotes: [
      "Built a lightweight, dense data-table component optimized for sales reps who live in keyboard shortcuts.",
    ],
    testingNotes: [
      "A/B tested the new onboarding against the legacy flow with 400 new signups over three weeks.",
    ],
    outcome:
      "The redesigned onboarding became the default experience for all new signups, directly contributing to the following quarter's conversion targets.",
    lessons:
      "The best simplification isn't removing features, it's sequencing them — power users got their fields back in settings, just not on day one.",
  },
  {
    slug: "finance-dashboard",
    title: "Ledgerline Finance",
    industry: "SaaS",
    year: "2023",
    summary:
      "A financial reporting dashboard that turns raw transaction data into forecasts a non-finance founder can actually read.",
    problem:
      "Startup founders using the platform's raw reports couldn't answer a simple question — 'do I have enough runway' — without exporting to a spreadsheet.",
    solution:
      "Designed a runway-first dashboard with plain-language forecast summaries, letting founders drill into the underlying transactions only when they wanted to.",
    role: "Product Designer",
    duration: "8 weeks",
    tools: ["Figma", "FigJam"],
    tags: ["SaaS", "Fintech", "Data Visualization", "Dashboard"],
    results: [
      { label: "Support tickets on runway", value: "-64%" },
      { label: "Weekly active dashboard use", value: "+3.1x" },
      { label: "NPS", value: "+24 pts" },
    ],
    color: "#14B8A6",
    overview:
      "Ledgerline's founder customers were financially savvy but time-constrained, and needed answers, not raw data.",
    challenge:
      "Communicating forecast uncertainty honestly, without either overwhelming users with confidence intervals or oversimplifying into false precision.",
    research: [
      "Interviewed 16 startup founders about how they currently answered runway questions (mostly: ad hoc spreadsheets).",
    ],
    competitors: [
      { name: "Brex Dashboard", note: "Clean visual design, but buries forecasting behind a separate report." },
    ],
    personas: [
      {
        name: "Priya",
        role: "Solo Founder",
        goal: "Know her runway in one glance before a board update.",
        frustration: "Currently rebuilds a runway spreadsheet manually every month.",
      },
    ],
    wireframeNotes: [
      "Tested three forecast visualization styles; a simple range band outperformed both a single line and a full Monte Carlo spread in comprehension testing.",
    ],
    designSystemNotes: [
      "Introduced a semantic color scale for financial health (healthy, caution, critical) reused across three other Ledgerline products.",
    ],
    testingNotes: [
      "Comprehension-tested the forecast visualization with 12 non-finance founders before finalizing the design.",
    ],
    outcome:
      "The runway dashboard became the most-used screen in the product, cited directly in the company's next funding round pitch deck as a differentiator.",
    lessons:
      "For financial products, the honest answer to 'what should we show' is often 'less, but clearer' — founders trusted the range band precisely because it didn't pretend to be exact.",
  },
  {
    slug: "ai-analytics-platform",
    title: "Signal AI Analytics",
    industry: "SaaS",
    year: "2024",
    summary:
      "An analytics platform that surfaces anomalies in product usage data automatically, instead of waiting for someone to build the right chart.",
    problem:
      "Product teams had the data but not the time to dig through dashboards daily, so meaningful usage shifts went unnoticed for weeks.",
    solution:
      "Designed an anomaly feed that pushes explained, ranked insights to product teams, backed by an exploration view for teams who want to dig deeper.",
    role: "Senior Product Designer",
    duration: "14 weeks",
    tools: ["Figma", "Maze", "Linear", "Hotjar"],
    tags: ["SaaS", "AI", "Data Visualization", "B2B"],
    results: [
      { label: "Time to detect anomaly", value: "-83%" },
      { label: "Weekly active users", value: "+2.4x" },
      { label: "Feature adoption (30d)", value: "71%" },
    ],
    color: "#2563EB",
    overview:
      "Signal's core differentiator was its anomaly-detection model, but the original interface still asked users to go looking for insights manually.",
    challenge:
      "Presenting AI-generated insights in a way that built trust rather than skepticism, especially for statistically subtle anomalies.",
    research: [
      "Studied how data analysts currently triaged dashboards to identify what 'trustworthy explanation' looked like to them.",
      "Ran a card sort on explanation formats with 18 product managers.",
    ],
    competitors: [
      { name: "Amplitude", note: "Powerful exploration tools, but insight discovery is still manual." },
      { name: "Mixpanel", note: "Strong funnels, limited proactive anomaly surfacing." },
    ],
    personas: [
      {
        name: "Tomás",
        role: "Product Manager",
        goal: "Catch a metric regression the same week it happens, not the next quarterly review.",
        frustration: "Currently relies on a teammate manually noticing a dip in a shared dashboard.",
      },
    ],
    wireframeNotes: [
      "Designed the anomaly card to always show the 'why' alongside the 'what' — a plain-language explanation next to every flagged metric.",
    ],
    designSystemNotes: [
      "Created a confidence-indicator pattern reused across every AI-generated insight in the product, so trust signals stayed consistent.",
    ],
    testingNotes: [
      "Ran a beta with 25 customer teams for four weeks, tracking whether flagged anomalies were acted on versus dismissed.",
    ],
    outcome:
      "The anomaly feed became the default landing screen for the product, materially increasing daily engagement without adding a single new chart type.",
    lessons:
      "AI-powered features earn trust through explanation, not confidence scores alone — showing the 'why' mattered more to adoption than model accuracy improvements.",
  },
  {
    slug: "ecommerce-mobile-app",
    title: "Marlow Shop",
    industry: "E-Commerce",
    year: "2022",
    summary:
      "A mobile shopping app redesign focused on reducing checkout abandonment for a mid-size direct-to-consumer apparel brand.",
    problem:
      "Cart abandonment on mobile sat at 76%, well above the brand's desktop rate, with checkout identified as the single biggest drop-off point.",
    solution:
      "Rebuilt checkout as a single scrollable flow with persistent order summary, saved payment defaults, and a size-confidence tool to reduce return-driven hesitation.",
    role: "Product Designer",
    duration: "7 weeks",
    tools: ["Figma", "Maze"],
    tags: ["E-Commerce", "Mobile App", "Conversion", "Consumer"],
    results: [
      { label: "Mobile checkout completion", value: "+31%" },
      { label: "Return rate", value: "-14%" },
      { label: "Time to checkout", value: "-45%" },
    ],
    color: "#7C3AED",
    overview:
      "Marlow's mobile app carried desktop checkout patterns that didn't translate to smaller screens or on-the-go shopping behavior.",
    challenge:
      "Reducing checkout friction while also addressing an unrelated but connected problem — size-driven returns — within a tight seven-week timeline.",
    research: [
      "Session-recorded 200+ mobile checkout attempts to pinpoint exact abandonment moments.",
      "Surveyed customers who returned items for a size-related reason.",
    ],
    competitors: [
      { name: "ASOS App", note: "Fast checkout, strong size-guide integration to reference." },
    ],
    personas: [
      {
        name: "Dana",
        role: "Repeat customer",
        goal: "Finish checkout in under a minute on her phone during a commute.",
        frustration: "Re-enters shipping and payment info every time because saved details aren't surfaced clearly.",
      },
    ],
    wireframeNotes: [
      "Collapsed a four-step checkout into one scrollable screen with sticky order summary and primary action.",
    ],
    designSystemNotes: [
      "Added a lightweight size-confidence component surfaced at the product page and cart, not just at checkout.",
    ],
    testingNotes: [
      "Ran unmoderated tests on the new checkout flow with 60 participants, comparing completion time against the legacy flow.",
    ],
    outcome:
      "The redesigned checkout shipped ahead of the brand's holiday peak season and held its conversion gains through the following two quarters.",
    lessons:
      "Sometimes the highest-leverage fix isn't in the flow you were asked to redesign — the size-confidence tool addressed the return problem checkout alone couldn't solve.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
