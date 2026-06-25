import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "../data/site";
import { featuredProjects } from "../data/projects";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import SkillTags from "../components/SkillTags";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-mesh hero-grain relative flex min-h-screen items-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-8 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="mb-6 text-sm font-medium tracking-[0.25em] text-accent uppercase">
              {site.role}
            </p>
            <h1 className="font-display max-w-5xl text-[clamp(3rem,10vw,7.5rem)] leading-[0.95] font-bold tracking-tight text-white">
              {site.shortName}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-xl text-base text-neutral-500">
              {site.headline}
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-accent-hover"
                data-cursor-hover
              >
                View Projects
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-8 py-4 text-sm font-semibold tracking-wide text-neutral-300 uppercase transition-colors hover:border-accent hover:text-accent"
                data-cursor-hover
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          {/* Asymmetric accent block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pointer-events-none absolute -right-20 -bottom-20 hidden h-64 w-64 rotate-12 bg-accent/10 md:block lg:-right-10 lg:-bottom-10 lg:h-80 lg:w-80"
            aria-hidden
          />
        </div>
      </section>

      {/* Client strip */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl px-6 lg:px-8"
        >
          <p className="mb-6 text-center text-xs tracking-[0.2em] text-neutral-400 uppercase">
            Experience with teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {site.clients.map((client) => (
              <span
                key={client}
                className="font-display text-sm font-semibold text-neutral-500 md:text-base"
              >
                {client}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Projects — asymmetric grid */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            label="Selected Work"
            title="Featured Projects"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 md:gap-8">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-900 uppercase transition-colors hover:text-accent"
            >
              See all projects
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills / Tools */}
      <section className="bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            label="Toolkit"
            title="Skills & Tools"
            light
          />
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-6 font-display text-lg font-semibold text-white">
                Core Skills
              </h3>
              <SkillTags items={site.skills} variant="dark" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="mb-6 font-display text-lg font-semibold text-white">
                Tools
              </h3>
              <SkillTags items={site.tools} variant="dark" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About teaser — grid-breaking layout */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative grid items-center gap-12 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5"
            >
              <span className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
                About
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                Research in. Results out.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative md:col-span-6 md:col-start-7"
            >
              <p className="text-lg leading-relaxed text-neutral-600">
                {site.summary.split("\n\n")[0]}
              </p>
              <ul className="mt-6 space-y-3">
                {site.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-neutral-700"
                  >
                    <span className="font-bold text-accent">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-900 uppercase transition-colors hover:text-accent"
              >
                Read my story
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            {/* Overlapping accent shape */}
            <div
              className="absolute -top-10 -left-10 -z-10 h-40 w-40 bg-accent/5 md:h-56 md:w-56"
              aria-hidden
            />
          </div>
        </div>
      </section>
    </>
  );
}
