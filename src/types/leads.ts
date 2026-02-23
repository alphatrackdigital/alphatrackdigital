export type LeadSource = "contact_form" | "tracking_audit_offer";

export interface LeadCapturePayload {
  source: LeadSource;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message?: string;
  websiteUrl?: string;
  monthlyAdSpend?: string;
  adPlatforms?: string;
}

export interface LeadSubmissionResult {
  ok: boolean;
  message?: string;
}
