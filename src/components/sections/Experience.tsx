import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { experience } from "../../data/content";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="Career" title="Experience timeline." align="center" />

        <div className="relative mt-16 pl-8 md:pl-0">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 md:-translate-x-1/2" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <Reveal key={item.role + item.company} delay={i * 0.06}>
                <div className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 0 ? "" : ""}`}>
                  <span className="absolute -left-[1.9rem] md:left-1/2 top-1.5 w-3.5 h-3.5 rounded-full bg-[#2563EB] ring-4 ring-white dark:ring-slate-900 md:-translate-x-1/2 z-10" />

                  <div className={`${i % 2 === 0 ? "md:text-right md:pr-14" : "md:col-start-2 md:pl-14"}`}>
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-6">
                      <span className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA]">{item.period}</span>
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-1">{item.role}</h3>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{item.company}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
