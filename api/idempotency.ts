import { createHash } from "node:crypto";

type IdempotencyRecord = Record<string, unknown> & {
  key: string;
  createdAt: string;
};

const memoryStore = new Map<string, IdempotencyRecord>();

export const normalizeEmail = (value: unknown) => String(value || "").trim().toLowerCase();

const normalizeString = (value: unknown) => String(value || "").trim().toLowerCase();

export const hashValue = (value: unknown) =>
  createHash("sha256").update(String(value)).digest("hex").slice(0, 32);

const dayStamp = (date = new Date()) => date.toISOString().slice(0, 10);

const safeKey = (parts: string[]) =>
  parts.map((part) => String(part).replace(/[^a-zA-Z0-9._-]/g, "-")).join("/");

export const getIdempotencyRecord = async (key: string) => {
  return key ? memoryStore.get(key) ?? null : null;
};

export const markIdempotencyKey = async (key: string, payload: Record<string, unknown> = {}) => {
  if (!key) return;

  memoryStore.set(key, {
    ...payload,
    key,
    createdAt: new Date().toISOString(),
  });
};

export const buildLeadDedupeKey = (payload: Record<string, unknown>) => {
  const source = normalizeString(payload?.source);
  const email = normalizeEmail(payload?.email);
  if (!source || !email) return "";

  if (source === "newsletter") {
    return safeKey(["lead", "newsletter", hashValue(email)]);
  }

  if (source === "tracking_audit_offer") {
    const website = normalizeString(payload?.websiteUrl);
    return safeKey(["lead", source, dayStamp(), hashValue(`${email}|${website}`)]);
  }

  return safeKey(["lead", source, dayStamp(), hashValue(email)]);
};

export const buildExitPopupDedupeKey = (lead: { email?: string }) => {
  const email = normalizeEmail(lead?.email);
  return email ? safeKey(["lead", "exit_popup", hashValue(email)]) : "";
};

export const buildBookingDedupeKey = (params: { booking_id?: string }) => {
  const bookingId = normalizeString(params?.booking_id);
  return bookingId ? safeKey(["booking", hashValue(bookingId)]) : "";
};
