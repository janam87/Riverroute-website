import type { Metadata } from "next";
import { founders } from "@/data/founders";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/glass-card";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";

export const metadata: Metadata = {
  title: "Meet the Crew — The Riverroute",
  description:
    "The Riverroute was built by two people who have spent decades inside India's film and television industry — on set, behind the camera, and in the production office.",
  openGraph: {
    title: "Meet the Crew — The Riverroute",
    description:
      "Two founders. Decades of combined industry experience. Building the infrastructure India's Media and Entertainment industry never had.",
    url: "https://theriverroute.com/founders",
  },
};

export default function FoundersPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Hero */}
        <section className="px-6 pt-40 pb-20 md:px-16 lg:px-24">
          <div className="mx-auto max-w-5xl">
            <SectionReveal>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                meet the crew.
              </h1>
            </SectionReveal>
          </div>
        </section>

        {/* Founder Cards */}
        <section className="px-6 pb-32 md:px-16 lg:px-24">
          <div className="mx-auto max-w-5xl space-y-12">
            {founders.map((founder, idx) => (
              <SectionRevealChild key={founder.name} index={idx}>
                <GlassCard variant="strong" className="overflow-hidden">
                  {/* Top section: photo + identity */}
                  <div className="flex flex-col gap-8 p-8 sm:flex-row sm:items-start md:p-10">
                    {/* Photo placeholder */}
                    <div className="shrink-0 mx-auto sm:mx-0">
                      <div className="w-36 aspect-[3/4] overflow-hidden rounded-xl bg-white/[0.02]">
                        <div className="h-full w-full bg-gradient-to-b from-white/[0.05] to-transparent" />
                      </div>
                    </div>

                    {/* Identity + bio */}
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">
                        {founder.title}
                      </p>
                      <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                        {founder.fullName}
                      </h2>
                      <p className="mt-1 font-body text-sm text-white/40">
                        {founder.role}
                      </p>

                      <div className="mt-5 h-px w-full bg-white/[0.06]" />

                      <p className="mt-5 font-body text-sm text-white/50 leading-[1.8]">
                        {founder.detailedBio}
                      </p>
                    </div>
                  </div>

                  {/* Career timeline */}
                  <div className="border-t border-white/[0.06] px-8 py-8 md:px-10">
                    <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-6">
                      Career Timeline
                    </p>
                    <div className="space-y-3">
                      {founder.experience.map((exp) => (
                        <div
                          key={`${exp.period}-${exp.company}`}
                          className="flex flex-col gap-1 rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-3 sm:flex-row sm:gap-6"
                        >
                          {/* Period */}
                          <span className="shrink-0 font-body text-xs text-white/25 sm:w-24 sm:pt-0.5 tabular-nums">
                            {exp.period}
                          </span>

                          {/* Role + company + detail */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                              <span className="font-body text-sm font-semibold text-white/80">
                                {exp.role}
                              </span>
                              <span className="font-body text-xs text-white/30">
                                · {exp.company}
                              </span>
                            </div>
                            <p className="mt-0.5 font-body text-xs text-white/35 leading-[1.6]">
                              {exp.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Credentials */}
                  <div className="border-t border-white/[0.06] px-8 pb-8 pt-5 md:px-10">
                    <div className="flex flex-wrap gap-2">
                      {founder.credentials.map((cred) => (
                        <span
                          key={cred}
                          className="font-body text-[11px] text-white/25 border border-white/[0.07] rounded-full px-3 py-1"
                        >
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </SectionRevealChild>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
