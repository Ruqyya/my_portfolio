import { tools } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";

export default function Tools() {
  const loop = [...tools, ...tools];
  return (
    <section id="tools" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 mb-10">
        <SectionHeading eyebrow="Toolkit" title="Tools I design with daily." align="center" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#0F172A] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#0F172A] to-transparent z-10" />
        <div className="flex gap-4 animate-marquee w-max">
          {loop.map((tool, i) => (
            <span
              key={tool + i}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
