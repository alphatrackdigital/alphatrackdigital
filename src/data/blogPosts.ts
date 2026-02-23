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
      "Programmatic advertising is reshaping how brands reach audiences at scale — here’s what you need to know about automated, data-driven ad buying.",
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
      "You don’t need a 50-person marketing department to automate your lead nurturing. Here’s a practical framework for teams of 1-5.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/jotform-g7kFGOV7VI0-unsplash-scaled.jpg",
    category: "Automation",
    readTime: "5 min read",
    date: "2025-10-12",
  },
  {
    slug: "ga4-vs-meta-attribution-which-numbers-to-trust",
    title: "GA4 vs Meta Attribution: Which Numbers Should You Trust?",
    excerpt:
      "Your GA4 and Meta Ads Manager will almost never agree on conversions. Here’s why that happens and how to build a reporting model you can trust.",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/creatopy-ZWg3VeYz_Ac-unsplash-scaled.jpg",
    category: "Analytics",
    readTime: "6 min read",
    date: "2025-11-03",
  },
];

export const getFeaturedBlogPosts = (count = 3) => blogPosts.slice(0, count);

export const getBlogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const getRelatedBlogPosts = (slug: string, count = 3) =>
  blogPosts.filter((post) => post.slug !== slug).slice(0, count);
