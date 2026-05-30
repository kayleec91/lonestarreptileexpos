import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, DollarSign, Ticket, ChevronLeft, Search, Store, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VendorCard } from "@/components/VendorCard";
import { Event, Vendor } from "@/lib/data";
import { loadEvents, loadVendors } from "@/lib/googleSheets";

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!eventId) return;

    Promise.all([loadEvents(), loadVendors(eventId)])
      .then(([loadedEvents, loadedVendors]) => {
        setEvents(loadedEvents);
        setVendors(loadedVendors);
      })
      .finally(() => setIsLoading(false));
  }, [eventId]);

  const event = useMemo(() => events.find((item) => item.id === eventId), [events, eventId]);

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-16 min-h-screen flex items-center justify-center text-muted-foreground">Loading event...</div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">This event may be expired, inactive, or removed from the website sheet.</p>
            <Button asChild>
              <Link to="/events">Back to Events</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-hero">
        <div className="container mx-auto px-4">
          <Link to="/events" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" />
            Back to Events
          </Link>
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">{event.name}</h1>
            <p className="text-xl text-primary-foreground/80">{event.dates}</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoCard icon={Calendar} title="Dates" text={event.dates} />
                <InfoCard icon={Clock} title="Hours" text={event.hours} />
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Venue</h3>
                  </div>
                  <p className="text-muted-foreground">{event.venue}</p>
                  {event.address && (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 inline-block"
                    >
                      {event.address}
                    </a>
                  )}
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Admission</h3>
                  </div>
                  <div className="text-muted-foreground space-y-1">
                    <p>Adults: ${event.admission.adult}</p>
                    <p>Children (7-12): ${event.admission.child}</p>
                    <p>Kids 6 and under: {event.admission.under5}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {event.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="bg-card rounded-xl px-6 shadow-card border-none">
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-card">
                  <h3 className="text-xl font-bold mb-4">Get Your Tickets</h3>
                  <div className="space-y-2 mb-6 text-primary-foreground/90">
                    <p>Adults: ${event.admission.adult}</p>
                    <p>Children (7-12): ${event.admission.child}</p>
                    <p>Kids 6 and under: {event.admission.under5}</p>
                  </div>
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <a href={event.ticketLink || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <Ticket className="w-5 h-5" />
                      Buy Tickets Now
                    </a>
                  </Button>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card space-y-3">
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href="#vendors" className="flex items-center justify-center gap-2">
                      <ExternalLink className="w-5 h-5" />
                      View Vendor List
                    </a>
                  </Button>
                  <Button size="lg" className="w-full" asChild>
                    <Link to={`/vendor-registration?event=${encodeURIComponent(event.id)}`} className="flex items-center justify-center gap-2">
                      <Store className="w-5 h-5" />
                      Register as Vendor
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vendors" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Vendors at This Event</h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search vendors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>

          {filteredVendors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVendors.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery ? "No vendors found matching your search." : "Vendor list coming soon.  "}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: typeof Calendar; title: string; text: string }) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
