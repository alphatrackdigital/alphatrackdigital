import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");

describe("Ketch Consent Mode bridge", () => {
  it("uses the real gtag consent API instead of a plain dataLayer array", () => {
    expect(html).toContain('w.gtag("consent", "update", consentUpdate);');
    expect(html).not.toContain('w[l].push(["consent", "update", ketchUpdate]);');
  });

  it("applies all four optional consent fields before the diagnostic event", () => {
    const updateIndex = html.indexOf('w.gtag("consent", "update", consentUpdate);');
    const eventIndex = html.indexOf('event: "atd_consent_update"');

    expect(updateIndex).toBeGreaterThan(-1);
    expect(eventIndex).toBeGreaterThan(updateIndex);
    expect(html).toContain(
      'ad_personalization: update.ad_personalization || current.ad_personalization || "denied"',
    );
  });
});
