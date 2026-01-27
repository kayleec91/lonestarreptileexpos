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
    id: "nrh-oct-2025",
    name: "North Richland Hills Reptile Expo",
    city: "North Richland Hills",
    state: "TX",
    dates: "October 11-12, 2025",
    venue: "NYTEX Sports Centre",
    address: "8851 Ice House Dr, North Richland Hills, TX 76180",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.lonestarreptileexpos.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.5!2d-97.2289!3d32.8484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7d6a8b4d1234%3A0x1234567890abcdef!2sNYTEX%20Sports%20Centre!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, free parking is available on-site." },
      { question: "Are children allowed?", answer: "Absolutely! This is a family-friendly event. Children under 5 get in free." },
      { question: "Can I bring my own reptile?", answer: "No outside animals are allowed for the safety of all animals at the expo." },
      { question: "Do vendors accept cards?", answer: "Most vendors accept cards, but we recommend bringing cash. ATM is available on-site." },
    ],
  },
  {
    id: "amarillo-oct-2025",
    name: "Amarillo Reptile Expo",
    city: "Amarillo",
    state: "TX",
    dates: "October 18-19, 2025",
    venue: "Amarillo Civic Center Complex",
    address: "401 S Buchanan St, Amarillo, TX 79101",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.lonestarreptileexpos.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5!2d-101.8313!3d35.2220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x870148d4b4567890%3A0x1234567890abcdef!2sAmarillo%20Civic%20Center!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, parking is available at the Civic Center." },
      { question: "Are children allowed?", answer: "Yes! Family-friendly event. Kids under 5 are free." },
      { question: "Can I bring my own reptile?", answer: "No outside animals allowed." },
      { question: "Do vendors accept cards?", answer: "Most do, but cash is recommended. ATM on-site." },
    ],
  },
  {
    id: "arlington-dec-2025",
    name: "Arlington Reptile Expo",
    city: "Arlington",
    state: "TX",
    dates: "December 13-14, 2025",
    venue: "Knights of Columbus",
    address: "2625 S Cooper St, Arlington, TX 76015",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.lonestarreptileexpos.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.5!2d-97.1234!3d32.7234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e8765432!2sKnights%20of%20Columbus!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, free parking on-site." },
      { question: "Are children allowed?", answer: "Yes! Kids under 5 are free." },
      { question: "Can I bring my own reptile?", answer: "No outside animals allowed." },
      { question: "Do vendors accept cards?", answer: "Cash recommended. ATM available." },
    ],
  },
  {
    id: "coleman-jan-2026",
    name: "Coleman Reptile Expo",
    city: "Coleman",
    state: "TX",
    dates: "January 31 - February 1, 2026",
    venue: "Bill Franklin Center",
    address: "13152 State HWY 206, Coleman, TX 76834",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.lonestarreptileexpos.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.5!2d-99.4234!3d31.8234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865012345!2sBill%20Franklin%20Center!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, free parking available." },
      { question: "Are children allowed?", answer: "Yes! Family-friendly. Kids under 5 free." },
      { question: "Can I bring my own reptile?", answer: "No outside animals allowed." },
      { question: "Do vendors accept cards?", answer: "Cash recommended." },
    ],
  },
  {
    id: "amarillo-feb-2026",
    name: "Amarillo Reptile Expo",
    city: "Amarillo",
    state: "TX",
    dates: "February 28 - March 1, 2026",
    venue: "Amarillo Civic Center Complex",
    address: "401 S Buchanan St, Amarillo, TX 79101",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.lonestarreptileexpos.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5!2d-101.8313!3d35.2220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x870148d4b4567890%3A0x1234567890abcdef!2sAmarillo%20Civic%20Center!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, parking at the Civic Center." },
      { question: "Are children allowed?", answer: "Yes! Kids under 5 free." },
      { question: "Can I bring my own reptile?", answer: "No outside animals allowed." },
      { question: "Do vendors accept cards?", answer: "Cash recommended. ATM on-site." },
    ],
  },
  {
    id: "arlington-mar-2026",
    name: "Arlington Reptile Expo",
    city: "Arlington",
    state: "TX",
    dates: "March 21-22, 2026",
    venue: "Knights of Columbus",
    address: "2625 S Cooper St, Arlington, TX 76015",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.lonestarreptileexpos.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.5!2d-97.1234!3d32.7234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e8765432!2sKnights%20of%20Columbus!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, free parking on-site." },
      { question: "Are children allowed?", answer: "Yes! Kids under 5 free." },
      { question: "Can I bring my own reptile?", answer: "No outside animals allowed." },
      { question: "Do vendors accept cards?", answer: "Cash recommended." },
    ],
  },
  {
    id: "nrh-may-2026",
    name: "North Richland Hills Reptile Expo",
    city: "North Richland Hills",
    state: "TX",
    dates: "May 23-24, 2026",
    venue: "NYTEX Sports Centre",
    address: "8851 Ice House Dr, North Richland Hills, TX 76180",
    hours: "Sat 10am-5pm, Sun 10am-4pm",
    admission: { adult: 10, child: 5, under5: "Free" },
    ticketLink: "https://www.lonestarreptileexpos.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.5!2d-97.2289!3d32.8484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7d6a8b4d1234%3A0x1234567890abcdef!2sNYTEX%20Sports%20Centre!5e0!3m2!1sen!2sus!4v1234567890",
    faqs: [
      { question: "Is parking available?", answer: "Yes, free parking on-site." },
      { question: "Are children allowed?", answer: "Yes! Kids under 5 free." },
      { question: "Can I bring my own reptile?", answer: "No outside animals allowed." },
      { question: "Do vendors accept cards?", answer: "Cash recommended. ATM available." },
    ],
  },
];

