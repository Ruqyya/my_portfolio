import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { process } from "../../data/content";
import portrait from "../../assets/ruqqya_img.png";

export default function Approach() {
  return (
    <section id="approach" className="relative z-10 pt-28 md:pt-44">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <Eyebrow n="02">Approach</Eyebrow>
          <figure className="mt-8 max-w-xs">
            <div className="overflow-hidden rounded-t-[999px] border border-line bg-paper-2">
              <img src={portrait} alt="Portrait of Ruqyya" width={408} height={408} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
            </div>
            <figcaption className="mono mt-4 text-ink-2">Ruqyya · Lahore, Pakistan</figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="text-[clamp(2.3rem,5vw,4.3rem)] font-medium leading-[1.08]">
              I start with the people who will use the screen, and <em className="text-forest">work outward from there.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
              <p className="text-ink-2">
                I specialize in clinical tools and SaaS platforms where data is dense. My process starts with research, so the interface
                is built on what people actually need.
              </p>
              <p className="text-ink-2">
                Healthcare and SaaS share a common thread: complex information that has to be made usable under real constraints. That is
                where I do my best work.
              </p>
              <p className="text-ink-2 md:col-span-2 md:max-w-xl">
                I don't build production code, but I hand off detailed specs, a documented design system and interactive prototypes, so
                the move into engineering is fast and low-friction.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="mono mt-16 text-ink-2">How a project runs, in order</h3>
            <ol className="mt-5 border-t border-line">
              {process.map((p, i) => (
                <li key={p.step} className="group grid grid-cols-[2.5rem_7rem_1fr] items-baseline gap-3 border-b border-line py-4 md:grid-cols-[3rem_9rem_1fr] md:py-5">
                  <span className="mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="serif text-xl transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">{p.step}</span>
                  <span className="text-ink-2">{p.description}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
