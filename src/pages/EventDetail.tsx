import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, DollarSign, Ticket, ChevronLeft, Search } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VendorCard } from "@/components/VendorCard";
import { getEventById, getVendorsByEvent } from "@/lib/data";

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = getEventById(eventId || "");
  const vendors = getVendorsByEvent(eventId || "");
  const [searchQuery, setSearchQuery] = useState("");

  if (!event) {
    return (
      <Layout>
        <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
            <Button asChild>
              <Link to="/events">Back to Events</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero">
        <div className="container mx-auto px-4">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Events
          </Link>
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
              {event.name}
            </h1>
            <p className="text-xl text-primary-foreground/80">{event.dates}</p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Dates</h3>
                  </div>
                  <p className="text-muted-foreground">{event.dates}</p>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Hours</h3>
                  </div>
                  <p className="text-muted-foreground">{event.hours}</p>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Venue</h3>
                  </div>
                  <p className="text-muted-foreground">{event.venue}</p>
                  <p className="text-sm text-muted-foreground mt-1">{event.address}</p>
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
                    <p>Children (5-12): ${event.admission.child}</p>
                    <p>Under 5: {event.admission.under5}</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-card rounded-xl overflow-hidden shadow-card">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground p-8">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm">{event.address}</p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-2 inline-block"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {event.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="bg-card rounded-xl px-6 shadow-card border-none"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar - Tickets */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-card mb-6">
                  <h3 className="text-xl font-bold mb-4">Get Your Tickets</h3>
                  <div className="space-y-2 mb-6 text-primary-foreground/90">
                    <p>Adults: ${event.admission.adult}</p>
                    <p>Children (5-12): ${event.admission.child}</p>
                    <p>Under 5: {event.admission.under5}</p>
                  </div>
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={event.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Ticket className="w-5 h-5" />
                      Buy Tickets Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor List */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Vendors at This Event
            </h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredVendors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery
                ? "No vendors found matching your search."
                : "Vendor list coming soon!"}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
