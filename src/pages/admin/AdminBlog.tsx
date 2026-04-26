import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { fetchAdminPosts, deletePost, updatePost, type AdminBlogPost } from "@/lib/adminApi";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminBlog() {
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminPosts(token);
      setPosts(data.posts);
    } catch {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const handleTogglePublish = async (post: AdminBlogPost) => {
    if (!token) return;
    setActionLoading(post._id);
    try {
      const newStatus = post.status === "published" ? "draft" : "published";
      const updated = await updatePost(token, post.slug, { status: newStatus });
      setPosts((prev) => prev.map((p) => (p._id === post._id ? { ...p, ...updated } : p)));
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (post: AdminBlogPost) => {
    if (!token || !window.confirm(`Delete "${post.title}"?`)) return;
    setActionLoading(post._id);
    try {
      await deletePost(token, post.slug);
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
    } finally {
      setActionLoading(null);
    }
  };

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Blog Posts</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {published} published · {drafts} drafts
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
          <button
            onClick={() => navigate("/admin/blog/new")}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> New Post
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      )}

      {error && !loading && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">No blog posts yet.</p>
          <button
            onClick={() => navigate("/admin/blog/new")}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Create your first post
          </button>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-card px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-sm">{post.title}</span>
                  <span
                    className={cn(
                      "flex-shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                      post.status === "published"
                        ? "border-primary/20 bg-primary/10 text-primary"
                        : "border-white/10 bg-white/5 text-muted-foreground"
                    )}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {post.category} · {post.readTime} ·{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-shrink-0 items-center gap-1">
                <button
                  onClick={() => handleTogglePublish(post)}
                  disabled={actionLoading === post._id}
                  title={post.status === "published" ? "Unpublish" : "Publish"}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {actionLoading === post._id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : post.status === "published" ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  onClick={() => navigate(`/admin/blog/edit/${post.slug}`)}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  disabled={actionLoading === post._id}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
