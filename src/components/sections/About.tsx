import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { aboutFocus } from "../../data/content";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-start">
        <SectionHeading
          eyebrow="About"
          title="Six years turning complex problems into products people trust."
          description="I'm a product designer who specializes in the hard-but-important corners of software — clinical tools used under pressure, and SaaS platforms where the data is dense but the decisions can't wait. My process starts with research, not Figma, because the best interface is the one built on what people actually need."
        />

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2.5 mb-8">
            {aboutFocus.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/60 dark:to-slate-900">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              I started as a freelance UI designer, moved into full product
              design at consultancies, and now lead design for platforms used
              by thousands of clinicians and sales teams every day. What hasn't
              changed is the question I ask before any pixel gets pushed:{" "}
              <span className="text-slate-900 dark:text-white font-semibold">
                what does this person actually need to do next?
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
