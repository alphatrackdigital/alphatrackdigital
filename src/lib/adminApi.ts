export interface AdminContact {
  _id: string;
  source: "contact_form" | "tracking_audit_offer" | "newsletter";
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message?: string;
  websiteUrl?: string;
  monthlyAdSpend?: string;
  adPlatforms?: string;
  serviceInterest?: string;
  monthlyBudget?: string;
  read: boolean;
  createdAt: string;
}

export interface AdminBlogPost {
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

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime?: string;
  author?: string;
  status?: "draft" | "published";
}

function authHeaders(token: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export async function adminLogin(email: string, password: string): Promise<string> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!data.ok || !data.token) throw new Error(data.message || "Login failed");
  return data.token;
}

// --- Contacts ---

export async function fetchContacts(token: string, page = 1, source?: string) {
  const params = new URLSearchParams({ page: String(page), limit: "50" });
  if (source) params.set("source", source);
  const res = await fetch(`/api/contacts/admin?${params}`, { headers: authHeaders(token) });
  const data = await res.json();
  if (!data.ok) throw new Error("Failed to fetch contacts");
  return data as { ok: boolean; contacts: AdminContact[]; total: number };
}

export async function markContactRead(token: string, id: string) {
  const res = await fetch(`/api/contacts/admin/read/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
  });
  const data = await res.json();
  if (!data.ok) throw new Error("Failed to mark as read");
}

export async function deleteContact(token: string, id: string) {
  const res = await fetch(`/api/contacts/admin/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  const data = await res.json();
  if (!data.ok) throw new Error("Failed to delete contact");
}

// --- Blog admin ---

export async function fetchAdminPosts(token: string, page = 1, status?: string) {
  const params = new URLSearchParams({ page: String(page), limit: "50" });
  if (status) params.set("status", status);
  const res = await fetch(`/api/blog/admin?${params}`, { headers: authHeaders(token) });
  const data = await res.json();
  if (!data.ok) throw new Error("Failed to fetch posts");
  return data as { ok: boolean; posts: AdminBlogPost[]; total: number };
}

export async function fetchAdminPost(token: string, slug: string): Promise<AdminBlogPost> {
  const res = await fetch(`/api/blog/admin/${slug}`, { headers: authHeaders(token) });
  const data = await res.json();
  if (!data.ok) throw new Error("Failed to fetch post");
  return data.post;
}

export async function createPost(token: string, input: BlogPostInput): Promise<AdminBlogPost> {
  const res = await fetch("/api/blog/admin", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.message || "Failed to create post");
  return data.post;
}

export async function updatePost(token: string, slug: string, input: Partial<BlogPostInput>): Promise<AdminBlogPost> {
  const res = await fetch(`/api/blog/admin/${slug}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.message || "Failed to update post");
  return data.post;
}

export async function deletePost(token: string, slug: string) {
  const res = await fetch(`/api/blog/admin/${slug}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  const data = await res.json();
  if (!data.ok) throw new Error("Failed to delete post");
}
