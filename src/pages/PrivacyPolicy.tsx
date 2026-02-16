import SEO from "@/components/shared/SEO";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO title="Privacy Policy | AlphaTrack Digital" description="How we collect, use, and protect your data." />

      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.03) 0%, transparent 100%)" }}>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Privacy Policy" }]} />
          <h1 className="mt-4 text-3xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-4 lg:px-8 space-y-12">
          <p className="text-sm text-muted-foreground">Last updated: February 2026</p>

          <div>
            <h2 className="text-xl font-bold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you fill out a form on our website, we collect your name, email address, and company name. We also collect anonymised website usage data through Google Analytics 4 (GA4) to understand how visitors interact with our site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information you provide to respond to your enquiries, schedule calls, and improve our website and services. We do not sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website uses Google Analytics 4 to collect anonymised usage data such as pages visited, time on site, and traffic sources. This data helps us improve the user experience. You can opt out of analytics tracking through your browser settings or by using the Google Analytics opt-out browser add-on.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your contact information is stored securely in Brevo (formerly Sendinblue), our CRM and email platform. We use industry-standard encryption and access controls to protect your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete the personal data we hold about you. You can also opt out of marketing communications at any time by clicking the unsubscribe link in any email or by contacting us directly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or your personal data, please contact us at{" "}
              <a href="mailto:info@alphatrack.digital" className="text-primary hover:text-primary/80 transition-colors">
                info@alphatrack.digital
              </a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
