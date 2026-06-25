import { motion } from "framer-motion";

export default function ExperienceTimeline({ experience }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute top-0 bottom-0 left-0 hidden w-px bg-neutral-200 md:left-6 md:block" />

      <div className="space-y-12">
        {experience.map((job, i) => (
          <motion.article
            key={`${job.company}-${job.period}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative md:pl-16"
          >
            {/* Dot on timeline */}
            <div className="absolute top-2 left-0 hidden h-3 w-3 rounded-full border-2 border-accent bg-white md:left-[18px] md:block" />

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg md:p-8">
              <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-neutral-900">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-accent">{job.company}</p>
                </div>
                <div className="text-sm text-neutral-500">
                  <p>{job.period}</p>
                  {job.location && <p>{job.location}</p>}
                </div>
              </div>
              <ul className="space-y-2">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-relaxed text-neutral-600"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
