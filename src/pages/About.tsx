import { Heart, BookOpen, Users, Shield, Star } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import chameleonPhoto from "@/assets/gallery/chameleon.webp";
import beardedDragonPhoto from "@/assets/gallery/bearded-dragon.webp";
import geckoPhoto from "@/assets/gallery/gecko.webp";

const values = [
  {
    icon: BookOpen,
    title: "Knowledge First",
    description: "We believe in promoting responsible reptile keeping through knowledge, experience, and expert guidance.",
  },
  {
    icon: Shield,
    title: "Ethical Standards",
    description: "Every vendor is vetted to ensure humane treatment and ethical breeding practices.",
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Bringing together enthusiasts, breeders, and newcomers to share knowledge and passion.",
  },
  {
    icon: Heart,
    title: "Family Friendly",
    description: "Our expos are welcoming spaces for all ages to discover the fascinating world of reptiles.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              About Us
            </h1>
            <p className="text-xl text-primary-foreground/80 font-serif">
              Serving the Texas reptile community since 2007.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Lone Star Reptile Expos is the longest-running reptile expo in North Texas, proudly serving the reptile community since 2007.
                </p>
                <p>
                  Our shows bring together families, keepers, breeders, collectors, and vendors from across Texas, surrounding states, and throughout the United States.
                </p>
                <p>
                  We are passionate about connecting people with ethical breeders, quality supplies, feeders, and the knowledge they need to care for these amazing animals. Whether you are a first-time reptile owner or a seasoned collector, there is something for everyone at Lone Star Reptile Expos.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 overflow-hidden rounded-3xl shadow-card">
                  <img
                    src={chameleonPhoto}
                    alt="Colorful chameleon at a Lone Star Reptile Expo"
                    className="w-full aspect-[16/9] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-card">
                  <img
                    src={beardedDragonPhoto}
                    alt="Bearded dragon at a Lone Star Reptile Expo"
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-card">
                  <img
                    src={geckoPhoto}
                    alt="Gecko at a Lone Star Reptile Expo"
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-black text-white rounded-2xl px-5 py-4 shadow-hover">
                <div className="flex items-center gap-3">
                  <Star className="w-7 h-7 text-brand-red" />
                  <div>
                    <p className="font-display text-2xl leading-none">Since 2007</p>
                    <p className="text-white/70 text-sm mt-1">North Texas' longest-running reptile expo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by our commitment to knowledge, ethics, and community.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground font-serif leading-relaxed mb-8">
              "To create welcoming, informative, and ethical reptile expos that inspire responsible 
              ownership, support ethical breeders, and build a thriving community of reptile 
              enthusiasts across Texas."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/events">View Our Events</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/vendor-registration">Vendor Signup</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            We'd love to hear from you. Reach out to our team anytime.
          </p>
          <a
            href="mailto:info@lonestarreptileexpos.com"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            info@lonestarreptileexpos.com
          </a>
        </div>
      </section>
    </Layout>
  );
}
