"use client";

import { audiences } from "@/data/audiences";
import { ScrollReveal } from "@/components/scroll-reveal";

export function WhoWeServe() {
  return (
    <section id="who-we-serve" className="bg-off-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-navy md:text-5xl max-w-4xl mx-auto leading-tight">
            From the biggest studios to the smallest vendor — if you work in
            Indian M&amp;E, we are building for you.
          </h2>
        </ScrollReveal>

        {/* Audience Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, i) => (
            <ScrollReveal key={audience.title} delay={i * 0.05}>
              <div className="group relative rounded-xl border border-navy/10 bg-white p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 h-full">
                <h3 className="font-display text-lg font-bold text-navy">
                  {audience.title}
                </h3>
                <p className="mt-2 font-body text-sm text-mid-grey leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Philosophy Callout */}
        <ScrollReveal className="mt-20">
          <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-gold bg-navy/5 p-8 md:p-12">
            <p className="font-display text-xl font-semibold text-navy md:text-2xl leading-snug">
              &ldquo;Products made from the people, and by the people, who will
              use it first — because they are part of the crew.&rdquo;
            </p>
          </div>
        </ScrollReveal>

        {/* Industry Input CTA */}
        <ScrollReveal className="mt-16 text-center">
          <p className="font-body text-lg text-mid-grey">
            If you work in Indian M&amp;E — your experience is an asset. Share
            it with us.
          </p>
          <a
            href="#contact?tab=industry_input"
            className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-body text-sm font-semibold text-navy transition-all duration-150 hover:scale-[1.03] hover:shadow-lg"
          >
            Share Your Experience
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
