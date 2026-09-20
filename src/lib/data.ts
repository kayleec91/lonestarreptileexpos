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
    id: "arlington-2026-07-11",
    name: "Arlington Reptile Expo",
    city: "Arlington",
    state: "TX",
    locationId: "Arlington",
    dates: "July 11th & 12th, 2026",
    startDate: "2026-07-11",
    endDate: "2026-07-12",
    venue: "Knights of Columbus",
    address: "2625 S Cooper St, Arlington, TX 76015",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811240",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=arlington-2026-07-11",
    status: "active",
    faqs: getDefaultFaqs("Arlington Knights of Columbus"),
  },
  {
    id: "amarillo-2026-09-19",
    name: "Amarillo Reptile Expo",
    city: "Amarillo",
    state: "TX",
    locationId: "Amarillo",
    dates: "September 19th & 20th, 2026",
    startDate: "2026-09-19",
    endDate: "2026-09-20",
    venue: "Amarillo Civic Center Complex",
    address: "401 S Buchanan St, Amarillo, TX 79101",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811243",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors-amarillo",
    registerLink: "/vendor-registration?event=amarillo-2026-09-19",
    status: "active",
    faqs: getDefaultFaqs("Amarillo Amarillo Civic Center Complex"),
  },
  {
    id: "schertz-2026-10-31",
    name: "Schertz Reptile Expo",
    city: "Schertz",
    state: "TX",
    locationId: "Schertz",
    dates: "October 31st & November 1st, 2026",
    startDate: "2026-10-31",
    endDate: "2026-11-01",
    venue: "Schertz Civic Center",
    address: "1400 Schertz Pkwy, Schertz, TX 78154",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://buytickets.at/lonestarreptileexpos/811248",
    vendorListLink: "https://www.lonestarreptileexpos.com/sanantoniovendors",
    registerLink: "/vendor-registration?event=schertz-2026-10-31",
    status: "active",
    faqs: getDefaultFaqs("Schertz Schertz Civic Center"),
  },
  {
    id: "north-richland-hills-2026-11-14",
    name: "North Richland Hills Reptile Expo",
    city: "North Richland Hills",
    state: "TX",
    locationId: "North Richland Hills",
    dates: "November 14th & 15th, 2026",
    startDate: "2026-11-14",
    endDate: "2026-11-15",
    venue: "NYTEX Sports Centre",
    address: "8851 Ice House Dr, North Richland Hills, TX 76180",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://buytickets.at/lonestarreptileexpos/811232",
    vendorListLink: "https://www.lonestarreptileexpos.com/nrhvendors",
    registerLink: "/vendor-registration?event=north-richland-hills-2026-11-14",
    status: "active",
    faqs: getDefaultFaqs("North Richland Hills NYTEX Sports Centre"),
  },
  {
    id: "arlington-2026-12-19",
    name: "Arlington Reptile Expo",
    city: "Arlington",
    state: "TX",
    locationId: "Arlington",
    dates: "December 19th & 20th, 2026",
    startDate: "2026-12-19",
    endDate: "2026-12-20",
    venue: "Knights of Columbus",
    address: "2625 S Cooper St, Arlington, TX 76015",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811240",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=arlington-2026-12-19",
    status: "active",
    faqs: getDefaultFaqs("Arlington Knights of Columbus"),
  },
  {
    id: "lewisville-2027-02-20",
    name: "Lewisville Reptile Expo",
    city: "Lewisville",
    state: "TX",
    locationId: "Lewisville",
    dates: "February 20th & 21st, 2027",
    startDate: "2027-02-20",
    endDate: "2027-02-21",
    venue: "NTX Arena",
    address: "401 S Stemmons Fwy Suite 4000, Lewisville, TX 75067",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/2427040",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=lewisville-2027-02-20",
    status: "active",
    faqs: getDefaultFaqs("Lewisville NTX Arena"),
  },
  {
    id: "arlington-2027-03-06",
    name: "Arlington Reptile Expo",
    city: "Arlington",
    state: "TX",
    locationId: "Arlington",
    dates: "March 6th & 7th, 2027",
    startDate: "2027-03-06",
    endDate: "2027-03-07",
    venue: "Knights of Columbus",
    address: "2625 S Cooper St, Arlington, TX 76015",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811240",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=arlington-2027-03-06",
    status: "active",
    faqs: getDefaultFaqs("Arlington Knights of Columbus"),
  },
  {
    id: "amarillo-2027-04-17",
    name: "Amarillo Reptile Expo",
    city: "Amarillo",
    state: "TX",
    locationId: "Amarillo",
    dates: "April 17th & 18th, 2027",
    startDate: "2027-04-17",
    endDate: "2027-04-18",
    venue: "Amarillo Civic Center Complex",
    address: "401 S Buchanan St, Amarillo, TX 79101",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811243",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors-amarillo",
    registerLink: "/vendor-registration?event=amarillo-2027-04-17",
    status: "active",
    faqs: getDefaultFaqs("Amarillo Amarillo Civic Center Complex"),
  },
  {
    id: "schertz-2027-05-01",
    name: "Schertz Reptile Expo",
    city: "Schertz",
    state: "TX",
    locationId: "Schertz",
    dates: "May 1st & 2nd, 2027",
    startDate: "2027-05-01",
    endDate: "2027-05-02",
    venue: "Schertz Civic Center",
    address: "1400 Schertz Pkwy, Schertz, TX 78154",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://buytickets.at/lonestarreptileexpos/811248",
    vendorListLink: "https://www.lonestarreptileexpos.com/sanantoniovendors",
    registerLink: "/vendor-registration?event=schertz-2027-05-01",
    status: "active",
    faqs: getDefaultFaqs("Schertz Schertz Civic Center"),
  },
  {
    id: "north-richland-hills-2027-05-16",
    name: "North Richland Hills Reptile Expo",
    city: "North Richland Hills",
    state: "TX",
    locationId: "North Richland Hills",
    dates: "May 16th & 17th, 2027",
    startDate: "2027-05-16",
    endDate: "2027-05-17",
    venue: "NYTEX Sports Centre",
    address: "8851 Ice House Dr, North Richland Hills, TX 76180",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://buytickets.at/lonestarreptileexpos/811232",
    vendorListLink: "https://www.lonestarreptileexpos.com/nrhvendors",
    registerLink: "/vendor-registration?event=north-richland-hills-2027-05-16",
    status: "active",
    faqs: getDefaultFaqs("North Richland Hills NYTEX Sports Centre"),
  },
  {
    id: "arlington-2027-07-10",
    name: "Arlington Reptile Expo",
    city: "Arlington",
    state: "TX",
    locationId: "Arlington",
    dates: "July 10th & 11th, 2027",
    startDate: "2027-07-10",
    endDate: "2027-07-11",
    venue: "Knights of Columbus",
    address: "2625 S Cooper St, Arlington, TX 76015",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811240",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=arlington-2027-07-10",
    status: "active",
    faqs: getDefaultFaqs("Arlington Knights of Columbus"),
  },
  {
    id: "san-angelo-2027-07-24",
    name: "San Angelo Reptile Expo",
    city: "San Angelo",
    state: "TX",
    locationId: "San Angelo",
    dates: "July 24th & 25th, 2027",
    startDate: "2027-07-24",
    endDate: "2027-07-25",
    venue: "First Financial Pavilion",
    address: "4400 Grape Creek Rd, San Angelo, TX 76903",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/2427044",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=san-angelo-2027-07-24",
    status: "active",
    faqs: getDefaultFaqs("San Angelo First Financial Pavilion"),
  },
  {
    id: "lewisville-2027-08-21",
    name: "Lewisville Reptile Expo",
    city: "Lewisville",
    state: "TX",
    locationId: "Lewisville",
    dates: "August 21st & 22nd, 2027",
    startDate: "2027-08-21",
    endDate: "2027-08-22",
    venue: "NTX Arena",
    address: "401 S Stemmons Fwy Suite 4000, Lewisville, TX 75067",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/2427040",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=lewisville-2027-08-21",
    status: "active",
    faqs: getDefaultFaqs("Lewisville NTX Arena"),
  },
  {
    id: "amarillo-2027-10-16",
    name: "Amarillo Reptile Expo",
    city: "Amarillo",
    state: "TX",
    locationId: "Amarillo",
    dates: "October 16th & 17th, 2027",
    startDate: "2027-10-16",
    endDate: "2027-10-17",
    venue: "Amarillo Civic Center Complex",
    address: "401 S Buchanan St, Amarillo, TX 79101",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811243",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors-amarillo",
    registerLink: "/vendor-registration?event=amarillo-2027-10-16",
    status: "active",
    faqs: getDefaultFaqs("Amarillo Amarillo Civic Center Complex"),
  },
  {
    id: "schertz-2027-10-30",
    name: "Schertz Reptile Expo",
    city: "Schertz",
    state: "TX",
    locationId: "Schertz",
    dates: "October 30th & 31st, 2027",
    startDate: "2027-10-30",
    endDate: "2027-10-31",
    venue: "Schertz Civic Center",
    address: "1400 Schertz Pkwy, Schertz, TX 78154",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://buytickets.at/lonestarreptileexpos/811248",
    vendorListLink: "https://www.lonestarreptileexpos.com/sanantoniovendors",
    registerLink: "/vendor-registration?event=schertz-2027-10-30",
    status: "active",
    faqs: getDefaultFaqs("Schertz Schertz Civic Center"),
  },
  {
    id: "san-angelo-2027-11-20",
    name: "San Angelo Reptile Expo",
    city: "San Angelo",
    state: "TX",
    locationId: "San Angelo",
    dates: "November 20th & 21st, 2027",
    startDate: "2027-11-20",
    endDate: "2027-11-21",
    venue: "First Financial Pavilion",
    address: "4400 Grape Creek Rd, San Angelo, TX 76903",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/2427044",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=san-angelo-2027-11-20",
    status: "active",
    faqs: getDefaultFaqs("San Angelo First Financial Pavilion"),
  },
  {
    id: "arlington-2027-12-18",
    name: "Arlington Reptile Expo",
    city: "Arlington",
    state: "TX",
    locationId: "Arlington",
    dates: "December 18th & 19th, 2027",
    startDate: "2027-12-18",
    endDate: "2027-12-19",
    venue: "Knights of Columbus",
    address: "2625 S Cooper St, Arlington, TX 76015",
    hours: "Sat 10am–5pm · Sun 10am–4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.tickettailor.com/events/lonestarreptileexpos/811240",
    vendorListLink: "https://www.lonestarreptileexpos.com/vendors",
    registerLink: "/vendor-registration?event=arlington-2027-12-18",
    status: "active",
    faqs: getDefaultFaqs("Arlington Knights of Columbus"),
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

