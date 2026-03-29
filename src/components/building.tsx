"use client";

import { horizons } from "@/data/horizons";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useState } from "react";

function StatusBadge({
  status,
  variant,
}: {
  status: string;
  variant: string;
}) {
  const styles: Record<string, string> = {
    active: "bg-gold/20 text-gold border-gold/40",
    development: "bg-gold/10 text-gold/70 border-gold/20",
    roadmap: "bg-white/10 text-white/50 border-white/20",
  };

  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 font-body text-xs font-medium ${
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
    <section id="building" className="bg-navy py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-white md:text-5xl">
            We are building the software this industry has always deserved.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-6">
          <p className="mx-auto max-w-3xl text-center font-body text-lg text-white/70 leading-relaxed">
            We are currently building our first products. They are designed for
            the people who keep this industry running — and they are being built
            with their input, not in spite of it.
          </p>
        </ScrollReveal>

        {/* Horizon Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {horizons.map((horizon, i) => (
            <ScrollReveal key={horizon.label} delay={i * 0.1}>
              <CardContainer className="w-full">
                <CardBody className="group/card relative h-full w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <CardItem translateZ="30" className="w-full">
                    <StatusBadge
                      status={horizon.status}
                      variant={horizon.statusVariant}
                    />
                  </CardItem>

                  <CardItem
                    translateZ="40"
                    className="mt-4 font-display text-xl font-bold text-white"
                  >
                    {horizon.label}
                  </CardItem>

                  <CardItem
                    translateZ="30"
                    className="mt-4 font-body text-sm italic text-gold/80 leading-relaxed"
                  >
                    &ldquo;{horizon.pullQuote}&rdquo;
                  </CardItem>

                  <CardItem
                    translateZ="20"
                    className="mt-4 font-body text-sm text-white/70 leading-relaxed"
                  >
                    {horizon.body}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </ScrollReveal>
          ))}
        </div>

        {/* Waitlist CTA */}
        <ScrollReveal className="mt-20">
          <div className="mx-auto max-w-md text-center">
            <p className="font-body text-sm text-white/60 mb-4">
              Be the first to know when we launch.
            </p>
            {submitted ? (
              <p className="font-body text-gold text-sm">
                Thank you. We will keep you in the loop.
              </p>
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
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-body text-sm text-white placeholder:text-white/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-gold px-6 py-3 font-body text-sm font-semibold text-navy transition-all duration-150 hover:scale-[1.03] hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? "..." : "Stay in the Loop"}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
