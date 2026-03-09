import { screen } from "@testing-library/react";

import Index from "@/pages/Index";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("Homepage refresh", () => {
  it("prioritizes the audit CTA and the flagship service sequence", () => {
    renderWithPageProviders(<Index />);

    const auditLinks = screen.getAllByRole("link", { name: /get free tracking audit/i });
    expect(auditLinks.some((link) => link.getAttribute("href") === "/offer/tracking-audit")).toBe(true);

    const callLinks = screen.getAllByRole("link", { name: /book a call/i });
    expect(callLinks.some((link) => link.getAttribute("href") === "/book-a-call")).toBe(true);

    expect(screen.getByText(/Proof Before Promises/i)).toBeInTheDocument();

    const measure = screen.getByText("Conversion Tracking & Measurement");
    const acquire = screen.getByText("Paid Media Management");
    const nurture = screen.getByText("Marketing Automation & CRM");

    expect(measure.compareDocumentPosition(acquire) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(acquire.compareDocumentPosition(nurture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
