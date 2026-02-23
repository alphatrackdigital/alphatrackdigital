import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SEO from "@/components/shared/SEO";
import CTASection from "@/components/shared/CTASection";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/data/blogPosts";
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Link2, BarChart3 } from "lucide-react";

// Image with fallback
const HeroImage = ({ src, alt }: { src: string; alt: string }) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 md:h-96">
        <BarChart3 className="h-12 w-12 text-primary/30" />
      </div>
    );
  }
  return (
    <div className="mt-8 overflow-hidden rounded-xl">
      <img
        src={src}
        alt={alt}
        className="h-auto w-full object-cover"
        loading="eager"
        fetchPriority="high"
        onError={() => setError(true)}
      />
    </div>
  );
};

// --- Reading progress hook ---
const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
};

// --- Social share ---
const ShareBar = ({ title, slug }: { title: string; slug: string }) => {
  const [copied, setCopied] = useState(false);
  const url = `https://alphatrack.digital/blog/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-8">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
      >
        <Twitter className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
      >
        <Linkedin className="h-3.5 w-3.5" />
      </a>
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
      >
        <Link2 className="h-3.5 w-3.5" />
      </button>
      {copied && <span className="text-xs text-primary">Copied!</span>}
    </div>
  );
};

// --- Article content ---
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
  "google-analytics-4-setup-guide": (
    <>
      <p>Most businesses have GA4 installed. Very few have it set up correctly. A tag that fires doesn't mean data you can trust — there's a significant gap between "GA4 is on the site" and "GA4 is giving us actionable intelligence."</p>
      <h2>Step 1: Audit Your Existing Data Stream</h2>
      <p>Before building anything new, understand what you have. Check your GA4 property for duplicate data streams, misconfigured event parameters, and inflated session counts from internal traffic. Internal traffic is one of the most overlooked sources of data pollution.</p>
      <h3>Define Internal Traffic Filters</h3>
      <p>In GA4 Admin → Data Streams → Configure Tag Settings → Define Internal Traffic. Add your office IP ranges. Then create a filter in Admin → Data Filters to exclude internal traffic from reports. Without this, your team's daily visits are inflating bounce rates and conversion data.</p>
      <h2>Step 2: Configure Key Events Correctly</h2>
      <p>GA4 uses "events" where Universal Analytics used "goals." The distinction matters because every interaction is now an event — but only the ones you mark as key events will show in your conversion reports.</p>
      <h3>What to Mark as Key Events</h3>
      <p>Prioritise events that signal clear business intent: form_submit, purchase, schedule_call, file_download (for lead magnets), and phone_call_click. Do not mark every pageview or scroll event as a key event — it will dilute your data and make optimisation impossible.</p>
      <h3>Use GTM for Event Tracking — Not GA4 Directly</h3>
      <p>Whenever possible, implement events through Google Tag Manager rather than hardcoded GA4 tags. GTM gives you version control, the ability to test before publishing, and a central hub for all your tracking. This is especially important when working across multiple platforms simultaneously.</p>
      <h2>Step 3: Set Up Enhanced Measurement Carefully</h2>
      <p>GA4's Enhanced Measurement automatically tracks scrolls, outbound clicks, video engagement, and file downloads. This sounds great until you realise it can also double-count events, fire on irrelevant interactions, and create noise in your data. Review each Enhanced Measurement toggle individually and disable any that conflict with your custom event setup.</p>
      <h2>Step 4: Connect Google Search Console and Google Ads</h2>
      <p>Linking Search Console surfaces organic search queries directly in GA4 — invaluable for understanding which keywords drive converting traffic. Linking Google Ads enables auto-tagging and brings cost data into your reports, allowing true cross-channel ROAS analysis.</p>
      <h2>Step 5: Validate With DebugView</h2>
      <p>Before you declare your setup complete, use GA4's DebugView (Real-time → DebugView) with the GA Debugger Chrome extension enabled. Walk through every conversion path on your site and confirm events are firing correctly, with the right parameters, at the right moment. A setup that hasn't been validated is a setup you cannot trust.</p>
      <h2>The Bottom Line</h2>
      <p>A properly configured GA4 property is one of the highest-ROI investments a business can make. It turns your marketing budget from a guess into a science. If you're unsure whether your current setup is working correctly, start with an audit — it will almost certainly reveal gaps that are costing you money.</p>
    </>
  ),
  "meta-pixel-setup-guide": (
    <>
      <p>The Meta Pixel was once the backbone of Facebook and Instagram advertising. Then Apple introduced App Tracking Transparency in iOS 14.5, and everything changed. Cookie-based tracking became unreliable. Conversions disappeared from the platform. ROAS calculations became guesswork.</p>
      <p>The answer isn't to abandon Meta advertising — it's to upgrade your tracking infrastructure. Here's how to set up both the Meta Pixel and Conversions API (CAPI) correctly for 2025.</p>
      <h2>Why the Pixel Alone Is No Longer Enough</h2>
      <p>The standard Meta Pixel fires from the user's browser. When a user has iOS privacy restrictions, an ad blocker, or a privacy-focused browser, the Pixel signal is either blocked or degraded. Studies suggest that in privacy-regulated markets, client-side Pixel tracking underreports conversions by 30–60%. You're bidding blind.</p>
      <h2>What Is the Conversions API?</h2>
      <p>The Conversions API (CAPI) sends conversion data directly from your server to Meta — bypassing the browser entirely. This means no ad blockers, no iOS limitations, and significantly more complete data. When combined with the browser Pixel (using event deduplication to prevent double-counting), you get the most complete picture of your campaign performance possible.</p>
      <h2>Setting Up the Meta Pixel</h2>
      <h3>1. Create Your Pixel in Meta Events Manager</h3>
      <p>Go to Meta Business Suite → Events Manager → Connect Data Sources → Web. Create a new Pixel and give it a clear name tied to your business. Never share one Pixel across multiple unrelated businesses or domains.</p>
      <h3>2. Install via Google Tag Manager</h3>
      <p>Use the Meta Pixel base code as a Custom HTML tag in GTM, firing on All Pages. Then create individual GTM triggers for each key conversion event: lead form submissions, purchases, book-a-call completions. This keeps your Pixel setup modular and auditable.</p>
      <h3>3. Enable Advanced Matching</h3>
      <p>Advanced Matching sends hashed customer data (email, phone, name) alongside conversion events. This dramatically improves match rates — often by 20–40% — and helps Meta attribute conversions that the Pixel would otherwise miss. Enable it in your Pixel settings and pass available customer data at the point of conversion.</p>
      <h2>Setting Up Conversions API</h2>
      <h3>Option A: Partner Integration (Fastest)</h3>
      <p>If you're on Shopify, WooCommerce, or another supported platform, Meta has native CAPI integrations. These are the fastest to implement and handle deduplication automatically.</p>
      <h3>Option B: Gateway via GTM Server-Side (Recommended)</h3>
      <p>For custom setups, implement CAPI through a server-side GTM container. This gives you full control, works across any platform, and allows you to enrich events with first-party data before sending to Meta. It requires more technical setup but is the most robust long-term solution.</p>
      <h2>Deduplication: The Critical Step Most Businesses Skip</h2>
      <p>When running both Pixel and CAPI, the same conversion will be detected by both. Without deduplication, Meta will count it twice — inflating your conversion numbers and distorting your optimisation signals. Always pass matching event_id values from both the browser Pixel and CAPI for the same event. Meta uses this to deduplicate correctly.</p>
      <h2>Verify in Events Manager</h2>
      <p>After setup, use Meta's Test Events tool in Events Manager to confirm events are firing correctly from both browser and server. Check the Event Match Quality score — aim for 7.0 or above. Lower scores indicate gaps in your customer data matching that will hurt your campaign performance.</p>
    </>
  ),
  "linkedin-ads-b2b-strategy-guide": (
    <>
      <p>LinkedIn advertising is simultaneously the most powerful and most wasteful B2B channel — depending entirely on how you approach it. The platform's targeting is unmatched: job title, seniority, company size, industry, skills. But CPCs average £8–£15, and a poorly structured campaign burns through budget without a single qualified lead to show for it.</p>
      <p>Here's how to approach LinkedIn Ads strategically so the cost per qualified lead is justified.</p>
      <h2>Start With Objective Clarity</h2>
      <p>LinkedIn offers three broad objectives: Awareness, Consideration, and Conversion. Most B2B advertisers make the mistake of jumping straight to Lead Gen Forms for cold audiences. This rarely works. Your target audience doesn't know you, doesn't trust you, and has no reason to hand over their contact details in exchange for a generic eBook.</p>
      <p>The most effective LinkedIn strategy is a layered funnel. Start with thought leadership content (Awareness), move to offer-specific ads for warm audiences (Consideration), then close with direct response for high-intent signals (Conversion).</p>
      <h2>Audience Targeting: Getting It Right</h2>
      <h3>Job Title vs. Job Function</h3>
      <p>Job titles on LinkedIn are inconsistent — "Growth Manager" at one company means something completely different at another. Unless you're targeting a very specific, well-defined title (e.g., "Chief Marketing Officer"), use Job Function + Seniority instead. This gives you broader reach while maintaining relevance.</p>
      <h3>Company Size Segmentation</h3>
      <p>SMBs, mid-market, and enterprise prospects have fundamentally different needs, budgets, and decision-making processes. Create separate campaigns for each segment with tailored messaging. An ad that resonates with a 10-person startup will not speak to a procurement lead at a 500-person company.</p>
      <h3>Matched Audiences</h3>
      <p>Upload your CRM contact list or website visitor audiences to create Matched Audiences. These warm audiences will have significantly lower CPLs and higher conversion rates than cold targeting. Use them for retargeting campaigns with specific offers.</p>
      <h2>Ad Formats That Perform</h2>
      <h3>Thought Leadership Ads</h3>
      <p>Boost organic posts from your company page or personal profiles as Thought Leadership Ads. These blend seamlessly into the feed, generate higher engagement than standard sponsored content, and build brand credibility with your target audience over time.</p>
      <h3>Single Image Ads</h3>
      <p>For direct response, Single Image Ads with a clear value proposition and specific CTA consistently outperform carousel and video for lead generation. Keep copy tight: one problem, one solution, one action.</p>
      <h3>Document Ads</h3>
      <p>Document Ads let prospects preview a PDF (report, checklist, playbook) natively in the feed before downloading. They generate high engagement and are excellent for gated content lead generation without requiring users to leave LinkedIn.</p>
      <h2>Bidding and Budget Strategy</h2>
      <p>Start with Manual CPC bidding at 80% of LinkedIn's suggested bid. This gives you control while avoiding overpaying. As you gather conversion data (aim for at least 20–30 conversions per ad set), switch to Maximum Delivery for the campaigns that are performing. Set minimum daily budgets of £30–50 per campaign — below this, the algorithm doesn't have enough delivery signals to optimise effectively.</p>
      <h2>Measuring What Matters</h2>
      <p>LinkedIn's native attribution is self-reported and notoriously liberal. Use the LinkedIn Insight Tag combined with GA4 UTM tracking for a more honest view of performance. Your North Star metrics should be cost per Marketing Qualified Lead (MQL) and pipeline influence — not vanity metrics like click-through rate or follower growth.</p>
    </>
  ),
  "email-automation-flows-every-business-needs": (
    <>
      <p>Email automation is not about sending more emails. It's about sending the right message, to the right person, at exactly the right moment — without manual effort. When done correctly, automated email flows generate revenue 24/7 while your team focuses on higher-leverage work.</p>
      <p>Most businesses implement one or two flows and leave significant revenue on the table. Here are the five flows every business should have active.</p>
      <h2>Flow 1: Welcome Sequence</h2>
      <p>This is the single highest-ROI automation you can build. When someone subscribes, requests a lead magnet, or signs up for your newsletter, they're at peak engagement. Your welcome sequence capitalises on this moment.</p>
      <p>A high-converting welcome sequence has 4–6 emails over 7–10 days: Email 1 delivers what was promised (immediate, automated). Email 2 introduces your brand story and what makes you different. Email 3 addresses the primary pain point your audience has. Email 4 shares social proof — case studies, testimonials, results. Email 5 presents a clear call-to-action (book a call, start a trial, shop now). Email 6 is a follow-up for non-converters with a different angle or incentive.</p>
      <h2>Flow 2: Abandoned Cart Recovery</h2>
      <p>For e-commerce businesses, this is the highest-revenue automation by volume. Between 70–80% of shopping carts are abandoned. A three-email recovery sequence typically recaptures 5–15% of those lost sales.</p>
      <p>Email 1 goes out 1 hour after abandonment — a simple, warm reminder. Email 2 goes out 24 hours later and addresses the most common objection (price, trust, urgency). Email 3 goes out 72 hours later with a time-limited incentive (10% off, free shipping). Keep the design simple and the copy human. Elaborate templates often underperform plain text in this context.</p>
      <h2>Flow 3: Lead Nurture Sequence</h2>
      <p>Most B2B leads are not ready to buy when they first engage with your brand. Research suggests that 50% of qualified leads are not yet ready to purchase at initial contact. A lead nurture sequence keeps you top of mind until they are.</p>
      <p>Segment your leads by interest and intent signal, then deliver content that matches where they are in the buying journey. Top of funnel: educational content and insights. Middle of funnel: case studies, comparisons, and differentiation. Bottom of funnel: demos, consultations, and specific offers.</p>
      <h2>Flow 4: Post-Purchase Onboarding</h2>
      <p>The sale is not the finish line — it's the starting line. Post-purchase onboarding reduces churn, increases product adoption, and dramatically improves lifetime value. For service businesses, this means guiding the client through the onboarding process, setting expectations, and delivering early wins. For e-commerce, it means confirming the order, setting delivery expectations, sharing usage tips, and planting the seed for the next purchase.</p>
      <h2>Flow 5: Re-Engagement (Win-Back)</h2>
      <p>Subscribers who haven't engaged in 90+ days are damaging your deliverability. A win-back flow serves two purposes: it reactivates the ones who can be saved and cleanly removes the ones who can't, protecting your sender reputation.</p>
      <p>A four-email win-back sequence: "We miss you" (personal, informal), "Here's what you've missed" (value-led update), "Is this still relevant to you?" (direct, with easy opt-out), and finally a sunset email that says you're removing them unless they click to stay. The last email often gets surprisingly high engagement — people respond to finality.</p>
      <h2>Platform Recommendations</h2>
      <p>For most businesses, we recommend Brevo for its combination of CRM, marketing automation, and transactional emails at an accessible price point. Klaviyo is the gold standard for e-commerce brands with complex segmentation needs. For HubSpot users, the built-in workflows are powerful but require proper training to use effectively. Choose based on your business model and technical capacity — the best platform is the one your team will actually use and maintain.</p>
    </>
  ),
  "looker-studio-marketing-dashboard-guide": (
    <>
      <p>Most marketing teams spend hours every week copy-pasting numbers from Google Ads, Meta, GA4, and their CRM into spreadsheets. By the time the report is ready, it's already out of date. Looker Studio (formerly Google Data Studio) eliminates this entirely — pulling live data from every connected source into a single, always-current dashboard.</p>
      <p>Here's how to build a marketing dashboard that actually drives decisions.</p>
      <h2>Step 1: Define Your Reporting Framework First</h2>
      <p>The most common Looker Studio mistake is connecting data sources before agreeing on what you want to measure. Decide first: Who is this dashboard for? What decisions will it inform? What metrics matter and which are vanity? A CEO dashboard looks entirely different from a paid media manager dashboard. Build for the audience, not for completeness.</p>
      <h2>Step 2: Connect Your Data Sources</h2>
      <p>Looker Studio has native connectors for GA4, Google Ads, Google Search Console, and YouTube. For Meta Ads, LinkedIn Ads, and CRM data, you'll need third-party connectors. The most reliable options are Supermetrics, Porter Metrics (budget-friendly), and Funnel.io for enterprise-scale needs.</p>
      <p>When connecting multiple ad platforms, establish a consistent UTM taxonomy across all campaigns first. Without this, your channel attribution will be fragmented and untrustworthy.</p>
      <h2>Step 3: Structure Your Dashboard Pages</h2>
      <p>A well-structured marketing dashboard has distinct pages for different stakeholders and time horizons. Page 1 — Executive Summary: total leads, revenue attribution, key channel performance, month-over-month trend. Page 2 — Paid Media: spend by channel, ROAS, CPL by campaign, creative performance. Page 3 — Organic: SEO rankings, organic traffic, top pages, search query performance. Page 4 — Email & Automation: open rates, click rates, flow performance, list health. Page 5 — Conversion Funnel: traffic → leads → MQLs → customers, with drop-off rates at each stage.</p>
      <h2>Step 4: Build Calculated Fields for True Metrics</h2>
      <p>Looker Studio's real power lies in calculated fields. Instead of showing raw GA4 session data, build fields that calculate: blended ROAS (total revenue ÷ total ad spend), cost per qualified lead, email contribution to revenue, and channel share of wallet. These composite metrics are what drive strategic decisions — not individual platform metrics viewed in isolation.</p>
      <h2>Step 5: Set Up Automated Scheduling</h2>
      <p>Once your dashboard is built, schedule automated email delivery to stakeholders every Monday morning. This single habit replaces hours of weekly reporting and ensures the entire team is aligned on the same numbers before the week begins. In Looker Studio, go to Share → Schedule Email Delivery to configure this.</p>
      <h2>Common Mistakes to Avoid</h2>
      <p>Overloading a single page with too many charts — aim for 6–8 visualisations per page maximum. Mixing date ranges across charts (all charts on a page should use a consistent date comparison). Using default chart types — scatter plots and bullet charts are often more informative than bar charts for marketing data. And failing to add filter controls — every dashboard should have a date range selector and at minimum one campaign/channel filter.</p>
    </>
  ),
  "server-side-tracking-why-your-business-needs-it": (
    <>
      <p>In 2019, server-side tracking was a luxury for large enterprises with dedicated engineering teams. In 2025, it's a necessity for any business spending meaningfully on digital advertising. Here's why the shift happened and exactly what you need to do about it.</p>
      <h2>What Broke Client-Side Tracking</h2>
      <p>Traditional tracking works by placing JavaScript tags (pixels) in a user's browser. When someone converts, the browser fires a signal to Google, Meta, or whoever placed the tag. This system worked well for over a decade. Then three things happened simultaneously:</p>
      <p>First, iOS 14.5 introduced App Tracking Transparency in April 2021, requiring apps to ask permission before tracking users. Most users declined. Meta lost visibility into a significant portion of iOS conversions overnight. Second, browser vendors — Safari leading the way, Firefox following — began aggressively restricting third-party cookies and shortening cookie lifespans. ITP (Intelligent Tracking Prevention) in Safari now deletes many cookies after 24 hours. Third, ad blocker adoption reached 42% globally among desktop users in 2024. Every ad blocker, by default, blocks the tracking pixels that your campaign optimisation depends on.</p>
      <h2>What Server-Side Tracking Is</h2>
      <p>Server-side tracking moves tag execution from the user's browser to your own server (or a cloud container you control). Instead of a user's browser firing a tag directly to Google Ads or Meta, your server receives the event data first, processes it, and then sends it to the advertising platforms. Ad blockers can't block your own server. Browser privacy restrictions don't apply to server-to-server communication. Cookies set by your server (first-party) have full lifespans.</p>
      <h2>Google Tag Manager Server-Side Container</h2>
      <p>The most accessible entry point for most businesses is a server-side GTM container. Google provides a tagging server that can be deployed on Google Cloud Run, AWS, or any container service. Once deployed, you proxy your GA4 and Google Ads tags through it, dramatically improving data quality and enabling first-party cookie setting with full lifespans.</p>
      <p>The setup requires: a Cloud Run instance (approximately $20–30/month for most businesses), a subdomain on your domain (e.g., metrics.yourdomain.com) pointing to the container, updated GTM client-side tags to route through your server, and server-side tags for each platform you're sending data to.</p>
      <h2>Meta Conversions API (CAPI)</h2>
      <p>Meta's server-side solution is the Conversions API. CAPI sends conversion events directly from your server to Meta's API, bypassing the browser entirely. When implemented alongside the Meta Pixel with proper event deduplication, businesses typically recover 20–40% of previously untracked conversions. For a business spending £5,000/month on Meta ads, recovering 30% of lost conversion signal can translate directly into better bid optimisation and meaningfully lower cost per acquisition.</p>
      <h2>First-Party Data Strategy</h2>
      <p>Server-side tracking is also the foundation of a first-party data strategy. With third-party cookies effectively dead, the brands that win in the next decade will be those with rich, consent-based first-party data that powers their own targeting. Server-side infrastructure allows you to collect, enrich, and activate this data in ways that client-side tracking cannot.</p>
      <h2>Is It Worth the Investment?</h2>
      <p>For any business spending over £2,000/month on paid digital advertising, yes — unambiguously. The data quality improvement alone typically pays for the implementation within 60–90 days through better campaign optimisation. Beyond that, the long-term strategic value of a robust first-party data infrastructure cannot be overstated as the digital advertising ecosystem continues to move toward privacy-first models.</p>
    </>
  ),
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  if (!post || !slug || !articleContent[slug]) return <Navigate to="/blog" replace />;

  const relatedPosts = getRelatedBlogPosts(slug, 3);
  const progress = useReadingProgress();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "AlphaTrack Digital",
      url: "https://alphatrack.digital",
    },
    publisher: {
      "@type": "Organization",
      name: "AlphaTrack Digital",
      logo: {
        "@type": "ImageObject",
        url: "https://alphatrack.digital/wp-content/uploads/2025/08/Group-320.png",
      },
    },
  };

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-[9999] h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-100"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <SEO
        title={`${post.title} | AlphaTrack Digital Blog`}
        description={post.excerpt}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.image}
        schema={articleSchema}
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

            {/* Author line */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                AT
              </div>
              <span className="text-sm text-muted-foreground">
                By <span className="font-medium text-foreground">AlphaTrack Digital Team</span>
              </span>
            </div>

            <HeroImage src={post.image} alt={post.title} />
            <div className="mt-10 space-y-5 text-[16px] leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mb-4">
              {articleContent[slug]}
            </div>

            <ShareBar title={post.title} slug={slug} />
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
