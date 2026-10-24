import { useState } from "react";
import { Send } from "lucide-react";
import { EMAIL, FORM_ENDPOINT } from "../../data/contact";

type Status = "idle" | "sending" | "sent" | "error";

const kinds = ["Healthcare product", "SaaS dashboard", "Website or landing page", "Design system", "Something else"];

// Sends to FORM_ENDPOINT (Formspree or similar) when it is set. Until the site has its own domain and endpoint,
// it opens the visitor's email app with the message already written, so nothing is lost.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot: real visitors never see this field

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const kind = String(data.get("kind") ?? "");
    const message = String(data.get("message") ?? "").trim();

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
      setStatus("error");
      setError("Please add your name, a valid email and a message of at least a sentence.");
      return;
    }

    if (!FORM_ENDPOINT) {
      const body = `Hi Ruqyya,\n\n${message}\n\nProject type: ${kind}\nCompany: ${company || "-"}\n\n${name}\n${email}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, company, kind, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(`That did not send. Please email ${EMAIL} directly.`);
    }
  };

  const field =
    "mt-2 block w-full rounded-xl border border-[var(--line-strong)] bg-white px-4 py-3 text-lg text-ink placeholder:text-ink-2/70 focus:border-forest focus:outline-none focus:ring-2 focus:ring-[var(--focus)]";

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-paper-2 p-8 text-center">
        <p className="serif text-3xl">{FORM_ENDPOINT ? "Thank you, message sent." : "Your email app is opening."}</p>
        <p className="mt-3 text-lg text-ink-2">
          {FORM_ENDPOINT ? "I reply within one business day." : `If nothing opened, write to ${EMAIL}.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-base font-semibold">
          Name
          <input name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-base font-semibold">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-base font-semibold">
          Company <span className="font-normal text-ink-2">(optional)</span>
          <input name="company" type="text" autoComplete="organization" className={field} placeholder="Company or product" />
        </label>
        <label className="block text-base font-semibold">
          What are you building?
          <select name="kind" className={field} defaultValue={kinds[0]}>
            {kinds.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-base font-semibold">
        Message
        <textarea name="message" required rows={5} className={field} placeholder="Who it is for, what is hard today, and when you need it." />
      </label>
      {/* Honeypot: hidden from people and screen readers, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-14 items-center gap-3 rounded-full bg-forest px-8 text-lg font-semibold text-on-forest transition-colors hover:bg-[var(--forest-hover)] disabled:opacity-60"
        >
          <Send size={18} aria-hidden /> {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-base text-ink-2">I reply within one business day.</p>
      </div>
      <p role="alert" className={`text-base font-semibold text-[#b42318] ${status === "error" ? "" : "hidden"}`}>
        {error}
      </p>
    </form>
  );
}
