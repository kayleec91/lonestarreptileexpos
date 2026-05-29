import { ExternalLink } from "lucide-react";
import { Vendor } from "@/lib/data";

interface VendorCardProps {
  vendor: Vendor;
}

const categoryColors: Record<string, string> = {
  "Breeder - Snakes": "bg-green-100 text-green-800",
  "Breeder - Lizards": "bg-emerald-100 text-emerald-800",
  "Breeder - Geckos": "bg-lime-100 text-lime-800",
  "Breeder - Tortoises": "bg-amber-100 text-amber-800",
  "Breeder - Invertebrates": "bg-purple-100 text-purple-800",
  Supplies: "bg-blue-100 text-blue-800",
  Feeders: "bg-orange-100 text-orange-800",
  "Art & Merchandise": "bg-pink-100 text-pink-800",
  Education: "bg-cyan-100 text-cyan-800",
  Other: "bg-muted text-muted-foreground",
};

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-foreground text-lg">{vendor.name}</h3>
      </div>
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${categoryColors[vendor.category] || "bg-muted text-muted-foreground"}`}>
        {vendor.category}
      </span>
      <p className="text-muted-foreground text-sm mb-4">{vendor.description}</p>
      {(vendor.website || vendor.instagram) && (
        <div className="flex flex-wrap gap-3 text-sm">
          {vendor.website && (
            <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
              Website <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {vendor.instagram && (
            <a href={vendor.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
              Instagram <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
