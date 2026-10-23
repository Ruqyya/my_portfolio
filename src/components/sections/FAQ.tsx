import { Plus } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { faqs } from "../../data/content";

export default function Faq() {
  return (
    <section id="faq" className="relative z-10 pt-28 md:pt-44">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 md:px-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow n="06">Before we talk</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.3rem,4.6vw,3.9rem)] font-medium leading-[1.08]">Common questions.</h2>
        </Reveal>
        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} name="faq" className="group border-b border-line">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="serif text-xl font-medium md:text-2xl">{f.q}</span>
                  <Plus size={22} aria-hidden className="shrink-0 text-forest transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="max-w-2xl pb-6 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
