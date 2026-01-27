import { useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { VendorCard } from "@/components/VendorCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vendors, events, vendorCategories } from "@/lib/data";

export default function Vendors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEvent =
      selectedEvent === "all" || vendor.eventIds.includes(selectedEvent);
    
    const matchesCategory =
      selectedCategory === "all" || vendor.category === selectedCategory;

    return matchesSearch && matchesEvent && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Our Vendors
            </h1>
            <p className="text-xl text-primary-foreground/80 font-serif">
              Browse our trusted vendors offering quality reptiles, supplies, feeders, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-full sm:w-52 bg-background">
                <SelectValue placeholder="Filter by event" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="all">All Events</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.city} - {event.dates.split(",")[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-52 bg-background">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="all">All Categories</SelectItem>
                {vendorCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Vendor List */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground mb-6">
            Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 && "s"}
          </p>

          {filteredVendors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVendors.map((vendor, index) => (
                <div
                  key={vendor.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <VendorCard vendor={vendor} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No vendors found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
