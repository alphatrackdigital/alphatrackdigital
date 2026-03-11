import { screen, within } from "@testing-library/react";
import Index from "@/pages/Index";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("Homepage proof and stack sections", () => {
  it("renders anonymous proof cards and keeps the stack before blog", () => {
    renderWithPageProviders(<Index />);

    const proofHeading = screen.getByRole("heading", { name: "Recent Client Outcomes" });
    const stackHeading = screen.getByRole("heading", { name: "Built Across the Core Growth Stack" });
    const blogHeading = screen.getByRole("heading", { name: "From Our Blog" });

    expect(proofHeading.compareDocumentPosition(stackHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(stackHeading.compareDocumentPosition(blogHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    expect(screen.getAllByTestId("proof-card")).toHaveLength(3);
    expect(screen.getByText("Education Client")).toBeInTheDocument();
    expect(screen.getByText("Luxury Hospitality Brand")).toBeInTheDocument();
    expect(screen.getByText("Consumer Brand")).toBeInTheDocument();
    expect(screen.queryByText("Pearl House Ghana")).not.toBeInTheDocument();
    expect(screen.queryByText("Courtney Quist-Therson")).not.toBeInTheDocument();
    expect(screen.queryByText("A Client Perspective")).not.toBeInTheDocument();

    const stackSection = screen.getByTestId("growth-stack-section");

    expect(within(stackSection).getAllByTestId("growth-stack-card")).toHaveLength(3);
    expect(within(stackSection).getByText("Measurement")).toBeInTheDocument();
    expect(within(stackSection).getByText("Paid Media")).toBeInTheDocument();
    expect(within(stackSection).getByText("Automation")).toBeInTheDocument();
    expect(screen.queryByText(/\+\d+\s+additional/i)).not.toBeInTheDocument();
  });
});
