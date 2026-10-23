import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { process } from "../../data/content";
import portrait from "../../assets/ruqqya_img.png";

export default function Approach() {
  return (
    <section id="approach" className="surface-tint sheet pb-28 pt-24 md:pb-36 md:pt-32">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <Eyebrow n="05">About and process</Eyebrow>
          <figure className="mt-8 max-w-xs">
            <div className="overflow-hidden rounded-t-[999px] border border-line bg-paper-2">
              <img src={portrait} alt="Portrait of Ruqyya" width={408} height={408} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
            </div>
            <figcaption className="mono mt-4 text-ink-2">Ruqyya · Lahore, Pakistan</figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="text-[clamp(2.5rem,5.4vw,4.8rem)] font-medium leading-[1.08]">
              I start with the people who will use the screen, and <em className="text-forest">work outward from there.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-xl leading-snug text-ink-2">Research first, then wireframes, prototypes and production-ready UI, handed off with a documented design system.</p>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="mono mt-12 text-ink-2">How a project runs</h3>
            <ol className="mt-5 flex flex-wrap gap-3">
              {process.map((s, i) => (
                <li key={s.step} className="inline-flex items-center gap-3 rounded-full border border-line bg-paper px-5 py-3 text-lg">
                  <span className="mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {s.step}
                </li>
              ))}
            </ol>
          </Reveal>

          
        </div>
      </div>
    </section>
  );
}
