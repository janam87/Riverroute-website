import type { Metadata } from "next";
import { jobs } from "@/data/jobs";
import { IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Careers — The Riverroute",
  description:
    "Join The Riverroute. We are building purpose-built software for India's Media and Entertainment industry with a small, high-ownership team.",
  openGraph: {
    title: "Careers — The Riverroute",
    description:
      "Join The Riverroute. Build purpose-built software for India's M&E industry.",
    url: "https://theriverroute.com/careers",
  },
};

export default function CareersPage() {
  const hasJobs = jobs.length > 0;

  return (
    <>
      <main>
        {/* Hero */}
        <section className="bg-navy py-32 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl font-bold text-white md:text-6xl">
              Work at The Riverroute
            </h1>
            <p className="mt-6 mx-auto max-w-2xl font-body text-lg text-white/70 leading-relaxed">
              We are building purpose-built software for India&apos;s Media and
              Entertainment industry — with a small, high-ownership team that
              moves fast and ships real products.
            </p>
          </div>
        </section>

        {/* Why The Riverroute */}
        <section className="bg-off-white py-20 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-navy">
              Why The Riverroute
            </h2>
            <ul className="mt-8 space-y-4 font-body text-mid-grey leading-relaxed">
              <li className="flex gap-3">
                <span className="text-gold font-bold shrink-0">&bull;</span>
                <span>
                  You will be building for a ₹2,50,000 crore industry that has
                  almost no purpose-built software. The opportunity is massive
                  and real.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold font-bold shrink-0">&bull;</span>
                <span>
                  You will work directly with the founders — both of whom come
                  from inside the industry. No layers. No middlemen.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold font-bold shrink-0">&bull;</span>
                <span>
                  You will own real features from day one. Not tickets —
                  features. Your work ships and your name is on it.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold font-bold shrink-0">&bull;</span>
                <span>
                  You will work with agentic AI-assisted development as a daily
                  tool — real, hands-on experience with the future of how
                  software gets built.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* How We Work */}
        <section className="bg-white py-20 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-navy">
              How We Work
            </h2>
            <p className="mt-6 font-body text-mid-grey leading-relaxed">
              We are a remote-first, async-first team based out of Mumbai. We
              believe in fast feedback loops — ship, learn, iterate. Every
              candidate goes through a short, real test task instead of
              algorithmic interviews. And we commit to this: if you take the time
              to apply, we will never ghost you. You will always hear back.
            </p>
          </div>
        </section>

        {/* Current Openings */}
        <section className="bg-off-white py-20 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-navy">
              Current Openings
            </h2>
            {hasJobs ? (
              <div className="mt-8 space-y-6">
                {jobs.map((job) => (
                  <div
                    key={job.title}
                    className="rounded-xl border border-navy/10 bg-white p-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-display text-xl font-bold text-navy">
                          {job.title}
                        </h3>
                        <p className="font-body text-sm text-mid-grey">
                          {job.type} &middot; {job.location}
                        </p>
                      </div>
                      <a
                        href={job.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2 font-body text-sm font-semibold text-navy transition-all duration-150 hover:scale-[1.03] hover:shadow-lg"
                      >
                        <IconBrandLinkedin className="h-4 w-4" />
                        Apply on LinkedIn
                      </a>
                    </div>
                    <p className="mt-4 font-body text-sm text-mid-grey leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-navy/10 bg-white p-8 text-center">
                <p className="font-body text-mid-grey leading-relaxed">
                  We are not actively hiring right now, but we are always
                  interested in exceptional people. Send us a note.
                </p>
                <a
                  href="mailto:hello@theriverroute.com"
                  className="mt-4 inline-flex items-center gap-2 font-body text-sm text-gold hover:text-gold/80 transition-colors"
                >
                  <IconMail className="h-4 w-4" />
                  hello@theriverroute.com
                </a>
              </div>
            )}
          </div>
        </section>

        {/* What We Look For */}
        <section className="bg-white py-20 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-navy">
              What We Look For
            </h2>
            <p className="mt-6 font-body text-mid-grey leading-relaxed">
              Beyond skills and experience, we look for three things: honesty —
              say what you mean and mean what you say. Ownership — if it is
              yours, it is yours. And curiosity about the industry we are
              building for — you do not need to be a film expert, but you need to
              care about understanding the people you are building for.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
