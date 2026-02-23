import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/shared/SEO";
import CTASection from "@/components/shared/CTASection";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Mail } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { cn } from "@/lib/utils";

const allCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
const categories = ["All", ...allCategories];
const countByCategory = (cat: string) =>
  cat === "All" ? blogPosts.length : blogPosts.filter((p) => p.category === cat).length;

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);

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
        style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.03) 0%, transparent 100%)" }}
      >
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Blog" }]} />
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">Insights & Strategy</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Strategies, tools, and stories that fuel business growth.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-white/10 pb-6">
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
                  className="group grid gap-8 overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_48px_rgba(62,207,142,0.06)] md:grid-cols-2"
                >
                  <div className="h-64 overflow-hidden md:h-auto">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                        {featured.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold leading-snug md:text-3xl">{featured.title}</h2>
                    <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
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

      {/* Newsletter CTA */}
      <section className="pb-4">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] px-8 py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Get insights straight to your inbox</p>
                <p className="text-sm text-muted-foreground">No fluff. Actionable strategies every fortnight.</p>
              </div>
            </div>
            <Link
              to="/contact-us"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

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
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(62,207,142,0.06)]"
                    >
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
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
        description="Book a call and we'll show you exactly how to apply these insights to your business."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
        secondaryCta={{ label: "Explore Services", to: "/service" }}
      />
    </>
  );
};

export default Blog;
