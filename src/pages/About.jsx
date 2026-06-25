import { motion } from "framer-motion";
import { site } from "../data/site";
import SectionHeading from "../components/SectionHeading";
import ExperienceTimeline from "../components/ExperienceTimeline";
import SkillTags from "../components/SkillTags";

export default function About() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Intro — asymmetric */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5"
          >
            <span className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
              About Me
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl">
              Hi, I'm {site.shortName}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-500">{site.role}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7"
          >
            {site.summary.split("\n\n").map((para) => (
              <p
                key={para.slice(0, 50)}
                className="mb-4 text-base leading-relaxed text-neutral-600 md:text-lg"
              >
                {para}
              </p>
            ))}
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              {site.process}
            </p>
          </motion.div>
        </div>

        {/* Education */}
        <section className="mt-24 md:mt-32">
          <SectionHeading label="Background" title="Education" />
          <div className="grid gap-6 md:grid-cols-2">
            {site.education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-neutral-200 p-8"
              >
                <h3 className="font-display text-xl font-bold text-neutral-900">
                  {edu.degree}
                </h3>
                <p className="mt-2 text-accent">{edu.school}</p>
                {edu.location && (
                  <p className="mt-1 text-sm text-neutral-500">{edu.location}</p>
                )}
                {edu.years && (
                  <p className="mt-1 text-sm text-neutral-500">{edu.years}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-24 md:mt-32">
          <SectionHeading label="Expertise" title="Technical Skills" />
          <div className="grid gap-10 md:grid-cols-2">
            {[
              ["Design Tools", site.skillGroups.designTools],
              ["Prototyping", site.skillGroups.prototyping],
              ["Development", site.skillGroups.development],
              ["Research", site.skillGroups.research],
            ].map(([label, items], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="mb-4 font-display text-sm font-semibold tracking-wider text-neutral-900 uppercase">
                  {label}
                </h3>
                <SkillTags items={items} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Key achievements */}
        <section className="mt-24 md:mt-32">
          <SectionHeading label="Impact" title="Key Achievements" />
          <ul className="grid gap-4 md:grid-cols-2">
            {site.achievements.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 rounded-2xl border border-neutral-200 p-6"
              >
                <span className="font-display text-2xl font-bold text-accent/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-neutral-600">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Certifications */}
        <section className="mt-24 md:mt-32">
          <SectionHeading label="Learning" title="Certifications" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {site.certifications.map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl border border-neutral-200 p-4"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span className="text-sm text-neutral-700">{cert}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience timeline */}
        <section className="mt-24 md:mt-32">
          <SectionHeading label="Career" title="Experience" />
          <ExperienceTimeline experience={site.experience} />
        </section>
      </div>
    </div>
  );
}
