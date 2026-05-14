import { screen, within } from "@testing-library/react";

import { companyProfile } from "@/data/companyProfile";
import AboutUs from "@/pages/AboutUs";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("About Us page", () => {
  it("renders the polished hero, founder, values, and CTA sections", () => {
    renderWithPageProviders(<AboutUs />, { route: "/about-us" });

    const heroSection = screen.getByTestId("about-hero-section");

    expect(
      within(heroSection).getByRole("heading", { name: /AlphaTrack Digital/i }),
    ).toBeInTheDocument();
    expect(within(heroSection).getByText("We are")).toBeInTheDocument();
    expect(
      within(heroSection).getByText(/measurement-first growth agency helping brands improve/i),
    ).toBeInTheDocument();
    expect(
      within(heroSection).getByText(/connect back to clean attribution/i),
    ).toBeInTheDocument();
    expect(within(heroSection).getByText("Track")).toBeInTheDocument();
    expect(within(heroSection).getByText("Acquire")).toBeInTheDocument();
    expect(within(heroSection).getByText("Nurture")).toBeInTheDocument();
    expect(within(heroSection).getByText("Clean signal")).toBeInTheDocument();
    expect(
      within(heroSection).getAllByAltText("AlphaTrack Digital team reviewing performance dashboards").length,
    ).toBeGreaterThan(0);

    expect(screen.getByText("What We Do")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /growth work that makes scaling easier to trust/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Conversion Tracking")).toBeInTheDocument();
    expect(screen.getByText("Paid Media")).toBeInTheDocument();
    expect(screen.getByText("Marketing Automation")).toBeInTheDocument();

    expect(screen.getAllByText("The Founder").length).toBeGreaterThan(0);
    expect(screen.getAllByText(companyProfile.founder.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Founder & CEO").length).toBeGreaterThan(0);
    expect(
      screen.getAllByAltText(`${companyProfile.founder.name}, ${companyProfile.founder.title}`).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/marketing should be measurable before it is scaled/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /Founder-led, measurement-first/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("What that means in practice")).not.toBeInTheDocument();

    expect(screen.getByText("Why We Exist")).toBeInTheDocument();
    expect(screen.getByText("Built On")).toBeInTheDocument();
    expect(
      screen.getByText(/replace unclear campaign data with tracking/i),
    ).toBeInTheDocument();
    companyProfile.coreValues.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
    expect(screen.queryByText(/Clear recommendations, honest reporting/i)).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Get in Touch/i })).toHaveAttribute(
      "href",
      "/contact-us",
    );

    expect(
      screen.queryByAltText("AlphaTrack Digital connected operating system flow"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Courtney Quist-Therson")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Pearl House Ghana")).not.toBeInTheDocument();
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
      screen.queryByRole("heading", { name: "Selected signals from work that had to perform." }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Performance Snapshot")).not.toBeInTheDocument();
    expect(screen.queryByTestId("industries-section")).not.toBeInTheDocument();
  });
});
