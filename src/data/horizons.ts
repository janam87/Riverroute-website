export interface Horizon {
  title: string;
  quote: string;
  description: string;
  status: string;
}

export const horizons: Horizon[] = [
  {
    title: "the vendor layer.",
    quote:
      "Crores of rupees worth of equipment leaves warehouses every day. Every single piece of it tracked on WhatsApp and hope.",
    description:
      "Our first product gives equipment rental vendors something they have never had before: complete clarity over every piece of equipment — where it is, who has it, when it returns.",
    status: "in active development",
  },
  {
    title: "the production layer.",
    quote:
      "A film passes through hundreds of hands, decisions, and stages before it reaches an audience. Most of that journey is invisible.",
    description:
      "Budgets, schedules, call sheets — transparent, real-time, connected. For studios, producers, and coordinators who hold productions together.",
    status: "in development",
  },
  {
    title: "the people layer.",
    quote:
      "India's M&E industry is one of the largest in the world. Yet a director in Chennai has no way to find a focus puller in Kolkata.",
    description:
      "A professional network for the industry — verified, credible, useful. Connecting crew, technicians, and filmmakers across the country.",
    status: "on the roadmap",
  },
];
