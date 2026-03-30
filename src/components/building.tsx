"use client";

import { horizons } from "@/data/horizons";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useState } from "react";

function StatusBadge({
  status,
  variant,
}: {
  status: string;
  variant: string;
}) {
  const styles: Record<string, string> = {
    active: "bg-gold/20 text-gold border-gold/30",
    development: "bg-gold/10 text-gold/60 border-gold/15",
    roadmap: "bg-white/[0.06] text-white/40 border-white/10",
  };

  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 font-body text-[11px] font-medium tracking-wide ${
        styles[variant] || styles.roadmap
      }`}
    >
      {status}
    </span>
  );
}

export function Building() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "waitlist", name: "", email }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="building" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-[#0f1a2e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,151,58,0.06),transparent_60%)]" />

      <div className="relative z-10 py-28 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section label */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold/40" />
              <span className="font-body text-xs font-medium uppercase tracking-widest text-gold/70">
                Our Products
              </span>
              <div className="h-px w-8 bg-gold/40" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-center font-display text-3xl font-bold text-white md:text-5xl max-w-3xl mx-auto leading-tight">
              We are building the software this industry has always deserved.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-6">
            <p className="mx-auto max-w-2xl text-center font-body text-base text-white/50 leading-relaxed">
              We are currently building our first products. They are designed for
              the people who keep this industry running — and they are being
              built with their input, not in spite of it.
            </p>
          </ScrollReveal>

          {/* Horizon Cards — clean, no 3D gimmick */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {horizons.map((horizon, i) => (
              <ScrollReveal key={horizon.label} delay={i * 0.1}>
                <div className="group relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.06]">
                  {/* Number accent */}
                  <span className="font-display text-6xl font-bold text-white/[0.04] absolute top-4 right-5">
                    0{i + 1}
                  </span>

                  <StatusBadge
                    status={horizon.status}
                    variant={horizon.statusVariant}
                  />

                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {horizon.label}
                  </h3>

                  <blockquote className="mt-4 border-l-2 border-gold/30 pl-4">
                    <p className="font-body text-sm italic text-white/50 leading-relaxed">
                      &ldquo;{horizon.pullQuote}&rdquo;
                    </p>
                  </blockquote>

                  <p className="mt-5 font-body text-sm text-white/60 leading-relaxed">
                    {horizon.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Waitlist CTA */}
          <ScrollReveal className="mt-20">
            <div className="mx-auto max-w-lg text-center">
              <p className="font-body text-sm text-white/40 mb-5">
                Be the first to know when we launch.
              </p>
              {submitted ? (
                <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
                  <p className="font-body text-gold text-sm">
                    Thank you. We will keep you in the loop.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleWaitlist}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address for waitlist"
                    className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 font-body text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-gold px-7 py-3.5 font-body text-sm font-semibold text-navy transition-all duration-200 hover:shadow-[0_0_25px_rgba(201,151,58,0.25)] hover:scale-[1.02] disabled:opacity-50"
                  >
                    {loading ? "..." : "Stay in the Loop"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
