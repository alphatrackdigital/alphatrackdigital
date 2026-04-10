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
