export interface BlogPost {
  title: string;
  excerpt: string;
  url: string;
  image: string;
  readTime: string;
}

export const featuredBlogPosts: BlogPost[] = [
  {
    title: "How to Skyrocket Your ROI with Paid Social Campaigns",
    excerpt:
      "Learn the data-driven strategies that separate profitable paid social campaigns from money pits.",
    url: "/blog/how-to-skyrocket-your-roi-with-paid-social-campaigns",
    image:
      "https://alphatrack.digital/wp-content/uploads/2025/09/dlxmedia-hu-ZMlcuVf2URA-unsplash-scaled.jpg",
    readTime: "5 min read",
  },
  {
    title: "The Power of No-Code Web Design for Small Businesses",
    excerpt:
      "Why modern no-code platforms are levelling the playing field for small business websites.",
    url: "/blog/the-power-of-no-code-web-design-for-small-businesses",
    image:
      "https://alphatrack.digital/wp-content/uploads/2025/09/tekimax-AfwnOr1taq0-unsplash-scaled.jpg",
    readTime: "4 min read",
  },
  {
    title: "Why Programmatic Advertising is a Game-Changer",
    excerpt:
      "Programmatic advertising is reshaping how brands reach audiences at scale — here's what you need to know.",
    url: "/blog/why-programmatic-advertising-is-a-game-changer",
    image:
      "https://alphatrack.digital/wp-content/uploads/2025/09/alan-w-AP7tG4LTeXA-unsplash-scaled.jpg",
    readTime: "6 min read",
  },
];
