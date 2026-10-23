import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { testimonials, certifications } from "../../data/content";

// Only reviews with a real source are shown. Client reviews here come from Fiverr.
export default function Voices() {
  const [lead, ...rest] = [...testimonials].sort((a, b) => b.review.length - a.review.length);

  return (
    <section id="voices" className="sheet sheet-light pb-28 pt-24 md:pb-36 md:pt-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <Eyebrow n="04">What clients say</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <figure>
              <blockquote className="serif text-[clamp(1.7rem,3vw,2.6rem)] leading-snug">“{lead.review}”</blockquote>
              <figcaption className="mt-6">
                <span className="font-semibold">{lead.name}</span>
                <span className="mono mt-1 block text-ink-2">{lead.company} · Fiverr client</span>
              </figcaption>
            </figure>
          </Reveal>

          <ul className="space-y-8 lg:col-span-5">
            {rest.map((t, i) => (
              <li key={t.name + i} className="border-t border-line pt-6">
                <Reveal delay={i * 0.06}>
                  <p className="serif text-2xl leading-snug">“{t.review}”</p>
                  <p className="mono mt-3 text-ink-2">
                    {t.name} · {t.company} · Fiverr client
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-20 border-t border-line pt-10">
          <h3 className="text-3xl font-medium md:text-4xl">Credentials</h3>
          <ul className="mt-6 grid gap-x-12 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={c.title} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                <span>
                  {c.title} <span className="text-ink-2">· {c.org}</span>
                </span>
                <span className="mono text-ink-2">{c.year}</span>
              </li>
            ))}
          </ul>
          <p className="mono mt-4 text-ink-2">As listed on LinkedIn</p>
        </Reveal>
      </div>
    </section>
  );
}
