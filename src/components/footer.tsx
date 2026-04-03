"use client";

import { SectionReveal } from "@/components/section-reveal";
import { WaitlistForm } from "@/components/waitlist-form";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export function Footer() {
  return (
    <footer id="footer" className="relative bg-black">
      {/* CTA with full-width dotted background */}
      <div className="relative py-24 md:py-32">
        <DottedGlowBackground
          className="pointer-events-none"
          opacity={0.5}
          gap={14}
          radius={1.2}
          color="rgba(255,255,255,0.4)"
          glowColor="rgba(255,255,255,0.6)"
          speedMin={0.3}
          speedMax={1.2}
        />
        <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
          <SectionReveal>
            <div className="relative z-10 text-center">
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
        </div>
      </div>

    </footer>
  );
}
