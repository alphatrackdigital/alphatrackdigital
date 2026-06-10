import type { LeadCapturePayload, LeadSubmissionResult } from "@/types/leads";
import { getLeadsEndpoint } from "@/lib/apiEndpoints";

export const submitLead = async (payload: LeadCapturePayload): Promise<LeadSubmissionResult> => {
  const response = await fetch(getLeadsEndpoint(), {
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

  if (response.ok && !data) {
    return { ok: true };
  }

  if (!response.ok || !data?.ok) {
    throw new Error(data?.message || "Lead submission failed");
  }

  return data;
};
