export interface Event {
  id: string;
  name: string;
  city: string;
  state: string;
  locationId?: string;
  dates: string;
  startDate: string;
  endDate: string;
  venue: string;
  address: string;
  hours: string;
  admission: {
    adult: number;
    child: number;
    under5: string;
  };
  ticketLink: string;
  vendorListLink: string;
  registerLink: string;
  mapEmbed?: string;
  status?: "active" | "inactive";
  featured?: boolean;
  faqs: Array<{ question: string; answer: string }>;
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  description: string;
  eventIds: string[];
  website?: string;
  instagram?: string;
}

export type VendorCategory =
  | "Breeder - Snakes"
  | "Breeder - Lizards"
  | "Breeder - Geckos"
  | "Breeder - Tortoises"
  | "Breeder - Invertebrates"
  | "Supplies"
  | "Feeders"
  | "Art & Merchandise"
  | "Education"
  | "Other";

export function getDefaultFaqs(cityOrVenue = "") {
  const location = cityOrVenue.toLowerCase();
  const hasAtm = location.includes("north richland") || location.includes("nrh") || location.includes("amarillo");
  const isArlington = location.includes("arlington");
  const isNorthRichlandHills = location.includes("north richland") || location.includes("nrh") || location.includes("nytex");
  const isAmarillo = location.includes("amarillo");
  const isSchertz = location.includes("schertz") || location.includes("san antonio");

  const parkingAnswer = isNorthRichlandHills
    ? "Yes. Parking is available at the venue, with additional parking in the school parking lot across the street."
    : "Yes, parking is available on-site or nearby. Check each venue for details.";

  const accessibilityAnswer = isArlington
    ? "Yes. Strollers and wheelchairs are allowed, but the Arlington expo can become crowded and tight during busy times."
    : "Yes. Strollers and wheelchairs are allowed.";

  let foodAnswer = "Food and drink options vary by venue.";

  if (isArlington) {
    foodAnswer = "Yes. The venue has a bar serving drinks, beer, and snacks. The venue also prepares and sells lunch.";
  } else if (isNorthRichlandHills) {
    foodAnswer = "NYTEX Sports Centre has a restaurant and bar. Food and drinks are not allowed inside the expo area.";
  } else if (isAmarillo) {
    foodAnswer = "Yes. A concession stand is available. Alcohol is not available.";
  } else if (isSchertz) {
    foodAnswer = "Vending machines are available. Alcohol is not available.";
  }

  return [
    { question: "Is parking available?", answer: parkingAnswer },
    { question: "Are children allowed?", answer: "Yes. Lone Star Reptile Expos are family-friendly events, and kids 6 and under are free." },
    { question: "Can I purchase tickets at the door?", answer: "Yes. Tickets may be purchased at the door with cash or card." },
    { question: "Are tickets valid for both days?", answer: "Yes. Admission is valid for both Saturday and Sunday." },
    { question: "Can I leave and return to the expo?", answer: "Yes. Keep your Saturday wristband or show your hand stamp when returning." },
    { question: "Are strollers and wheelchairs allowed?", answer: accessibilityAnswer },
    { question: "Are food and drinks available?", answer: foodAnswer },
    { question: "Is there an ATM?", answer: hasAtm ? "Yes, an ATM is available at this location." : "Not at this location. We recommend bringing cash because some vendors may not accept cards." },
    { question: "What forms of payment are accepted for admission?", answer: "Cash and cards are accepted for admission. Vendor payment options may differ." },
    { question: "Do vendors accept cards?", answer: "Many vendors accept cards, but bringing cash is recommended." },
    { question: "Can I bring my pet?", answer: "Yes. Guests may bring pets inside our venues. Please keep your pet safely under control at all times." },
    { question: "Are venomous animals allowed?", answer: "No. Venomous animals are not permitted at Lone Star Reptile Expos." },
    { question: "Can attendees sell animals or products at the expo?", answer: "No. Only registered, paid vendors may sell animals or products inside the venue." },
  ];
}

