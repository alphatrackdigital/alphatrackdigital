import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import CTASection from "@/components/shared/CTASection";
import PageSection from "@/components/shared/PageSection";
import SectionIntro from "@/components/shared/SectionIntro";
import SEO from "@/components/shared/SEO";
import { getExpertiseBySlug } from "@/data/expertise";
import { cn } from "@/lib/utils";

const ExpertiseDetail = () => {
  const { slug } = useParams();
  const expertise = slug ? getExpertiseBySlug(slug) : undefined;

  if (!expertise) {
    return (
      <>
        <SEO
          title="Expertise | AlphaTrack Digital"
          description="Explore the industries AlphaTrack Digital supports across tracking, paid media, and automation."
          canonicalUrl="/expertise"
        />
        <PageSection mode="hero" spacing="compact">
          <SectionIntro
            as="h1"
            eyebrow="Expertise"
            mode="hero"
            title="That expertise page could not be found."
            description="Go back to the homepage or explore our services to see where AlphaTrack Digital can help."
            maxWidth="lg"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Back to Home <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/service"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-foreground"
            >
              Explore Services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </PageSection>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${expertise.name} Marketing | AlphaTrack Digital`}
        description={expertise.heroDescription}
        canonicalUrl={`/expertise/${expertise.slug}`}
      />

      <PageSection mode="hero" surface="glow" spacing="compact">
        <div className="max-w-4xl">
          <SectionIntro
            as="h1"
            eyebrow="Expertise"
            mode="hero"
            title={expertise.heroTitle}
            description={expertise.heroDescription}
            maxWidth="xl"
            titleClassName="max-w-5xl"
            descriptionClassName="max-w-3xl"
          />

          <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            We start with measurement, then improve the media, messaging, and
            follow-up systems that matter most in this sector.
          </p>
        </div>
      </PageSection>

      <PageSection mode="content" border="top">
        <SectionIntro
          eyebrow="Common Challenges"
          mode="content"
          title={`What often slows growth in ${expertise.name}.`}
          description="These are the gaps we usually help teams fix first."
          maxWidth="lg"
          className="mb-8"
        />

        <div className="border-t border-white/10">
          {expertise.challenges.map((challenge, index) => (
            <div
              key={challenge}
              className={cn(
                "grid gap-3 py-5 md:grid-cols-[80px_1fr] md:gap-6 md:py-6",
                index > 0 && "border-t border-white/10",
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                0{index + 1}
              </div>
              <p className="max-w-4xl text-sm leading-7 text-foreground/92 md:text-base">
                {challenge}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection mode="content" surface="quiet" border="top">
        <SectionIntro
          eyebrow="How We Help"
          mode="content"
          title={`How we support ${expertise.name} brands.`}
          description="Our work usually starts with these three areas."
          maxWidth="lg"
          className="mb-8"
        />

        <div className="border-t border-white/10">
          {expertise.serviceFocus.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "grid gap-3 py-5 md:grid-cols-[80px_240px_1fr_auto] md:gap-6 md:py-7",
                index > 0 && "border-t border-white/10",
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                0{index + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                {item.description}
              </p>
              <div className="md:justify-self-end">
                <Link
                  to={item.path}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Explore service <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection mode="content" border="top">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionIntro
            eyebrow="What We Focus On"
            mode="content"
            title="What success should look like."
            description="The work should lead to clearer reporting, better decisions, and stronger commercial performance over time."
            maxWidth="lg"
          />

          <div className="border-t border-white/10 pt-6 lg:pt-0 lg:border-t-0">
            <div className="grid gap-4 sm:grid-cols-2">
              {expertise.outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-7 text-foreground/92 md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <CTASection
        title={
          <>
            Need a clearer growth plan for{" "}
            <span className="text-gradient">{expertise.name}</span>?
          </>
        }
        description="Request a free growth audit and we will show you the clearest next step across tracking, paid media, and automation."
        primaryCta={{ label: "Get a Free Growth Audit", to: "/offer/tracking-audit" }}
        secondaryCta={{ label: "Explore Services", to: "/service" }}
        variant="service-close"
      />
    </>
  );
};

export default ExpertiseDetail;
