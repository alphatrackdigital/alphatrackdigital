import { blogPosts, getFeaturedBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/data/blogPosts";

describe("blog data consistency", () => {
  it("resolves featured posts from the canonical data source", () => {
    const featured = getFeaturedBlogPosts(3);
    expect(featured).toHaveLength(3);
    featured.forEach((post) => {
      expect(getBlogPostBySlug(post.slug)).toEqual(post);
    });
  });

  it("returns related posts excluding the active slug", () => {
    const activePost = blogPosts[0];
    const related = getRelatedBlogPosts(activePost.slug, 3);
    expect(related).toHaveLength(3);
    related.forEach((post) => {
      expect(post.slug).not.toBe(activePost.slug);
    });
  });
});
