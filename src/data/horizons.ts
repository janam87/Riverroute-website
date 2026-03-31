export interface Horizon {
  title: string;
  description: string;
  status: string;
}

export const horizons: Horizon[] = [
  {
    title: "the vendor layer.",
    description:
      "equipment discovery, comparison, and booking — unified for the first time. built for rental vendors who power every production in the country.",
    status: "building now",
  },
  {
    title: "the production layer.",
    description:
      "budgets, schedules, call sheets — transparent, real-time, connected. for studios, producers, and coordinators who hold productions together.",
    status: "next",
  },
  {
    title: "the people layer.",
    description:
      "a professional network for the industry — verified, credible, useful. connecting crew, technicians, and filmmakers across the country.",
    status: "horizon",
  },
];
