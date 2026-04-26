import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/shared/SEO";
import CTASection from "@/components/shared/CTASection";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SafeImage from "@/components/shared/SafeImage";
import SectionIntro from "@/components/shared/SectionIntro";
import NewsletterSection from "@/components/shared/NewsletterSection";
import { BOOK_A_FREE_STRATEGY_CALL_CTA, EXPLORE_SERVICES_CTA } from "@/config/cta";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts as staticPosts } from "@/data/blogPosts";
import { fetchBlogPosts, type ApiBlogPost } from "@/lib/blogApi";
import { cn } from "@/lib/utils";

type DisplayPost = { slug: string; title: string; excerpt: string; image: string; category: string; readTime: string; date: string };

function toDisplay(p: ApiBlogPost): DisplayPost {
  return { slug: p.slug, title: p.title, excerpt: p.excerpt, image: p.image, category: p.category, readTime: p.readTime, date: p.publishedAt || p.createdAt };
}

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchBlogPosts(1, 50)
      .then((data) => {
        if (data.posts.length > 0) {
          setPosts(data.posts.map(toDisplay));
        } else {
          setPosts(staticPosts.map((p) => ({ ...p })));
        }
      })
      .catch(() => setPosts(staticPosts.map((p) => ({ ...p }))))
      .finally(() => setLoaded(true));
  }, []);

  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const allCategories = Array.from(new Set(sorted.map((p) => p.category)));
  const categories = ["All", ...allCategories];
  const countByCategory = (cat: string) =>
    cat === "All" ? sorted.length : sorted.filter((p) => p.category === cat).length;

  const filtered =
    activeCategory === "All" ? sorted : sorted.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <SEO
        title="Blog | AlphaTrack Digital - Marketing Insights & Strategy"
        description="Strategies, tools, and stories that fuel business growth. Learn about paid social, conversion tracking, marketing automation, and more."
        canonicalUrl="/blog"
      />

      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{ background: "linear-gradient(180deg, rgba(0,51,153,0.03) 0%, rgba(0,175,239,0.015) 48%, transparent 100%)" }}
      >
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Blog" }]} />
          <SectionIntro
            eyebrow="Insights"
            title="Insights & Strategy"
            description="Strategies, tools, and practical perspectives on tracking, paid growth, and automation."
            width="wide"
            className="mt-4"
            titleClassName="text-3xl md:text-5xl"
          />
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-white/10 bg-white/[0.01] pb-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2" role="list" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                role="listitem"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-white/10 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {cat}
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  activeCategory === cat ? "bg-primary-foreground/20 text-primary-foreground" : "bg-white/10 text-muted-foreground"
                )}>
                  {countByCategory(cat)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            {featured ? (
              <motion.div
                key={featured.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group grid gap-8 overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.02] transition-all duration-300 hover:border-white/20 hover:shadow-[0_18px_60px_rgba(0,0,0,0.18)] md:grid-cols-2"
                >
                  <div className="h-72 overflow-hidden md:h-auto">
                    <SafeImage
                      src={featured.image}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      wrapperClassName="h-full w-full"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                        {featured.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold leading-snug md:text-3xl">{featured.title}</h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">{featured.excerpt}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Read article{" "}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

      <NewsletterSection className="pb-4" />

      {rest.length > 0 && (
        <section className="pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {rest.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <SafeImage
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          wrapperClassName="h-full w-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold leading-snug">{post.title}</h2>
                        <p className="mt-2 flex-1 line-clamp-3 text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          Read article{" "}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Want Us to Put These Strategies to Work for You?"
        description="Book a free strategy call and we'll show you exactly how to apply these insights to your business."
        primaryCta={BOOK_A_FREE_STRATEGY_CALL_CTA}
        secondaryCta={EXPLORE_SERVICES_CTA}
        variant="inline-proof"
        proofChips={["Actionable advice", "Built around your current setup", "No-pressure discovery call"]}
      />
    </>
  );
};

export default Blog;
