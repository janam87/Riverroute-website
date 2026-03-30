"use client";

import { founders } from "@/data/founders";
import { ScrollReveal } from "@/components/scroll-reveal";
import { IconExternalLink } from "@tabler/icons-react";

export function Founders() {
  return (
    <section id="founders" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-[#162240]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,151,58,0.08),transparent_50%)]" />

      <div className="relative z-10 py-28 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Section label */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold/40" />
              <span className="font-body text-xs font-medium uppercase tracking-widest text-gold/70">
                The Founders
              </span>
              <div className="h-px w-8 bg-gold/40" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-center font-display text-3xl font-bold text-white md:text-5xl">
              Built from the inside.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-6">
            <p className="mx-auto max-w-2xl text-center font-body text-base text-white/50 leading-relaxed">
              The Riverroute was founded by two professionals who have
              collectively spent more than three decades working inside the
              Indian film and television industry. This is not a pivot. It is a
              culmination.
            </p>
          </ScrollReveal>

          {/* Founder Cards */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {founders.map((founder, i) => (
              <ScrollReveal key={founder.name} delay={i * 0.15}>
                <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/15 hover:bg-white/[0.05] h-full">
                  {/* Placeholder Photo */}
                  <div className="mx-auto h-56 w-56 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.06] flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-16 w-16 mx-auto rounded-full bg-white/[0.06] flex items-center justify-center">
                        <span className="font-display text-2xl text-white/20">
                          {founder.name.charAt(0)}
                        </span>
                      </div>
                      <span className="mt-2 block font-body text-[10px] text-white/20 uppercase tracking-wider">
                        Photo
                      </span>
                    </div>
                  </div>

                  <div className="mt-7 text-center">
                    <h3 className="font-display text-xl font-bold text-white">
                      {founder.name}
                    </h3>
                    <p className="mt-1.5 font-body text-sm font-medium text-gold">
                      {founder.title}
                    </p>
                    <p className="mt-0.5 font-body text-xs text-white/40">
                      {founder.role}
                    </p>
                  </div>

                  <div className="mt-6 h-px w-full bg-white/[0.06]" />

                  <p className="mt-6 font-body text-sm text-white/55 leading-[1.75]">
                    {founder.bio}
                  </p>

                  <ul className="mt-5 space-y-1.5">
                    {founder.credentials.map((credential) => (
                      <li
                        key={credential}
                        className="flex items-start gap-2 font-body text-xs text-white/40"
                      >
                        <span className="mt-1 h-1 w-1 rounded-full bg-gold/50 shrink-0" />
                        {credential}
                      </li>
                    ))}
                  </ul>

                  {founder.imdbUrl && (
                    <a
                      href={founder.imdbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3.5 py-1.5 font-body text-xs font-medium text-gold hover:bg-gold/10 transition-colors"
                    >
                      IMDb Profile
                      <IconExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
