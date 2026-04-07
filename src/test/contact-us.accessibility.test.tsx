import { screen } from "@testing-library/react";
import ContactUs from "@/pages/ContactUs";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("ContactUs accessibility", () => {
  it("associates visible labels with form controls", () => {
    renderWithPageProviders(<ContactUs />, { route: "/contact-us" });

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText(/Company/)).toBeInTheDocument();
    expect(screen.getByLabelText("Paid Ads")).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Budget/)).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred Call Time")).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "I agree to be contacted about my enquiry. You may unsubscribe at any time.",
      ),
    ).toBeInTheDocument();
  });
});
