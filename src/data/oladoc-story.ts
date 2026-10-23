// Oladoc: the long-form story. This is the benchmark case study.
//
// Sources, in order of weight:
//  1. The designer's own Figma exports (journey map, information architecture, screens, design-system board).
//  2. The project film script.
//  3. LinkedIn (the one quoted result).
// Nothing here is an interview, a usability test or an analytics figure: none is documented in the project files.
// Intended benefits are labelled as intended. Outcomes are "Not measured" unless a sourced number exists.
import type { CaseStudy, Shot, Task } from "./case-studies";

const shot = (n: string, alt: string, caption?: string, notes?: Shot["notes"]): Shot => ({ src: `case/oladoc/${n}.webp`, alt, caption, notes });

const NOT_MEASURED = "Not measured. No usability test or analytics data is documented for this decision.";

const tasks: Task[] = [
  {
    id: "find",
    label: "Find a doctor",
    title: "From a symptom to a verified doctor",
    text: "Home asks how the patient is feeling and offers “Not sure who to see?”. Search turns a symptom into a suggested specialty and lists verified doctors nearby.",
    kind: "phones",
    shots: [shot("home", "Patient app home with a symptom prompt.", "Home"), shot("sym", "Search by symptom, suggesting a cardiologist.", "Search by symptom")],
  },
  {
    id: "evaluate",
    label: "Evaluate a provider",
    title: "Enough to judge a doctor, in one screen",
    text: "The profile puts PMDC verification, experience, rating, patients and the fee for each kind of visit before the biography and qualifications.",
    kind: "single",
    shots: [shot("profile", "Doctor profile with verification, experience, rating, fee and qualifications.", "Doctor profile")],
  },
  {
    id: "book",
    label: "Book an appointment",
    title: "Four short steps, and the total before paying",
    text: "Choose the type of visit, pick a clinic, select a time, and see the fee, the online discount and the total before confirming.",
    kind: "flow",
    shots: [
      shot("type", "Choose type of consultation.", "1 · Choose type"),
      shot("clinic", "Select a clinic.", "2 · Pick a clinic"),
      shot("date", "Select date and time.", "3 · Select a time"),
      shot("payment", "Payment with the fee, discount and total.", "4 · See the total"),
    ],
  },
  {
    id: "follow",
    label: "Follow through",
    title: "Care that continues after the visit",
    text: "A video visit or clinic visit ends in a structured, signed prescription. Lab tests and medicines start from it, and results return to Records.",
    kind: "flow",
    shots: [
      shot("video", "Video visit.", "Video visit"),
      shot("rx", "Digital prescription.", "Digital prescription"),
      shot("lab", "Lab tests suggested by the doctor.", "Lab tests"),
      shot("meds", "Medicines ordered from the prescription.", "Medicines"),
    ],
  },
  {
    id: "run",
    label: "Run the clinic day",
    title: "Two desktop portals built for speed",
    text: "The doctor sees the day at a glance and works from a consultation workspace. The front desk sees check-in status on every row of the queue.",
    kind: "wide",
    shots: [
      shot("docdash", "Doctor portal dashboard.", "Doctor portal"),
      shot("frontdesk", "Front desk queue.", "Front desk"),
      shot("consult", "Doctor consultation workspace.", "Consultation workspace"),
    ],
  },
];

