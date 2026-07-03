import { useState } from "react";
import { Link } from "react-router-dom";
import { Link2, CircleDot, Mail, Activity, ArrowUpRight, Phone } from "lucide-react";

const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1220] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg text-slate-900 dark:text-white mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#14B8A6] flex items-center justify-center text-white">
                <Activity size={16} strokeWidth={2.5} />
              </span>
              Creative Ruqyya
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Product designer helping Healthcare and SaaS teams build intuitive, scalable, human-centered digital experiences.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-[#14B8A6] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4">Newsletter</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Occasional notes on product design. No spam.</p>
            {subscribed ? (
              <p className="text-sm text-[#14B8A6] font-medium">You're subscribed — thank you!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-2 hover:opacity-90 transition-opacity"
                >
                  <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Creative Ruqyya. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/ghulam-ruqyya-ab0318156/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-[#2563EB] transition-colors"><Link2 size={18} /></a>
            <a href="https://www.behance.net/ghulamruqyya" target="_blank" rel="noreferrer" aria-label="Behance" className="text-slate-400 hover:text-[#7C3AED] transition-colors"><CircleDot size={18} /></a>
            <a href="mailto:ghulamruqyya@gmail.com" aria-label="Email" className="text-slate-400 hover:text-[#14B8A6] transition-colors"><Mail size={18} /></a>
            <a href="tel:+923247082535" aria-label="Phone" className="text-slate-400 hover:text-[#14B8A6] transition-colors"><Phone size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
