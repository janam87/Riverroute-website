export interface Horizon {
  label: string;
  pullQuote: string;
  body: string;
  status: string;
  statusVariant: "active" | "development" | "roadmap";
}

export const horizons: Horizon[] = [
  {
    label: "Horizon 01 — The Vendor",
    pullQuote:
      "Crores of rupees worth of equipment leaves warehouses every day. Every single piece of it tracked on WhatsApp and hope.",
    body: "Our first product gives the people who rent out the equipment that powers Indian film and television something they have never had before: complete clarity.",
    status: "In active development",
    statusVariant: "active",
  },
  {
    label: "Horizon 02 — The Production",
    pullQuote:
      "A film passes through hundreds of hands, decisions, and stages before it reaches an audience. Most of that journey is invisible — even to the people making it.",
    body: "Our second product brings transparency and control to how films are produced, tracked, and managed.",
    status: "In development",
    statusVariant: "development",
  },
  {
    label: "Horizon 03 — The People",
    pullQuote:
      "India's M&E industry is one of the largest in the world. Yet a director in Chennai has no way to find a focus puller in Kolkata.",
    body: "Our third product connects the entire nation's film and entertainment industry into one living network.",
    status: "On the roadmap",
    statusVariant: "roadmap",
  },
];
