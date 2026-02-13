import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Service", path: "/service" },
  { label: "Contact Us", path: "/contact-us" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L2 28h28L16 2z" stroke="hsl(152,72%,53%)" strokeWidth="2.5" fill="none" />
              <path d="M16 10l-6 14h12l-6-14z" fill="hsl(152,72%,53%)" opacity="0.3" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Alpha<span className="text-primary">Track</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground ml-0.5">Digital</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button asChild className="gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/book-a-call">
              Speak To An Expert <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-nav border-t border-white/10 md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 gap-1.5 rounded-lg bg-primary text-primary-foreground">
              <Link to="/book-a-call" onClick={() => setMobileOpen(false)}>
                Speak To An Expert <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
