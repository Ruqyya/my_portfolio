import { ArrowUpRight, CalendarCheck, Mail } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import ContactForm from "./ContactForm";
import { BOOK_EXTERNAL, BOOK_HREF, EMAIL, MAIL_HREF } from "../../data/contact";

const rows = [
  { k: "Phone", v: "+92 324 7082535", href: "tel:+923247082535" },
  { k: "LinkedIn", v: "ghulam-ruqyya", href: "https://www.linkedin.com/in/ghulamruqyya/" },
  { k: "Behance", v: "behance.net/ghulamruqyya", href: "https://www.behance.net/ghulamruqyya" },
];

export default function Contact() {
  return (
    <section id="contact" className="surface-deep surface-gradient sheet pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow n="06">Contact</Eyebrow>
            <h2 className="mt-6 text-[clamp(3rem,6.6vw,6.4rem)] font-medium leading-[1]">
              Let's talk about your <em className="text-forest">product.</em>
            </h2>
            <p className="mt-6 max-w-md text-xl leading-snug text-ink-2">Book a short call, or send a message. I reply within one business day.</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={BOOK_HREF}
                {...(BOOK_EXTERNAL ? { target: "_blank", rel: "noreferrer" } : {})}
                className="inline-flex h-14 items-center gap-3 rounded-full bg-forest px-8 text-lg font-semibold text-on-forest transition-colors hover:bg-[var(--forest-hover)]"
              >
                <CalendarCheck size={20} aria-hidden /> Book a 20-minute call
              </a>
              <a
                href={MAIL_HREF}
                className="inline-flex h-14 items-center gap-3 rounded-full border border-[var(--line-strong)] px-8 text-lg font-semibold transition-colors hover:border-forest hover:text-forest"
              >
                <Mail size={20} aria-hidden /> Email me
              </a>
            </div>

            <a
              href={`mailto:${EMAIL}`}
              className="group mt-10 flex items-center justify-between gap-4 border-y border-line py-5 transition-colors hover:bg-paper-2"
            >
              <span className="serif text-[clamp(1.4rem,3vw,2.4rem)] font-medium">{EMAIL}</span>
              <ArrowUpRight size={30} className="text-signal transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
            </a>

            <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-3">
              {rows.map((r) => (
                <div key={r.k}>
                  <dt className="mono text-ink-2">{r.k}</dt>
                  <dd className="mt-1.5">
                    <a href={r.href} className="link-draw py-1 font-semibold" target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {r.v}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-base text-ink-2">Lahore, Pakistan · remote, any time zone</p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="surface-reset relative rounded-[1.75rem] p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)] md:p-10">
              <h3 className="text-3xl font-medium">Send a message</h3>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
