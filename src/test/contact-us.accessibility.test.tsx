import { screen } from "@testing-library/react";
import ContactUs from "@/pages/ContactUs";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("ContactUs accessibility", () => {
  it("associates visible labels with form controls", () => {
    renderWithPageProviders(<ContactUs />, { route: "/contact-us" });

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Service Interest")).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Media Budget/)).toBeInTheDocument();
    expect(screen.getByLabelText("Your Message")).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "Yes, you can also send me occasional insights and service updates by email.",
      ),
    ).toBeInTheDocument();
  });
});
