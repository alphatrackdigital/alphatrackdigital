import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img src={logo} alt="AlphaTrack Digital" className="h-9" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We are not just another marketing agency — we are mission control for your brand, combining strategy, creativity, and technology to fuel growth.
            </p>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Useful Links</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/about-us" className="text-sm text-muted-foreground transition-colors hover:text-primary">About Us</Link>
              <Link to="/contact-us" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contact Us</Link>
              <Link to="/book-a-call" className="text-sm text-muted-foreground transition-colors hover:text-primary">Book a Call</Link>
              <Link to="/privacy-policy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-sm text-muted-foreground transition-colors hover:text-primary">Terms of Service</Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Services</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/service/conversion-tracking" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Conversion Tracking
              </Link>
              <Link to="/service/marketing-automation" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Marketing Automation
              </Link>
              <Link to="/service" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                All Services
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>+233 530 985 334</p>
              <a href="mailto:info@alphatrack.digital" className="transition-colors hover:text-primary">info@alphatrack.digital</a>
              <p>Accra | Lagos</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © AlphaTrack Digital {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
