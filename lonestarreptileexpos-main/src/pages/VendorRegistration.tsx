import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Store, CheckCircle, DollarSign, Package, Users, Send, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Event } from "@/lib/data";
import { loadEvents, submitVendorApplication, VendorApplication } from "@/lib/googleSheets";

const tableOptions = [
  { size: "6ft Table", price: "$150", description: "Standard single table setup" },
  { size: "8ft Table", price: "$200", description: "Extra room for larger displays" },
  { size: "Double (2x 6ft)", price: "$275", description: "Side-by-side tables for bigger inventory" },
  { size: "Premium Corner", price: "$350", description: "High-traffic corner location with extra visibility" },
];

const requirements = [
  "Valid business license or breeder permit, where applicable",
  "Animals must be legally owned, healthy, and ethically sourced",
  "Display setups must meet show safety standards",
  "No venomous animals without prior written approval",
  "Pricing must be clearly displayed",
  "Applications are reviewed before approval",
];

const initialForm: VendorApplication = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  selectedEvent: "",
  tableType: "",
  category: "",
  animalsProducts: "",
  website: "",
  message: "",
};

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
      const eventExists = loadedEvents.some((event) => event.id === selectedEventFromUrl);
      if (eventExists) {
        setForm((current) => ({ ...current, selectedEvent: selectedEventFromUrl }));
      }
    });
  }, [selectedEventFromUrl]);

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === form.selectedEvent),
    [events, form.selectedEvent]
  );

  function updateField(field: keyof VendorApplication, value: string) {
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
              Apply for a booth at an upcoming Lone Star Reptile Expo. Submissions go into the website Google Sheet once connected.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Users, title: "Reach Thousands", description: "Connect with reptile lovers, breeders, families, and serious buyers." },
              { icon: DollarSign, title: "Easy Application", description: "Vendors choose the show, table type, and product category in one clean form." },
              { icon: Package, title: "Organized Tracking", description: "Applications can land directly in Google Sheets for easy review." },
            ].map((item, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-card text-center animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">Table Options & Pricing</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the table size that fits your needs. Pricing can be updated later in the site or sheet.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {tableOptions.map((option, index) => (
              <div key={option.size} className="bg-card rounded-2xl p-6 shadow-card text-center animate-fade-up hover:shadow-hover transition-all" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-lg font-bold text-foreground mb-2">{option.size}</h3>
                <div className="text-3xl font-bold text-primary mb-3">{option.price}</div>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-card rounded-2xl p-6 sm:p-8 shadow-card">
              <div className="mb-8">
                <Store className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-2">Vendor Application</h2>
                <p className="text-muted-foreground">
                  Fill this out once. Your submission will go to the Vendor Submissions tab after Google Sheets is connected.
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
                  <Field label="Expo Location" required>
                    <select value={form.selectedEvent} onChange={(e) => updateField("selectedEvent", e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">Select a show</option>
                      {events.map((event) => (
                        <option key={event.id} value={event.id}>{event.city} · {event.dates}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Table Type" required>
                    <select value={form.tableType} onChange={(e) => updateField("tableType", e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">Select table type</option>
                      {tableOptions.map((option) => (
                        <option key={option.size} value={option.size}>{option.size} · {option.price}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {selectedEvent && (
                  <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                    Applying for <span className="font-semibold text-foreground">{selectedEvent.name}</span> at {selectedEvent.venue}, {selectedEvent.dates}.
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
                  <Textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} placeholder="Special requests, electrical needs, corner preference, etc." className="min-h-24" />
                </Field>

                <Button type="submit" size="xl" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {isSubmitting ? "Submitting..." : "Submit Vendor Application"}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="text-xl font-bold text-foreground mb-4">Vendor Requirements</h3>
                <ul className="space-y-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-card">
                <h3 className="text-xl font-bold mb-2">Questions?</h3>
                <p className="text-primary-foreground/80 mb-4">Email us and we’ll help with booth questions.</p>
                <a href="mailto:vendors@lonestarreptileexpos.com" className="underline hover:text-primary-foreground">vendors@lonestarreptileexpos.com</a>
              </div>
            </div>
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
