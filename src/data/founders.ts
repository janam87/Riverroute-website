export interface Experience {
  period: string;
  role: string;
  company: string;
  detail: string;
}

export interface Founder {
  name: string;
  fullName: string;
  title: string;
  role: string;
  bio: string;
  detailedBio: string;
  experience: Experience[];
  credentials: string[];
  image: string;
}

export const founders: Founder[] = [
  {
    name: "Varun",
    fullName: "Varun Hemraj Khandelwal",
    title: "Co-Founder",
    role: "Film Producer & Industry Veteran",
    bio: "Two decades across every side of Indian film and television — from casting at UTV, to acting in shows like Kahani Ghar Ghar Ki and Diya aur Baati Hum, to producing at Roy Kapur Films, Good Co., and Dharma Productions. From The Sky is Pink to Goodbye to Sarzameen — he has been on set, behind the camera, and in the production office. He understands how this industry works because he has done every job in it.",
    detailedBio:
      "Varun's journey through Indian media spans over two decades and nearly every role the industry has to offer. He started in casting at UTV Television, building and organising the casting department for shows across Star Plus, Zee, Sony, and Hungama. He then spent a decade as an actor across major television channels — from Kahani Ghar Ghar Ki and Diya aur Baati Hum on Star Plus to Jyoti on Imagine TV. That on-screen experience gave him a ground-level understanding of how productions actually run. He transitioned into producing with Greenlight Entertainment, creating web series and pilots for MTV and Comedy Central. As Production Manager and then Executive Producer, he managed productions at Roy Kapur Films (The Sky is Pink, Yeh Ballet), Good Co. (Sunflower S1, Goodbye, Good Bad Girl, Ganapath), and most recently Dharma Productions (Sarzameen). He has seen this industry from every angle — and that is exactly why he is building RiverRoute.",
    experience: [
      {
        period: "2023",
        role: "Executive Producer",
        company: "Dharma Productions",
        detail: "Sarzameen — featuring Prithviraj, Kajol, and Ibrahim Ali Khan",
      },
      {
        period: "2020–2022",
        role: "Line Producer / Executive Producer",
        company: "Good Co.",
        detail:
          "Sunflower S1 (Zee5), Goodbye (Amitabh Bachchan, Neena Gupta), Good Bad Girl (Sony Liv), Ganapath Part 1",
      },
      {
        period: "2018–2020",
        role: "Production Manager / UPM",
        company: "Roy Kapur Films & Kangra Talkies",
        detail:
          "The Sky is Pink (Priyanka Chopra, Farhan Akhtar), Yeh Ballet (Netflix), Madam Chief Minister",
      },
      {
        period: "2014–2015",
        role: "Producer",
        company: "Greenlight Entertainment",
        detail:
          "Philips MTV Bachelor Pad, pilot episodes for MTV India and Comedy Central",
      },
      {
        period: "2006–2016",
        role: "Actor",
        company: "Star Plus, Zee TV, Sony, Imagine TV",
        detail:
          "Kahani Ghar Ghar Ki, Diya aur Baati Hum, Yeh Hai Mohabbatein, and 12+ other shows",
      },
      {
        period: "2003–2005",
        role: "Casting Head",
        company: "UTV Television",
        detail:
          "Organised in-house casting for 13+ shows across Star Plus, Zee, Sony, Hungama, and an international series",
      },
    ],
    credentials: [
      "Roy Kapur Films (The Sky is Pink)",
      "Good Co. (Goodbye)",
      "Dharma Productions (Sarzameen)",
    ],
    image: "/images/placeholder-varun.webp",
  },
  {
    name: "Ria",
    fullName: "Ria Bhavsar",
    title: "Co-Founder",
    role: "Show Coordinator & Production Operations",
    bio: "The person who makes productions actually happen. From coordinating Delhi Crime S2 for Netflix to managing Class of 83 at Red Chillies, to heading operations at Saanvi Nayak Films — she has lived the chaos of Indian production operations firsthand.",
    detailedBio:
      "Ria has spent over a decade in the trenches of Indian production operations — the unglamorous, high-pressure work that actually makes films and shows happen. As Show Coordinator at Yamini Pictures, she managed all operations for Delhi Crime Season 2 on Netflix, serving as the single point of contact between cast, crew, and the platform. At Red Chillies Entertainment, she was Project Manager for Class of 83, handling creative, production, technical, and legal deliveries to Netflix. Before that, she headed operations at Saanvi Nayak Films across production, marketing, and business — supervising feature films, documentaries for NFDC, and an entire media school proposal for NSDC. She cut her teeth as an Assistant Director and Casting Director at Chrome Pictures, working on ad campaigns for brands like Nestle, Maruti, Subway, and Complan. She knows what breaks in production operations because she has been the one holding it together.",
    experience: [
      {
        period: "2019–present",
        role: "Show Coordinator",
        company: "Yamini Pictures",
        detail:
          "Delhi Crime Season 2 (Netflix) — operations, deliveries, scheduling, single point of contact for cast, crew, and Netflix",
      },
      {
        period: "2019–present",
        role: "Project Manager",
        company: "Red Chillies Entertainment",
        detail:
          "Class of 83 (Netflix) — creative, production, technical, and legal deliveries",
      },
      {
        period: "2015–2018",
        role: "Head of Operations",
        company: "Saanvi Nayak Films",
        detail:
          "Feature films (Zeenat, Love Shagun), NFDC documentary, media school development for NSDC",
      },
      {
        period: "2013–2015",
        role: "AD & Casting Director",
        company: "Chrome Pictures",
        detail:
          "Ad films for Nestle, Maruti Swift, Subway, Complan, Lifebouy, and 10+ other brands",
      },
      {
        period: "2013–2014",
        role: "Production Assistant & AD",
        company: "Electric Dreams Film Company",
        detail: "Ad films for Lays, Kelloggs, Aircel, Cadbury",
      },
    ],
    credentials: [
      "Delhi Crime S2 (Netflix)",
      "Class of 83 (Red Chillies)",
      "Saanvi Nayak Films",
    ],
    image: "/images/ria.png",
  },
];
