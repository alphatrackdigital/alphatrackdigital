import type { LeadCapturePayload, LeadSubmissionResult } from "@/types/leads";

const LEADS_ENDPOINT = import.meta.env.VITE_LEADS_ENDPOINT || "/api/leads";

export const submitLead = async (payload: LeadCapturePayload): Promise<LeadSubmissionResult> => {
  const response = await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: LeadSubmissionResult | null = null;
  try {
    data = (await response.json()) as LeadSubmissionResult;
  } catch {
    data = null;
  }

  if (!response.ok || !data?.ok) {
    throw new Error(data?.message || "Lead submission failed");
  }

  return data;
};