export const oladocStory: Partial<CaseStudy> = {
  headline: "Designing a clearer path from finding care to booking it.",
  identifier: "Oladoc Healthcare App UX/UI Case Study",
  overview: [
    { k: "The product", v: "Oladoc, a healthcare marketplace: find a doctor, book, consult and follow up." },
    { k: "The core problem", v: "Patients know how they feel, not which doctor to see. Clinic staff worked in tools built only for the doctor." },
    { k: "My role", v: "UX and UI design, end to end." },
    { k: "Scope", v: "Patient app, doctor portal, front desk portal and a design system: 47 screens, 4 clickable journeys." },
    { k: "Target users", v: "Patients (primary persona: Ayesha, 32), doctors and front-desk staff." },
    { k: "Reported result", v: "+65% patient-intake completion, self-reported on my LinkedIn. Method not documented here." },
  ],
  heroShots: [shot("docdash", "Oladoc doctor portal."), shot("frontdesk", "Oladoc front desk portal."), shot("sym", "Oladoc patient app, search by symptom."), shot("profile", "Oladoc patient app, doctor profile.")],

  problem: {
    headline: "A good booking needs three people to see the same thing, and each started somewhere different.",
    points: [
      { title: "Before the visit: choosing", text: "Patients know how they feel, not which doctor to see. A search returns 300+ results and no help deciding, and trust signals are scattered, so a higher fee may not mean better care." },
      { title: "At booking: paying", text: "Surprise costs at reception. A patient with no time to visit three clinics wants a slot, a clear total and an instant confirmation." },
      { title: "After the visit: continuing", text: "Patients repeat their history to every new doctor, and care stops at the clinic door, so tests and medicines mean more trips." },
      { title: "Behind the desk: running the day", text: "The front desk runs the clinic, but the tools were built for the doctor, not for check-in, queues and walk-ins." },
    ],
    why: "The persona's scenario is the test every screen had to pass: two days of chest discomfort, a cardiologist wanted this week, and tests and medicines sorted without more trips. “I just need to find the right doctor quickly, and actually trust that they're good.”",
  },

  research: {
    text: "One persona, six stages, every pain point answered on screen.",
    documented: [
      "Persona: Ayesha Rahman, 32, Gulberg, Lahore",
      "Empathy maps (referenced on the journey map)",
      "A six-stage journey map: doing, thinking, feeling, pain point",
      "Information architecture for three user types",
    ],
    notDocumented: ["User interviews", "Usability testing", "Participant counts", "Analytics or conversion data"],
    insights: [
      { title: "Notice a symptom", doing: "Feels chest discomfort and wonders if it can wait.", feeling: { label: "Worried · uncertain", level: 0.19 }, thought: "I hope this isn't something serious.", text: "She does not know which specialist to see.", response: "A symptom-first entry on Home: “Not sure who to see?” suggests a specialist.", shot: shot("home", "Patient app home with a symptom prompt.", "Home") },
      { title: "Search and self-educate", doing: "Googles the symptom, reads about it, and lands on Oladoc.", feeling: { label: "Curious · overwhelmed", level: 0 }, thought: "I don't even know which specialty I need.", text: "300+ results and no help deciding.", response: "Search by symptom: Chest pain points to Cardiologist and shows verified doctors nearby.", shot: shot("sym", "Search by symptom screen.", "Search by symptom") },
      { title: "Compare doctors", doing: "Weighs verification, reviews, fee, distance and availability.", feeling: { label: "Cautious · analytical", level: 0.32 }, thought: "Can I actually trust these reviews?", text: "Trust signals are scattered, and a higher fee may not mean better care.", response: "The profile puts PMDC verification, rating, fee and clinics up front.", shot: shot("profile", "Doctor profile.", "Doctor profile") },
      { title: "Book", doing: "Chooses clinic or video, picks a slot, and wants instant confirmation.", feeling: { label: "Hopeful · impatient", level: 0.65 }, thought: "I don't have time to visit three clinics.", text: "Surprise costs at reception.", response: "One decision per screen, the fee and the 15% online discount stated before payment, and a clear total.", shot: shot("payment", "Payment screen with the total.", "Payment") },
      { title: "Consult", doing: "Joins the video call or visits the clinic, then receives a prescription.", feeling: { label: "Relieved", level: 1 }, thought: "Will they take me and my concern seriously?", text: "Repeating her history at every new doctor.", response: "A structured, signed prescription saved to Records, so her history travels with her.", shot: shot("rx", "Digital prescription.", "Prescription") },
      { title: "Follow up", doing: "Books the suggested lab test and orders the prescribed medicines.", feeling: { label: "Evaluating", level: 0.78 }, thought: "Will I have to repeat all this again?", text: "Care stops at the clinic door, so tests and medicines mean more trips.", response: "Lab tests and medicines start from the prescription, and reports return to Records.", shot: shot("lab", "Lab tests.", "Lab tests") },
    ],
    shot: { src: "case/oladoc/journey.webp", alt: "The full journey map: persona, six stages, doing, thinking, feeling, pain points, design responses and screens.", caption: "The full journey map, as designed" },
  },

  decisions: [
    {
      title: "Start from a symptom, not a specialty",
      text: "Search begins with how the patient feels.",
      kind: "phone",
      shots: [
        shot("sym", "Search by symptom, suggesting a cardiologist.", "Search by symptom", [
          { x: 93, y: 27, text: "Symptoms are the way in, written the way patients describe them." },
          { x: 93, y: 38.5, text: "The app suggests a specialty and says how many verified doctors are nearby." },
          { x: 93, y: 56.5, text: "Verified tick, rating, experience, availability and fee on one card." },
        ]),
      ],
      record: {
        problem: "Patients know how they feel, not which doctor to see.",
        evidence: "Journey stages 01 and 02: “I don't even know which specialty I need.” 300+ results and no help deciding.",
        decision: "Search starts from symptoms. Choosing Chest pain suggests Cardiologist and lists verified cardiologists nearby. Home carries a “Not sure who to see?” prompt.",
        benefit: "A patient can reach a relevant, verified doctor without knowing medical vocabulary.",
        outcome: NOT_MEASURED,
        tradeoff: "Search is its own tab so symptom-first discovery is always one tap away. Specialty and location browsing stay available as other routes in the same tab.",
      },
    },
    {
      title: "Put the trust signals first",
      text: "The profile answers “can I trust this doctor?” before anything else.",
      kind: "phone",
      shots: [
        shot("profile", "Doctor profile with verification, experience, rating, fee and qualifications.", "Doctor profile", [
          { x: 68, y: 17.7, text: "PMDC verification sits under the name." },
          { x: 93, y: 25, text: "Experience, rating and patient count in one band." },
          { x: 93, y: 41.5, text: "Both visit types with their fees, selectable." },
        ]),
      ],
      record: {
        problem: "Trust signals are scattered, and a higher fee may not mean better care.",
        evidence: "Journey stage 03: “Can I actually trust these reviews?”",
        decision: "The profile leads with verification, experience, rating, patients and fee, then the biography and qualifications.",
        benefit: "A patient can judge credibility and cost before reading anything else.",
        outcome: NOT_MEASURED,
        tradeoff: "The top of the screen is spent on proof rather than on the doctor's story. The biography is one scroll below.",
      },
    },
    {
      title: "One decision per screen, and the total before paying",
      text: "Booking is four short steps instead of one long form.",
      kind: "phone",
      shots: [
        shot("payment", "Payment with the fee, discount and total.", "Payment", [
          { x: 93, y: 27.5, text: "Payment choices, with the online saving stated on the option it belongs to." },
          { x: 93, y: 53, text: "Fee, discount and total are laid out before the patient commits." },
          { x: 93, y: 88, text: "One confirming action." },
        ]),
      ],
      record: {
        problem: "Surprise costs at reception, and no time to visit three clinics.",
        evidence: "Journey stage 04: “I don't have time to visit three clinics.” Pain point: surprise costs at reception.",
        decision: "Booking is four steps: type of visit, clinic, time, total. The payment screen shows the fee, the 15% online discount and the total before the patient confirms.",
        benefit: "No surprise at the desk, and less to decide on each screen.",
        outcome: NOT_MEASURED,
        tradeoff: "More screens, each simpler. Pay at the clinic stays available next to online payment.",
      },
    },
    {
      title: "Care does not stop at the clinic door",
      text: "The prescription is the hinge between the visit and everything after it.",
      kind: "phone",
      shots: [
        shot("rx", "Digital prescription.", "Prescription", [
          { x: 93, y: 30, text: "A structured medication list: name, dose, timing, duration." },
          { x: 93, y: 72, text: "Download or share without leaving the app." },
          { x: 93, y: 82, text: "Digitally signed and marked PMDC verified." },
        ]),
      ],
      record: {
        problem: "Patients repeat their history at every new doctor, and tests and medicines mean more trips.",
        evidence: "Journey stages 05 and 06: “Will I have to repeat all this again?”",
        decision: "A signed prescription is saved to Records. Lab tests and medicines start from it, and reports return to Records.",
        benefit: "The patient's history travels with her, and follow-up needs fewer separate journeys.",
        outcome: NOT_MEASURED,
        tradeoff: "Booking, lab tests and medicines are guided paths that start from a doctor or a prescription, not tabs of their own. That keeps the app to five tabs.",
      },
    },
    {
      title: "Built for speed, not exploration",
      text: "The desktop portals are for people who use them all day.",
      kind: "wide",
      shots: [
        shot("frontdesk", "Front desk queue with filters, status and one action per row.", "Front desk queue", [
          { x: 84, y: 23, text: "Filter the queue by state: All, Scheduled, Arrived, With doctor, Done." },
          { x: 77, y: 31, text: "Check-in status on every row." },
          { x: 96, y: 33, text: "One action per row: Send in, Check in, Mark done." },
          { x: 97, y: 12, text: "Register a walk-in from anywhere in the queue." },
        ]),
      ],
      record: {
        problem: "The front desk runs the clinic, but tools were built for the doctor.",
        evidence: "The research frames this as a gap in the clinic's tools. No staff interviews are documented.",
        decision: "Separate portals. The doctor sees the day at a glance. The front desk gets a queue with state filters, a status and a single action per row, and a Register walk-in button.",
        benefit: "Staff can see who has arrived and act without leaving the queue.",
        outcome: NOT_MEASURED,
        tradeoff: "Density over discovery, because these users return every day. Profile and settings are marked “not designed yet” in the information architecture.",
      },
    },
  ],

  tasks,

  outcomes: {
    quantitative: [
      {
        value: "+65%",
        label: "patient-intake completion",
        source: "Oladoc, 2025. Self-reported on my LinkedIn.",
        status: "Not independently verified. The measurement method, sample and period are not documented in the project files, so treat it as a reported figure, not a proven one.",
      },
    ],
    qualitative: [
      "Six pain points are documented across the booking journey, and each has a design response and a screen (the journey map).",
      "Three user types have three separate navigation structures, defined in the information architecture.",
      "One design system covers all three products, with live components and shared status badges: Confirmed, Pending, Arrived, Waiting, With doctor, Done.",
    ],
    intended: [
      "Patients reach a relevant, verified doctor without knowing which specialty they need.",
      "Patients judge a doctor's credibility and cost before booking.",
      "Patients see the total before they pay.",
      "A visit leads straight into prescription, lab tests and medicines.",
      "Front-desk staff see check-in state without leaving the queue.",
    ],
    notVerified: ["No usability test results", "No analytics beyond the single reported figure", "No interview or participant data in the project files", "Doctor names, fees and counts on screen are design content, not live data"],
    reflection: [
      "Three people use every booking, so every status had to mean the same thing to the patient, the doctor and the front desk. The shared design system and status badges came from that.",
      "Starting from a symptom rather than a specialty changed the shape of the app: search became its own tab, and booking, lab tests and medicines became paths that start from a doctor or a prescription.",
      "What I would do next: design Profile and settings, which the information architecture still marks as not designed, and test the booking flow with real patients before claiming it works.",
    ],
  },

  signals: [
    { skill: "UX research", evidence: "A persona, empathy maps and a six-stage journey map, each pain point tied to a screen.", to: "research" },
    { skill: "Workflow design", evidence: "One booking carried across the patient app, the doctor portal and the front desk queue.", to: "decisions" },
    { skill: "Product thinking", evidence: "Guided paths instead of extra tabs, and an explicit list of what is not designed yet.", to: "decisions" },
    { skill: "Interface design", evidence: "47 screens across mobile and desktop, with the key states and actions annotated.", to: "screens" },
    { skill: "Design systems", evidence: "Live components, shared status badges and one palette across three products.", to: "system" },
  ],
};
