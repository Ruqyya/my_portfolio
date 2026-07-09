import {
  LayoutDashboard, Compass, Palette, Smartphone, Boxes,
  HeartPulse, Component, SearchCheck, Lightbulb, Presentation,
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { services } from "../../data/content";

const icons = [
  LayoutDashboard, Compass, Palette, Smartphone, Boxes,
  HeartPulse, Component, SearchCheck, Lightbulb, Presentation,
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Services"
          title="How I can help your team."
          description="Flexible engagement models, from a two-week audit to an embedded design partnership."
          align="center"
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={s.title} delay={(i % 5) * 0.06}>
                <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-[#0EA5E9] dark:hover:border-[#0EA5E9] hover:shadow-lg transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#0EA5E9] mb-4 group-hover:bg-[#0EA5E9] group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
