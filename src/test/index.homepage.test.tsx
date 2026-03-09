import { screen, within } from "@testing-library/react";
import Index from "@/pages/Index";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("Homepage stack section", () => {
  it("renders the compressed growth stack after proof and before blog", () => {
    renderWithPageProviders(<Index />);

    const proofHeading = screen.getByRole("heading", { name: "A Client Perspective" });
    const stackHeading = screen.getByRole("heading", { name: "Built Across the Core Growth Stack" });
    const blogHeading = screen.getByRole("heading", { name: "From Our Blog" });

    expect(proofHeading.compareDocumentPosition(stackHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(stackHeading.compareDocumentPosition(blogHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    const stackSection = screen.getByTestId("growth-stack-section");

    expect(within(stackSection).getAllByTestId("growth-stack-card")).toHaveLength(3);
    expect(within(stackSection).getByText("Measurement")).toBeInTheDocument();
    expect(within(stackSection).getByText("Paid Media")).toBeInTheDocument();
    expect(within(stackSection).getByText("Automation")).toBeInTheDocument();
    expect(screen.queryByText(/\+\d+\s+additional/i)).not.toBeInTheDocument();
  });
});