export const events: Event[] = [
  {
    id: "nrh-may-2026",
    name: "North Richland Hills Reptile Expo",
    city: "North Richland Hills",
    state: "TX",
    dates: "May 23–24, 2026",
    startDate: "2026-05-23",
    endDate: "2026-05-24",
    venue: "NYTEX Sports Centre",
    address: "8851 Ice House Dr, North Richland Hills, TX 76180",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://buytickets.at/lonestarreptileexpos/811232",
    vendorListLink: "https://www.lonestarreptileexpos.com/nrhvendors",
    registerLink: "/vendor-registration?event=nrh-may-2026",
    status: "active",
    featured: true,
    faqs: getDefaultFaqs("North Richland Hills"),
  },
  {
    id: "arlington-jul-2026",
    name: "Arlington Reptile Expo",
    city: "Arlington",
    state: "TX",
    dates: "July 11–12, 2026",
    startDate: "2026-07-11",
    endDate: "2026-07-12",
    venue: "Knights of Columbus",
    address: "2625 S Cooper St, Arlington, TX 76015",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811240",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=arlington-jul-2026",
    status: "active",
    faqs: getDefaultFaqs("Arlington"),
  },
  {
    id: "coleman-jul-2026",
    name: "Coleman Reptile Expo",
    city: "Coleman",
    state: "TX",
    dates: "July 18–19, 2026",
    startDate: "2026-07-18",
    endDate: "2026-07-19",
    venue: "Bill Franklin Center",
    address: "13152 State HWY 206, Coleman, TX 76834",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/1770510",
    vendorListLink: "http://lonestarreptileexpos.com/colemanvendors",
    registerLink: "/vendor-registration?event=coleman-jul-2026",
    status: "active",
    faqs: getDefaultFaqs("Coleman"),
  },
  {
    id: "amarillo-oct-2026",
    name: "Amarillo Reptile Expo",
    city: "Amarillo",
    state: "TX",
    dates: "October 17–18, 2026",
    startDate: "2026-10-17",
    endDate: "2026-10-18",
    venue: "Amarillo Civic Center Complex",
    address: "401 S Buchanan St, Amarillo, TX 79101",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811243",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors-amarillo",
    registerLink: "/vendor-registration?event=amarillo-oct-2026",
    status: "active",
    faqs: getDefaultFaqs("Amarillo"),
  },
  {
    id: "san-antonio-oct-2026",
    name: "San Antonio Reptile Expo",
    city: "San Antonio",
    state: "TX",
    dates: "October 31–November 1, 2026",
    startDate: "2026-10-31",
    endDate: "2026-11-01",
    venue: "Schertz Civic Center",
    address: "1400 Schertz Pkwy, Schertz, TX 78154",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://buytickets.at/lonestarreptileexpos/811248",
    vendorListLink: "https://www.lonestarreptileexpos.com/sanantoniovendors",
    registerLink: "/vendor-registration?event=san-antonio-oct-2026",
    status: "active",
    faqs: getDefaultFaqs("Schertz"),
  },
  {
    id: "nrh-nov-2026",
    name: "North Richland Hills Reptile Expo",
    city: "North Richland Hills",
    state: "TX",
    dates: "November 14–15, 2026",
    startDate: "2026-11-14",
    endDate: "2026-11-15",
    venue: "NYTEX Sports Centre",
    address: "8851 Ice House Dr, North Richland Hills, TX 76180",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://buytickets.at/lonestarreptileexpos/811232",
    vendorListLink: "https://www.lonestarreptileexpos.com/nrhvendors",
    registerLink: "/vendor-registration?event=nrh-nov-2026",
    status: "active",
    faqs: getDefaultFaqs("North Richland Hills"),
  },
];

export const vendors: Vendor[] = [
  { id: "v1", name: "Texas Ball Pythons", category: "Breeder - Snakes", description: "Premium ball python morphs bred in Texas", eventIds: ["nrh-may-2026", "arlington-jul-2026", "nrh-nov-2026"] },
  { id: "v2", name: "Lone Star Leos", category: "Breeder - Geckos", description: "Leopard gecko specialists", eventIds: ["nrh-may-2026", "arlington-jul-2026"] },
  { id: "v3", name: "Panhandle Reptiles", category: "Breeder - Lizards", description: "Bearded dragons and blue tongue skinks", eventIds: ["amarillo-oct-2026"] },
  { id: "v4", name: "West Texas Tortoises", category: "Breeder - Tortoises", description: "Sulcata and Russian tortoises", eventIds: ["coleman-jul-2026", "amarillo-oct-2026"] },
  { id: "v5", name: "Critter Supplies Co", category: "Supplies", description: "Enclosures, lighting, and accessories", eventIds: ["nrh-may-2026", "arlington-jul-2026", "coleman-jul-2026", "amarillo-oct-2026", "san-antonio-oct-2026", "nrh-nov-2026"] },
  { id: "v6", name: "Texas Feeders Direct", category: "Feeders", description: "Crickets, roaches, and rodents", eventIds: ["nrh-may-2026", "arlington-jul-2026", "coleman-jul-2026", "amarillo-oct-2026", "san-antonio-oct-2026", "nrh-nov-2026"] },
];

export const vendorCategories: VendorCategory[] = [
  "Breeder - Snakes",
  "Breeder - Lizards",
  "Breeder - Geckos",
  "Breeder - Tortoises",
  "Breeder - Invertebrates",
  "Supplies",
  "Feeders",
  "Art & Merchandise",
  "Education",
  "Other",
];

export function isUpcomingEvent(event: Event, today = new Date()) {
  const endDate = new Date(`${event.endDate}T23:59:59`);
  return event.status === "active" && endDate >= today;
}

export const getUpcomingEvents = () =>
  events
    .filter((event) => isUpcomingEvent(event))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

export const getEventById = (id: string) => events.find((event) => event.id === id);
export const getVendorsByEvent = (eventId: string) => vendors.filter((vendor) => vendor.eventIds.includes(eventId));
export const getVendorsByCategory = (category: VendorCategory) => vendors.filter((vendor) => vendor.category === category);

