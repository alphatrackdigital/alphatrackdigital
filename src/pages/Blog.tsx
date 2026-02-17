import { Link } from "react-router-dom";
import SEO from "@/components/shared/SEO";
import CTASection from "@/components/shared/CTASection";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

export const blogPosts = [
  {
    slug: "how-to-skyrocket-your-roi-with-paid-social-campaigns",
    title: "How to Skyrocket Your ROI with Paid Social Campaigns",
    excerpt: "Learn the data-driven strategies that separate profitable paid social campaigns from money pits. From precision targeting to real-time optimisation.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/dlxmedia-hu-ZMlcuVf2URA-unsplash-scaled.jpg",
    category: "Paid Social",
    readTime: "5 min read",
    date: "2025-09-17",
  },
  {
    slug: "the-power-of-no-code-web-design-for-small-businesses",
    title: "The Power of No-Code Web Design for Small Businesses",
    excerpt: "Why modern no-code platforms are levelling the playing field for small business websites \u2014 and how to use them to compete with bigger brands.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/tekimax-AfwnOr1taq0-unsplash-scaled.jpg",
    category: "Web Development",
    readTime: "4 min read",
    date: "2025-09-17",
  },
  {
    slug: "why-programmatic-advertising-is-a-game-changer",
    title: "Why Programmatic Advertising is a Game-Changer",
    excerpt: "Programmatic advertising is reshaping how brands reach audiences at scale \u2014 here\u2019s what you need to know about automated, data-driven ad buying.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/alan-w-AP7tG4LTeXA-unsplash-scaled.jpg",
    category: "Paid Media",
    readTime: "6 min read",
    date: "2025-09-17",
  },
  {
    slug: "conversion-tracking-101-what-most-businesses-get-wrong",
    title: "Conversion Tracking 101: What Most Businesses Get Wrong",
    excerpt: "Misconfigured tracking costs businesses thousands in wasted ad spend. Here are the most common mistakes and how to fix them before your next campaign.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/growtika-183Yxo3vsGY-unsplash-scaled.jpg",
    category: "Tracking",
    readTime: "7 min read",
    date: "2025-10-05",
  },
  {
    slug: "marketing-automation-for-small-teams",
    title: "Marketing Automation for Small Teams: Where to Start",
    excerpt: "You don\u2019t need a 50-person marketing department to automate your lead nurturing. Here\u2019s a practical framework for teams of 1\u20135.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/jotform-g7kFGOV7VI0-unsplash-scaled.jpg",
    category: "Automation",
    readTime: "5 min read",
    date: "2025-10-12",
  },
  {
    slug: "ga4-vs-meta-attribution-which-numbers-to-trust",
    title: "GA4 vs Meta Attribution: Which Numbers Should You Trust?",
    excerpt: "Your GA4 and Meta Ads Manager will almost never agree on conversions. Here\u2019s why that happens and how to build a reporting model you can trust.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/creatopy-ZWg3VeYz_Ac-unsplash-scaled.jpg",
    category: "Analytics",
    readTime: "6 min read",
    date: "2025-11-03",
  },
];

const Blog = () => {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <SEO
        title="Blog | AlphaTrack Digital \u2014 Marketing Insights & Strategy"
        description="Strategies, tools, and stories that fuel business growth. Learn about paid social, conversion tracking, marketing automation, and more."
      />

      {/* Banner */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.03) 0%, transparent 100%)" }}>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Blog" }]} />
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">Insights & Strategy</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">Strategies, tools, and stories that fuel business growth.</p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Link to={`/blog/${featured.slug}`} className="group grid gap-8 overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_48px_rgba(62,207,142,0.06)] md:grid-cols-2">
              <div className="h-64 overflow-hidden md:h-auto">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">{featured.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {featured.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold leading-snug md:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read article <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(62,207,142,0.06)]">
                  <div className="h-48 w-full overflow-hidden">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">{post.category}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-semibold leading-snug">{post.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read article <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Want Us to Put These Strategies to Work for You?" description="Book a free strategy call and we\u2019ll show you exactly how to apply these insights to your business." />
    </>
  );
};

export default Blog;
