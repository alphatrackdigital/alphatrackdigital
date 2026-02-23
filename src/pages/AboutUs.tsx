import { Target, BarChart3, Lightbulb, Users } from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";

const values = [
  {
    icon: Target,
    title: "Measurement First",
    description: "Every strategy starts with data. We don't guess — we measure, learn, and optimize.",
  },
  {
    icon: BarChart3,
    title: "Radical Transparency",
    description: "You'll always know exactly what's working, what's not, and where your money is going.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    description: "We go beyond tactics. Every action ties back to your business goals and bottom line.",
  },
  {
    icon: Users,
    title: "Partnership Mindset",
    description: "We embed ourselves in your team, acting as an extension — not an outsider.",
  },
];

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us | AlphaTrack Digital"
        description="AlphaTrack Digital is a measurement-first digital growth agency based in Accra and Lagos. We help businesses track, automate, and scale with precision."
        canonicalUrl="/about-us"
      />
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/6 blur-[120px]" />
        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">About Us</span>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold md:text-5xl lg:text-6xl">
              We Build the Digital Engine Behind Your <span className="text-gradient">Growth</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              AlphaTrack Digital is a measurement-first digital growth agency based in Accra and Lagos. We help businesses track, automate, and scale — with precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              AlphaTrack Digital was born from a simple frustration: too many businesses were spending on marketing without knowing what actually worked. We saw campaigns running without proper tracking, leads falling through the cracks, and growth strategies built on guesswork.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              So we built an agency around the opposite principle — data first, always. From conversion tracking architectures to full CRM automation, every solution we deliver is designed to give our clients clarity, efficiency, and confidence in their growth.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "2+", label: "Years of measurable growth" },
              { value: "6+", label: "Industries served" },
              { value: "3", label: "Countries we operate in" },
              { value: "100%", label: "Data-backed strategies" },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card flex flex-col items-center justify-center rounded-2xl p-7 text-center"
              >
                <p className="text-4xl font-bold text-gradient">{value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">What Makes Us Different</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card p-7 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default AboutUs;
