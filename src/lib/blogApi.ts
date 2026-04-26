export interface ApiBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  ok: boolean;
  posts: ApiBlogPost[];
  total: number;
  page: number;
  limit: number;
}

export async function fetchBlogPosts(page = 1, limit = 20, category?: string): Promise<BlogListResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category && category !== "All") params.set("category", category);
  const res = await fetch(`/api/blog?${params}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchBlogPost(slug: string): Promise<ApiBlogPost> {
  const res = await fetch(`/api/blog/${slug}`);
  if (!res.ok) throw new Error("Post not found");
  const data = await res.json();
  return data.post;
}
