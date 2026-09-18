import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Ticket, Store, Users, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/EventCard";
import { Event } from "@/lib/data";
import { loadEvents } from "@/lib/googleSheets";
import logo from "@/assets/logo.jpeg";
import chameleonPhoto from "@/assets/gallery/chameleon.webp";
import beardedDragonPhoto from "@/assets/gallery/bearded-dragon.webp";
import geckoPhoto from "@/assets/gallery/gecko.webp";
import monitorLizardPhoto from "@/assets/gallery/monitor-lizard.webp";
import armadilloPhoto from "@/assets/gallery/armadillo.webp";

const Index = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadEvents().then((events) => {
      const nextByLocation: Event[] = [];
      const seenLocations = new Set<string>();

      for (const event of events) {
        const locationKey = (event.locationId || event.city).trim().toLowerCase();
        if (!locationKey || seenLocations.has(locationKey)) continue;

        seenLocations.add(locationKey);
        nextByLocation.push(event);

        if (nextByLocation.length === 6) break;
      }

      setUpcomingEvents(nextByLocation);
    });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-brand-black flex items-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img src={logo} alt="" className="w-[600px] h-[600px] object-contain" aria-hidden="true" />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <img src={logo} alt="Lone Star Reptile Expos" className="w-48 h-48 mx-auto mb-8 object-contain" />
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6 tracking-wide">
              NORTH TEXAS' LONGEST-RUNNING <span className="text-brand-red">REPTILE</span> & <span className="text-brand-blue">EXOTIC</span> ANIMAL EXPOS
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of reptile enthusiasts, breeders, vendors, and families at our expos across Texas.
              Explore a wide variety of reptiles, feeders, enclosures, supplies, and everything you need for responsible reptile keeping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/events" className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Buy Tickets
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/vendor-registration" className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Become a Vendor
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "10,000+", label: "Annual Visitors" },
              { icon: Store, value: "100+", label: "Vendors" },
              { icon: Award, value: "6", label: "Texas Expo Locations" },
              { icon: Heart, value: "100%", label: "Family Friendly" },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="font-display text-4xl text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expo Gallery Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-4 tracking-wide">
              SEE WHAT'S AT THE <span className="text-primary">EXPO</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From colorful reptiles and unique species to feeders, enclosures, and supplies, every show has something new to discover.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {[
              { src: chameleonPhoto, alt: "Colorful chameleon at a Lone Star Reptile Expo" },
              { src: beardedDragonPhoto, alt: "Bearded dragon at a Lone Star Reptile Expo" },
              { src: geckoPhoto, alt: "Gecko displayed at a Lone Star Reptile Expo" },
              { src: monitorLizardPhoto, alt: "Lizard in an enclosure at a Lone Star Reptile Expo" },
              { src: armadilloPhoto, alt: "Unique animal encounter at a Lone Star Reptile Expo" },
            ].map((photo, index) => (
              <div
                key={photo.alt}
                className={`overflow-hidden rounded-2xl shadow-card ${index === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-4 tracking-wide">
              UPCOMING <span className="text-primary">EVENTS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mark your calendar for our next reptile expos across Texas. Get your tickets now!
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {upcomingEvents.map((event, index) => (
                <div key={event.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <EventCard event={event} featured={false} showVendorRegistration={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-8 text-center shadow-card mb-10">
              <p className="text-muted-foreground">Upcoming shows are being updated. Check back soon.</p>
            </div>
          )}

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/events" className="flex items-center gap-2">
                View All Events
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl lg:text-5xl mb-4 tracking-wide">
              READY TO JOIN THE <span className="text-brand-red">REPTILE</span> COMMUNITY?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Whether you're looking to buy tickets or become a vendor, we'd love to have you at our next expo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/events" className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Get Tickets Now
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/vendor-registration" className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Vendor Signup
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
