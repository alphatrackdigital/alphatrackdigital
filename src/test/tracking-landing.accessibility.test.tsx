import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrackingLandingPage from "@/pages/TrackingLandingPage";

describe("TrackingLandingPage accessibility", () => {
  it("associates visible labels with form controls", () => {
    render(
      <MemoryRouter>
        <TrackingLandingPage />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Work Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Website URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Monthly Ad Spend")).toBeInTheDocument();
    expect(
      screen.getByLabelText("What platforms are you running ads on?"),
    ).toBeInTheDocument();
  });
});
