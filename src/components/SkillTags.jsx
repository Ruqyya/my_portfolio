import { motion } from "framer-motion";

export default function SkillTags({ items, variant = "light" }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((skill, i) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03, duration: 0.3 }}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent ${
            variant === "dark"
              ? "border-neutral-700 text-neutral-300"
              : "border-neutral-200 text-neutral-700"
          }`}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
}
