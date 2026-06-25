import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import LinkedInIcon from "../components/LinkedInIcon";
import BehanceIcon from "../components/BehanceIcon";
import { site } from "../data/site";

export default function Contact() {
  return (
    <div className="min-h-screen pt-28 pb-24 md:pt-36 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* CTA side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
              Contact
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-neutral-900 md:text-7xl lg:text-8xl">
              Let's build something people{" "}
              <span className="text-accent">actually use</span>.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-neutral-600">
              I'm open to new healthcare and e-commerce design projects across
              the UK, USA, and Pakistan. If you need a designer who turns
              research into interfaces that move the numbers — let's talk.
            </p>
          </motion.div>

          {/* Contact actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Primary CTA — LinkedIn (not email) */}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl bg-accent p-8 text-white transition-colors hover:bg-accent-hover"
              data-cursor-hover
            >
              <div>
                <p className="text-sm tracking-wider text-white/70 uppercase">
                  Connect on
                </p>
                <p className="font-display text-2xl font-bold">LinkedIn</p>
              </div>
              <LinkedInIcon
                size={32}
                className="transition-transform group-hover:scale-110"
              />
            </a>

            <a
              href={site.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-neutral-200 p-8 transition-colors hover:border-accent"
              data-cursor-hover
            >
              <div>
                <p className="text-sm tracking-wider text-neutral-400 uppercase">
                  View work on
                </p>
                <p className="font-display text-2xl font-bold text-neutral-900">
                  Behance
                </p>
              </div>
              <BehanceIcon
                size={28}
                className="text-neutral-400 transition-colors group-hover:text-accent"
              />
            </a>

            <a
              href={`mailto:${site.email}`}
              className="group flex items-center justify-between rounded-2xl border border-neutral-200 p-8 transition-colors hover:border-accent"
              data-cursor-hover
            >
              <div>
                <p className="text-sm tracking-wider text-neutral-400 uppercase">
                  Or email me at
                </p>
                <p className="font-display text-lg font-semibold text-neutral-900">
                  {site.email}
                </p>
              </div>
              <Mail
                size={24}
                className="text-neutral-400 transition-colors group-hover:text-accent"
              />
            </a>

            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-8 text-neutral-600">
              <Phone size={20} className="shrink-0 text-accent" />
              <p className="text-sm">{site.phone}</p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-8 text-neutral-600">
              <MapPin size={20} className="shrink-0 text-accent" />
              <p className="text-sm">{site.location}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
