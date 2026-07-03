import { useCountUp } from "react-countup";
import { numbersSection } from "../../data/content";
import Reveal from "../ui/Reveal";

function NumberCount({ id, end, suffix }: { id: string; end: number; suffix: string }) {
  useCountUp({
    ref: id,
    end,
    duration: 2.2,
    suffix,
    enableScrollSpy: true,
    scrollSpyOnce: true,
  });

  return <span id={id} />;
}

export default function Numbers() {
  return (
    <section className="relative py-20 bg-slate-900 dark:bg-[#0B1220] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 text-center">
          {numbersSection.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.06}>
              <div className="font-display font-extrabold text-3xl md:text-4xl text-white">
                <NumberCount
                  id={`numbers-stat-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
                  end={n.value}
                  suffix={n.suffix}
                />
              </div>
              <div className="text-xs md:text-sm text-slate-400 mt-2">{n.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
