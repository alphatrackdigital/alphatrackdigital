import { useEffect, useState, useCallback } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { fetchContacts, markContactRead, deleteContact, type AdminContact } from "@/lib/adminApi";
import { Loader2, Trash2, Mail, MailOpen, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const SOURCE_LABELS: Record<string, string> = {
  contact_form: "Contact Form",
  tracking_audit_offer: "Audit Request",
  newsletter: "Newsletter",
};

const SOURCE_COLORS: Record<string, string> = {
  contact_form: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  tracking_audit_offer: "bg-primary/10 text-primary border-primary/20",
  newsletter: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const FILTERS = ["all", "contact_form", "tracking_audit_offer", "newsletter"] as const;
const FILTER_LABELS: Record<string, string> = {
  all: "All",
  contact_form: "Contact Form",
  tracking_audit_offer: "Audit Requests",
  newsletter: "Newsletter",
};

export default function AdminContacts() {
  const { token } = useAdminAuth();
  const [contacts, setContacts] = useState<AdminContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const source = filter === "all" ? undefined : filter;
      const data = await fetchContacts(token, 1, source);
      setContacts(data.contacts);
    } catch {
      setError("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  }, [token, filter]);

  useEffect(() => { load(); }, [load]);

  const handleMarkRead = async (id: string) => {
    if (!token) return;
    setActionLoading(id);
    try {
      await markContactRead(token, id);
      setContacts((prev) => prev.map((c) => (c._id === id ? { ...c, read: true } : c)));
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !window.confirm("Delete this contact?")) return;
    setActionLoading(id);
    try {
      await deleteContact(token, id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } finally {
      setActionLoading(null);
    }
  };

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Contacts Inbox</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {unread > 0 ? `${unread} unread` : "All caught up"}
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              filter === f
                ? "border-primary bg-primary/10 text-primary"
                : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
            )}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-12 justify-center">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      )}

      {error && !loading && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
      )}

      {!loading && !error && contacts.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">No contacts found.</p>
      )}

      {!loading && !error && contacts.length > 0 && (
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={cn(
                "rounded-xl border transition-colors",
                contact.read ? "border-white/8 bg-card/50" : "border-white/15 bg-card"
              )}
            >
              <div
                className="flex cursor-pointer items-center gap-4 px-4 py-3"
                onClick={() => {
                  setExpanded(expanded === contact._id ? null : contact._id);
                  if (!contact.read) handleMarkRead(contact._id);
                }}
              >
                <div className="flex-shrink-0 text-muted-foreground">
                  {contact.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4 text-primary" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-medium text-sm", !contact.read && "text-foreground")}>
                      {contact.firstName} {contact.lastName}
                    </span>
                    <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold", SOURCE_COLORS[contact.source])}>
                      {SOURCE_LABELS[contact.source]}
                    </span>
                    {!contact.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{contact.email}</p>
                </div>
                <div className="flex-shrink-0 text-xs text-muted-foreground">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(contact._id); }}
                    disabled={actionLoading === contact._id}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    {actionLoading === contact._id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {expanded === contact._id && (
                <div className="border-t border-white/8 px-4 py-4 text-sm space-y-2">
                  {contact.message && (
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Message</span>
                      <p className="mt-1 text-foreground">{contact.message}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                    {contact.company && <Row label="Company" value={contact.company} />}
                    {contact.serviceInterest && <Row label="Service Interest" value={contact.serviceInterest} />}
                    {contact.monthlyBudget && <Row label="Monthly Budget" value={contact.monthlyBudget} />}
                    {contact.websiteUrl && <Row label="Website" value={contact.websiteUrl} />}
                    {contact.monthlyAdSpend && <Row label="Ad Spend" value={contact.monthlyAdSpend} />}
                    {contact.adPlatforms && <Row label="Ad Platforms" value={contact.adPlatforms} />}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}: </span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
