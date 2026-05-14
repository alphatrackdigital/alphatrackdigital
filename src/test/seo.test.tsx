import { cleanup, render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SEO from "@/components/shared/SEO";

describe("SEO metadata", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  afterEach(() => {
    cleanup();
    document.head.innerHTML = "";
  });

  it("renders canonical, OG, and Twitter metadata", async () => {
    render(
      <HelmetProvider>
        <SEO
          title="Test Title"
          description="Test Description"
          canonicalUrl="/test-page"
          ogType="article"
          ogImage="https://example.com/og.jpg"
        />
      </HelmetProvider>,
    );

    await waitFor(() => {
      const canonical = document.querySelector("link[rel='canonical']");
      const ogType = document.querySelector("meta[property='og:type']");
      const ogImage = document.querySelector("meta[property='og:image']");
      const twitterCard = document.querySelector("meta[name='twitter:card']");

      expect(canonical).toBeInTheDocument();
      expect(canonical).toHaveAttribute("href", expect.stringContaining("/test-page"));
      expect(ogType).toHaveAttribute("content", "article");
      expect(ogImage).toHaveAttribute("content", "https://example.com/og.jpg");
      expect(twitterCard).toHaveAttribute("content", "summary_large_image");
    });
  });

  it("replaces managed homepage fallback tags with route-specific metadata", async () => {
    document.head.insertAdjacentHTML(
      "beforeend",
      [
        '<title data-rh="true">AlphaTrack Digital | Data-Driven Performance Marketing Agency</title>',
        '<meta data-rh="true" name="description" content="Homepage description" />',
        '<link data-rh="true" rel="canonical" href="https://alphatrack.digital" />',
        '<meta data-rh="true" property="og:title" content="Homepage title" />',
      ].join(""),
    );

    render(
      <HelmetProvider>
        <SEO
          title="Services | AlphaTrack Digital"
          description="Route-specific services description"
          canonicalUrl="/service"
        />
      </HelmetProvider>,
    );

    await waitFor(() => {
      const descriptions = document.head.querySelectorAll("meta[name='description']");
      const canonicals = document.head.querySelectorAll("link[rel='canonical']");
      const ogTitles = document.head.querySelectorAll("meta[property='og:title']");

      expect(document.title).toBe("Services | AlphaTrack Digital");
      expect(descriptions).toHaveLength(1);
      expect(descriptions[0]).toHaveAttribute("content", "Route-specific services description");
      expect(canonicals).toHaveLength(1);
      expect(canonicals[0]).toHaveAttribute("href", expect.stringContaining("/service"));
      expect(ogTitles).toHaveLength(1);
      expect(ogTitles[0]).toHaveAttribute("content", "Services | AlphaTrack Digital");
    });
  });
});
