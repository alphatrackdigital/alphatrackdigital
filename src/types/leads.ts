export type LeadSource = "contact_form" | "tracking_audit_offer" | "newsletter";

export interface LeadAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  landingPage?: string;
  referrer?: string;
}

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
  attribution?: LeadAttribution;
}

export interface LeadSubmissionResult {
  ok: boolean;
  message?: string;
  pendingConfirmation?: boolean;
  duplicate?: boolean;
}