export const vendors: Vendor[] = [
  { id: "v1", name: "Texas Ball Pythons", category: "Breeder - Snakes", description: "Premium ball python morphs bred in Texas", eventIds: ["nrh-oct-2025", "arlington-dec-2025", "arlington-mar-2026"] },
  { id: "v2", name: "Lone Star Leos", category: "Breeder - Geckos", description: "Leopard gecko specialists", eventIds: ["nrh-oct-2025", "nrh-may-2026"] },
  { id: "v3", name: "Panhandle Reptiles", category: "Breeder - Lizards", description: "Bearded dragons and blue tongue skinks", eventIds: ["amarillo-oct-2025", "amarillo-feb-2026"] },
  { id: "v4", name: "West Texas Tortoises", category: "Breeder - Tortoises", description: "Sulcata and Russian tortoises", eventIds: ["amarillo-oct-2025", "coleman-jan-2026"] },
  { id: "v5", name: "Critter Supplies Co", category: "Supplies", description: "Enclosures, lighting, and accessories", eventIds: ["nrh-oct-2025", "amarillo-oct-2025", "arlington-dec-2025", "coleman-jan-2026", "amarillo-feb-2026", "arlington-mar-2026", "nrh-may-2026"] },
  { id: "v6", name: "Texas Feeders Direct", category: "Feeders", description: "Crickets, roaches, and rodents", eventIds: ["nrh-oct-2025", "amarillo-oct-2025", "arlington-dec-2025", "coleman-jan-2026", "amarillo-feb-2026", "arlington-mar-2026", "nrh-may-2026"] },
  { id: "v7", name: "Reptile Art Studio", category: "Art & Merchandise", description: "Custom reptile art and apparel", eventIds: ["arlington-dec-2025", "arlington-mar-2026"] },
  { id: "v8", name: "DFW Boas", category: "Breeder - Snakes", description: "Boa constrictor morphs", eventIds: ["arlington-dec-2025", "nrh-may-2026"] },
  { id: "v9", name: "Amarillo Arachnids", category: "Breeder - Invertebrates", description: "Tarantulas and scorpions", eventIds: ["amarillo-oct-2025", "amarillo-feb-2026"] },
  { id: "v10", name: "Herp Education TX", category: "Education", description: "Educational programs and handling demos", eventIds: ["nrh-oct-2025", "amarillo-oct-2025", "arlington-dec-2025", "coleman-jan-2026", "amarillo-feb-2026", "arlington-mar-2026", "nrh-may-2026"] },
  { id: "v11", name: "Coastal Colubrids", category: "Breeder - Snakes", description: "Corn snakes and king snakes", eventIds: ["nrh-oct-2025", "coleman-jan-2026"] },
  { id: "v12", name: "Crested Kingdom", category: "Breeder - Geckos", description: "Crested geckos and gargoyle geckos", eventIds: ["arlington-dec-2025", "arlington-mar-2026", "nrh-may-2026"] },
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
