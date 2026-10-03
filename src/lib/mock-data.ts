export type NGO = {
  id: string;
  name: string;
  focusArea: string;
  description: string;
  contactEmail: string;
};

export type Blueprint = {
  id: string;
  title: string;
  category: string;
  estimatedBudget: string;
  description: string;
  steps: string[];
};

export const MOCK_NGOS: NGO[] = [
  {
    id: "ngo-001",
    name: "Green Horizons Initiative",
    focusArea: "Environment & Urban Ecology",
    description: "Dedicated to transforming neglected urban spaces into sustainable community gardens and parks.",
    contactEmail: "grants@greenhorizons.org"
  },
  {
    id: "ngo-002",
    name: "YouthForward Foundation",
    focusArea: "Education & Youth Mentorship",
    description: "Provides safe spaces, after-school programs, and mentorship for at-risk youth.",
    contactEmail: "action@youthforward.org"
  },
  {
    id: "ngo-003",
    name: "SafeStreets Alliance",
    focusArea: "Community Safety & Infrastructure",
    description: "Focuses on improving local infrastructure, traffic safety, and neighborhood watch programs.",
    contactEmail: "hello@safestreets.org"
  },
  {
    id: "ngo-004",
    name: "ElderCare Connect",
    focusArea: "Elderly Support & Accessibility",
    description: "Combats elderly isolation through volunteer networks, meal deliveries, and accessibility projects.",
    contactEmail: "support@eldercareconnect.org"
  },
  {
    id: "ngo-005",
    name: "TechForGood Labs",
    focusArea: "Digital Literacy & Access",
    description: "Provides refurbished hardware and digital literacy workshops to marginalized communities.",
    contactEmail: "partners@techforgood.org"
  }
];

export const MOCK_BLUEPRINTS: Blueprint[] = [
  {
    id: "bp-101",
    title: "Urban Community Garden Conversion",
    category: "Environment",
    estimatedBudget: "500 - 1,500 PLN",
    description: "A complete framework for transforming an empty lot into a maintained community garden.",
    steps: [
      "Secure land use permission from city council.",
      "Organize neighborhood cleanup day to clear debris.",
      "Build raised planter boxes and secure soil donations.",
      "Establish a weekly resident watering and maintenance schedule."
    ]
  },
  {
    id: "bp-102",
    title: "After-School Mentorship Hub",
    category: "Youth",
    estimatedBudget: "200 - 800 PLN",
    description: "Setting up a weekly safe-space program for local kids using existing community center rooms.",
    steps: [
      "Partner with local community center for free room access.",
      "Run background checks on 3-5 local volunteer mentors.",
      "Procure basic supplies (snacks, board games, homework materials).",
      "Launch marketing campaign at local schools."
    ]
  },
  {
    id: "bp-103",
    title: "Traffic Calming & Pedestrian Safety",
    category: "Infrastructure",
    estimatedBudget: "500 - 1,500 PLN",
    description: "Implementing localized traffic calming measures like speed bumps, high-visibility crosswalks, or hazard removal.",
    steps: [
      "Gather resident signatures petitioning for safety measures.",
      "Submit formal request and blueprint to the Department of Transportation.",
      "Host a community awareness event regarding local traffic laws.",
      "Paint temporary high-visibility markers (pending city approval)."
    ]
  },
  {
    id: "bp-104",
    title: "Elderly Companion & Grocery Network",
    category: "Elderly Support",
    estimatedBudget: "100 - 300 PLN",
    description: "A grassroots delivery and companionship network for isolated elderly residents.",
    steps: [
      "Identify isolated elderly residents through local clinics.",
      "Recruit neighborhood volunteers willing to dedicate 2 hours/week.",
      "Establish a weekly grocery run and check-in schedule.",
      "Set up an emergency phone tree."
    ]
  },
  {
    id: "bp-105",
    title: "Neighborhood Digital Kiosk",
    category: "Technology",
    estimatedBudget: "800 - 2,000 PLN",
    description: "Installing a public digital kiosk providing free Wi-Fi and access to city services.",
    steps: [
      "Source refurbished weatherproof hardware.",
      "Secure a local business willing to host the power/internet source.",
      "Install restrictive OS allowing only city service and educational access.",
      "Launch an introductory workshop for residents."
    ]
  }
];
