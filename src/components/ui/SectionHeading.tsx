import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#0EA5E9] dark:text-[#60A5FA] mb-4">
        <span className="w-6 h-px bg-[#0EA5E9] dark:bg-[#60A5FA]" />
        {eyebrow}
      </span>
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
