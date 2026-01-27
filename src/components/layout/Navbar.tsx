import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              isScrolled ? "bg-primary" : "bg-primary/90"
            )}>
              <span className="text-primary-foreground font-bold text-lg">LS</span>
            </div>
            <span className={cn(
              "font-bold text-xl transition-colors hidden sm:block",
              isScrolled ? "text-foreground" : "text-primary-foreground"
            )}>
              Lone Star Reptile Expos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-colors relative",
                  isScrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground",
                  location.pathname === link.path && "font-semibold",
                  location.pathname === link.path && !isScrolled && "after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary-foreground",
                  location.pathname === link.path && isScrolled && "text-primary after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary"
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
              isScrolled ? "text-foreground hover:bg-muted" : "text-primary-foreground hover:bg-primary-foreground/10"
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
