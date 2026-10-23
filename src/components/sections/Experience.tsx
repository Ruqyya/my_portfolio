import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { experience, services, skillGroups, tools } from "../../data/content";

export default function Experience() {
  return (
    <>
      <section id="experience" className="relative z-10 pt-28 md:pt-44">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="03">Experience</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-[clamp(2.3rem,5vw,4.3rem)] font-medium leading-[1.08]">
              Six years, from freelance interfaces to <em className="text-forest">design leadership.</em>
            </h2>
          </Reveal>
          <ol className="mt-14 border-t border-line">
            {experience.map((e, i) => (
              <li key={e.company + e.period} className="border-b border-line">
                <Reveal delay={i * 0.04} className="grid gap-2 py-8 md:grid-cols-12 md:gap-8">
                  <p className="mono text-ink-2 md:col-span-3">{e.period}</p>
                  <div className="md:col-span-4">
                    <h3 className="text-2xl font-medium md:text-3xl">{e.role}</h3>
                    <p className="mt-1 font-semibold text-forest">{e.company}</p>
                  </div>
                  <p className="text-ink-2 md:col-span-5">{e.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="capabilities" className="relative z-10 pt-28 md:pt-44">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-5 md:px-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow n="04">Capabilities</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.3rem,4.6vw,3.9rem)] font-medium leading-[1.08]">What I can take on.</h2>
            <p className="mono mt-10 text-ink-2">Tools</p>
            <p className="mt-3 text-ink-2">{tools.join(" · ")}</p>
          </Reveal>
          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {services.map((s, i) => (
                <li key={s.title} className="border-b border-line">
                  <Reveal delay={(i % 4) * 0.04} className="grid gap-1 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
                    <h3 className="text-xl font-medium md:text-2xl">{s.title}</h3>
                    <p className="text-ink-2">{s.description}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {skillGroups.map((g) => (
                <div key={g.category}>
                  <h3 className="mono text-signal">{g.category}</h3>
                  <p className="mt-2 text-ink-2">{g.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
