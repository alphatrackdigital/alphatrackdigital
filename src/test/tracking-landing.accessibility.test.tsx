import { screen } from "@testing-library/react";
import TrackingLandingPage from "@/pages/TrackingLandingPage";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("TrackingLandingPage accessibility", () => {
  it("associates visible labels with form controls", () => {
    renderWithPageProviders(<TrackingLandingPage />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Work Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Website URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Monthly Ad Spend Level")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Which ad platforms are active right now?"),
    ).toBeInTheDocument();
  });
});
