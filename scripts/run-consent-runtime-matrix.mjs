import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.ATD_QA_BASE_URL;
const output =
  process.env.ATD_QA_OUTPUT ||
  "docs/codex-handoffs/evidence/ad-consent-propagation-fix-2026-06-29/runtime-consent-matrix.json";

if (!base) {
  throw new Error("ATD_QA_BASE_URL is required.");
}

const consentKeys = [
  "analytics_storage",
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "personalization_storage",
  "functionality_storage",
  "security_storage",
];

function classify(url) {
  const host = new URL(url).hostname;
  if (host === "www.googletagmanager.com" && url.includes("/gtm.js")) return "gtm";
  if (host.includes("google-analytics.com") && url.includes("/collect")) return "ga";
  if (host.includes("googleadservices.com") || host.includes("doubleclick.net")) return "ads";
  if (host.includes("facebook.com") || host.includes("connect.facebook.net")) return "meta";
  if (host.includes("conversations-widget.brevo.com")) return "brevo";
  if (host.includes("clarity.ms")) return "clarity";
  return null;
}

function summarizeRequests(urls) {
  const counts = { gtm: 0, ga: 0, ads: 0, meta: 0, brevo: 0, clarity: 0 };
  for (const url of urls) {
    const type = classify(url);
    if (type) counts[type] += 1;
  }
  return counts;
}

async function readState(page) {
  return page.evaluate((keys) => {
    const entries = window.google_tag_data?.ics?.entries || {};
    const gtmConsent = {};
    for (const key of keys) {
      const entry = entries[key];
      gtmConsent[key] = entry
        ? {
            default: entry.default,
            update: entry.update,
            granted: entry.update !== undefined ? entry.update : entry.default,
          }
        : null;
    }

    const dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];

    return {
      atdConsentState: window.__atdConsentState || null,
      gtmConsent,
      diagnostic:
        dataLayer.filter((entry) => entry?.event === "atd_consent_update").at(-1) || null,
    };
  }, consentKeys);
}

async function setPreference(page, label, enabled) {
  const changed = await page.evaluate(
    ({ label, enabled }) => {
      const controls = [
        ...document.querySelectorAll("button, input[role='switch'], input[type='checkbox']"),
      ];
      const labelIndex = controls.findIndex(
        (node) => node.textContent?.trim().toLowerCase() === label.toLowerCase(),
      );
      if (labelIndex === -1) return false;
      for (const control of controls.slice(labelIndex + 1)) {
        const isSwitch =
          control.getAttribute("role") === "switch" ||
          control.getAttribute("aria-checked") !== null ||
          control.matches("input[type='checkbox']");
        if (!isSwitch) continue;
        const checked =
          control.getAttribute("aria-checked") === "true" ||
          control.checked === true ||
          control.getAttribute("data-state") === "checked";
        if (checked !== enabled) control.click();
        return true;
      }
      return false;
    },
    { label, enabled },
  );
  if (!changed) throw new Error(`Missing Ketch preference: ${label}`);
}

async function runScenario(browser, name, choice) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));

  await page.goto(base, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1500);
  const before = { state: await readState(page), requests: summarizeRequests(requests) };

  if (choice === "reject") {
    await page.getByRole("button", { name: "Reject All", exact: true }).click();
  } else if (choice === "accept") {
    await page.getByRole("button", { name: "Accept All", exact: true }).click();
  } else {
    await page.getByRole("button", { name: "Manage Preferences", exact: true }).click();
    await page.waitForTimeout(500);
    await setPreference(page, "Analytics", choice.analytics);
    await setPreference(page, "Targeted Advertising", choice.advertising);
    await page.getByRole("button", { name: "Confirm", exact: true }).click();
  }

  await page.waitForTimeout(3500);
  const after = { state: await readState(page), requests: summarizeRequests(requests) };
  await context.close();
  return { name, before, after };
}

const browser = await chromium.launch({ headless: true });
const scenarios = [
  await runScenario(browser, "fresh_then_reject_all", "reject"),
  await runScenario(browser, "accept_all", "accept"),
  await runScenario(browser, "analytics_only", { analytics: true, advertising: false }),
  await runScenario(browser, "targeted_advertising_only", {
    analytics: false,
    advertising: true,
  }),
];
await browser.close();

const result = {
  generatedAt: new Date().toISOString(),
  base,
  method:
    "GTM runtime consent registry (google_tag_data.ics) plus network requests; Tag Assistant timeline UI was extension-blocked.",
  scenarios,
};

await mkdir(output.split("/").slice(0, -1).join("/"), { recursive: true });
await writeFile(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ output, result }, null, 2));
