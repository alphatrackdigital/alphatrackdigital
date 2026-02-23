export type CTAIntent = "primary" | "secondary";

export interface CTAConfig {
  label: string;
  to: string;
  intent?: CTAIntent;
}
