import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import PulseDivider from "../ui/PulseDivider";
import { process } from "../../data/content";

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Process"
          title="A research-driven design process."
          description="Eight stages, always in this order — because skipping research to get to visuals faster is how products end up unloved."
          align="center"
        />

        <PulseDivider className="mt-14 max-w-4xl mx-auto opacity-50" color="#7C3AED" />

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.05}>
              <div className="relative h-full rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-6">
                <span className="font-display font-extrabold text-3xl text-slate-100 dark:text-slate-700 absolute top-4 right-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2 relative">{p.step}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed relative">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
