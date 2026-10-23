import type { Outcomes } from "../../data/case-studies";

function Block({ label, tone, children }: { label: string; tone: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line p-6 md:p-8">
      <p className={`mono ${tone}`}>{label}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 text-lg leading-relaxed">
    {items.map((t) => (
      <li key={t} className="flex gap-3">
        <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-[var(--mark)]" />
        {t}
      </li>
    ))}
  </ul>
);

// Four kinds of evidence, kept apart so a proposal is never read as a result.
export default function OutcomesPanel({ o }: { o: Outcomes }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Block label="1 · Reported quantitative result" tone="text-signal">
        {o.quantitative.map((q) => (
          <div key={q.value}>
            <p className="flex items-baseline gap-4">
              <span className="serif text-6xl text-forest">{q.value}</span>
              <span className="text-lg leading-snug">{q.label}</span>
            </p>
            <p className="mono mt-3 text-ink-2">{q.source}</p>
            <p className="mt-3 rounded-xl bg-paper-2 p-4 text-base leading-relaxed">{q.status}</p>
          </div>
        ))}
      </Block>
      <Block label="2 · Documented findings" tone="text-signal">
        <List items={o.qualitative} />
      </Block>
      <Block label="3 · Intended improvements (not measured)" tone="text-signal">
        <List items={o.intended} />
      </Block>
      <Block label="4 · Not in the project files" tone="text-signal">
        <List items={o.notVerified} />
      </Block>
    </div>
  );
}
