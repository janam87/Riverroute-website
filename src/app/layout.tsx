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
      <body className="font-body text-dark antialiased">{children}</body>
    </html>
  );
}
