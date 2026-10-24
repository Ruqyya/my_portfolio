import { Award } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { testimonials, certifications } from "../../data/content";

// Only reviews with a real source are shown. Client reviews here come from Fiverr (verified by the owner).
const Stars = () => (
  <span role="img" aria-label="Five out of five stars" className="inline-flex gap-0.5 text-xl text-[var(--accent)]">
    {"★★★★★".split("").map((s, i) => (
      <span key={i} aria-hidden>{s}</span>
    ))}
  </span>
);

const initials = (n: string) => n.slice(0, 2).toUpperCase();

export default function Voices() {
  const sorted = [...testimonials].sort((a, b) => b.review.length - a.review.length);
  const [lead, ...rest] = sorted;
  const small = rest.slice(0, 3);

  return (
    <section id="voices" className="sheet sheet-light pb-28 pt-24 md:pb-36 md:pt-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <Eyebrow n="03">What clients say</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.04]">
            Clients come back, <em className="text-forest">and say so.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Score */}
          <Reveal className="lg:col-span-4">
            <div className="surface-deep surface-gradient flex h-full flex-col justify-between rounded-[1.75rem] p-8 md:p-10">
              <div>
                <p className="mono text-ink-2">Fiverr</p>
                <p className="serif mt-3 text-[clamp(3.6rem,7vw,5.6rem)] leading-none text-forest">5-star</p>
                <p className="mt-3"><Stars /></p>
              </div>
              <ul className="mt-10 space-y-3 text-lg">
                <li className="flex items-center gap-3"><span aria-hidden className="h-px w-6 bg-[var(--accent)]" />Repeat clients</li>
                <li className="flex items-center gap-3"><span aria-hidden className="h-px w-6 bg-[var(--accent)]" />Clients in the US, Canada, Belgium</li>
                <li className="flex items-center gap-3"><span aria-hidden className="h-px w-6 bg-[var(--accent)]" />Working with Fiverr since 2021</li>
              </ul>
            </div>
          </Reveal>

          {/* Lead quote */}
          <Reveal delay={0.06} className="lg:col-span-8">
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-line bg-paper-2 p-8 md:p-12">
              <span aria-hidden className="serif pointer-events-none absolute -left-2 -top-10 select-none text-[16rem] leading-none text-[var(--accent)] opacity-15">“</span>
              <blockquote className="serif relative text-[clamp(1.6rem,2.8vw,2.5rem)] leading-snug">
                {lead.review.split("within 3 days").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <mark className="rounded bg-transparent font-semibold text-forest underline decoration-[var(--accent)] decoration-2 underline-offset-4">within 3 days</mark>}
                  </span>
                ))}
              </blockquote>
              <figcaption className="relative mt-8 flex items-center gap-4">
                <span aria-hidden className="grid h-14 w-14 place-items-center rounded-full bg-forest text-lg font-semibold text-on-forest">{initials(lead.name)}</span>
                <span>
                  <span className="block text-lg font-semibold">{lead.name}</span>
                  <span className="mono block text-ink-2">{lead.company} · Fiverr client</span>
                </span>
                <span className="ml-auto hidden sm:block"><Stars /></span>
              </figcaption>
            </figure>
          </Reveal>

          {/* The rest */}
          {small.map((t, i) => (
            <Reveal key={t.name + i} delay={0.08 + i * 0.06} className="lg:col-span-4">
              <figure className="flex h-full flex-col justify-between rounded-[1.5rem] border border-line bg-paper p-7">
                <div>
                  <Stars />
                  <blockquote className="serif mt-4 text-[1.55rem] leading-snug">“{t.review}”</blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden className="grid h-11 w-11 place-items-center rounded-full bg-paper-2 text-base font-semibold text-forest">{initials(t.name)}</span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="mono block text-ink-2">{t.company} · Fiverr</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
            <h3 className="text-3xl font-medium md:text-4xl">Credentials</h3>
            <p className="mono text-ink-2">{certifications.length} courses · 2022 to 2023</p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <li key={c.title} className="group flex items-start gap-4 rounded-2xl border border-line bg-paper p-5 transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-paper-2 text-forest transition-colors group-hover:bg-forest group-hover:text-on-forest">
                  <Award size={22} strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-semibold leading-snug">{c.title}</span>
                  <span className="mono mt-1.5 block text-ink-2">{c.org} · {c.year}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
