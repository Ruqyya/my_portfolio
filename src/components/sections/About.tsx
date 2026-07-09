import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { aboutFocus } from "../../data/content";
import ruqqyaImg from "../../assets/ruqqya_img.png";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Six years turning complex problems into products people trust."
            description="I specialize in clinical tools and SaaS platforms where data is dense. My process starts with research, ensuring the best interface is built on actual needs."
          />

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2.5 mt-8">
              {aboutFocus.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative flex justify-center lg:justify-end">
          <div className="relative rounded-full overflow-hidden aspect-square max-w-[280px] md:max-w-[320px] w-full shadow-2xl border-4 border-[#14B8A6] bg-[#14B8A6]/10">
            <img src={ruqqyaImg} alt="Ruqyya" className="w-full h-full object-cover object-top" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
