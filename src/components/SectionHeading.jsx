import { motion } from "framer-motion";

export default function SectionHeading({
  label,
  title,
  align = "left",
  light = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      {label && (
        <span
          className={`mb-4 inline-block text-xs font-medium tracking-[0.2em] uppercase ${
            light ? "text-accent" : "text-accent"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-bold tracking-tight md:text-5xl ${
          light ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </h2>
    </motion.div>
  );
}
