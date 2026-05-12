"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

type FormType = "waitlist" | "investor" | "demo" | "industry_input" | "general";

const tabs: { label: string; value: FormType }[] = [
  { label: "Join Waitlist", value: "waitlist" },
  { label: "Investor Enquiry", value: "investor" },
  { label: "Request a Demo", value: "demo" },
  { label: "Industry Input", value: "industry_input" },
  { label: "General", value: "general" },
];

const inputClass =
  "w-full rounded-xl border border-navy/10 bg-white px-5 py-3.5 font-body text-sm text-dark placeholder:text-mid-grey/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all";

export function Contact() {
  const [activeTab, setActiveTab] = useState<FormType>("waitlist");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("tab=industry_input")) {
      setActiveTab("industry_input");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = { type: activeTab };
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Stub
    }
    setLoading(false);
    setSubmitted(true);
  }

  const submitLabel: Record<FormType, string> = {
    waitlist: "Join Waitlist",
    investor: "Send Enquiry",
    demo: "Request Demo",
    industry_input: "Share My Experience",
    general: "Send Message",
  };

  return (
    <section id="contact" className="bg-off-white py-28 px-6">
      <div className="mx-auto max-w-xl">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-gold/50" />
            <span className="font-body text-xs font-medium uppercase tracking-widest text-gold">
              Get in Touch
            </span>
            <div className="h-px w-8 bg-gold/50" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl leading-tight">
            The best products in this industry will be built with this industry.
            Let&apos;s talk.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  setSubmitted(false);
                }}
                className={`rounded-full px-4 py-2 font-body text-[13px] font-medium transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-navy text-white shadow-lg shadow-navy/20"
                    : "bg-navy/[0.04] text-navy/60 hover:bg-navy/[0.08] hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-navy/[0.06] bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <p className="font-display text-lg font-semibold text-navy">
                  Thank you. We will be in touch.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 font-body text-sm text-gold hover:text-gold/80 transition-colors"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === "waitlist" && (
                  <>
                    <input name="name" type="text" placeholder="Name" required className={inputClass} aria-label="Name" />
                    <input name="email" type="email" placeholder="Email" required className={inputClass} aria-label="Email" />
                  </>
                )}

                {activeTab === "investor" && (
                  <>
                    <input name="name" type="text" placeholder="Full Name" required className={inputClass} aria-label="Full Name" />
                    <input name="fund_firm" type="text" placeholder="Fund / Firm (optional)" className={inputClass} aria-label="Fund or Firm" />
                    <textarea name="message" placeholder="Message" required rows={4} className={`${inputClass} resize-none`} aria-label="Message" />
                  </>
                )}

                {activeTab === "demo" && (
                  <>
                    <input name="name" type="text" placeholder="Full Name" required className={inputClass} aria-label="Full Name" />
                    <input name="company" type="text" placeholder="Company" required className={inputClass} aria-label="Company" />
                    <input name="role" type="text" placeholder="Role" required className={inputClass} aria-label="Role" />
                    <input name="phone" type="tel" placeholder="Phone (optional)" className={inputClass} aria-label="Phone" />
                  </>
                )}

                {activeTab === "industry_input" && (
                  <>
                    <input name="name" type="text" placeholder="Name" required className={inputClass} aria-label="Name" />
                    <input name="role" type="text" placeholder="Role in industry" required className={inputClass} aria-label="Role in industry" />
                    <select name="years_experience" required className={inputClass} defaultValue="" aria-label="Years of experience">
                      <option value="" disabled>Years of experience</option>
                      <option value="1-3">1–3 years</option>
                      <option value="3-7">3–7 years</option>
                      <option value="7-15">7–15 years</option>
                      <option value="15+">15+ years</option>
                    </select>
                    <textarea name="message" placeholder="Biggest operational frustration" required rows={4} className={`${inputClass} resize-none`} aria-label="Biggest operational frustration" />
                    <input name="email" type="email" placeholder="Email (optional)" className={inputClass} aria-label="Email" />
                  </>
                )}

                {activeTab === "general" && (
                  <>
                    <input name="name" type="text" placeholder="Name" required className={inputClass} aria-label="Name" />
                    <input name="email" type="email" placeholder="Email" required className={inputClass} aria-label="Email" />
                    <textarea name="message" placeholder="Message" required rows={4} className={`${inputClass} resize-none`} aria-label="Message" />
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gold py-3.5 font-body text-sm font-semibold text-navy transition-all duration-200 hover:shadow-[0_0_25px_rgba(201,151,58,0.2)] hover:scale-[1.01] disabled:opacity-50 mt-2"
                >
                  {loading ? "Sending..." : submitLabel[activeTab]}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
