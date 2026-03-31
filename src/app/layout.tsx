import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Riverroute — Built by the industry. For the industry.",
  description:
    "The Riverroute builds purpose-built technology for India's Media and Entertainment industry. From the people who know it best.",
  keywords: [
    "Indian M&E software",
    "Indian film industry technology",
    "media entertainment India software",
  ],
  openGraph: {
    title: "The Riverroute — Built by the industry. For the industry.",
    description:
      "Purpose-built technology for India's Media and Entertainment industry.",
    url: "https://theriverroute.com",
    siteName: "The Riverroute",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Riverroute — Built by the industry. For the industry.",
    description:
      "Purpose-built technology for India's Media and Entertainment industry.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "The Riverroute LLP",
                  url: "https://theriverroute.com",
                  description:
                    "Purpose-built technology for India's Media and Entertainment industry.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Mumbai",
                    addressCountry: "IN",
                  },
                  founder: [
                    {
                      "@type": "Person",
                      name: "Varun Hemraj Khandelwal",
                      jobTitle: "Co-Founder",
                    },
                    {
                      "@type": "Person",
                      name: "Ria Bhavsar",
                      jobTitle: "Co-Founder",
                    },
                  ],
                },
                {
                  "@type": "WebPage",
                  name: "The Riverroute",
                  url: "https://theriverroute.com",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-body text-foreground antialiased bg-background">{children}</body>
    </html>
  );
}
