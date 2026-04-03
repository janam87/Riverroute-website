export interface Horizon {
  title: string;
  slug: string;
  quote: string;
  description: string;
  longDescription: string;
  features: string[];
  status: string;
}

export const horizons: Horizon[] = [
  {
    title: "the vendor layer.",
    slug: "vendor",
    quote:
      "Crores of rupees worth of equipment leaves warehouses every day. Every single piece of it tracked on WhatsApp and hope.",
    description:
      "Our first product gives equipment rental vendors something they have never had before: complete clarity over every piece of equipment — where it is, who has it, when it returns.",
    longDescription:
      "India's M&E equipment rental market is massive — cameras, lenses, lighting rigs, grip, sound gear — moving across cities and productions every single day. Yet the entire system runs on WhatsApp messages, paper challans, and trust. Equipment goes missing, returns are delayed, and vendors have no real-time visibility into their own inventory. The Vendor Layer changes that. A purpose-built system for equipment rental houses that tracks every piece of gear from warehouse to set and back — with digital challans, automated return reminders, real-time availability dashboards, and a complete audit trail.",
    features: [
      "Real-time equipment tracking across productions and locations",
      "Digital challans replacing paper-based workflows",
      "Automated return reminders and overdue alerts",
      "Inventory dashboard with availability and utilisation metrics",
      "Production-wise billing and reconciliation",
      "Multi-warehouse support for vendors operating across cities",
    ],
    status: "in active development",
  },
  {
    title: "the production layer.",
    slug: "production",
    quote:
      "A film passes through hundreds of hands, decisions, and stages before it reaches an audience. Most of that journey is invisible.",
    description:
      "Budgets, schedules, call sheets — transparent, real-time, connected. For studios, producers, and coordinators who hold productions together.",
    longDescription:
      "Every production is a complex web of budgets, schedules, call sheets, deliverables, and people — managed across dozens of WhatsApp groups, spreadsheets, and email threads. Coordinators and line producers hold it all together through sheer effort and memory. The Production Layer brings structure to this chaos. A connected workspace for studios, producers, and coordinators that makes budgets, schedules, and call sheets transparent, real-time, and accessible to everyone who needs them — without replacing the relationships that make productions work.",
    features: [
      "Budget tracking with real-time spend visibility",
      "Schedule management with department-wise call sheets",
      "Deliverables tracking for platform and distributor requirements",
      "Role-based access for producers, coordinators, and department heads",
      "Cross-department communication without WhatsApp chaos",
      "Production dashboards for studios and executive producers",
    ],
    status: "in development",
  },
  {
    title: "the people layer.",
    slug: "people",
    quote:
      "India's M&E industry is one of the largest in the world. Yet a director in Chennai has no way to find a focus puller in Kolkata.",
    description:
      "A professional network for the industry — verified, credible, useful. Connecting crew, technicians, and filmmakers across the country.",
    longDescription:
      "India's media and entertainment industry employs millions of professionals — camera operators, sound designers, gaffers, line producers, editors, colourists — spread across Mumbai, Hyderabad, Chennai, Kolkata, Delhi, and dozens of smaller production hubs. Yet there is no reliable way to discover, verify, or connect with talent across regions. Hiring still runs on personal networks and word-of-mouth. The People Layer is a professional network built specifically for M&E — where verified profiles, work histories, and peer endorsements replace guesswork, and where a director in Chennai can find a focus puller in Kolkata with confidence.",
    features: [
      "Verified professional profiles with real work histories",
      "Skill-based discovery across regions and languages",
      "Peer endorsements and production credits",
      "Availability calendar for freelance crew",
      "Direct connection between productions and professionals",
      "Regional talent pools across India's production hubs",
    ],
    status: "on the roadmap",
  },
];
