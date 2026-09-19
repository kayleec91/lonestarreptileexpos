import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/data";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  featured?: boolean;
  showVendorRegistration?: boolean;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const eventPage = `/events/${encodeURIComponent(event.id)}`;

  return (
    <div
      className={cn(
        "group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1",
        featured && "lg:col-span-2 lg:grid lg:grid-cols-2"
      )}
    >
      <div
        className={cn(
          "relative h-48 bg-hero flex items-center justify-center",
          featured && "lg:h-full lg:min-h-[280px]"
        )}
      >
        <div className="text-center text-primary-foreground px-4">
          <h3 className={cn("font-bold mb-1", featured ? "text-3xl" : "text-2xl")}>{event.city}</h3>
          <p className="text-primary-foreground/80">Reptile Expo</p>
        </div>
        {featured && (
          <div className="absolute top-4 left-4 bg-terracotta text-cream px-3 py-1 rounded-full text-sm font-semibold">
            Featured Event
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className={cn("font-bold text-foreground mb-4", featured ? "text-2xl" : "text-xl")}>{event.name}</h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
            <span>{event.dates}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <Button variant="ticket" className="w-full" asChild>
            <Link to={`${eventPage}#tickets`}>
              <Ticket className="w-4 h-4" />
              Buy Tickets
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to={eventPage}>
              <Info className="w-4 h-4" />
              Event Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
