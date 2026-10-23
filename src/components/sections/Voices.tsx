import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { testimonials, certifications } from "../../data/content";

// Only reviews with a real source are shown. Client reviews here come from Fiverr.
export default function Voices() {
    const quotes = [...testimonials].sort((x, y) => x.review.length - y.review.length).slice(0, 3);

  return (
    <section id="voices" className="sheet sheet-light pb-28 pt-24 md:pb-36 md:pt-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <Eyebrow n="04">What clients say</Eyebrow>
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {quotes.map((t, i) => (
            <li key={t.name + i}>
              <Reveal delay={i * 0.06} className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7">
                <p aria-label="Five stars" className="text-xl tracking-widest text-[var(--accent)]">★★★★★</p>
                <blockquote className="serif mt-4 text-[1.7rem] leading-snug">“{t.review}”</blockquote>
                <p className="mono mt-auto pt-6 text-ink-2">{t.name} · {t.company} · Fiverr</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-14">
          <p className="mono text-ink-2">Credentials, as listed on LinkedIn</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {certifications.map((c) => (
              <li key={c.title} className="rounded-full border border-line px-4 py-2 text-base">
                {c.title}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
