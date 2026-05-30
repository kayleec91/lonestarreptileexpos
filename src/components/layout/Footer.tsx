import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="Lone Star Reptile Expos" 
                className="h-16 w-16 object-contain rounded-lg"
              />
            </div>
            <p className="text-white/80 max-w-xs">
              Texas' premier reptile and exotic animal expos. Connecting enthusiasts, breeders, and families.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4 text-brand-red">QUICK LINKS</h4>
            <nav className="space-y-2">
              <Link to="/events" className="block text-white/80 hover:text-white transition-colors">
                Upcoming Events
              </Link>
              <Link to="/vendors" className="block text-white/80 hover:text-white transition-colors">
                Vendor List
              </Link>
              <Link to="/vendor-registration" className="block text-white/80 hover:text-white transition-colors">
                Become a Vendor
              </Link>
              <Link to="/about" className="block text-white/80 hover:text-white transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4 text-brand-blue">CONNECT WITH US</h4>
            <a
              href="mailto:info@lonestarreptileexpos.com"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
            >
              <Mail className="w-5 h-5" />
              info@lonestarreptileexpos.com
            </a>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/LSRExpos/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/lonestarreptileexpos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>© {currentYear} Lone Star Reptile Expos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
