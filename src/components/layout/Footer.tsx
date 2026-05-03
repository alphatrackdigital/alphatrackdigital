import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { companyProfile } from "@/data/companyProfile";
import { submitLead } from "@/lib/leads";

const FooterNewsletter = () => {
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pendingConfirmation, setPendingConfirmation] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!optIn) {
      setErrorMsg("Please confirm you want to receive newsletter emails.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const result = await submitLead({ source: "newsletter", firstName: "", lastName: "", email: trimmed, optIn });
      setPendingConfirmation(result.pendingConfirmation === true);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mb-10 border-b border-white/10 pb-10 md:mb-12 md:pb-12">
      {status === "success" ? (
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>
            {pendingConfirmation
              ? "Check your email to confirm your subscription."
              : "You're subscribed - expect actionable insights every fortnight."}
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="shrink-0">
            <p className="text-sm font-semibold text-foreground">Stay in the loop</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Marketing insights on tracking, paid media, and automation. Fortnightly. No fluff.
            </p>
          </div>
          <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-2 sm:max-w-sm">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errorMsg) setErrorMsg(""); }}
                placeholder="your@email.com"
                required
                aria-label="Email address"
                className="h-10 w-full min-w-0 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-10 shrink-0 items-center rounded-lg bg-primary px-4 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
            {(errorMsg || status === "error") && (
              <p className="text-[11px] text-destructive">{errorMsg || "Something went wrong. Please try again."}</p>
            )}
            <label className="flex items-start gap-2 text-[11px] text-muted-foreground/70">
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => {
                  setOptIn(e.target.checked);
                  if (errorMsg) setErrorMsg("");
                }}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/[0.12] bg-white/[0.04] accent-primary"
              />
              <span>I want to receive newsletter emails and product updates from AlphaTrack Digital.</span>
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#070a10]">
      <div className="container mx-auto px-4 py-8 md:py-16 lg:px-8">
        <FooterNewsletter />
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div className="col-span-2 space-y-2.5 md:col-span-2 lg:col-span-1 lg:space-y-4">
            <Link to="/" aria-label="AlphaTrack Digital Home" className="inline-flex items-center">
              <img
                src="/logo-wordmark.png"
                alt="AlphaTrack Digital"
                className="h-8 w-auto md:h-10"
                width={800}
                height={188}
                loading="lazy"
              />
            </Link>
            <p className="max-w-[21rem] text-[13px] leading-7 text-muted-foreground md:max-w-[19rem] md:text-sm">
              Measurement-first digital growth agency. We build the tracking, automation, and paid
              media systems that turn your marketing spend into measurable revenue.
            </p>
            <div className="mt-2.5 flex gap-2 md:mt-4 md:gap-3">
              <a
                href="https://web.facebook.com/AlphaTrack.Digital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary md:h-9 md:w-9"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://x.com/AlphaT_digital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary md:h-9 md:w-9"
                aria-label="X"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/alphatrack.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary md:h-9 md:w-9"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/alphatrackdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary md:h-9 md:w-9"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-2.5 md:space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <nav className="flex flex-col gap-1.5 text-[13px] md:gap-2.5 md:text-sm">
              <Link to="/about-us" className="text-muted-foreground transition-colors hover:text-primary">
                About Us
              </Link>
              <Link to="/service" className="text-muted-foreground transition-colors hover:text-primary">
                Services
              </Link>
              <Link to="/blog" className="text-muted-foreground transition-colors hover:text-primary">
                Blog
              </Link>
              <Link to="/contact-us" className="text-muted-foreground transition-colors hover:text-primary">
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="space-y-2.5 md:space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <nav className="flex flex-col gap-1.5 text-[13px] md:gap-2.5 md:text-sm">
              <Link to="/service/conversion-tracking" className="text-muted-foreground transition-colors hover:text-primary">
                <span className="md:hidden">Conversion Tracking</span>
                <span className="hidden md:inline">Conversion Tracking & Measurement</span>
              </Link>
              <Link to="/service/paid-media" className="text-muted-foreground transition-colors hover:text-primary">
                <span className="md:hidden">Paid Media</span>
                <span className="hidden md:inline">Paid Media Management</span>
              </Link>
              <Link to="/service/marketing-automation" className="text-muted-foreground transition-colors hover:text-primary">
                <span className="md:hidden">Automation & CRM</span>
                <span className="hidden md:inline">Marketing Automation & CRM</span>
              </Link>
              <Link
                to="/service"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                All Services
              </Link>
            </nav>
          </div>

          <div className="col-span-2 space-y-2.5 md:col-span-2 md:space-y-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <div className="flex flex-col gap-1.5 text-[13px] text-muted-foreground md:gap-2 md:text-sm">
              <a href={companyProfile.contact.phoneHref} className="transition-colors hover:text-primary">
                {companyProfile.contact.phoneDisplay}
              </a>
              <a href={companyProfile.contact.secondaryPhoneHref} className="transition-colors hover:text-primary">
                {companyProfile.contact.secondaryPhoneDisplay}
              </a>
              <a href={`mailto:${companyProfile.contact.email}`} className="transition-colors hover:text-primary">
                {companyProfile.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-4 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-xs md:mt-12 md:gap-3 md:pt-6">
          <p>Copyright AlphaTrack Digital {new Date().getFullYear()}. All rights reserved.</p>
          <div className="flex items-center gap-3 md:gap-4">
            <Link to="/privacy-policy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

