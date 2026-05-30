import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Store, CheckCircle, Send, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Event } from "@/lib/data";
import { loadEvents, submitVendorApplication, VendorApplication } from "@/lib/googleSheets";

const tablePricingByLocation: Record<string, Array<{ label: string; value: string }>> = {
  arlington: [
    { label: "1 8ft table - $125", value: "Arlington - 1 8ft table - $125" },
    { label: "2 8ft tables - $225", value: "Arlington - 2 8ft tables - $225" },
    { label: "3 8ft tables - $275", value: "Arlington - 3 8ft tables - $275" },
    { label: "4 8ft tables - $325", value: "Arlington - 4 8ft tables - $325" },
    { label: "5 8ft tables - $375", value: "Arlington - 5 8ft tables - $375" },
    { label: "6 8ft tables - $425", value: "Arlington - 6 8ft tables - $425" },
    { label: "7 8ft tables - $475", value: "Arlington - 7 8ft tables - $475" },
    { label: "8 8ft tables - $525", value: "Arlington - 8 8ft tables - $525" },
  ],
  amarillo: [
    { label: "1 8ft table - $125", value: "Amarillo - 1 8ft table - $125" },
    { label: "2 8ft tables - $225", value: "Amarillo - 2 8ft tables - $225" },
    { label: "3 8ft tables - $275", value: "Amarillo - 3 8ft tables - $275" },
    { label: "4 8ft tables - $325", value: "Amarillo - 4 8ft tables - $325" },
    { label: "5 8ft tables - $375", value: "Amarillo - 5 8ft tables - $375" },
    { label: "6 8ft tables - $425", value: "Amarillo - 6 8ft tables - $425" },
    { label: "7 8ft tables - $475", value: "Amarillo - 7 8ft tables - $475" },
    { label: "8 8ft tables - $525", value: "Amarillo - 8 8ft tables - $525" },
  ],
  schertz: [
    { label: "1 6ft table - $115", value: "Schertz - 1 6ft table - $115" },
    { label: "2 6ft tables - $215", value: "Schertz - 2 6ft tables - $215" },
    { label: "3 6ft tables - $265", value: "Schertz - 3 6ft tables - $265" },
    { label: "4 6ft tables - $315", value: "Schertz - 4 6ft tables - $315" },
    { label: "5 6ft tables - $365", value: "Schertz - 5 6ft tables - $365" },
    { label: "6 6ft tables - $415", value: "Schertz - 6 6ft tables - $415" },
    { label: "7 6ft tables - $465", value: "Schertz - 7 6ft tables - $465" },
    { label: "8 6ft tables - $515", value: "Schertz - 8 6ft tables - $515" },
  ],
  "north richland hills": [
    { label: "1 8ft table - $150", value: "North Richland Hills - 1 8ft table - $150" },
    { label: "2 8ft tables - $250", value: "North Richland Hills - 2 8ft tables - $250" },
    { label: "3 8ft tables - $325", value: "North Richland Hills - 3 8ft tables - $325" },
    { label: "4 8ft tables - $375", value: "North Richland Hills - 4 8ft tables - $375" },
    { label: "5 8ft tables - $425", value: "North Richland Hills - 5 8ft tables - $425" },
    { label: "6 8ft tables - $475", value: "North Richland Hills - 6 8ft tables - $475" },
    { label: "7 8ft tables - $525", value: "North Richland Hills - 7 8ft tables - $525" },
    { label: "8 8ft tables - $575", value: "North Richland Hills - 8 8ft tables - $575" },
  ],
};

const defaultTableOptions = [
  { label: "Contact us for booth pricing", value: "Contact us for booth pricing" },
];

const initialForm: VendorApplication = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  selectedEvent: "",
  selectedEventName: "",
  selectedEventDates: "",
  selectedEventVenue: "",
  tableType: "",
  category: "",
  animalsProducts: "",
  website: "",
  message: "",
};

function getPricingKey(event?: Event) {
  const city = event?.city?.toLowerCase() || "";
  const venue = event?.venue?.toLowerCase() || "";

  if (city.includes("arlington")) return "arlington";
  if (city.includes("amarillo")) return "amarillo";
  if (city.includes("north richland") || city.includes("nrh")) return "north richland hills";
  if (city.includes("schertz") || venue.includes("schertz") || city.includes("san antonio")) return "schertz";

  return "";
}

