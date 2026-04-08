import { expect, test } from "@playwright/test";

test("homepage hero is visible", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Growth should never/i,
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", {
      name: /Get a Free Growth Audit/i,
    }).first(),
  ).toBeVisible();
});
