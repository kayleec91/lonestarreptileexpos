export interface Event {
  id: string;
  name: string;
  city: string;
  state: string;
  dates: string;
  venue: string;
  address: string;
  hours: string;
  admission: {
    adult: number;
    child: number;
    under5: string;
  };
  ticketLink: string;
  mapEmbed: string;
  faqs: Array<{ question: string; answer: string }>;
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  description: string;
  eventIds: string[];
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
  | "Education";

export const events: Event[] = [
  {
    id: "houston-spring-2025",
    name: "Houston Reptile Expo",
    city: "Houston",
    state: "TX",
    dates: "March 15-16, 2025",
    venue: "NRG Center",
    address: "1 NRG Park, Houston, TX 77054",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 15, child: 10, under5: "Free" },
    ticketLink: "#",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.0234!2d-95.4095!3d29.6847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c1234567890%3A0x1234567890abcdef!2sNRG%20Center!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, ample parking is available for $15 per vehicle." },
      { question: "Are children allowed?", answer: "Absolutely! This is a family-friendly event. Children under 5 get in free." },
      { question: "Can I bring my own reptile?", answer: "Personal pets are not allowed for the safety of all animals." },
      { question: "Do vendors accept cards?", answer: "Most vendors accept cards, but we recommend bringing cash for the best deals." },
    ],
  },
  {
    id: "dallas-spring-2025",
    name: "Dallas Reptile Expo",
    city: "Dallas",
    state: "TX",
    dates: "April 5-6, 2025",
    venue: "Dallas Market Hall",
    address: "2200 N Stemmons Fwy, Dallas, TX 75207",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 15, child: 10, under5: "Free" },
    ticketLink: "#",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.0234!2d-96.8234!3d32.7967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e1234567890%3A0x1234567890abcdef!2sDallas%20Market%20Hall!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, free parking is available on-site." },
      { question: "Are children allowed?", answer: "Yes! This is a family-friendly event. Children under 5 get in free." },
      { question: "Can I bring my own reptile?", answer: "Personal pets are not allowed for the safety of all animals." },
      { question: "Do vendors accept cards?", answer: "Most vendors accept cards, but cash is recommended." },
    ],
  },
  {
    id: "austin-summer-2025",
    name: "Austin Reptile Expo",
    city: "Austin",
    state: "TX",
    dates: "June 14-15, 2025",
    venue: "Palmer Events Center",
    address: "900 Barton Springs Rd, Austin, TX 78704",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 15, child: 10, under5: "Free" },
    ticketLink: "#",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.0234!2d-97.7534!3d30.2634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b1234567890%3A0x1234567890abcdef!2sPalmer%20Events%20Center!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, paid parking is available nearby." },
      { question: "Are children allowed?", answer: "Yes! Family-friendly event. Kids under 5 are free." },
      { question: "Can I bring my own reptile?", answer: "Personal pets are not allowed." },
      { question: "Do vendors accept cards?", answer: "Most do, but bring cash for deals." },
    ],
  },
  {
    id: "san-antonio-fall-2025",
    name: "San Antonio Reptile Expo",
    city: "San Antonio",
    state: "TX",
    dates: "September 20-21, 2025",
    venue: "Freeman Coliseum",
    address: "3201 E Houston St, San Antonio, TX 78219",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 15, child: 10, under5: "Free" },
    ticketLink: "#",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3474.0234!2d-98.4534!3d29.4534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c1234567890%3A0x1234567890abcdef!2sFreeman%20Coliseum!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, $10 parking available." },
      { question: "Are children allowed?", answer: "Yes! Kids under 5 are free." },
      { question: "Can I bring my own reptile?", answer: "No personal pets allowed." },
      { question: "Do vendors accept cards?", answer: "Cash recommended." },
    ],
  },
];

export const vendors: Vendor[] = [
  { id: "v1", name: "Texas Ball Pythons", category: "Breeder - Snakes", description: "Premium ball python morphs bred in Texas", eventIds: ["houston-spring-2025", "dallas-spring-2025"] },
  { id: "v2", name: "Lone Star Leos", category: "Breeder - Geckos", description: "Leopard gecko specialists", eventIds: ["houston-spring-2025", "austin-summer-2025"] },
  { id: "v3", name: "Hill Country Reptiles", category: "Breeder - Lizards", description: "Bearded dragons and blue tongue skinks", eventIds: ["austin-summer-2025", "san-antonio-fall-2025"] },
  { id: "v4", name: "Gulf Coast Tortoises", category: "Breeder - Tortoises", description: "Sulcata and Russian tortoises", eventIds: ["houston-spring-2025", "san-antonio-fall-2025"] },
  { id: "v5", name: "Critter Supplies Co", category: "Supplies", description: "Enclosures, lighting, and accessories", eventIds: ["houston-spring-2025", "dallas-spring-2025", "austin-summer-2025", "san-antonio-fall-2025"] },
  { id: "v6", name: "Texas Feeders Direct", category: "Feeders", description: "Crickets, roaches, and rodents", eventIds: ["houston-spring-2025", "dallas-spring-2025", "austin-summer-2025", "san-antonio-fall-2025"] },
  { id: "v7", name: "Reptile Art Studio", category: "Art & Merchandise", description: "Custom reptile art and apparel", eventIds: ["dallas-spring-2025", "austin-summer-2025"] },
  { id: "v8", name: "DFW Boas", category: "Breeder - Snakes", description: "Boa constrictor morphs", eventIds: ["dallas-spring-2025"] },
  { id: "v9", name: "Austin Arachnids", category: "Breeder - Invertebrates", description: "Tarantulas and scorpions", eventIds: ["austin-summer-2025"] },
  { id: "v10", name: "Herp Education TX", category: "Education", description: "Educational programs and handling demos", eventIds: ["houston-spring-2025", "dallas-spring-2025", "austin-summer-2025", "san-antonio-fall-2025"] },
  { id: "v11", name: "Coastal Colubrids", category: "Breeder - Snakes", description: "Corn snakes and king snakes", eventIds: ["houston-spring-2025", "san-antonio-fall-2025"] },
  { id: "v12", name: "Crested Kingdom", category: "Breeder - Geckos", description: "Crested geckos and gargoyle geckos", eventIds: ["dallas-spring-2025", "austin-summer-2025"] },
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
];

export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

export function getVendorsByEvent(eventId: string): Vendor[] {
  return vendors.filter(vendor => vendor.eventIds.includes(eventId));
}

export function getUpcomingEvents(): Event[] {
  return events;
}
