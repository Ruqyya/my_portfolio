import { Award, Trophy, Medal, Sparkles, Star, GraduationCap } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { awards, certifications } from "../../data/content";

const awardIcons = [Trophy, Award, Medal, Sparkles, Star, Award];

export default function Awards() {
  return (
    <section id="awards" className="relative py-24 md:py-32 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="Recognition" title="Awards & certifications." align="center" />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awards.map((a, i) => {
            const Icon = awardIcons[i % awardIcons.length];
            return (
              <Reveal key={a.title} delay={i * 0.05}>
                <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-6 flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white">
                    <Icon size={19} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 dark:text-white text-sm">{a.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{a.org} · {a.year}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-600 p-5 text-center h-full flex flex-col items-center justify-center">
                <GraduationCap size={20} className="text-[#14B8A6] mb-2" />
                <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100">{c.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{c.org} · {c.year}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
