import SEO from "@/components/shared/SEO";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="Terms of Service | AlphaTrack Digital"
        description="Terms and conditions for using the AlphaTrack Digital website and services."
        canonicalUrl="/terms-of-service"
      />

      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.03) 0%, transparent 100%)" }}>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Terms of Service" }]} />
          <h1 className="mt-4 text-3xl font-bold">Terms of Service</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-4 lg:px-8 space-y-12">
          <p className="text-sm text-muted-foreground">Last updated: February 2026</p>

          <div>
            <h2 className="text-xl font-bold mb-3">Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              AlphaTrack Digital provides digital marketing services including conversion tracking, marketing automation, paid media management, and related consulting. The scope and terms of any engagement will be agreed in writing before work begins.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Website Use</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may use this website for lawful purposes only. You agree not to misuse the site, attempt to gain unauthorised access, or interfere with its operation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website — including text, graphics, logos, and design — is the property of AlphaTrack Digital and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without our written consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              AlphaTrack Digital provides this website and its content on an "as is" basis. We make no warranties regarding the accuracy or completeness of the information provided and shall not be liable for any damages arising from your use of the site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites and encourage you to review their policies independently.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these terms from time to time. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these terms, please contact us at{" "}
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

export default TermsOfService;
