import { IconBrandLinkedin } from "@tabler/icons-react";

const footerLinks = [
  { name: "Home", href: "#hero" },
  { name: "Industry", href: "#industry" },
  { name: "What We're Building", href: "#building" },
  { name: "Who We Serve", href: "#who-we-serve" },
  { name: "Founders", href: "#founders" },
  { name: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          {/* Logo & Tagline */}
          <div>
            <p className="font-display text-xl font-bold text-white">
              The Riverroute
            </p>
            <p className="mt-2 font-body text-sm text-white/40 leading-relaxed max-w-xs">
              Built by the industry. For the industry.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-sm text-white/40 hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4 md:justify-end">
            <a
              href="https://www.linkedin.com/company/theriverroute"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Riverroute on LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-gold/30 hover:text-gold transition-all"
            >
              <IconBrandLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-8 md:flex-row md:justify-between">
          <div className="flex gap-6">
            <a
              href="#"
              className="font-body text-xs text-white/25 hover:text-white/40 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-body text-xs text-white/25 hover:text-white/40 transition-colors"
            >
              Terms
            </a>
          </div>
          <p className="font-body text-xs text-white/25">
            Mumbai, India
          </p>
          <p className="font-body text-xs text-white/25">
            &copy; 2026 The Riverroute LLP
          </p>
        </div>
      </div>
    </footer>
  );
}
