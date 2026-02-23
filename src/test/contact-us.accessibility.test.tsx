import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactUs from "@/pages/ContactUs";

describe("ContactUs accessibility", () => {
  it("associates visible labels with form controls", () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Company")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });
});
