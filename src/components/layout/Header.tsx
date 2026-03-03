import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Services", path: "/service" },
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact-us" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getPrefetchHandlers = (path: string) => ({
    onMouseEnter: () => prefetchRoute(path),
    onFocus: () => prefetchRoute(path),
    onTouchStart: () => prefetchRoute(path),
  });

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled ? "pt-3" : "pt-4"
      )}
    >
      <div
        className={cn(
          "container mx-auto flex h-[72px] items-center justify-between rounded-2xl border px-4 shadow-[0_10px_40px_rgba(0,0,0,0.16)] transition-all duration-300 lg:px-6",
          scrolled
            ? "border-white/12 bg-background/88 backdrop-blur-xl"
            : "border-white/10 bg-background/58 backdrop-blur-lg",
        )}
      >
        <Link to="/" aria-label="AlphaTrack Digital Home" className="flex items-center">
          <img
            src="/logo-wordmark.png"
            alt="AlphaTrack Digital"
            className="h-9 w-auto sm:h-10"
            width={800}
            height={188}
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              {...getPrefetchHandlers(link.path)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-foreground",
                isActive(link.path)
                  ? "border border-primary/25 bg-primary/[0.08] text-primary shadow-[0_0_0_1px_rgba(62,207,142,0.08)]"
                  : "border border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/[0.03]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="gap-1.5 rounded-full bg-primary px-5 text-primary-foreground shadow-[0_0_24px_rgba(62,207,142,0.18)] hover:bg-primary/90">
            <Link to="/book-a-call" {...getPrefetchHandlers("/book-a-call")}>
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 glass-nav md:hidden"
            id="mobile-nav"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  onTouchStart={() => prefetchRoute(link.path)}
                  onFocus={() => prefetchRoute(link.path)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "border-primary/20 bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:border-white/10 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 gap-1.5 rounded-xl bg-primary text-primary-foreground">
                <Link
                  to="/book-a-call"
                  onClick={() => setMobileOpen(false)}
                  onTouchStart={() => prefetchRoute("/book-a-call")}
                  onFocus={() => prefetchRoute("/book-a-call")}
                >
                  Book a Call <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
