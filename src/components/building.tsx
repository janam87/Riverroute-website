"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";
import { WaitlistForm } from "@/components/waitlist-form";

const layers = [
  {
    title: "the vendor layer.",
    slug: "vendor",
    description: "Equipment tracking for rental vendors — where it is, who has it, when it returns.",
    image: "/images/vendor-camera.png",
    glow1: "#FF0080",
    glow2: "#FF8C00",
  },
  {
    title: "the production layer.",
    slug: "production",
    description: "Budgets, schedules, call sheets — transparent, real-time, connected.",
    image: "/images/production-clipboard.png",
    glow1: "#8E2DE2",
    glow2: "#FF0099",
  },
  {
    title: "the people layer.",
    slug: "people",
    description: "A professional network for crew — verified, credible, connected.",
    image: "/images/people-phone.png",
    glow1: "#00F260",
    glow2: "#0575E6",
  },
];

export function Building() {
  return (
    <section id="building" className="relative bg-black px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4">
            Introducing The Riverroute OS.
          </h2>
          <p className="font-body text-base text-white/40 leading-relaxed max-w-2xl mb-16">
            A tech solution that is long awaited — diversified for Vendors, Production, and Professionals. Each one, uniquely mentored by leading professional experts.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {layers.map((layer, idx) => (
            <SectionRevealChild key={layer.slug} index={idx} staggerDelay={0.15}>
              <Link href={`/products/${layer.slug}`} className="block group h-full">
                <div className="relative rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col bg-black transition-all duration-300 group-hover:border-white/20 group-hover:-translate-y-1">
                  {/* Content */}
                  <div className="p-7 relative z-10">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white leading-tight">
                      {layer.title}
                    </h3>

                    <p className="font-body text-sm text-white/40 leading-relaxed mt-3">
                      {layer.description}
                    </p>

                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 font-body text-sm text-white/70 transition-colors group-hover:border-white/30 group-hover:text-white">
                        learn more <span className="text-lg">&rarr;</span>
                      </span>
                    </div>
                  </div>

                  {/* Product image */}
                  <div className="relative h-56 flex items-end justify-center z-10 px-6">
                    <Image
                      src={layer.image}
                      alt={layer.title}
                      width={200}
                      height={200}
                      className="object-contain max-h-48 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Ambient glow — main */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[65%] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse 90% 70% at 50% 100%, ${layer.glow1} 0%, ${layer.glow2}88 40%, transparent 70%)`,
                    }}
                  />
                  {/* Ambient glow — soft spread */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-full pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse 120% 80% at 50% 110%, ${layer.glow1} 0%, transparent 55%)`,
                    }}
                  />
                </div>
              </Link>
            </SectionRevealChild>
          ))}
        </div>

      </div>
    </section>
  );
}
