import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/shared/SEO";
import CTASection from "@/components/shared/CTASection";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/data/blogPosts";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

const articleContent: Record<string, JSX.Element> = {
  "how-to-skyrocket-your-roi-with-paid-social-campaigns": (
    <>
      <p>In today's fast-paced digital landscape, paid social campaigns are a powerful tool for businesses looking to amplify their reach and drive conversions. At AlphaTrack Digital, we've mastered the art of turning social media engagement into measurable results.</p>
      <h2>Why Paid Social is a Must for Your Business</h2>
      <div className="my-8 grid gap-4 md:grid-cols-2">
        <img src="https://alphatrack.digital/wp-content/uploads/2025/09/growtika-183Yxo3vsGY-unsplash-scaled.jpg" alt="Data-driven marketing" className="rounded-xl object-cover w-full h-64" loading="lazy" />
        <img src="https://alphatrack.digital/wp-content/uploads/2025/09/souvik-banerjee-OMhubJCrtu0-unsplash-scaled.jpg" alt="Social media platforms" className="rounded-xl object-cover w-full h-64" loading="lazy" />
      </div>
      <p>Social media platforms like Facebook, Instagram, LinkedIn, and TikTok have billions of active users, making them prime real estate for reaching your target audience. Paid social campaigns allow you to cut through the noise, ensuring your brand connects with the right people at the right time.</p>
      <h2>Strategies to Maximise Your Paid Social ROI</h2>
      <h3>1. Define Clear Campaign Objectives</h3>
      <p>Before launching a campaign, clarity is key. Are you aiming for brand awareness, lead generation, or direct sales? Setting specific, measurable goals ensures your campaign is focused and trackable.</p>
      <h3>2. Leverage Precision Audience Targeting</h3>
      <p>Paid social platforms offer advanced targeting options to reach your ideal customers. Use demographic data, interests, behaviours, and lookalike audiences to ensure your ads hit the mark.</p>
      <h3>3. Craft Compelling Creative Content</h3>
      <p>Your ad's creative is the hook that grabs attention. Invest in high-quality visuals, concise copy, and a strong CTA. Research shows that 64% of consumers are more likely to engage with visually appealing ads.</p>
      <h3>4. Optimise for Conversions</h3>
      <p>Driving clicks is only half the battle — conversions are where ROI happens. Ensure your landing pages are optimised for user experience and aligned with your ad's messaging.</p>
      <h3>5. Monitor and Optimise in Real-Time</h3>
      <p>Paid social campaigns thrive on continuous optimisation. Use platform analytics to track performance and adjust bids, audiences, or creatives as needed.</p>
      <h2>Why Partner with AlphaTrack Digital?</h2>
      <p>We combine data-driven precision with creative expertise to deliver campaigns that don't just perform — they soar. Our team conducts in-depth audience analysis, optimises ad spend, and provides transparent reporting to ensure every pound drives results.</p>
    </>
  ),
  "the-power-of-no-code-web-design-for-small-businesses": (
    <>
      <p>For small businesses, a strong online presence is non-negotiable — but building a professional website can seem daunting, especially with limited budgets and technical expertise. Enter no-code web design: a game-changing solution that empowers small businesses to create stunning, high-performing websites without writing a single line of code.</p>
      <h2>What is No-Code Web Design?</h2>
      <div className="my-8 grid gap-4 md:grid-cols-2">
        <img src="https://alphatrack.digital/wp-content/uploads/2025/09/fikret-tozak-rfNLa1HL7eY-unsplash-scaled.jpg" alt="No-code design" className="rounded-xl object-cover w-full h-64" loading="lazy" />
        <img src="https://alphatrack.digital/wp-content/uploads/2025/09/annie-spratt-FSFfEQkd1sc-unsplash-scaled.jpg" alt="Small business website" className="rounded-xl object-cover w-full h-64" loading="lazy" />
      </div>
      <p>No-code web design uses intuitive platforms like Webflow, Wix, or Bubble to build websites through drag-and-drop interfaces and pre-built templates. These tools eliminate the need for coding expertise, making website creation accessible, fast, and cost-effective.</p>
      <h2>Benefits for Small Businesses</h2>
      <h3>1. Cost-Effective Development</h3>
      <p>Traditional web development can cost thousands of pounds, but no-code platforms significantly reduce expenses by eliminating the need for developers.</p>
      <h3>2. Rapid Deployment</h3>
      <p>No-code platforms allow you to launch a professional website in days, not months.</p>
      <h3>3. User-Friendly Management</h3>
      <p>No-code platforms empower you to take control of your website without technical skills.</p>
      <h3>4. SEO and Mobile Optimisation</h3>
      <p>A great website isn't just about looks — it needs to perform. No-code platforms integrate SEO tools and responsive design.</p>
      <h3>5. Customisation Without Complexity</h3>
      <p>You can create a unique, branded website that reflects your business's identity with custom designs and flexible features.</p>
    </>
  ),
  "why-programmatic-advertising-is-a-game-changer": (
    <>
      <p>In the crowded digital advertising space, reaching the right audience with the right message at the right time is a challenge. Programmatic advertising solves this by using data and automation to deliver precision-targeted ads with unmatched efficiency.</p>
      <h2>What is Programmatic Advertising?</h2>
      <div className="my-8 grid gap-4 md:grid-cols-2">
        <img src="https://alphatrack.digital/wp-content/uploads/2025/09/markus-spiske-yPBgHCsKdWE-unsplash-768x1152.jpg" alt="Data advertising" className="rounded-xl object-cover w-full h-64" loading="lazy" />
        <img src="https://alphatrack.digital/wp-content/uploads/2025/09/collabstr-6fsyon1MWRM-unsplash-scaled.jpg" alt="Programmatic ads" className="rounded-xl object-cover w-full h-64" loading="lazy" />
      </div>
      <p>Programmatic advertising uses automated technology — like real-time bidding (RTB) and AI-driven algorithms — to buy and optimise ad placements across digital platforms. Programmatic ad spending is projected to reach $725 billion globally by 2026.</p>
      <h2>Key Benefits</h2>
      <h3>1. Precision Targeting at Scale</h3>
      <p>Programmatic uses data signals to serve ads to the most relevant audiences. You can reach thousands of micro-segments simultaneously.</p>
      <h3>2. Real-Time Optimisation</h3>
      <p>Unlike traditional media buying, programmatic campaigns optimise in real-time. Algorithms continuously adjust bids, placements, and creative.</p>
      <h3>3. Cost Efficiency</h3>
      <p>Automated bidding ensures you pay fair market value for each impression. Combined with precise targeting, this means less waste and better returns.</p>
      <h3>4. Cross-Channel Reach</h3>
      <p>Programmatic extends beyond display ads — video, connected TV, audio, digital out-of-home, and native advertising.</p>
    </>
  ),
  "conversion-tracking-101-what-most-businesses-get-wrong": (
    <>
      <p>Misconfigured conversion tracking is one of the most expensive mistakes a business can make. When your tracking is wrong, every decision you make about ad spend, audience targeting, and creative is based on flawed data.</p>
      <h2>The Most Common Tracking Mistakes</h2>
      <h3>1. Duplicate Event Firing</h3>
      <p>This is the most common issue we see. A single conversion fires multiple times — inflating your numbers and making campaigns look more profitable than they are. The fix: event deduplication through GTM and server-side validation.</p>
      <h3>2. Missing Cross-Domain Tracking</h3>
      <p>If your checkout or booking system is on a different domain, you're probably losing attribution data. Users appear as "direct" traffic instead of being attributed to the campaign that sent them.</p>
      <h3>3. Ignoring Consent Mode</h3>
      <p>With GDPR and privacy regulations tightening, consent mode v2 isn't optional. Without it, you're underreporting conversions by 30-50% in many European markets.</p>
      <h3>4. Platform Attribution Mismatch</h3>
      <p>GA4 says one thing, Meta says another, Google Ads says something else entirely. Each platform has different attribution windows and models. Without a unified measurement framework, you'll never know the truth.</p>
      <h2>How to Fix It</h2>
      <p>Start with an audit. We use a systematic approach: audit every event, validate every pixel, test every conversion path, and build a source-of-truth dashboard that reconciles platform data.</p>
    </>
  ),
  "marketing-automation-for-small-teams": (
    <>
      <p>Marketing automation isn't just for enterprise companies with dedicated ops teams. If you're a small team drowning in manual follow-ups, missed leads, and repetitive tasks, automation is your biggest lever for growth.</p>
      <h2>Where to Start</h2>
      <h3>1. Automated Welcome Sequences</h3>
      <p>When someone fills out a form or signs up, what happens? If the answer is "we try to email them within a day or two," you're losing leads. Set up a 3-5 email welcome sequence that triggers instantly.</p>
      <h3>2. Lead Scoring</h3>
      <p>Not all leads are equal. Assign points based on actions (opened email = 1 point, visited pricing page = 5 points, booked a call = 10 points). When a lead hits a threshold, alert your sales team.</p>
      <h3>3. Abandoned Form Recovery</h3>
      <p>Someone started filling out your contact form but didn't submit? With the right tracking and automation, you can follow up with a gentle reminder email.</p>
      <h3>4. Internal Notifications</h3>
      <p>Automate Slack or email notifications when high-value actions happen. A new lead from your best-performing campaign? Your team knows instantly.</p>
      <h2>Recommended Tools for Small Teams</h2>
      <p>We recommend Brevo for most small teams. It combines email marketing, CRM, automation workflows, and transactional emails in one affordable platform — and it's what we use ourselves.</p>
    </>
  ),
  "ga4-vs-meta-attribution-which-numbers-to-trust": (
    <>
      <p>If you've ever compared your GA4 data with your Meta Ads Manager, you've probably noticed they never agree. This isn't a bug — it's a fundamental difference in how each platform measures conversions.</p>
      <h2>Why the Numbers Don't Match</h2>
      <h3>1. Attribution Windows</h3>
      <p>GA4 uses a last-click, session-based model by default. Meta uses a 7-day click, 1-day view window. Someone could click your ad on Monday, come back via Google search on Wednesday, and convert. GA4 credits Google; Meta credits itself.</p>
      <h3>2. Conversion Counting</h3>
      <p>GA4 can be set to count one conversion per session or one per event. Meta counts every conversion within its attribution window. Same user, different numbers.</p>
      <h3>3. Cross-Device Tracking</h3>
      <p>Meta has strong cross-device tracking because users are logged in. GA4 relies on cookies and Google Signals, which have gaps — especially on iOS.</p>
      <h2>Building a Trustworthy Reporting Model</h2>
      <p>The solution isn't to pick one platform over the other. Instead, build a unified measurement framework. Use GA4 as your source of truth for web analytics, use platform data for optimisation signals, and reconcile with server-side conversion data for the real picture.</p>
      <p>At AlphaTrack Digital, we build custom Looker Studio dashboards that pull from multiple sources and present a single view of truth. No more guessing which number is right.</p>
    </>
  ),
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  if (!post || !slug || !articleContent[slug]) return <Navigate to="/blog" replace />;

  const relatedPosts = getRelatedBlogPosts(slug, 3);

  return (
    <>
      <SEO
        title={`${post.title} | AlphaTrack Digital Blog`}
        description={post.excerpt}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.image}
      />
      <section className="relative overflow-hidden py-24 md:py-28" style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.03) 0%, transparent 100%)" }}>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Blog", path: "/blog" }, { label: post.title }]} />
        </div>
      </section>
      <article className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link to="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">{post.category}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {post.readTime}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="mt-8 overflow-hidden rounded-xl">
              <img
                src={post.image}
                alt={post.title}
                className="h-auto w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="mt-10 space-y-5 text-[16px] leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mb-4">
              {articleContent[slug]}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="border-t border-white/10 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold">More Articles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((rp) => (
              <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <div className="h-40 overflow-hidden"><img src={rp.image} alt={rp.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /></div>
                <div className="p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{rp.category}</span>
                  <h3 className="mt-2 text-sm font-semibold leading-snug">{rp.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Apply These Strategies?"
        description="Book a call and let's build a plan tailored to your business."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
      />
    </>
  );
};

export default BlogPost;
