import { useState, useEffect, useRef } from "react";
import { Link, useLocation, type To } from "react-router-dom";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";
import { motion, AnimatePresence } from "framer-motion";
import { primaryServices, supportingServices } from "@/data/services";
import { expertisePages } from "@/data/expertise";

const navLinks = [
  { label: "Services", path: "/service", menuType: "services" as const },
  { label: "Expertise", path: "/expertise", menuType: "expertise" as const },
  { label: "Results", disabled: true },
  { label: "About Us", path: "/about-us" },
  { label: "Blog", path: "/blog" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [desktopExpertiseOpen, setDesktopExpertiseOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const desktopNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileExpertiseOpen(false);
    setDesktopServicesOpen(false);
    setDesktopExpertiseOpen(false);
  }, [location.pathname, location.hash]);

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
    if (!desktopServicesOpen && !desktopExpertiseOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        setDesktopServicesOpen(false);
        setDesktopExpertiseOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopServicesOpen(false);
        setDesktopExpertiseOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [desktopServicesOpen, desktopExpertiseOpen]);

  const isActive = (path: string, hash?: string) => {
    if (hash) return location.pathname === path && location.hash === hash;
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
    setMobileExpertiseOpen(false);
  };

  const getLinkTarget = (path: string, hash?: string): To =>
    hash ? { pathname: path, hash } : path;

  const headerElevated = scrolled || desktopServicesOpen || desktopExpertiseOpen || mobileOpen;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300">
      <div
        className={cn(
          "transition-all duration-300",
          headerElevated
            ? "bg-background/78 shadow-[0_10px_28px_rgba(0,10,28,0.22)] backdrop-blur-xl"
            : "bg-[linear-gradient(180deg,rgba(7,10,16,0.82)_0%,rgba(7,10,16,0.46)_54%,rgba(7,10,16,0)_100%)]",
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div
            className={cn(
              "grid h-[70px] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]",
              headerElevated && "border-b border-white/[0.08]",
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
              onMouseLeave={() => {
                setDesktopServicesOpen(false);
                setDesktopExpertiseOpen(false);
              }}
            >
              {navLinks.map((link) =>
                link.disabled ? (
                  <span
                    key={link.label}
                    className="relative py-2 text-sm font-medium text-muted-foreground/90"
                  >
                    {link.label}
                  </span>
                ) : link.menuType ? (
                  <button
                    key={link.path}
                    type="button"
                    data-testid={`desktop-${link.menuType}-trigger`}
                    aria-expanded={link.menuType === "services" ? desktopServicesOpen : desktopExpertiseOpen}
                    aria-controls={`desktop-${link.menuType}-menu`}
                    aria-haspopup="true"
                    className={cn(
                      "relative flex items-center gap-1.5 py-2 text-sm font-medium transition-colors duration-200 hover:text-foreground",
                      isActive(link.path, link.hash) ||
                        (link.menuType === "services" ? desktopServicesOpen : desktopExpertiseOpen)
                        ? "text-primary after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-px after:bg-primary"
                        : "text-muted-foreground/90",
                    )}
                    onMouseEnter={() => {
                      prefetchRoute(link.path);
                      if (link.menuType === "services") {
                        setDesktopServicesOpen(true);
                        setDesktopExpertiseOpen(false);
                      } else {
                        setDesktopExpertiseOpen(true);
                        setDesktopServicesOpen(false);
                      }
                    }}
                    onClick={() => {
                      prefetchRoute(link.path);
                      if (link.menuType === "services") {
                        setDesktopServicesOpen((prev) => !prev);
                        setDesktopExpertiseOpen(false);
                      } else {
                        setDesktopExpertiseOpen((prev) => !prev);
                        setDesktopServicesOpen(false);
                      }
                    }}
                    onFocus={() => {
                      prefetchRoute(link.path);
                      if (link.menuType === "services") {
                        setDesktopServicesOpen(true);
                        setDesktopExpertiseOpen(false);
                      } else {
                        setDesktopExpertiseOpen(true);
                        setDesktopServicesOpen(false);
                      }
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        (link.menuType === "services" ? desktopServicesOpen : desktopExpertiseOpen) &&
                          "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    key={link.path}
                    to={getLinkTarget(link.path, link.hash)}
                    {...getPrefetchHandlers(link.path)}
                    className={cn(
                      "relative py-2 text-sm font-medium transition-colors duration-200 hover:text-foreground",
                      isActive(link.path, link.hash)
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
                  <div className="absolute left-1/2 top-full z-50 w-[min(760px,calc(100vw-3rem))] -translate-x-1/2 pt-5">
                    <motion.div
                      id="desktop-services-menu"
                      data-testid="desktop-services-menu"
                      initial={{ opacity: 0, y: 12, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.985 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#070a10] px-3.5 py-3.5 shadow-[0_20px_48px_rgba(0,8,22,0.24)]"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015)_0%,rgba(255,255,255,0)_22%)]" />
                      <div className="relative grid gap-3.5 lg:grid-cols-2">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                            Core Services
                          </p>
                          <div className="mt-2 space-y-1">
                            {primaryServices.map((service) => (
                              <Link
                                key={service.path}
                                to={service.path}
                                {...getPrefetchHandlers(service.path)}
                                className="group flex items-center gap-2.5 rounded-2xl border border-transparent px-3 py-2 transition-colors hover:border-white/[0.05] hover:bg-white/[0.025]"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                                  <service.icon className="h-4 w-4 text-primary" />
                                </div>
                                <p className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground">{service.title}</p>
                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/28 transition-colors duration-200 group-hover:text-primary/70" />
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                            More Services
                          </p>
                          <div className="mt-2 space-y-1">
                            {supportingServices.map((service) => (
                              <Link
                                key={service.path}
                                to={service.path}
                                {...getPrefetchHandlers(service.path)}
                                className="group flex items-center gap-2.5 rounded-2xl border border-transparent px-3 py-2 transition-colors hover:border-white/[0.05] hover:bg-white/[0.025]"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                                  <service.icon className="h-4 w-4 text-primary" />
                                </div>
                                <p className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground">{service.title}</p>
                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/28 transition-colors duration-200 group-hover:text-primary/70" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-3 border-t border-white/[0.08] pt-3">
                        <Link
                          to="/service"
                          {...getPrefetchHandlers("/service")}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                        >
                          View all services <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {desktopExpertiseOpen && (
                  <div className="absolute left-1/2 top-full z-50 w-[min(320px,calc(100vw-3rem))] -translate-x-1/2 pt-5">
                    <motion.div
                      id="desktop-expertise-menu"
                      data-testid="desktop-expertise-menu"
                      initial={{ opacity: 0, y: 12, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.985 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#070a10] p-3 shadow-[0_20px_48px_rgba(0,8,22,0.24)]"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
                      <div className="space-y-1">
                        {expertisePages.map((item) => (
                          <Link
                            key={item.slug}
                            to={`/expertise/${item.slug}`}
                            onMouseEnter={() => prefetchRoute(`/expertise/${item.slug}`)}
                            onFocus={() => prefetchRoute(`/expertise/${item.slug}`)}
                            className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.04] hover:text-primary"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </nav>

            <div className="hidden justify-self-end md:block">
              <Button asChild className="gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_0_18px_rgba(51,204,153,0.12)] hover:bg-primary/90">
                <Link to="/offer/tracking-audit" {...getPrefetchHandlers("/offer/tracking-audit")}>
                  Get a Free Growth Audit <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <button
              className={cn(
                "justify-self-end rounded-lg p-2 text-foreground transition-colors md:hidden",
                headerElevated ? "bg-white/[0.04] hover:bg-white/[0.07]" : "bg-black/20 hover:bg-black/35",
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
                link.disabled ? (
                  <div
                    key={link.label}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground"
                  >
                    {link.label}
                  </div>
                ) : link.menuType ? (
                  <div key={link.path} className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <button
                      type="button"
                      data-testid={`mobile-${link.menuType}-trigger`}
                      aria-expanded={link.menuType === "services" ? mobileServicesOpen : mobileExpertiseOpen}
                      aria-controls={`mobile-${link.menuType}-links`}
                      onClick={() => {
                        prefetchRoute(link.path);
                        if (link.menuType === "services") {
                          setMobileServicesOpen((prev) => !prev);
                          setMobileExpertiseOpen(false);
                        } else {
                          setMobileExpertiseOpen((prev) => !prev);
                          setMobileServicesOpen(false);
                        }
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors",
                        isActive(link.path, link.hash) ||
                          (link.menuType === "services" ? mobileServicesOpen : mobileExpertiseOpen)
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          (link.menuType === "services" ? mobileServicesOpen : mobileExpertiseOpen) &&
                            "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {(link.menuType === "services" ? mobileServicesOpen : mobileExpertiseOpen) && (
                        <motion.div
                          id={`mobile-${link.menuType}-links`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-white/[0.06]"
                        >
                          <div className="space-y-4 px-4 py-4">
                            {link.menuType === "services" ? (
                              <>
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
                                    More Services
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
                              </>
                            ) : (
                              <div className="space-y-1">
                                {expertisePages.map((item) => (
                                  <Link
                                    key={item.slug}
                                    to={`/expertise/${item.slug}`}
                                    onClick={closeMobileMenu}
                                    onTouchStart={() => prefetchRoute(`/expertise/${item.slug}`)}
                                    onFocus={() => prefetchRoute(`/expertise/${item.slug}`)}
                                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={getLinkTarget(link.path, link.hash)}
                    onClick={() => setMobileOpen(false)}
                    onTouchStart={() => prefetchRoute(link.path)}
                    onFocus={() => prefetchRoute(link.path)}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive(link.path, link.hash)
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
                  to="/offer/tracking-audit"
                  onClick={closeMobileMenu}
                  onTouchStart={() => prefetchRoute("/offer/tracking-audit")}
                  onFocus={() => prefetchRoute("/offer/tracking-audit")}
                >
                  Get a Free Growth Audit <ArrowUpRight className="h-4 w-4" />
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
