import { screen, within } from "@testing-library/react";

import { companyProfile } from "@/data/companyProfile";
import AboutUs from "@/pages/AboutUs";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("About Us page", () => {
  it("renders the simplified hero, proof, and industry sections", () => {
    renderWithPageProviders(<AboutUs />, { route: "/about-us" });

    const heroSection = screen.getByTestId("about-hero-section");

    expect(
      within(heroSection).getByRole("heading", { name: /AlphaTrack Digital/i }),
    ).toBeInTheDocument();
    expect(within(heroSection).getByText("We are")).toBeInTheDocument();
    expect(within(heroSection).getByText(companyProfile.established)).toBeInTheDocument();
    expect(
      within(heroSection).getAllByAltText("AlphaTrack Digital team reviewing performance dashboards").length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Why We Exist")).toBeInTheDocument();
    expect(screen.getByText("Built On")).toBeInTheDocument();
    expect(
      screen.getByAltText("AlphaTrack Digital connected operating system flow"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Courtney Quist-Therson")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Pearl House Ghana")).not.toBeInTheDocument();
    expect(screen.queryByText("What that means in practice")).not.toBeInTheDocument();
    expect(screen.queryByText("Signal first")).not.toBeInTheDocument();
    expect(screen.queryByText("Mission")).not.toBeInTheDocument();
    expect(screen.queryByText("Vision")).not.toBeInTheDocument();
    expect(screen.queryByText("Response Style")).not.toBeInTheDocument();
    expect(
      within(heroSection).queryByRole("link", { name: /Contact Us/i }),
    ).not.toBeInTheDocument();
    expect(
      within(heroSection).queryByRole("link", { name: /View Services/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByAltText(`${companyProfile.founder.name}, ${companyProfile.founder.title}`).length,
    ).toBeGreaterThan(0);
    expect(
      screen.queryByRole("heading", { name: "Selected signals from work that had to perform." }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Performance Snapshot")).not.toBeInTheDocument();

    const industriesSection = screen.getByTestId("industries-section");

    expect(within(industriesSection).getAllByTestId("industry-card")).toHaveLength(8);
    expect(within(industriesSection).getAllByText("Ecommerce & Retail").length).toBeGreaterThan(0);
    expect(within(industriesSection).getAllByText("SaaS").length).toBeGreaterThan(0);
    expect(within(industriesSection).getAllByText("Real Estate").length).toBeGreaterThan(0);
    expect(within(industriesSection).getAllByText("Fashion").length).toBeGreaterThan(0);
    expect(within(industriesSection).getAllByText("Gaming").length).toBeGreaterThan(0);
  });
});
