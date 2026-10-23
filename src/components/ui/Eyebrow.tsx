import type { ReactNode } from "react";

// Numbered section label, e.g. "02 — Selected work".
export default function Eyebrow({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="mono flex items-center gap-3 text-ink-2">
      <span className="text-signal">{n}</span>
      <span aria-hidden className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}
