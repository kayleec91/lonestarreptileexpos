import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-bold text-lg">LS</span>
              </div>
              <span className="font-bold text-xl">Lone Star Reptile Expos</span>
            </div>
            <p className="text-primary-foreground/80 max-w-xs">
              Texas' premier reptile and exotic animal expos. Connecting enthusiasts, breeders, and families since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/events" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Upcoming Events
              </Link>
              <Link to="/vendors" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Vendor List
              </Link>
              <Link to="/vendor-registration" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Become a Vendor
              </Link>
              <Link to="/about" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
            <a
              href="mailto:info@lonestarreptileexpos.com"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-4"
            >
              <Mail className="w-5 h-5" />
              info@lonestarreptileexpos.com
            </a>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>© {currentYear} Lone Star Reptile Expos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
