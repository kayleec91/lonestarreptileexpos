import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/data";

export default function Events() {
  const events = getUpcomingEvents();

  return (
    <Layout>
      {/* Hero */}
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

      {/* Events List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No upcoming events at this time. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
