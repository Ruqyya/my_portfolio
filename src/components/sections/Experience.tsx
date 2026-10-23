import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { education, experience } from "../../data/content";

export default function Experience() {
  return (
    <>
      <section id="experience" className="surface-deep sheet pb-28 pt-24 md:pb-36 md:pt-32">
        <div className="mx-auto max-w-[88rem] px-5 md:px-10">
          <Reveal>
            <Eyebrow n="03">Experience</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.08]">
              Healthcare and SaaS products, <em className="text-forest">from research to shipped UI.</em>
            </h2>
            <p className="mono mt-6 text-ink-2">
              Matches my{" "}
              <a className="link-draw py-1 text-ink" href="https://www.linkedin.com/in/ghulamruqyya/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </p>
          </Reveal>
          <ol className="mt-14 border-t border-line">
            {experience.map((e, i) => (
              <li key={e.company + e.period} className="border-b border-line">
                <Reveal delay={i * 0.04} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <p className="mono text-ink-2">{e.period}</p>
                    <p className="mono mt-1 text-ink-2">{e.duration}</p>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-2xl font-medium md:text-3xl">{e.role}</h3>
                    <p className="mt-2 font-semibold text-forest">{e.company}</p>
                    <p className="mt-1 text-sm text-ink-2">
                      {e.type} · {e.location}
                    </p>
                  </div>
                  <div className="md:col-span-5">
                    {e.summary && <p className="text-ink">{e.summary}</p>}
                    <ul className={`space-y-3 text-ink-2 ${e.summary ? "mt-4" : ""}`}>
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-signal" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-10">
            <p className="mono text-ink-2">Education</p>
            <p className="serif mt-2 text-2xl">
              {education.degree}, {education.school} <span className="text-ink-2">· {education.years}</span>
            </p>
          </Reveal>
        </div>
      </section>

    </>
  );
}
