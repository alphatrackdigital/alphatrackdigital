import { fireEvent, screen } from "@testing-library/react";
import ContactUs from "@/pages/ContactUs";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";
import { describe, expect, it } from "vitest";

describe("ContactUs accessibility", () => {
  it("associates visible labels with form controls", () => {
    renderWithPageProviders(<ContactUs />, { route: "/contact-us" });

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Email")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Service Interest" })).toBeInTheDocument();
    expect(screen.getByLabelText("Paid Ads")).toBeInTheDocument();
    expect(screen.getByLabelText("Marketing Automation")).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Media Budget/)).toBeInTheDocument();
    expect(screen.getByLabelText("Your Message")).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "Yes, you can also send me occasional insights and service updates by email.",
      ),
    ).toBeInTheDocument();
  });

  it("allows multiple service interests to be selected", () => {
    renderWithPageProviders(<ContactUs />, { route: "/contact-us" });

    const paidAds = screen.getByLabelText("Paid Ads");
    const marketingAutomation = screen.getByLabelText("Marketing Automation");

    fireEvent.click(paidAds);
    fireEvent.click(marketingAutomation);

    expect(paidAds).toBeChecked();
    expect(marketingAutomation).toBeChecked();
  });
});
