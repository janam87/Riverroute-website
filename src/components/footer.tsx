"use client";

import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { WaitlistForm } from "@/components/waitlist-form";

export function Footer() {
  return (
    <footer id="footer" className="relative bg-black px-6 pt-32 pb-12 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        {/* CTA */}
        <SectionReveal>
          <div className="text-center mb-24">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
              get early access.
            </h2>
            <p className="font-body text-sm text-muted mb-10">
              join the waitlist. we&apos;ll reach out when it&apos;s your turn.
            </p>
            <div className="flex justify-center">
              <WaitlistForm />
            </div>
          </div>
        </SectionReveal>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-12" />

        {/* Bottom */}
        <SectionRevealChild index={0}>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <span className="font-display text-sm font-bold text-white/40">
              the riverroute
            </span>

            <div className="flex gap-8 font-body text-xs text-white/30">
              <a
                href="https://www.linkedin.com/company/theriverroute"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white/60"
              >
                LinkedIn
              </a>
              <a href="/careers" className="transition-colors hover:text-white/60">
                Careers
              </a>
              <span>Privacy</span>
              <span>Terms</span>
            </div>

            <span className="font-body text-xs text-white/20">
              &copy; {new Date().getFullYear()} The Riverroute LLP
            </span>
          </div>
        </SectionRevealChild>
      </div>
    </footer>
  );
}
