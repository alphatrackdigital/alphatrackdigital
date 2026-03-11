import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";
import { motion, AnimatePresence } from "framer-motion";
import { primaryServices, supportingServices } from "@/data/services";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Services", path: "/service", hasMenu: true },
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact-us" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const desktopNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
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

  useEffect(() => {
    if (!desktopServicesOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        setDesktopServicesOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDesktopServicesOpen(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [desktopServicesOpen]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getPrefetchHandlers = (path: string) => ({
    onMouseEnter: () => prefetchRoute(path),
    onFocus: () => prefetchRoute(path),
    onTouchStart: () => prefetchRoute(path),
  });

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

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

            <nav
              ref={desktopNavRef}
              className="relative hidden items-center justify-self-center md:flex md:gap-10"
              onMouseLeave={() => setDesktopServicesOpen(false)}
            >
              {navLinks.map((link) =>
                link.hasMenu ? (
                  <button
                    key={link.path}
                    type="button"
                    data-testid="desktop-services-trigger"
                    aria-expanded={desktopServicesOpen}
                    aria-controls="desktop-services-menu"
                    aria-haspopup="true"
                    className={cn(
                      "relative flex items-center gap-1.5 py-2 text-sm font-medium transition-colors duration-200 hover:text-foreground",
                      isActive(link.path) || desktopServicesOpen
                        ? "text-primary after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-px after:bg-primary"
                        : "text-muted-foreground/90",
                    )}
                    onMouseEnter={() => {
                      prefetchRoute(link.path);
                      setDesktopServicesOpen(true);
                    }}
                    onClick={() => {
                      prefetchRoute(link.path);
                      setDesktopServicesOpen((prev) => !prev);
                    }}
                    onFocus={() => {
                      prefetchRoute(link.path);
                      setDesktopServicesOpen(true);
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        desktopServicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    {...getPrefetchHandlers(link.path)}
                    className={cn(
                      "relative py-2 text-sm font-medium transition-colors duration-200 hover:text-foreground",
                      isActive(link.path)
                        ? "text-primary after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-px after:bg-primary"
                        : "text-muted-foreground/90",
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}

              <AnimatePresence>
                {desktopServicesOpen && (
                  <motion.div
                    id="desktop-services-menu"
                    data-testid="desktop-services-menu"
                    initial={{ opacity: 0, y: 12, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.985 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-1/2 top-full z-50 mt-5 w-[min(920px,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-[30px] border border-white/[0.08] bg-background/96 p-6 shadow-[0_26px_80px_rgba(0,0,0,0.36)] backdrop-blur-xl"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
                    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr_0.92fr]">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                          Core Services
                        </p>
                        <div className="mt-4 space-y-2">
                          {primaryServices.map((service) => (
                            <Link
                              key={service.path}
                              to={service.path}
                              {...getPrefetchHandlers(service.path)}
                              className="group flex items-start gap-3 rounded-2xl border border-transparent px-3 py-3 transition-colors hover:border-white/[0.06] hover:bg-white/[0.03]"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                                <service.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-foreground">{service.title}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {service.flagship ? "Flagship growth system" : "Core delivery capability"}
                                </p>
                              </div>
                              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary/55 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                          Supporting Services
                        </p>
                        <div className="mt-4 space-y-2">
                          {supportingServices.map((service) => (
                            <Link
                              key={service.path}
                              to={service.path}
                              {...getPrefetchHandlers(service.path)}
                              className="group flex items-start gap-3 rounded-2xl border border-transparent px-3 py-3 transition-colors hover:border-white/[0.06] hover:bg-white/[0.03]"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                                <service.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-foreground">{service.title}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{service.bestFor}</p>
                              </div>
                              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary/55 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-primary/15 bg-[linear-gradient(180deg,rgba(62,207,142,0.08)_0%,rgba(255,255,255,0.02)_100%)] p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                          Start Here
                        </p>
                        <h3 className="mt-3 text-lg font-semibold text-foreground">
                          Need the full scope?
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          Explore the full service directory or book a call if you want help choosing the right entry point.
                        </p>
                        <div className="mt-5 space-y-2">
                          <Link
                            to="/service"
                            {...getPrefetchHandlers("/service")}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                          >
                            View all services <ArrowUpRight className="h-4 w-4" />
                          </Link>
                          <div>
                            <Link
                              to="/book-a-call"
                              {...getPrefetchHandlers("/book-a-call")}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                            >
                              Book a call <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
              {navLinks.map((link) =>
                link.hasMenu ? (
                  <div key={link.path} className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <button
                      type="button"
                      data-testid="mobile-services-trigger"
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services-links"
                      onClick={() => {
                        prefetchRoute(link.path);
                        setMobileServicesOpen((prev) => !prev);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors",
                        isActive(link.path) || mobileServicesOpen
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          mobileServicesOpen && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div
                          id="mobile-services-links"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-white/[0.06]"
                        >
                          <div className="space-y-4 px-4 py-4">
                            <Link
                              to="/service"
                              onClick={closeMobileMenu}
                              onTouchStart={() => prefetchRoute("/service")}
                              onFocus={() => prefetchRoute("/service")}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                            >
                              All Services <ArrowUpRight className="h-4 w-4" />
                            </Link>

                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                                Core Services
                              </p>
                              <div className="mt-2 space-y-1">
                                {primaryServices.map((service) => (
                                  <Link
                                    key={service.path}
                                    to={service.path}
                                    onClick={closeMobileMenu}
                                    onTouchStart={() => prefetchRoute(service.path)}
                                    onFocus={() => prefetchRoute(service.path)}
                                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                                  >
                                    {service.title}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                                Supporting Services
                              </p>
                              <div className="mt-2 space-y-1">
                                {supportingServices.map((service) => (
                                  <Link
                                    key={service.path}
                                    to={service.path}
                                    onClick={closeMobileMenu}
                                    onTouchStart={() => prefetchRoute(service.path)}
                                    onFocus={() => prefetchRoute(service.path)}
                                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                                  >
                                    {service.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
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
                        : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <Button asChild className="mt-2 gap-1.5 rounded-lg bg-primary text-primary-foreground">
                <Link
                  to="/book-a-call"
                  onClick={closeMobileMenu}
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
