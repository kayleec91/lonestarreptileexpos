import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ExternalLink, MapPin, Ticket } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Event } from "@/lib/data";
import { loadEvents } from "@/lib/googleSheets";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("all");

  useEffect(() => {
    loadEvents()
      .then(setEvents)
      .finally(() => setIsLoading(false));
  }, []);

  const locations = useMemo(
    () => Array.from(new Set(events.map((event) => event.city))).sort((a, b) => a.localeCompare(b)),
    [events]
  );

  const filteredEvents = useMemo(
    () =>
      selectedLocation === "all"
        ? events
        : events.filter((event) => event.city === selectedLocation),
    [events, selectedLocation]
  );

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Upcoming Events
            </h1>
            <p className="text-xl text-primary-foreground/80 font-serif">
              Find a reptile expo near you. Browse our upcoming shows across Texas and get your tickets today.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {!isLoading && events.length > 0 && (
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
              <div>
                <label htmlFor="location-filter" className="block text-sm font-bold text-foreground">
                  Filter by location
                </label>
                <p className="text-sm text-muted-foreground">
                  {filteredEvents.length} upcoming {filteredEvents.length === 1 ? "event" : "events"}
                </p>
              </div>
              <select
                id="location-filter"
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
                className="min-h-11 w-full rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-72"
              >
                <option value="all">All locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-16 text-muted-foreground">Loading events...</div>
          ) : filteredEvents.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="hidden lg:grid grid-cols-[1.1fr_1.25fr_1.2fr_auto] items-center gap-6 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground/75">
                <span>Date</span>
                <span>Event</span>
                <span>Location</span>
                <span className="min-w-[225px]">Links</span>
              </div>
              {filteredEvents.map((event, index) => (
                <div
                  key={`${event.id}-${event.startDate}`}
                  className="animate-fade-up grid gap-4 border-t border-border px-5 py-5 first:border-t-0 lg:grid-cols-[1.1fr_1.25fr_1.2fr_auto] lg:items-center lg:gap-6 lg:px-6 lg:py-4"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex items-start gap-2.5 text-sm font-semibold text-primary">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{event.dates}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-base text-foreground">{event.name}</strong>
                    {event.featured && (
                      <span className="rounded-full bg-terracotta px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <strong className="block font-semibold text-foreground">{event.city}, {event.state}</strong>
                      <span className="block">{event.venue}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:min-w-[225px] lg:justify-end">
                    <Link
                      to={`/events/${encodeURIComponent(event.id)}`}
                      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-primary px-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Event Page
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    {event.ticketLink && (
                      <Link
                        to={`/events/${encodeURIComponent(event.id)}#tickets`}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-terracotta px-3.5 text-sm font-semibold text-cream transition-opacity hover:opacity-90"
                      >
                        Tickets
                        <Ticket className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-10 text-center shadow-card">
              <Calendar className="w-14 h-14 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {events.length > 0 ? "No events at this location" : "No upcoming events listed yet"}
              </h2>
              <p className="text-muted-foreground">
                {events.length > 0
                  ? "Choose All locations or select another location."
                  : "New show dates will appear here once they are added to the website sheet."}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

