import { Link } from "react-router-dom";
import { Store, CheckCircle, FileText, Mail, ArrowRight, DollarSign, Package, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const tableOptions = [
  { size: "6ft Table", price: "$150", description: "Standard single table setup" },
  { size: "8ft Table", price: "$200", description: "Extra room for larger displays" },
  { size: "Double (2x 6ft)", price: "$275", description: "Side-by-side tables for bigger inventory" },
  { size: "Premium Corner", price: "$350", description: "High-traffic corner location with extra visibility" },
];

const requirements = [
  "Valid business license or breeder permit (where applicable)",
  "Proof of liability insurance",
  "All animals must be legally owned and ethically sourced",
  "Display setups must meet our safety standards",
  "No venomous animals without prior approval",
  "All pricing must be clearly displayed",
];

export default function VendorRegistration() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Become a Vendor
            </h1>
            <p className="text-xl text-primary-foreground/80 font-serif">
              Join Texas' premier reptile expos and connect with thousands of enthusiasts. 
              Reserve your table today!
            </p>
          </div>
        </div>
      </section>

      {/* Why Vendor Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Users,
                title: "Reach Thousands",
                description: "Each expo attracts 5,000+ visitors looking to buy reptiles and supplies.",
              },
              {
                icon: DollarSign,
                title: "Competitive Rates",
                description: "Affordable table rates with flexible sizing options for any vendor.",
              },
              {
                icon: Package,
                title: "Full Support",
                description: "We provide marketing, logistics, and on-site support for all vendors.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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

      {/* Table Options */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            Table Options & Pricing
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the table size that fits your needs. All tables include access to electricity (limited outlets).
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {tableOptions.map((option, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card text-center animate-fade-up hover:shadow-hover transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-bold text-foreground mb-2">{option.size}</h3>
                <div className="text-3xl font-bold text-primary mb-3">{option.price}</div>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">
              Vendor Requirements
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              Please review these requirements before registering. Our team will verify all applications.
            </p>

            <div className="bg-card rounded-2xl p-8 shadow-card">
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Store className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Reserve Your Table?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Click below to fill out our vendor registration form. We'll review your application and get back to you within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
            <p className="mt-8 text-primary-foreground/70">
              Questions? Email us at{" "}
              <a
                href="mailto:vendors@lonestarreptileexpos.com"
                className="underline hover:text-primary-foreground"
              >
                vendors@lonestarreptileexpos.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
