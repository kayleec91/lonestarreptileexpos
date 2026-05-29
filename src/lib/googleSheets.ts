import { events as fallbackEvents, vendors as fallbackVendors, Event, Vendor, VendorCategory, isUpcomingEvent } from "@/lib/data";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL?.trim() || "";

export interface VendorApplication {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  selectedEvent: string;
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
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeEvent(row: Record<string, unknown>): Event {
  const id = asString(row.id) || asString(row.eventId) || asString(row.slug);
  const name = asString(row.name) || asString(row.showName) || `${asString(row.city)} Reptile Expo`;
  const startDate = asString(row.startDate);
  const endDate = asString(row.endDate) || startDate;

  return {
    id,
    name,
    city: asString(row.city),
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
      under5: asString(row.under5Admission ?? row.under5) || "Free",
    },
    ticketLink: asString(row.ticketLink),
    vendorListLink: asString(row.vendorListLink),
    registerLink: asString(row.registerLink) || `/vendor-registration?event=${id}`,
    mapEmbed: asString(row.mapEmbed),
    status: asString(row.status).toLowerCase() === "inactive" ? "inactive" : "active",
    featured: ["yes", "true", "1"].includes(asString(row.featured).toLowerCase()),
    faqs: fallbackEvents[0]?.faqs || [],
  };
}

function normalizeVendor(row: Record<string, unknown>): Vendor {
  return {
    id: asString(row.id) || asString(row.vendorId) || crypto.randomUUID(),
    name: asString(row.name) || asString(row.businessName),
    category: (asString(row.category) || "Other") as VendorCategory,
    description: asString(row.description) || asString(row.animalsProducts) || "Vendor details coming soon.",
    eventIds: asString(row.eventIds)
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
    website: asString(row.website),
    instagram: asString(row.instagram),
  };
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
      .filter((event) => event.id && event.name && event.startDate && event.endDate)
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

function formatDisplayDate(startDate: string, endDate: string) {
  if (!startDate) return "";

  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate || startDate}T12:00:00`);

  const startMonth = start.toLocaleString("en-US", { month: "long" });
  const endMonth = end.toLocaleString("en-US", { month: "long" });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();

  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay}–${endDay}, ${year}`;
  }

  return `${startMonth} ${startDay}–${endMonth} ${endDay}, ${year}`;
}
