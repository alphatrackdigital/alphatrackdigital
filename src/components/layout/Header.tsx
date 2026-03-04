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
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-background/76 shadow-[0_10px_28px_rgba(0,0,0,0.16)] backdrop-blur-xl"
            : "bg-[linear-gradient(180deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.10)_48%,rgba(0,0,0,0)_100%)]",
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div
            className={cn(
              "grid h-[70px] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]",
              scrolled && "border-b border-white/[0.08]",
            )}
          >
            <Link to="/" aria-label="AlphaTrack Digital Home" className="flex items-center justify-self-start">
            <img
              src="/logo-wordmark.png"
              alt="AlphaTrack Digital"
              className="h-6 w-auto sm:h-[26px]"
              width={800}
              height={188}
            />
          </Link>

            <nav className="hidden items-center justify-self-center md:flex md:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                {...getPrefetchHandlers(link.path)}
                className={cn(
                  "relative py-2 text-sm font-medium transition-colors duration-200 hover:text-foreground",
                  isActive(link.path)
                    ? "text-primary after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-px after:bg-primary"
                    : "text-muted-foreground/90"
                )}
              >
                {link.label}
              </Link>
            ))}
            </nav>

            <div className="hidden justify-self-end md:block">
              <Button asChild className="gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_0_18px_rgba(62,207,142,0.14)] hover:bg-primary/90">
              <Link to="/book-a-call" {...getPrefetchHandlers("/book-a-call")}>
                Book a Call <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            </div>

            <button
              className={cn(
                "justify-self-end rounded-lg p-2 text-foreground transition-colors md:hidden",
                scrolled ? "bg-white/[0.04] hover:bg-white/[0.07]" : "bg-black/20 hover:bg-black/35",
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="border-b border-white/[0.08] bg-background/94 shadow-[0_10px_30px_rgba(0,0,0,0.24)] backdrop-blur-xl md:hidden"
            id="mobile-nav"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  onTouchStart={() => prefetchRoute(link.path)}
                  onFocus={() => prefetchRoute(link.path)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "bg-primary/[0.08] text-primary"
                      : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 gap-1.5 rounded-lg bg-primary text-primary-foreground">
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
