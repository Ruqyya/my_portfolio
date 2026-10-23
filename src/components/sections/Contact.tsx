import { ArrowUpRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { MAIL_HREF } from "../../data/contact";

const rows = [
  { k: "Email", v: "ghulamruqyya@gmail.com", href: "mailto:ghulamruqyya@gmail.com" },
  { k: "Phone", v: "+92 324 7082535", href: "tel:+923247082535" },
  { k: "LinkedIn", v: "ghulam-ruqyya", href: "https://www.linkedin.com/in/ghulamruqyya/" },
  { k: "Behance", v: "behance.net/ghulamruqyya", href: "https://www.behance.net/ghulamruqyya" },
];

export default function Contact() {
  return (
    <section id="contact" className="surface-deep surface-gradient sheet pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <Eyebrow n="07">Contact</Eyebrow>
          <h2 className="mt-6 max-w-5xl text-[clamp(3rem,8vw,7.4rem)] font-medium leading-[1]">
            Let's talk about your <em className="text-forest">product.</em>
          </h2>
          <p className="mt-8 max-w-xl text-xl leading-snug text-ink-2">Tell me what you are building. I reply within one business day.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={MAIL_HREF}
            className="group mt-12 flex min-h-16 flex-wrap items-center justify-between gap-4 border-y border-ink py-6 transition-colors hover:bg-paper-2"
          >
            <span className="serif text-[clamp(1.5rem,4vw,3.2rem)] font-medium">ghulamruqyya@gmail.com</span>
            <ArrowUpRight size={36} className="text-signal transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </Reveal>

        <Reveal delay={0.12}>
          <ol className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 text-lg">
            {["You write", "I reply in a day", "You get a proposal"].map((k, i) => (
              <li key={k} className="flex items-center gap-4">
                <span className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-2.5">
                  <span className="mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {k}
                </span>
                {i < 2 && <span aria-hidden className="h-px w-8 bg-[var(--line-strong)]" />}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {rows.slice(1).map((r) => (
              <div key={r.k}>
                <dt className="mono text-ink-2">{r.k}</dt>
                <dd className="mt-2">
                  <a href={r.href} className="link-draw py-1 font-semibold" target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {r.v}
                  </a>
                </dd>
              </div>
            ))}
            <div>
              <dt className="mono text-ink-2">Based in</dt>
              <dd className="mt-2 font-semibold">Lahore, Pakistan · Remote worldwide</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
