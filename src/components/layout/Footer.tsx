import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-card">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-1.5">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L2 28h28L16 2z" stroke="hsl(152,72%,53%)" strokeWidth="2.5" fill="none" />
                <path d="M16 10l-6 14h12l-6-14z" fill="hsl(152,72%,53%)" opacity="0.3" />
              </svg>
              <span className="text-lg font-bold text-foreground">
                Alpha<span className="text-primary">Track</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Digital</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We help businesses measure what matters, automate what slows them down, and scale what works — with data at the center of every decision.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Services</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/service/conversion-tracking" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Conversion Tracking & Measurement
              </Link>
              <Link to="/service/marketing-automation" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Marketing Automation & CRM
              </Link>
              <Link to="/service" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                All Services
              </Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Company</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/about-us" className="text-sm text-muted-foreground transition-colors hover:text-primary">About Us</Link>
              <Link to="/contact-us" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contact Us</Link>
              <Link to="/book-a-call" className="text-sm text-muted-foreground transition-colors hover:text-primary">Book a Call</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">Accra, Ghana | Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:hello@alphatrack.digital" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  hello@alphatrack.digital
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+233000000000" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  +233 (0) 000 000 000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AlphaTrack Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
