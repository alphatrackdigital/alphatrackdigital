import { screen } from "@testing-library/react";
import ContactUs from "@/pages/ContactUs";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("ContactUs accessibility", () => {
  it("associates visible labels with form controls", () => {
    renderWithPageProviders(<ContactUs />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Company")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });
});
