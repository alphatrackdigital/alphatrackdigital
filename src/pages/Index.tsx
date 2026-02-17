import { Link } from "react-router-dom";
import { ArrowUpRight, BarChart3, Megaphone, Zap, Mail, Globe, Search, PenTool, TrendingUp, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { primaryServices, supportingServices } from "@/data/services";

const testimonials = [
  {
    quote: "Working with Alpha Track Digital Limited was an excellent experience. They delivered a sleek, modern, and highly functional website right on schedule. Edits were handled quickly, communication was seamless, and the service was truly top notch. Would definitely recommend!",
    name: "Courtney Quist-Therson",
    title: "CEO and Founder of Pearl House Ghana",
  },
];

const blogPosts = [
  {
    title: "How to Skyrocket Your ROI with Paid Social Campaigns",
    url: "https://alphatrack.digital/how-to-skyrocket-your-roi-with-paid-social-campaigns/",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/dlxmedia-hu-ZMlcuVf2URA-unsplash-scaled.jpg",
  },
  {
    title: "The Power of No-Code Web Design for Small Businesses",
    url: "https://alphatrack.digital/the-power-of-no-code-web-design-for-small-businesses/",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/tekimax-AfwnOr1taq0-unsplash-scaled.jpg",
  },
  {
    title: "Why Programmatic Advertising is a Game-Changer",
    url: "https://alphatrack.digital/why-programmatic-advertising-is-a-game-changer/",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/programmatic-ads.jpg",
  },
];

const trustBadges = [
  "Data-Driven Marketing That Delivers",
  "Smart Marketing. Real Results.",
  "Trusted by B2B & B2C Leaders",
  "ROI-Focused, Always",
  "AI-Powered Marketing Automation",
];

const stats = [
  { value: "2k+", label: "Clients propelled into growth" },
  { value: "95%", label: "Data accuracy achieved" },
  { value: "3x", label: "Average ROAS improvement" },
];

const faqs = [
  {
    question: "What sets AlphaTrack Digital apart from other performance marketing agencies?",
    answer: "AlphaTrack Digital stands out through its meticulous fusion of data, creativity, and technology. Our tailored solutions, industry expertise, and commitment to sustainable digital growth make us the catalyst for your brand's success.",
  },
  {
    question: "Can AlphaTrack Digital help small businesses, or is it more suitable for larger enterprises?",
    answer: "Absolutely! AlphaTrack Digital caters to businesses of all sizes. Our strategies are scalable and personalized to meet small and large enterprises' unique needs and goals.",
  },
  {
    question: "How quickly can I expect results from AlphaTrack Digital's services?",
    answer: "Results vary based on the service and specific goals, but our data-driven approach ensures quick wins and sustainable, long-term success. You should see noticeable improvements within the first few weeks.",
  },
  {
    question: "What industries does AlphaTrack Digital specialize in?",
    answer: "We specialize in various industries, including B2B, B2C, FMCG, Fashion, Retail, Fintech, and Agritech. Our diverse expertise allows us to tailor strategies that align with each industry's unique challenges.",
  },
  {
    question: "How transparent is AlphaTrack Digital about campaign performance and results?",
    answer: "Transparency is a core value at AlphaTrack Digital. We provide regular, detailed reports on campaign performance, informing you about critical metrics, achievements, and areas for improvement.",
  },
];

const Index = () => {
  return (
    <>
      <SEO
        title="AlphaTrack Digital | Data-Driven Performance Marketing Agency"
        description="We navigate the digital landscape for you, blending creativity and tech to unlock business growth. Conversion tracking, paid media, and marketing automation."
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AlphaTrack Digital",
          "url": "https://alphatrack.digital",
          "logo": "https://alphatrack.digital/wp-content/uploads/2025/08/Group-320.png",
          "description": "Data-driven performance marketing agency based in Accra and Lagos.",
          "address": [
            { "@type": "PostalAddress", "addressLocality": "Accra", "addressCountry": "GH" },
            { "@type": "PostalAddress", "addressLocality": "Lagos", "addressCountry": "NG" }
          ],
          "contactPoint": { "@type": "ContactPoint", "telephone": "+233530985334", "email": "info@alphatrack.digital", "contactType": "sales" }
        }}
      />
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[40%] -right-[20%] h-[80%] w-[60%] rounded-full bg-primary/[0.07] blur-[150px]" />
          <div className="absolute -bottom-[30%] -left-[10%] h-[60%] w-[50%] rounded-full bg-secondary/[0.05] blur-[130px]" />
          <div className="absolute top-[20%] left-[30%] h-[40%] w-[30%] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>

        <div className="container relative mx-auto px-4 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Seamless Digital Growth At Your Fingertips</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Everything You Need To Start, Scale, And Watch Your Business{" "}
              <span className="text-gradient">Take Off</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We navigate the digital landscape for you, blending creativity and tech to unlock business growth.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-1.5 rounded-lg bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                <Link to="/book-a-call">
                  Speak To An Expert <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-1.5 rounded-lg border-white/20 hover:bg-white/5">
                <Link to="/service">
                  Choose A Service <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust badges marquee */}
      <section className="overflow-hidden border-y border-white/10 py-4">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...trustBadges, ...trustBadges].map((badge, i) => (
            <span key={i} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-4 sm:flex-row lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary">About Us</span>
            <h2 className="text-3xl font-bold md:text-4xl">Driven by Data, Powered by Creativity</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We are fueling the next generation of businesses with data-driven performance marketing through creative strategies and cutting-edge technology. We cut through the noise, hit your target audience, and boost your business for sustainable digital growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services — New Grid (3 Primary + 4 Supporting) */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">What We Do</span>
          <h2 className="text-3xl font-bold md:text-4xl">Our Services</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            We help businesses track what matters, acquire customers profitably, and nurture leads into revenue.
          </p>

          {/* Primary 3 */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {primaryServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div
                  className={`group flex h-full flex-col rounded-xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                    service.flagship
                      ? "border-primary bg-gradient-to-br from-card to-[hsl(152_30%_8%)] border-2 hover:shadow-[0_8px_32px_rgba(62,207,142,0.12)]"
                      : "border-primary/60 bg-card hover:shadow-[0_8px_32px_rgba(62,207,142,0.08)]"
                  }`}
                >
                  <span
                    className={`mb-4 inline-block w-fit rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      service.flagship
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {service.badge}
                  </span>
                  <span className="mb-4 text-4xl">{service.emoji}</span>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  {service.comingSoon ? (
                    <span className="mt-4 text-xs font-medium text-muted-foreground">Coming Soon</span>
                  ) : (
                    <Link
                      to={service.path}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supporting 4 */}
          <div className="mt-14 border-t border-border pt-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">We Also Deliver</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {supportingServices.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="rounded-xl border border-border bg-[#0d0d0d] p-6 transition-colors hover:border-muted-foreground/30"
                >
                  <span className="mb-3 block text-2xl">{s.emoji}</span>
                  <h4 className="text-[15px] font-semibold">{s.title}</h4>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Card */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="glass-card mx-auto max-w-4xl p-10 text-center md:p-14">
            <Handshake className="mx-auto mb-5 h-10 w-10 text-primary" />
            <h2 className="text-2xl font-bold md:text-3xl">Your Growth Partner, Not Just Another Agency</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We don't just run campaigns — we embed ourselves in your business, aligning every strategy with measurable outcomes. From Accra to Lagos and beyond, we partner with ambitious businesses ready to scale.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Testimonials</p>
            <h2 className="mb-10 text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
            {/* TODO: Convert to carousel when more testimonials are available */}
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card border-l-2 border-primary p-8 md:p-10 text-left">
                <span className="block text-6xl leading-none text-primary/30 select-none">&ldquo;</span>
                <p className="mt-2 text-lg italic leading-relaxed text-muted-foreground">{t.quote}</p>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.title}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Preview */}
      {/* TODO: Replace with internal blog when blog pages are built */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Insights</p>
            <h2 className="mb-10 text-3xl font-bold md:text-4xl">From Our Blog</h2>
          </motion.div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="h-48 w-full overflow-hidden bg-card">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-semibold text-foreground leading-snug">{post.title}</h3>
                  <span className="mt-3 inline-block text-sm text-primary">Read more →</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion items={faqs} title="Frequently Asked Questions" />

      <CTASection />
    </>
  );
};

export default Index;
