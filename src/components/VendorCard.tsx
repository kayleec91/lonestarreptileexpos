import { ExternalLink } from "lucide-react";
import { Vendor } from "@/lib/data";

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-foreground text-lg">{vendor.name}</h3>
      </div>
      {vendor.description && <p className="text-muted-foreground text-sm mb-4">{vendor.description}</p>}
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

