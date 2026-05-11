import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/shared/SEO";
import CTASection from "@/components/shared/CTASection";
import SafeImage from "@/components/shared/SafeImage";
import NewsletterSection from "@/components/shared/NewsletterSection";
import { BOOK_A_FREE_STRATEGY_CALL_CTA } from "@/config/cta";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Layers3 } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { cn } from "@/lib/utils";

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
const allCategories = Array.from(new Set(sortedPosts.map((p) => p.category)));
const categories = ["All", ...allCategories];
const countByCategory = (cat: string) =>
  cat === "All" ? sortedPosts.length : sortedPosts.filter((p) => p.category === cat).length;

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? sortedPosts : sortedPosts.filter((p) => p.category === activeCategory);

  const editorPick = sortedPosts[0];
  const featured = filtered[0];
  const usefulNow = filtered.slice(1, 4);
  const archive = filtered.slice(4);
  const archiveLead = archive.slice(0, 6);
  const archiveTail = archive.slice(6);
  const latestDate = editorPick
    ? new Date(editorPick.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : "";

  return (
    <>
      <SEO
        title="Blog | AlphaTrack Digital - Marketing Insights & Strategy"
        description="Strategies, tools, and stories that fuel business growth. Learn about paid social, conversion tracking, marketing automation, and more."
        canonicalUrl="/blog"
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-[#05070d] pt-[5.75rem] md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(51,204,153,0.10),transparent_26%),radial-gradient(circle_at_82%_12%,rgba(0,175,239,0.09),transparent_30%),linear-gradient(180deg,#05070d_0%,#071017_58%,#05070d_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.46)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.46)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(180deg,black,transparent_76%)]" />

        <div className="container relative mx-auto px-6 pb-10 md:pb-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">
                AlphaTrack Intelligence
              </p>
              <h1 className="title-safe max-w-4xl text-4xl font-bold leading-tight tracking-normal text-foreground md:text-6xl">
                Marketing <span className="text-gradient">intelligence</span> for cleaner growth.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Practical field notes on tracking, paid media, analytics, automation, and the
                operating systems that turn attention into measurable revenue.
              </p>

              <div className="mt-7 grid max-w-2xl grid-cols-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
                <div className="border-r border-white/10 px-3 py-3 text-center md:px-5 md:py-4">
                  <p className="text-xl font-bold text-foreground md:text-2xl">{sortedPosts.length}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground md:mt-1 md:text-xs">Articles</p>
                </div>
                <div className="border-r border-white/10 px-3 py-3 text-center md:px-5 md:py-4">
                  <p className="text-xl font-bold text-foreground md:text-2xl">{allCategories.length}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground md:mt-1 md:text-xs">Topics</p>
                </div>
                <div className="px-3 py-3 text-center md:px-5 md:py-4">
                  <p className="text-xl font-bold text-foreground md:text-2xl">Monthly</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground md:mt-1 md:text-xs">Updates</p>
                </div>
              </div>
            </div>

            {editorPick && (
              <Link
                to={`/blog/${editorPick.slug}`}
                className="group rounded-lg border border-white/10 bg-white/[0.025] p-6 transition-colors hover:border-primary/35"
              >
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Layers3 className="h-4 w-4 text-primary" />
                  <span>Editor's Pick</span>
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {editorPick.category}
                </p>
                <h2 className="mt-3 text-xl font-bold leading-snug transition-colors group-hover:text-primary">
                  {editorPick.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {editorPick.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {editorPick.readTime}
                  </span>
                  <span className="inline-flex items-center gap-2 font-semibold text-primary">
                    Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>

      </section>

      <div className="sticky top-[70px] z-20 border-b border-white/10 bg-[#05070d]/92 backdrop-blur-xl">
        <div className="container mx-auto px-6 lg:px-8">
          <div
            className="flex w-full min-w-0 gap-2 overflow-x-auto py-3 [scrollbar-width:none] lg:mx-auto lg:w-fit lg:max-w-full [&::-webkit-scrollbar]:hidden"
            role="list"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="listitem"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors",
                  activeCategory === cat
                    ? "border-primary/70 bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(51,204,153,0.12)]"
                    : "border-white/10 bg-white/[0.035] text-muted-foreground hover:border-primary/35 hover:bg-white/[0.055] hover:text-foreground"
                )}
              >
                <span>{cat}</span>
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                    activeCategory === cat
                      ? "bg-primary-foreground/18 text-primary-foreground"
                      : "bg-white/[0.07] text-muted-foreground"
                  )}
                >
                  {countByCategory(cat)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-4 lg:px-8">
          <AnimatePresence mode="wait">
            {featured ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid min-w-0 items-stretch gap-10 lg:grid-cols-12"
              >
                <Link to={`/blog/${featured.slug}`} className="group flex h-full min-w-0 flex-col lg:col-span-7">
                  <div className="overflow-hidden rounded-lg border border-white/10">
                    <SafeImage
                      src={featured.image}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      wrapperClassName="aspect-[16/10] w-full lg:aspect-auto lg:h-[17rem] xl:h-[18rem]"
                      loading="eager"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                      <span className="font-semibold text-primary">{featured.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="max-w-3xl text-2xl font-bold leading-snug transition-colors group-hover:text-primary md:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                      {featured.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Read featured article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>

                <aside className="flex h-full min-w-0 flex-col lg:col-span-5">
                  <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-3 md:pb-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
                        Most useful now
                      </p>
                      <h2 className="mt-1.5 text-xl font-bold md:mt-2 md:text-2xl">Start here</h2>
                    </div>
                    {latestDate && <p className="text-sm text-muted-foreground">{latestDate}</p>}
                  </div>

                  <div className="-mx-6 flex gap-3 overflow-x-auto px-6 py-4 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
                    {usefulNow.map((post, index) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group flex min-h-[9.5rem] w-[78vw] max-w-[19rem] shrink-0 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.025] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors hover:border-primary/30"
                      >
                        <div>
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                              {post.category}
                            </span>
                            <span className="text-xs font-semibold text-white/30">
                              0{index + 1}
                            </span>
                          </div>
                          <h3 className="line-clamp-3 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                            {post.title}
                          </h3>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                          <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="hidden flex-1 divide-y divide-white/10 md:block">
                    {usefulNow.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group block py-6"
                      >
                        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                          <span className="font-semibold text-primary">{post.category}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold leading-snug transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {post.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </aside>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

      {archive.length > 0 && (
        <section className="pb-20 md:pb-24">
          <div className="container mx-auto px-6 md:px-4 lg:px-8">
            <div className="mb-4 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
                  Article archive
                </p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                  {activeCategory === "All" ? "All insights" : activeCategory}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Showing {filtered.length} {filtered.length === 1 ? "article" : "articles"}
              </p>
            </div>

            <div className="grid gap-3 md:hidden">
              {archive.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group grid grid-cols-[5.75rem_minmax(0,1fr)] gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors hover:border-primary/30"
                >
                  <div className="h-[4.75rem] overflow-hidden rounded-md">
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      wrapperClassName="h-full w-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                      <span className="font-semibold text-primary">{post.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    </div>
                    <div className="mt-2 flex items-start gap-3">
                      <h3 className="line-clamp-2 flex-1 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
              {archiveLead.map((post, i) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors hover:border-primary/30 hover:bg-white/[0.04]"
                >
                  <motion.article
                    className="flex h-full flex-col"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <div className="aspect-[16/9] overflow-hidden border-b border-white/10">
                      <SafeImage
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        wrapperClassName="h-full w-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                        <span className="font-semibold text-primary">{post.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                      </div>
                      <div className="mt-3 flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>

            <NewsletterSection className="py-8 md:py-12" />

            {archiveTail.length > 0 && (
              <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                {archiveTail.map((post, i) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors hover:border-primary/30 hover:bg-white/[0.04]"
                  >
                    <motion.article
                      className="flex h-full flex-col"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                    >
                      <div className="aspect-[16/9] overflow-hidden border-b border-white/10">
                        <SafeImage
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          wrapperClassName="h-full w-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                          <span className="font-semibold text-primary">{post.category}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <div className="mt-3 flex items-start justify-between gap-4">
                          <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                            {post.title}
                          </h3>
                          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                        </div>
                        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                          {post.excerpt}
                        </p>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <CTASection
        title={
          <>
            Want Us to Put These
            <br />
            <span className="text-gradient">Strategies</span> to Work for You?
          </>
        }
        description="Book a free strategy call and we'll show you exactly how to apply these insights to your business."
        primaryCta={BOOK_A_FREE_STRATEGY_CALL_CTA}
        secondaryCta={null}
        variant="service-close"
        titleClassName="text-[1.74rem] leading-[1.08] md:text-[1.95rem]"
      />
    </>
  );
};

export default Blog;
