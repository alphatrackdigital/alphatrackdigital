import { screen, within } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";

import ConversionTracking from "@/pages/ConversionTracking";
import ServiceDetail from "@/pages/ServiceDetail";
import Services from "@/pages/Services";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("Service page testimonial placement", () => {
  it("renders the shared testimonial on the main services page", () => {
    renderWithPageProviders(<Services />, { route: "/service" });

    const testimonialSection = screen.getByTestId("featured-testimonial-section");

    expect(
      within(testimonialSection).getByRole("heading", {
        name: "What clients say about working with us.",
      }),
    ).toBeInTheDocument();
    expect(within(testimonialSection).getByText("Courtney Quist-Therson")).toBeInTheDocument();
    expect(within(testimonialSection).getByText("CEO & Founder, Pearl House Ghana")).toBeInTheDocument();
    expect(within(testimonialSection).getByAltText("Pearl House Ghana")).toBeInTheDocument();
  });

  it("renders the shared testimonial on a flagship service page", () => {
    renderWithPageProviders(<ConversionTracking />, { route: "/service/conversion-tracking" });

    expect(screen.getByTestId("featured-testimonial-section")).toBeInTheDocument();
    expect(screen.getByText("What clients say when execution matters.")).toBeInTheDocument();
    expect(screen.getByText("Courtney Quist-Therson")).toBeInTheDocument();
  });

  it("renders the shared testimonial on a routed generic service page", () => {
    renderWithPageProviders(
      <Routes>
        <Route path="/service/:slug" element={<ServiceDetail />} />
      </Routes>,
      { route: "/service/email-marketing" },
    );

    expect(screen.getByTestId("featured-testimonial-section")).toBeInTheDocument();
    expect(screen.getByText("What clients say when execution matters.")).toBeInTheDocument();
    expect(screen.getByText("Courtney Quist-Therson")).toBeInTheDocument();
  });
});
