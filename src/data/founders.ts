export interface Founder {
  name: string;
  role: string;
  credentials: string[];
  image: string;
}

export const founders: Founder[] = [
  {
    name: "Varun",
    role: "Co-founder · Film Producer · 20+ years in M&E",
    credentials: ["Red Chillies Entertainment", "Yamini Pictures", "NFDC Delhi"],
    image: "/images/placeholder-varun.webp",
  },
  {
    name: "Ria",
    role: "Co-founder · Production Operations · Show Coordinator",
    credentials: [
      "Delhi Crime S2 (Netflix)",
      "Class of 83 (Red Chillies)",
      "Saanvi Nayak Films",
    ],
    image: "/images/placeholder-ria.webp",
  },
];
