import { Link } from "react-router-dom";
import { ArrowRight, Ticket, Store, Users, Award, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/data";

const Index = () => {
  const upcomingEvents = getUpcomingEvents().slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-hero flex items-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Texas' Premier Reptile & Exotic Animal Expos
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl font-serif">
              Join thousands of reptile enthusiasts, breeders, and families at our expos across Texas. 
              Discover rare morphs, quality supplies, and connect with the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(45 20% 97%)" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "50,000+", label: "Annual Visitors" },
              { icon: Store, value: "200+", label: "Vendors" },
              { icon: Award, value: "5+", label: "Cities in Texas" },
              { icon: Heart, value: "100%", label: "Family Friendly" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mark your calendar for our next reptile expos across Texas. Early bird tickets available now!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EventCard event={event} featured={index === 0} />
              </div>
            ))}
          </div>

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

      {/* Why Attend Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Attend Our Expos?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Quality Assured",
                    description: "Every vendor is carefully vetted to ensure healthy animals and quality products.",
                  },
                  {
                    icon: Users,
                    title: "Community Focused",
                    description: "Connect with fellow enthusiasts, learn from experts, and grow your network.",
                  },
                  {
                    icon: Heart,
                    title: "Family Friendly",
                    description: "Educational and entertaining for all ages. Kids under 5 attend free!",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-hero flex items-center justify-center">
                <div className="text-center text-primary-foreground p-8">
                  <h3 className="text-4xl font-bold mb-2">200+</h3>
                  <p className="text-xl">Vendors per event</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-terracotta rounded-2xl flex items-center justify-center text-cream">
                <div className="text-center">
                  <div className="text-2xl font-bold">$15</div>
                  <div className="text-sm">Adult Entry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Join the Reptile Community?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Whether you're looking to buy tickets or become a vendor, we'd love to have you at our next expo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="ticket" size="lg" asChild>
                <Link to="/events" className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Get Tickets Now
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/vendor-registration" className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Vendor Registration
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
