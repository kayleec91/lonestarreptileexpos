import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/EventCard";
import { Event } from "@/lib/data";
import { loadEvents } from "@/lib/googleSheets";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents()
      .then(setEvents)
      .finally(() => setIsLoading(false));
  }, []);

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
          {isLoading ? (
            <div className="text-center py-16 text-muted-foreground">Loading events...</div>
          ) : events.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {events.map((event, index) => (
                <div key={event.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <EventCard event={event} featured={index === 0 || event.featured} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-10 text-center shadow-card">
              <Calendar className="w-14 h-14 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No upcoming events listed yet</h2>
              <p className="text-muted-foreground">New show dates will appear here once they are added to the website sheet.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
