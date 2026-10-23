import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { testimonials, awards, certifications } from "../../data/content";

export default function Voices() {
  const featured = [testimonials[0], testimonials[5]];
  const rest = testimonials.filter((t) => !featured.includes(t));

  return (
    <section id="voices" className="surface-deep relative z-10 mt-28 pb-24 pt-24 md:mt-44 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <Eyebrow n="05">In their words</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {featured.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure>
                <blockquote className="serif text-2xl font-medium leading-snug md:text-[2rem]">“{t.review}”</blockquote>
                <figcaption className="mt-6">
                  <span className="font-semibold">{t.name}</span>
                  <span className="mono mt-1 block text-ink-2">
                    {t.role} · {t.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <ul className="mt-20 grid gap-x-12 gap-y-10 border-t border-line pt-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((t, i) => (
            <li key={t.name + i}>
              <Reveal delay={(i % 3) * 0.05}>
                <p className="text-ink-2">“{t.review}”</p>
                <p className="mono mt-4">
                  {t.name} <span className="text-ink-2">· {t.role}, {t.company}</span>
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-28 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="text-3xl font-medium md:text-4xl">Recognition &amp; study</h3>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-2 lg:col-span-8">
            <Reveal>
              <h4 className="mono text-signal">Awards</h4>
              <ul className="mt-3 border-t border-line">
                {awards.map((a) => (
                  <li key={a.title + a.year} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                    <span>
                      {a.title} <span className="text-ink-2">· {a.org}</span>
                    </span>
                    <span className="mono text-ink-2">{a.year}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h4 className="mono text-signal">Certifications</h4>
              <ul className="mt-3 border-t border-line">
                {certifications.map((a) => (
                  <li key={a.title} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                    <span>
                      {a.title} <span className="text-ink-2">· {a.org}</span>
                    </span>
                    <span className="mono text-ink-2">{a.year}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
