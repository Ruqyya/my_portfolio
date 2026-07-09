import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Link2, CircleDot, Mail, MapPin, CheckCircle2, Phone } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", projectType: "Product Design", budget: "$5k – $15k", message: "",
  });

  const handleChange = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something people love."
          description="Tell me about your project and I'll respond within one business day."
        />

        <div className="mt-14 grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <Reveal delay={0.1}>
            <div className="space-y-5">
              <a
                href="https://cal.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-5 hover:border-[#0EA5E9] transition-colors group"
              >
                <span className="w-11 h-11 rounded-xl bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center">
                  <Calendar size={19} />
                </span>
                <div>
                  <p className="font-display font-bold text-sm text-slate-900 dark:text-white">Book a call</p>
                  <p className="text-xs text-slate-400">30-minute project discovery call</p>
                </div>
              </a>

              <a href="mailto:ghulamruqyya@gmail.com" className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-5 hover:border-[#0EA5E9] transition-colors">
                <span className="w-11 h-11 rounded-xl bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center">
                  <Mail size={19} />
                </span>
                <div>
                  <p className="font-display font-bold text-sm text-slate-900 dark:text-white">Email</p>
                  <p className="text-xs text-slate-400">ghulamruqyya@gmail.com</p>
                </div>
              </a>

              <a href="tel:+923247082535" className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-5 hover:border-[#14B8A6] transition-colors">
                <span className="w-11 h-11 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center">
                  <Phone size={19} />
                </span>
                <div>
                  <p className="font-display font-bold text-sm text-slate-900 dark:text-white">Phone</p>
                  <p className="text-xs text-slate-400">+92-324-7082535</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-5">
                <span className="w-11 h-11 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center">
                  <MapPin size={19} />
                </span>
                <div>
                  <p className="font-display font-bold text-sm text-slate-900 dark:text-white">Based in</p>
                  <p className="text-xs text-slate-400">Lahore, Pakistan · Remote worldwide</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a href="https://www.linkedin.com/in/ghulam-ruqyya-ab0318156/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-colors" aria-label="LinkedIn"><Link2 size={17} /></a>
                <a href="https://www.behance.net/ghulamruqyya" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-[#0F172A] hover:border-[#0F172A] transition-colors" aria-label="Behance"><CircleDot size={17} /></a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[420px] rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 flex flex-col items-center justify-center text-center p-10"
              >
                <CheckCircle2 size={44} className="text-[#14B8A6] mb-4" />
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">Message sent</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                  Thanks for reaching out — I'll get back to you within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-7 md:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" required>
                    <input required value={form.name} onChange={(e) => handleChange("name", e.target.value)} className="input" placeholder="Jane Cooper" />
                  </Field>
                  <Field label="Email" required>
                    <input required type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="input" placeholder="jane@company.com" />
                  </Field>
                </div>

                <Field label="Company">
                  <input value={form.company} onChange={(e) => handleChange("company", e.target.value)} className="input" placeholder="Company name" />
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Project Type">
                    <select value={form.projectType} onChange={(e) => handleChange("projectType", e.target.value)} className="input">
                      <option>Product Design</option>
                      <option>UX Strategy</option>
                      <option>Design System</option>
                      <option>Mobile App</option>
                      <option>UX Audit</option>
                    </select>
                  </Field>
                  <Field label="Budget">
                    <select value={form.budget} onChange={(e) => handleChange("budget", e.target.value)} className="input">
                      <option>Under $5k</option>
                      <option>$5k – $15k</option>
                      <option>$15k – $40k</option>
                      <option>$40k+</option>
                    </select>
                  </Field>
                </div>

                <Field label="Message" required>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="input resize-none"
                    placeholder="Tell me a bit about your project…"
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold py-3.5 hover:opacity-90 transition-opacity"
                >
                  Send message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.65rem 0.9rem;
          font-size: 0.875rem;
          color: rgb(15 23 42);
        }
        .input:focus { outline: none; box-shadow: 0 0 0 2px #0EA5E9; }
        .dark .input { background: rgb(30 41 59); border-color: rgb(51 65 85); color: white; }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
        {label} {required && <span className="text-[#0F172A]">*</span>}
      </span>
      {children}
    </label>
  );
}
