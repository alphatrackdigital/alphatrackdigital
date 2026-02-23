import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SEO from "@/components/shared/SEO";

describe("SEO metadata", () => {
  it("renders canonical, OG, and Twitter metadata", () => {
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