export default function VendorRegistration() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<VendorApplication>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedEventFromUrl = searchParams.get("event") || "";

  useEffect(() => {
    loadEvents().then((loadedEvents) => {
      setEvents(loadedEvents);
      const eventFromUrl = loadedEvents.find((event) => event.id === selectedEventFromUrl);
      if (eventFromUrl) {
        setForm((current) => ({
          ...current,
          selectedEvent: selectedEventFromUrl,
          selectedEventName: eventFromUrl.name,
          selectedEventDates: eventFromUrl.dates,
          selectedEventVenue: eventFromUrl.venue,
        }));
      }
    });
  }, [selectedEventFromUrl]);

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === form.selectedEvent),
    [events, form.selectedEvent]
  );

  const tableOptions = useMemo(() => {
    const key = getPricingKey(selectedEvent);
    return key ? tablePricingByLocation[key] || defaultTableOptions : [];
  }, [selectedEvent]);

  function updateField(field: keyof VendorApplication, value: string) {
    if (field === "selectedEvent") {
      const event = events.find((item) => item.id === value);
      setForm((current) => ({
        ...current,
        selectedEvent: value,
        selectedEventName: event?.name || "",
        selectedEventDates: event?.dates || "",
        selectedEventVenue: event?.venue || "",
        tableType: "",
      }));
      return;
    }

    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.businessName || !form.contactName || !form.email || !form.phone || !form.selectedEvent || !form.tableType || !form.category || !form.animalsProducts) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitVendorApplication(form);
      setSubmitted(true);
      toast({
        title: "Application submitted",
        description: "Your vendor application was sent successfully.",
      });
      setForm(initialForm);
    } catch (error) {
      toast({
        title: "Google Sheets is not connected yet",
        description: error instanceof Error ? error.message : "Add your Apps Script URL to the site environment settings.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">Become a Vendor</h1>
            <p className="text-xl text-primary-foreground/80 font-serif">
              Apply for a booth at an upcoming Lone Star Reptile Expo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl p-6 sm:p-8 shadow-card">
            <div className="mb-8">
              <Store className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-2">Vendor Application</h2>
              <p className="text-muted-foreground">
                Select the exact expo date you want so we know which show your booth request is for.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 text-green-800">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="font-semibold">Application received.</p>
                    <p className="text-sm">Our team will review it and follow up with the next steps.</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Business Name" required>
                  <Input value={form.businessName} onChange={(e) => updateField("businessName", e.target.value)} placeholder="Business or vendor name" />
                </Field>
                <Field label="Contact Name" required>
                  <Input value={form.contactName} onChange={(e) => updateField("contactName", e.target.value)} placeholder="Main contact" />
                </Field>
                <Field label="Email" required>
                  <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="name@email.com" />
                </Field>
                <Field label="Phone" required>
                  <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Phone number" />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Expo Date & Location" required>
                  <select value={form.selectedEvent} onChange={(e) => updateField("selectedEvent", e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Select a show</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>{event.city} · {event.dates} · {event.venue}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Table Type" required>
                  <select value={form.tableType} onChange={(e) => updateField("tableType", e.target.value)} disabled={!selectedEvent} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">{selectedEvent ? "Select table type" : "Select an expo first"}</option>
                    {tableOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {selectedEvent && (
                <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                  Applying for <span className="font-semibold text-foreground">{selectedEvent.name}</span> on {selectedEvent.dates} at {selectedEvent.venue}.
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Vendor Category" required>
                  <select value={form.category} onChange={(e) => updateField("category", e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Select category</option>
                    <option>Breeder - Snakes</option>
                    <option>Breeder - Lizards</option>
                    <option>Breeder - Geckos</option>
                    <option>Breeder - Tortoises</option>
                    <option>Breeder - Invertebrates</option>
                    <option>Supplies</option>
                    <option>Feeders</option>
                    <option>Art & Merchandise</option>
                    <option>Education</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Website or Social Link">
                  <Input value={form.website} onChange={(e) => updateField("website", e.target.value)} placeholder="Website, Facebook, Instagram, etc." />
                </Field>
              </div>

              <Field label="What animals or products do you sell?" required>
                <Textarea value={form.animalsProducts} onChange={(e) => updateField("animalsProducts", e.target.value)} placeholder="Tell us what you plan to sell or display." className="min-h-28" />
              </Field>

              <Field label="Anything else we should know?">
                <Textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} placeholder="Special requests, electrical needs, corner preference, additional tables, etc." className="min-h-24" />
              </Field>

              <Button type="submit" size="xl" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {isSubmitting ? "Submitting..." : "Submit Vendor Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, required = false, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      {children}
    </div>
  );
}
