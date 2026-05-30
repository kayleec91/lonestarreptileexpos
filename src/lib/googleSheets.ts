import { events as fallbackEvents, vendors as fallbackVendors, Event, Vendor, VendorCategory, isUpcomingEvent, getDefaultFaqs } from "@/lib/data";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL?.trim() || "";

export interface VendorApplication {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  selectedEvent: string;
  selectedEventName?: string;
  selectedEventDates?: string;
  selectedEventVenue?: string;
  tableType: string;
  category: string;
  animalsProducts: string;
  website: string;
  message: string;
}

function asString(value: unknown) {
  return value === undefined || value === null ? "" : String(value).trim();
}

function asNumber(value: unknown, fallback: number) {
  const raw = asString(value).replace(/[^0-9.]/g, "");
  const parsed = Number(raw);
  return Number.isFinite(parsed) && raw !== "" ? parsed : fallback;
}

function normalizeEvent(row: Record<string, unknown>): Event {
  const city = asString(row.city) || asString(row.id) || asString(row.showName);
  const startDate = asString(row.startDate);
  const endDate = asString(row.endDate) || startDate;
  const id = asString(row.id) || asString(row.eventId) || createEventId(city, startDate);
  const name = asString(row.name) || asString(row.showName) || `${city} Reptile Expo`;

  return {
    id,
    name,
    city,
    state: asString(row.state) || "TX",
    dates: asString(row.dates) || formatDisplayDate(startDate, endDate),
    startDate,
    endDate,
    venue: asString(row.venue),
    address: asString(row.address),
    hours: asString(row.hours) || "Sat 10am–5pm · Sun 10am–4pm",
    admission: {
      adult: asNumber(row.adultAdmission ?? row.adult, 10),
      child: asNumber(row.childAdmission ?? row.child, 5),
      under5: asString(row.kids6UnderAdmission ?? row.under5Admission ?? row.under5) || "Free",
    },
    ticketLink: asString(row.ticketLink),
    vendorListLink: asString(row.vendorListLink),
    registerLink: asString(row.registerLink) || `/vendor-registration?event=${encodeURIComponent(id)}`,
    mapEmbed: asString(row.mapEmbed),
    status: asString(row.status).toLowerCase() === "inactive" ? "inactive" : "active",
    featured: ["yes", "true", "1", "featured"].includes(asString(row.featured).toLowerCase()),
    faqs: getDefaultFaqs(`${city} ${asString(row.venue)}`),
  };
}

function normalizeVendor(row: Record<string, unknown>): Vendor {
  const eventIds = asString(row.eventIds || row.eventId || row.event)
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return {
    id: asString(row.id) || asString(row.vendorId) || asString(row.name) || crypto.randomUUID(),
    name: asString(row.name) || asString(row.businessName),
    category: (asString(row.category) || "Other") as VendorCategory,
    description: asString(row.description) || asString(row.animalsProducts),
    eventIds,
    website: normalizeUrl(asString(row.website)),
    instagram: normalizeUrl(asString(row.instagram)),
  };
}

function normalizeUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

async function getJson(action: string, params: Record<string, string> = {}) {
  if (!GOOGLE_SCRIPT_URL) return null;

  const url = new URL(GOOGLE_SCRIPT_URL);
  url.searchParams.set("action", action);
  url.searchParams.set("t", String(Date.now()));
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`Google Sheets request failed: ${response.status}`);
  return response.json();
}

export async function loadEvents(): Promise<Event[]> {
  try {
    const data = await getJson("events");
    const rawEvents = Array.isArray(data) ? data : data?.events;
    if (!Array.isArray(rawEvents)) return getFallbackEvents();

    const sheetEvents = rawEvents
      .map((event) => normalizeEvent(event))
      .filter((event) => event.id && event.name && event.city && event.startDate && event.endDate)
      .filter((event) => isUpcomingEvent(event))
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    return sheetEvents.length ? sheetEvents : getFallbackEvents();
  } catch (error) {
    console.warn("Using fallback events because Google Sheets failed:", error);
    return getFallbackEvents();
  }
}

export async function loadVendors(eventId?: string): Promise<Vendor[]> {
  try {
    const data = await getJson("vendors", eventId ? { eventId } : {});
    const rawVendors = Array.isArray(data) ? data : data?.vendors;
    if (!Array.isArray(rawVendors)) return getFallbackVendors(eventId);

    const sheetVendors = rawVendors.map((vendor) => normalizeVendor(vendor)).filter((vendor) => vendor.id && vendor.name);
    return eventId ? sheetVendors.filter((vendor) => vendor.eventIds.includes(eventId)) : sheetVendors;
  } catch (error) {
    console.warn("Using fallback vendors because Google Sheets failed:", error);
    return getFallbackVendors(eventId);
  }
}

export async function submitVendorApplication(application: VendorApplication) {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error("Google Sheets is not connected yet. Add VITE_GOOGLE_APPS_SCRIPT_URL to your .env file.");
  }

  const body = new URLSearchParams();
  body.set("action", "vendorApplication");
  body.set("payload", JSON.stringify(application));

  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body,
    mode: "no-cors",
  });

  return { success: true };
}

export function getFallbackEvents() {
  return fallbackEvents
    .filter((event) => isUpcomingEvent(event))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export function getFallbackVendors(eventId?: string) {
  return eventId ? fallbackVendors.filter((vendor) => vendor.eventIds.includes(eventId)) : fallbackVendors;
}

function createEventId(city: string, startDate: string) {
  const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "event";
  return startDate ? `${citySlug}-${startDate}` : citySlug;
}

function ordinal(day: number) {
  if (day >= 11 && day <= 13) return `${day}th`;
  const last = day % 10;
  if (last === 1) return `${day}st`;
  if (last === 2) return `${day}nd`;
  if (last === 3) return `${day}rd`;
  return `${day}th`;
}

export function formatDisplayDate(startDate: string, endDate: string) {
  if (!startDate) return "";

  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate || startDate}T12:00:00`);

  const startMonth = start.toLocaleString("en-US", { month: "long" });
  const endMonth = end.toLocaleString("en-US", { month: "long" });
  const startDay = ordinal(start.getDate());
  const endDay = ordinal(end.getDate());
  const year = end.getFullYear();

  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate()) {
    return `${startMonth} ${startDay}, ${year}`;
  }

  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay} & ${endDay}, ${year}`;
  }

  return `${startMonth} ${startDay} & ${endMonth} ${endDay}, ${year}`;
}
