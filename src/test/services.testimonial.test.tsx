import { screen, within } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";

import { REQUEST_A_FREE_TRACKING_AUDIT_CTA } from "@/config/cta";
import ConversionTracking from "@/pages/ConversionTracking";
import ServiceDetail from "@/pages/ServiceDetail";
import Services from "@/pages/Services";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("Service page testimonial placement", () => {
  it("renders the shared testimonial on the main services page", () => {
    renderWithPageProviders(<Services />, { route: "/service" });

    const testimonialSection = screen.getByTestId("featured-testimonial-section");

    expect(
      within(testimonialSection).getAllByRole("heading", {
        name: "What clients say about working with us.",
      }).length,
    ).toBeGreaterThan(0);
    expect(within(testimonialSection).getAllByText("Courtney Quist-Therson").length).toBeGreaterThan(0);
    expect(within(testimonialSection).getAllByText("CEO & Founder, Pearl House Ghana").length).toBeGreaterThan(0);
    expect(within(testimonialSection).getAllByAltText("Pearl House Ghana").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: REQUEST_A_FREE_TRACKING_AUDIT_CTA.label }).length).toBeGreaterThan(0);
  });

  it("renders the shared testimonial on a flagship service page", () => {
    renderWithPageProviders(<ConversionTracking />, { route: "/service/conversion-tracking" });

    const testimonialSection = screen.getByTestId("featured-testimonial-section");

    expect(testimonialSection).toBeInTheDocument();
    expect(
      within(testimonialSection).getAllByText("What clients say when execution matters.").length,
    ).toBeGreaterThan(0);
    expect(within(testimonialSection).getAllByText("Courtney Quist-Therson").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: REQUEST_A_FREE_TRACKING_AUDIT_CTA.label }).length).toBeGreaterThan(0);
  });

  it("renders the shared testimonial on a routed generic service page", () => {
    renderWithPageProviders(
      <Routes>
        <Route path="/service/:slug" element={<ServiceDetail />} />
      </Routes>,
      { route: "/service/email-marketing" },
    );

    const testimonialSection = screen.getByTestId("featured-testimonial-section");

    expect(testimonialSection).toBeInTheDocument();
    expect(
      within(testimonialSection).getAllByText("What clients say when execution matters.").length,
    ).toBeGreaterThan(0);
    expect(within(testimonialSection).getAllByText("Courtney Quist-Therson").length).toBeGreaterThan(0);
  });
});
