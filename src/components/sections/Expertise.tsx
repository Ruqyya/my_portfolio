import { Link } from "react-router-dom";
import { ArrowUpRight, Blocks, CalendarCheck, HeartPulse, LayoutDashboard, Layers, SearchCheck, Workflow } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { BOOK_HREF, bookProps } from "../../data/contact";

// Six capabilities, each one line, each tied to evidence: a project on this site or a role on LinkedIn.
const areas = [
  { icon: HeartPulse, title: "Healthcare products", text: "Patient apps, clinician portals, clinic sites.", to: "/work/oladoc-healthcare-app-ui-ux-design" },
  { icon: LayoutDashboard, title: "B2B SaaS dashboards", text: "High-traffic workflows, less confusion.", note: "Appsol360" },
  { icon: SearchCheck, title: "Research and testing", text: "Personas, journey maps, Maze tests.", to: "/work/oladoc-healthcare-app-ui-ux-design#research" },
  { icon: Workflow, title: "Multi-role workflows", text: "One booking, three seats.", to: "/work/oladoc-healthcare-app-ui-ux-design#decisions" },
  { icon: Layers, title: "Design systems", text: "Accessible, consistent Figma systems.", note: "SQSOL, Oladoc" },
  { icon: Blocks, title: "Dev handoff", text: "Specs and components engineers can use.", note: "SQSOL" },
];

export default function Expertise() {
  return (
    <section id="expertise" className="sheet sheet-light pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow n="01">Expertise</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.04]">
              Complex products, <em className="text-forest">made usable.</em>
            </h2>
            <p className="mt-6 max-w-sm text-xl leading-snug text-ink-2">For healthcare and B2B SaaS teams.</p>
            <a
              href={BOOK_HREF}
              {...bookProps}
              className="mt-8 inline-flex h-14 items-center gap-3 rounded-full bg-forest px-8 text-lg font-semibold text-on-forest transition-colors hover:bg-[var(--forest-hover)]"
            >
              <CalendarCheck size={20} aria-hidden /> Book a 15-minute call
            </a>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {areas.map((a, i) => {
              const inner = (
                <>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-paper-2 text-forest transition-colors group-hover:bg-forest group-hover:text-on-forest">
                    <a.icon size={26} strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[1.55rem] font-medium leading-tight">{a.title}</h3>
                  <p className="mt-2 text-lg leading-snug text-ink-2">{a.text}</p>
                  {a.to ? (
                    <ArrowUpRight size={20} className="absolute right-6 top-6 text-forest opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  ) : (
                    <p className="mono mt-4 text-ink-2">{a.note} · LinkedIn</p>
                  )}
                </>
              );
              return (
                <li key={a.title}>
                  <Reveal delay={(i % 2) * 0.06} className="h-full">
                    {a.to ? (
                      <Link to={a.to} className="group relative block h-full rounded-2xl border border-line bg-paper p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7">
                        {inner}
                      </Link>
                    ) : (
                      <div className="group relative h-full rounded-2xl border border-line bg-paper p-6 md:p-7">{inner}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
