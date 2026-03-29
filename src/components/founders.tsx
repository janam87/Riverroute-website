"use client";

import { founders } from "@/data/founders";
import { ScrollReveal } from "@/components/scroll-reveal";
import { IconExternalLink } from "@tabler/icons-react";

export function Founders() {
  return (
    <section id="founders" className="bg-navy py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-center font-display text-3xl font-bold text-white md:text-5xl">
            Built from the inside.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-6">
          <p className="mx-auto max-w-3xl text-center font-body text-lg text-white/70 leading-relaxed">
            The Riverroute was founded by two professionals who have
            collectively spent more than three decades working inside the Indian
            film and television industry. This is not a pivot. It is a
            culmination.
          </p>
        </ScrollReveal>

        {/* Founder Cards */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {founders.map((founder, i) => (
            <ScrollReveal key={founder.name} delay={i * 0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm h-full">
                {/* Placeholder Photo */}
                <div className="mx-auto h-64 w-64 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="font-body text-sm text-white/30">
                    Photo placeholder
                  </span>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {founder.name}
                  </h3>
                  <p className="mt-1 font-body text-sm font-medium text-gold">
                    {founder.title}
                  </p>
                  <p className="mt-1 font-body text-sm text-white/60">
                    {founder.role}
                  </p>
                </div>

                <p className="mt-6 font-body text-sm text-white/70 leading-relaxed">
                  {founder.bio}
                </p>

                <ul className="mt-6 space-y-1">
                  {founder.credentials.map((credential) => (
                    <li
                      key={credential}
                      className="font-body text-xs text-white/50"
                    >
                      &bull; {credential}
                    </li>
                  ))}
                </ul>

                {founder.imdbUrl && (
                  <a
                    href={founder.imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 font-body text-xs text-gold hover:text-gold/80 transition-colors"
                  >
                    IMDb <IconExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
