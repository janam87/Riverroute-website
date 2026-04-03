"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionReveal, SectionRevealChild } from "@/components/section-reveal";


const layers = [
  {
    horizon: "01",
    status: "In active development",
    title: "The Vendor",
    slug: "vendor",
    quote: "Crores of rupees worth of equipment leaves warehouses every day. Every single piece of it tracked on WhatsApp and hope.",
    description: "Complete clarity over every piece of equipment — where it is, who has it, when it returns.",
    image: "/images/vendor-camera.png",
    glow1: "#FF0080",
    glow2: "#FF8C00",
  },
  {
    horizon: "02",
    status: "In development",
    title: "The Production",
    slug: "production",
    quote: "A film passes through hundreds of hands, decisions, and stages before it reaches an audience. Most of that journey is invisible.",
    description: "Transparency and control over how films are produced, tracked, and managed.",
    image: "/images/production-clipboard.png",
    glow1: "#8E2DE2",
    glow2: "#FF0099",
  },
  {
    horizon: "03",
    status: "On the roadmap",
    title: "The People",
    slug: "people",
    quote: "India\u2019s M&E industry is one of the largest in the world. Yet a director in Chennai has no way to find a focus puller in Kolkata.",
    description: "One living network connecting the entire nation\u2019s film and entertainment industry.",
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
            We are building the software this industry has always deserved.
            Designed for the people who keep it running — built with their input, not in spite of it.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {layers.map((layer, idx) => (
            <SectionRevealChild key={layer.slug} index={idx} staggerDelay={0.15}>
              <Link href={`/products/${layer.slug}`} className="block group h-full">
                <div className="relative rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col bg-black transition-all duration-300 group-hover:border-white/20 group-hover:-translate-y-1">
                  {/* Content */}
                  <div className="p-7 relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-display text-xs font-bold text-white/20">{layer.horizon}</span>
                      <span className="font-body text-[10px] text-white/30 uppercase tracking-wider">{layer.status}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white leading-tight">
                      {layer.title}
                    </h3>

                    <p className="font-body text-xs text-white/25 leading-relaxed mt-3 italic">
                      &ldquo;{layer.quote}&rdquo;
                    </p>

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
