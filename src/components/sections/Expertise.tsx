import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";

// Every card is tied to evidence: a project on this site or a role on LinkedIn.
const areas = [
  {
    title: "Healthcare product design",
    text: "Patient apps, clinician portals and clinic websites, designed so the patient, the doctor and the front desk can all use the same product.",
    proof: { label: "See Oladoc, three portals on one system", to: "/work/oladoc-healthcare-app-ui-ux-design" },
  },
  {
    title: "Healthcare and B2B SaaS",
    text: "Dashboards and workflows that simplify high-traffic tasks and reduce user confusion.",
    proof: { label: "B2B dashboards at Appsol360, from my LinkedIn" },
  },
  {
    title: "UX research and testing",
    text: "Personas, journey maps and usability tests in Maze, turned into prioritised fixes that ship.",
    proof: { label: "See the Oladoc journey map", to: "/work/oladoc-healthcare-app-ui-ux-design#research" },
  },
  {
    title: "Complex, multi-role workflows",
    text: "One booking seen from three seats: the patient who makes it, the doctor who serves it and the front desk that runs the day.",
    proof: { label: "See the Oladoc portals", to: "/work/oladoc-healthcare-app-ui-ux-design#decisions" },
  },
  {
    title: "Design systems and accessibility",
    text: "Responsive, WCAG-conscious Figma systems that keep a product consistent as it grows.",
    proof: { label: "Design system at SQSOL and oladoc, from my LinkedIn" },
  },
  {
    title: "Design-to-dev handoff",
    text: "Reusable component libraries and Figma Dev Mode specs that cut back-and-forth with engineering.",
    proof: { label: "Handoff at SQSOL, from my LinkedIn" },
  },
];

const frame = [
  ["Who I help", "Healthcare and B2B SaaS teams building patient, clinician and operations products."],
  ["What I solve", "Dense workflows, low trust at the first step, and drop-off in onboarding and intake."],
  ["How I work", "Research, wireframes, prototypes and production UI, owned end to end."],
];

export default function Expertise() {
  return (
    <section id="expertise" className="sheet sheet-light pb-28 pt-24 md:pb-36 md:pt-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow n="01">Expertise</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.06]">
              Complex products, <em className="text-forest">made usable and trusted.</em>
            </h2>
            <dl className="mt-10 space-y-6 border-t border-line pt-8">
              {frame.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono text-signal">{k}</dt>
                  <dd className="mt-1 text-lg text-ink-2">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mono mt-8 text-ink-2">Tools · Figma · Figma Dev Mode · Maze · Photoshop · Illustrator</p>
          </Reveal>

          <ul
            tabIndex={0}
            aria-label="Areas of expertise, scroll sideways on small screens"
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-7"
          >
            {areas.map((a, i) => (
              <li key={a.title} className="w-[82%] shrink-0 snap-center sm:w-auto">
                <Reveal delay={(i % 2) * 0.06} className="group flex h-full flex-col rounded-xl border border-line bg-paper-2/60 p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7">
                  <span className="mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-[1.7rem] font-medium leading-tight">{a.title}</h3>
                  <p className="mt-3 text-ink-2">{a.text}</p>
                  <p className="mt-auto pt-6 text-sm font-semibold text-forest">
                    {a.proof.to ? (
                      <Link to={a.proof.to} className="link-draw inline-flex items-center gap-1 py-1">
                        {a.proof.label} <ArrowUpRight size={14} />
                      </Link>
                    ) : (
                      <span className="text-ink-2">{a.proof.label}</span>
                    )}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
