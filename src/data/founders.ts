export interface Founder {
  name: string;
  fullName: string;
  title: string;
  role: string;
  bio: string;
  credentials: string[];
  image: string;
}

export const founders: Founder[] = [
  {
    name: "Varun",
    fullName: "Varun Hemraj Khandelwal",
    title: "Co-Founder",
    role: "Film Producer & Industry Veteran",
    bio: "Over two decades inside Indian film and television. From Red Chillies Entertainment to independent films through Yamini Pictures and NFDC Delhi — feature films, advertising, and documentaries. He understands how this industry operates from a production floor, not a boardroom.",
    credentials: [
      "Red Chillies Entertainment",
      "Yamini Pictures",
      "NFDC Delhi",
    ],
    image: "/images/placeholder-varun.webp",
  },
  {
    name: "Ria",
    fullName: "Ria Bhavsar",
    title: "Co-Founder",
    role: "Show Coordinator & Production Operations",
    bio: "The person who makes productions actually happen. From coordinating Delhi Crime S2 for Netflix to managing Class of 83 at Red Chillies, to heading operations at Saanvi Nayak Films — she has lived the chaos of Indian production operations firsthand.",
    credentials: [
      "Delhi Crime S2 (Netflix)",
      "Class of 83 (Red Chillies)",
      "Saanvi Nayak Films",
    ],
    image: "/images/placeholder-ria.webp",
  },
];
