export type LeadSource = "contact_form" | "tracking_audit_offer";

export interface LeadCapturePayload {
  source: LeadSource;
  firstName: string;
  lastName: string;
  email: string;
  optIn?: boolean;
  company?: string;
  message?: string;
  websiteUrl?: string;
  monthlyAdSpend?: string;
  adPlatforms?: string;
  serviceInterest?: string[];
  monthlyBudget?: string;
}

export interface LeadSubmissionResult {
  ok: boolean;
  message?: string;
}
