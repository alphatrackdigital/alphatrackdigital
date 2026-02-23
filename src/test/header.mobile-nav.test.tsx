import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "@/components/layout/Header";

describe("Header mobile nav", () => {
  it("locks body scroll when open and closes on Escape", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const toggleButton = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    });
    expect(document.body.style.overflow).toBe("");
  });
});
