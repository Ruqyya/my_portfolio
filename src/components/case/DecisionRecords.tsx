import type { Decision } from "../../data/case-studies";
import Reveal from "../ui/Reveal";
import Annotated from "./Annotated";

const rows = [
  ["problem", "Problem"],
  ["evidence", "Evidence"],
  ["decision", "Design decision"],
  ["benefit", "Intended benefit"],
  ["outcome", "Verified outcome"],
] as const;

// Each decision as a record, so the reasoning is as visible as the screen: problem, evidence, decision, intended benefit, outcome.
export default function DecisionRecords({ decisions }: { decisions: Decision[] }) {
  return (
    <ol className="space-y-20 md:space-y-28">
      {decisions.map((d, i) => (
        <li key={d.title}>
          <Reveal>
            <div className="flex items-baseline gap-5">
              <span className="serif text-6xl leading-none text-signal md:text-7xl">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium leading-[1.08]">{d.title}</h3>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                {d.record && (
                  <dl className="divide-y divide-line border-y border-line">
                    {rows.map(([k, label]) => (
                      <div key={k} className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-5">
                        <dt className="mono pt-1 text-signal">{label}</dt>
                        <dd className={`text-lg leading-relaxed ${k === "outcome" ? "text-ink-2" : ""} ${k === "decision" ? "font-medium" : ""}`}>{d.record![k]}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {d.record?.tradeoff && (
                  <p className="mt-6 rounded-2xl bg-paper-2 p-5 text-lg leading-relaxed">
                    <span className="mono mb-1 block text-signal">Trade-off</span>
                    {d.record.tradeoff}
                  </p>
                )}
              </div>

              <div className="lg:col-span-6">
                {d.shots?.map((sh) => (
                  <div key={sh.src} className="surface-stage rounded-[1.75rem] p-5 md:p-9">
                    <Annotated shot={sh} kind={d.kind === "wide" ? "wide" : "phone"} stack className="gap-8" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
