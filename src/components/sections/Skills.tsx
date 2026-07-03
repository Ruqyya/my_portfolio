import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { skillGroups } from "../../data/content";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title="A full-stack design skill set."
          description="From early research through the last pixel of a shipped design system."
          align="center"
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 p-6 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
                <div
                  className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center font-display font-extrabold text-white"
                  style={{ backgroundColor: group.color }}
                >
                  {group.category.slice(0, 1)}
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
