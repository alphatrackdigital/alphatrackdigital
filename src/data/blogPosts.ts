export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-skyrocket-your-roi-with-paid-social-campaigns",
    title: "How to Skyrocket Your ROI with Paid Social Campaigns",
    excerpt:
      "Learn the data-driven strategies that separate profitable paid social campaigns from money pits. From precision targeting to real-time optimisation.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/dlxmedia-hu-ZMlcuVf2URA-unsplash-scaled.jpg",
    category: "Paid Social",
    readTime: "5 min read",
    date: "2025-09-17",
  },
  {
    slug: "the-power-of-no-code-web-design-for-small-businesses",
    title: "The Power of No-Code Web Design for Small Businesses",
    excerpt:
      "Why modern no-code platforms are levelling the playing field for small business websites — and how to use them to compete with bigger brands.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/tekimax-AfwnOr1taq0-unsplash-scaled.jpg",
    category: "Web Development",
    readTime: "4 min read",
    date: "2025-09-17",
  },
  {
    slug: "why-programmatic-advertising-is-a-game-changer",
    title: "Why Programmatic Advertising is a Game-Changer",
    excerpt:
      "Programmatic advertising is reshaping how brands reach audiences at scale — here's what you need to know about automated, data-driven ad buying.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/alan-w-AP7tG4LTeXA-unsplash-scaled.jpg",
    category: "Paid Media",
    readTime: "6 min read",
    date: "2025-09-17",
  },
  {
    slug: "conversion-tracking-101-what-most-businesses-get-wrong",
    title: "Conversion Tracking 101: What Most Businesses Get Wrong",
    excerpt:
      "Misconfigured tracking costs businesses thousands in wasted ad spend. Here are the most common mistakes and how to fix them before your next campaign.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/growtika-183Yxo3vsGY-unsplash-scaled.jpg",
    category: "Tracking",
    readTime: "7 min read",
    date: "2025-10-05",
  },
  {
    slug: "marketing-automation-for-small-teams",
    title: "Marketing Automation for Small Teams: Where to Start",
    excerpt:
      "You don't need a 50-person marketing department to automate your lead nurturing. Here's a practical framework for teams of 1-5.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/jotform-g7kFGOV7VI0-unsplash-scaled.jpg",
    category: "Automation",
    readTime: "5 min read",
    date: "2025-10-12",
  },
  {
    slug: "ga4-vs-meta-attribution-which-numbers-to-trust",
    title: "GA4 vs Meta Attribution: Which Numbers Should You Trust?",
    excerpt:
      "Your GA4 and Meta Ads Manager will almost never agree on conversions. Here's why that happens and how to build a reporting model you can trust.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/creatopy-ZWg3VeYz_Ac-unsplash-scaled.jpg",
    category: "Analytics",
    readTime: "6 min read",
    date: "2025-11-03",
  },
  {
    slug: "google-analytics-4-setup-guide",
    title: "How to Set Up Google Analytics 4 the Right Way",
    excerpt:
      "Most GA4 setups are missing critical events, have broken data streams, or track the wrong things entirely. Here's the complete setup guide to do it properly.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    category: "Tracking",
    readTime: "8 min read",
    date: "2025-11-15",
  },
  {
    slug: "meta-pixel-setup-guide",
    title: "The Complete Meta Pixel & CAPI Setup Guide for 2025",
    excerpt:
      "iOS changes killed the basic Meta Pixel. Here's how to set up Conversions API alongside your Pixel to recover lost signal and improve campaign performance.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop&q=80",
    category: "Tracking",
    readTime: "9 min read",
    date: "2025-11-22",
  },
  {
    slug: "linkedin-ads-b2b-strategy-guide",
    title: "LinkedIn Ads for B2B: A Strategy Guide That Actually Works",
    excerpt:
      "LinkedIn is the most expensive ad platform — and the most misused. Here's how to structure campaigns, target the right decision-makers, and turn clicks into qualified pipeline.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80",
    category: "Paid Social",
    readTime: "7 min read",
    date: "2025-12-01",
  },
  {
    slug: "email-automation-flows-every-business-needs",
    title: "5 Email Automation Flows Every Business Needs (And How to Build Them)",
    excerpt:
      "Most businesses set up a welcome email and call it automation. Here are the five high-revenue flows you're probably missing — and exactly how to build them on Brevo or Klaviyo.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&auto=format&fit=crop&q=80",
    category: "Automation",
    readTime: "6 min read",
    date: "2025-12-10",
  },
  {
    slug: "looker-studio-marketing-dashboard-guide",
    title: "How to Build a Marketing Dashboard in Looker Studio",
    excerpt:
      "Stop copy-pasting numbers from five different platforms. Here's how to build a single source-of-truth marketing dashboard in Looker Studio that your whole team can use.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    category: "Analytics",
    readTime: "7 min read",
    date: "2025-12-18",
  },
  {
    slug: "server-side-tracking-why-your-business-needs-it",
    title: "Server-Side Tracking: Why Your Business Needs It in 2025",
    excerpt:
      "Ad blockers, iOS privacy changes, and cookie restrictions are breaking client-side tracking across the board. Server-side tagging is no longer optional — here's why and how to implement it.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
    category: "Tracking",
    readTime: "8 min read",
    date: "2026-01-08",
  },
];

export const getFeaturedBlogPosts = (count = 3) => blogPosts.slice(0, count);

export const getBlogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const getRelatedBlogPosts = (slug: string, count = 3) =>
  blogPosts.filter((post) => post.slug !== slug).slice(0, count);
