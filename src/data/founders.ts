export interface Founder {
  name: string;
  title: string;
  role: string;
  bio: string;
  credentials: string[];
  image: string;
  imdbUrl?: string;
}

export const founders: Founder[] = [
  {
    name: "Varun Hemraj Khandelwal",
    title: "Co-Founder",
    role: "Film Producer & Industry Veteran",
    bio: "Varun has spent over two decades inside the Indian film and television industry. From large-scale productions at Red Chillies Entertainment to independent films through Yamini Pictures and projects with NFDC Delhi, he has worked across feature films, advertising, and documentaries. He understands how this industry operates — not from a boardroom, but from a production floor.",
    credentials: [
      "Red Chillies Entertainment",
      "Yamini Pictures",
      "NFDC Delhi",
      "Feature Films, Advertising, Documentaries",
    ],
    image: "/images/placeholder-varun.webp",
    imdbUrl: "https://www.imdb.com/name/nm0000000/",
  },
  {
    name: "Ria Bhavsar",
    title: "Co-Founder",
    role: "Show Coordinator, Project Manager & Production Operations Leader",
    bio: "Ria has been the person who makes productions actually happen. From coordinating Delhi Crime Season 2 for Netflix to managing Class of 83 at Red Chillies, to heading operations at Saanvi Nayak Films — she has lived the chaos of Indian production operations. She knows every pain point because she has experienced each one firsthand.",
    credentials: [
      "Delhi Crime S2 (Netflix) — Show Coordinator",
      "Class of 83 (Netflix, Red Chillies) — Project Manager",
      "Saanvi Nayak Films — Head of Operations",
      "BMM, St. Andrews College Mumbai, 2012",
    ],
    image: "/images/placeholder-ria.webp",
  },
];
