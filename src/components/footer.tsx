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
    <footer className="bg-navy py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-display text-xl font-bold text-white">
              The Riverroute
            </p>
            <p className="mt-1 font-body text-sm text-white/50">
              Built by the industry. For the industry.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-sm text-white/60 hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a
            href="https://www.linkedin.com/company/theriverroute"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Riverroute on LinkedIn"
            className="text-white/60 hover:text-gold transition-colors"
          >
            <IconBrandLinkedin className="h-6 w-6" />
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <div className="flex gap-4">
            <a
              href="#"
              className="font-body text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-body text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Terms
            </a>
          </div>
          <p className="font-body text-xs text-white/40">Mumbai, India</p>
          <p className="font-body text-xs text-white/40">
            &copy; 2026 The Riverroute LLP
          </p>
        </div>
      </div>
    </footer>
  );
}
