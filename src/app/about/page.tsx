import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { audiences } from "@/data/audiences";

export const metadata: Metadata = {
  title: "About — The Riverroute",
  description:
    "RiverRoute is building the software infrastructure India's Media & Entertainment industry has always needed — purpose-built for the people who power productions.",
};

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-32 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              about the riverroute.
            </h1>
          </SectionReveal>

          <SectionReveal>
            <p className="mt-8 max-w-2xl font-body text-base leading-relaxed text-white/50 md:text-lg">
              We are building the software infrastructure that India&apos;s Media
              &amp; Entertainment industry has always needed — purpose-built for
              the complexity, scale, and relationships that drive every
              production.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* USP */}
      <section className="px-6 pb-32 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            <GlassCard variant="strong" className="px-8 py-10 md:px-12 md:py-14">
              <p className="font-display text-xl font-semibold leading-snug text-white md:text-2xl lg:text-3xl">
                A tech solution that is long awaited — diversified for Vendors,
                Production, and Professionals. Each one, uniquely mentored by
                leading professional experts. Designed to address the pain
                points and gaps for the Indian M&amp;E industry dynamics.
              </p>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="px-6 pb-32 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl mb-4">
              who we serve.
            </h2>
            <p className="font-body text-base text-white/40 leading-relaxed max-w-xl">
              Every corner of the Indian M&amp;E ecosystem has its own workflow,
              its own pressures. We are building for all of them.
            </p>
          </SectionReveal>

          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, idx) => (
              <SectionRevealChild key={audience.title} index={idx} staggerDelay={0.08}>
                <GlassCard hover className="h-full px-6 py-6">
                  <p className="font-display text-base font-semibold text-white leading-snug">
                    {audience.title}
                  </p>
                  <p className="mt-3 font-body text-sm text-white/40 leading-relaxed">
                    {audience.description}
                  </p>
                </GlassCard>
              </SectionRevealChild>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
