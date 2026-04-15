import { expect, test } from "@playwright/test";
import { BOOK_A_FREE_STRATEGY_CALL_CTA } from "../src/config/cta";

test("homepage hero is visible", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Growth should never/i,
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", {
      name: new RegExp(BOOK_A_FREE_STRATEGY_CALL_CTA.label, "i"),
    }).first(),
  ).toBeVisible();
});

test("homepage stays within the mobile viewport and keeps the menu toggle visible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const viewportMetrics = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    scrollWidth: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
  }));

  expect(viewportMetrics.scrollWidth).toBeLessThanOrEqual(viewportMetrics.viewportWidth + 1);

  const menuToggle = page.getByRole("button", { name: /toggle menu/i });
  await expect(menuToggle).toBeVisible();

  const toggleBox = await menuToggle.boundingBox();

  expect(toggleBox).not.toBeNull();
  expect(toggleBox!.x).toBeGreaterThanOrEqual(0);
  expect(toggleBox!.x + toggleBox!.width).toBeLessThanOrEqual(viewportMetrics.viewportWidth);
});
