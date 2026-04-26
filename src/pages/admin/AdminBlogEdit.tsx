import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { createPost, fetchAdminPost, updatePost, type BlogPostInput } from "@/lib/adminApi";
import { Loader2, ArrowLeft, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Paid Media", "Paid Social", "Tracking", "Analytics", "Automation",
  "Web Development", "Strategy", "CRM", "Other",
];

const empty: BlogPostInput = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  category: "",
  readTime: "5 min read",
  author: "Alphatrack Team",
  status: "draft",
};

export default function AdminBlogEdit() {
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();
  const isEditing = !!slug;

  const [form, setForm] = useState<BlogPostInput>(empty);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!isEditing || !token || !slug) return;
    (async () => {
      try {
        const post = await fetchAdminPost(token, slug);
        setForm({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          category: post.category,
          readTime: post.readTime,
          author: post.author,
          status: post.status,
        });
      } catch {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    })();
  }, [isEditing, token, slug]);

  const set = (key: keyof BlogPostInput, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (status?: "draft" | "published") => {
    if (!token) return;
    setSaving(true);
    setError("");
    try {
      const payload = status ? { ...form, status } : form;
      if (isEditing && slug) {
        await updatePost(token, slug, payload);
      } else {
        await createPost(token, payload);
      }
      navigate("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading post...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/blog")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors",
              preview ? "border-primary/30 bg-primary/10 text-primary" : "border-white/10 bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Save Draft
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Publish
          </button>
        </div>
      </div>

      <h1 className="mb-6 text-xl font-bold">{isEditing ? "Edit Post" : "New Post"}</h1>

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
      )}

      {preview ? (
        <div className="rounded-xl border border-white/10 bg-card p-8">
          <h2 className="mb-2 text-3xl font-bold">{form.title || "Untitled"}</h2>
          <p className="mb-6 text-muted-foreground">{form.excerpt}</p>
          {form.image && (
            <img src={form.image} alt="" className="mb-6 w-full rounded-xl object-cover" style={{ maxHeight: 320 }} />
          )}
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: form.content }}
          />
        </div>
      ) : (
        <div className="space-y-5">
          <Field label="Title *">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Post title"
              className={inputCls}
            />
          </Field>

          <Field label="Excerpt *">
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Short summary shown in the blog listing"
              rows={2}
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category *">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Read Time">
              <input
                value={form.readTime}
                onChange={(e) => set("readTime", e.target.value)}
                placeholder="5 min read"
                className={inputCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Author">
              <input
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                placeholder="Alphatrack Team"
                className={inputCls}
              />
            </Field>
            <Field label="Cover Image URL">
              <input
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="https://..."
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Content (HTML) *">
            <p className="mb-1.5 text-xs text-muted-foreground">
              Write in HTML. Use &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt; tags. Toggle Preview to see it rendered.
            </p>
            <textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="<p>Start writing your post...</p>"
              rows={20}
              className={cn(inputCls, "font-mono text-xs")}
            />
          </Field>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
