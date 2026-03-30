"use client";

import { audiences } from "@/data/audiences";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  IconDeviceTv,
  IconBuildingSkyscraper,
  IconCamera,
  IconPalette,
  IconScissors,
  IconClipboardList,
  IconUsers,
  IconUser,
} from "@tabler/icons-react";
import { ReactElement } from "react";

const audienceIcons: ReactElement[] = [
  <IconDeviceTv key="ott" className="h-6 w-6" />,
  <IconBuildingSkyscraper key="studio" className="h-6 w-6" />,
  <IconCamera key="equip" className="h-6 w-6" />,
  <IconPalette key="props" className="h-6 w-6" />,
  <IconScissors key="post" className="h-6 w-6" />,
  <IconClipboardList key="coord" className="h-6 w-6" />,
  <IconUsers key="crew" className="h-6 w-6" />,
  <IconUser key="indie" className="h-6 w-6" />,
];

export function WhoWeServe() {
  return (
    <section id="who-we-serve" className="bg-off-white py-28 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-gold/50" />
            <span className="font-body text-xs font-medium uppercase tracking-widest text-gold">
              Who We Serve
            </span>
            <div className="h-px w-8 bg-gold/50" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-navy md:text-[2.75rem] max-w-4xl mx-auto leading-tight">
            From the biggest studios to the smallest vendor — if you work in
            Indian M&amp;E, we are building for you.
          </h2>
        </ScrollReveal>

        {/* Audience Grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, i) => (
            <ScrollReveal key={audience.title} delay={i * 0.04}>
              <div className="group relative rounded-2xl border border-navy/[0.06] bg-white p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/[0.06] hover:-translate-y-1 h-full">
                {/* Icon */}
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy/[0.04] text-navy/60 transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                  {audienceIcons[i]}
                </div>

                <h3 className="font-display text-[15px] font-bold text-navy leading-tight">
                  {audience.title}
                </h3>
                <p className="mt-2 font-body text-sm text-mid-grey/70 leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Philosophy Callout */}
        <ScrollReveal className="mt-24">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-navy p-10 md:p-14">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-gold/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-gold/5 blur-3xl rounded-full" />

            <div className="relative">
              <div className="h-1 w-10 bg-gold rounded-full mb-6" />
              <p className="font-display text-xl font-semibold text-white md:text-2xl leading-snug">
                &ldquo;Products made from the people, and by the people, who
                will use it first — because they are part of the crew.&rdquo;
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Industry Input CTA */}
        <ScrollReveal className="mt-16 text-center">
          <p className="font-body text-base text-mid-grey/70">
            If you work in Indian M&amp;E — your experience is an asset. Share
            it with us.
          </p>
          <a
            href="#contact?tab=industry_input"
            className="mt-6 inline-block rounded-full bg-gold px-8 py-3.5 font-body text-sm font-semibold text-navy transition-all duration-200 hover:shadow-[0_0_25px_rgba(201,151,58,0.2)] hover:scale-[1.02]"
          >
            Share Your Experience
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
