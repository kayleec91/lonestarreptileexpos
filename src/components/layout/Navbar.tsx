import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Vendors", path: "/vendors" },
  { name: "Become a Vendor", path: "/vendor-registration" },
  { name: "About", path: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-brand-black/90 backdrop-blur-sm py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Lone Star Reptile Expos" 
              className="h-12 w-12 object-contain rounded-lg"
            />
            <span className={cn(
              "font-display text-xl tracking-wider transition-colors hidden sm:block",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              LONE STAR REPTILE EXPOS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-colors relative py-1",
                  isScrolled 
                    ? "text-foreground hover:text-primary" 
                    : "text-white/90 hover:text-white",
                  location.pathname === link.path && "font-semibold",
                  location.pathname === link.path && !isScrolled && "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-red",
                  location.pathname === link.path && isScrolled && "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="ticket" size="default" asChild>
              <Link to="/events" className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                Buy Tickets
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 mt-4" : "max-h-0"
          )}
        >
          <div className="bg-card rounded-xl p-4 shadow-card space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block px-4 py-3 rounded-lg font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="ticket" className="w-full mt-2" asChild>
              <Link to="/events" className="flex items-center justify-center gap-2">
                <Ticket className="w-4 h-4" />
                Buy Tickets
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
