// @vitest-environment node

import { render } from "@/entry-server";

describe("Homepage prerender", () => {
  it("renders homepage content and SEO head tags on the server", () => {
    const { html, head } = render("/");

    expect(html).toContain("Growth should never");
    expect(html).toContain("Toggle menu");
    expect(html).toContain("Book A Free Strategy Call");

    expect(head).toContain("<title");
    expect(head).toContain("AlphaTrack Digital | Data-Driven Performance Marketing Agency");
    expect(head).toContain('rel="canonical" href="https://alphatrack.digital"');
    expect(head).toContain('name="description"');
    expect(head).toContain("Data-driven marketing, creative strategy, and growth systems");
  });
});
