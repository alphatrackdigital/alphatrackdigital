import { screen, within } from "@testing-library/react";
import Index from "@/pages/Index";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("Homepage proof and stack sections", () => {
  it("renders grounded proof content and keeps the stack before blog", () => {
    renderWithPageProviders(<Index />);

    const proofHeading = screen.getByRole("heading", { name: "Selected Campaign Outcomes" });
    const stackHeading = screen.getByRole("heading", { name: "Built Across the Core Growth Stack" });
    const blogHeading = screen.getByRole("heading", { name: "From Our Blog" });

    expect(proofHeading.compareDocumentPosition(stackHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(stackHeading.compareDocumentPosition(blogHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    const proofSection = screen.getByTestId("proof-section");

    expect(within(proofSection).getAllByTestId("proof-card")).toHaveLength(3);
    expect(within(proofSection).getByText("Luxury Hospitality Brand")).toBeInTheDocument();
    expect(within(proofSection).getByText("Education Client")).toBeInTheDocument();
    expect(within(proofSection).getByText("Consumer Brand")).toBeInTheDocument();
    expect(within(proofSection).getByText("Video campaign")).toBeInTheDocument();
    expect(within(proofSection).getByText("Google Ads + Facebook")).toBeInTheDocument();
    expect(within(proofSection).getByText("YouTube + partner network")).toBeInTheDocument();
    expect(screen.getByText("Some client details are withheld for confidentiality.")).toBeInTheDocument();
    const heroReviewPanel = screen.getByTestId("hero-review-panel");
    expect(heroReviewPanel).toBeInTheDocument();
    expect(within(heroReviewPanel).getByText("What We Review First")).toBeInTheDocument();
    expect(screen.queryByText("4.2×")).not.toBeInTheDocument();
    expect(screen.queryByText("99.4%")).not.toBeInTheDocument();
    expect(screen.queryByText("Pearl House Ghana")).not.toBeInTheDocument();
    expect(screen.queryByText("Courtney Quist-Therson")).not.toBeInTheDocument();
    expect(screen.queryByText("A Client Perspective")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Anonymous snapshots from approved case-study material. Client names stay private until permission is granted."),
    ).not.toBeInTheDocument();

    const stackSection = screen.getByTestId("growth-stack-section");

    expect(within(stackSection).getAllByTestId("growth-stack-card")).toHaveLength(3);
    expect(within(stackSection).getByText("Measurement")).toBeInTheDocument();
    expect(within(stackSection).getByText("Paid Media")).toBeInTheDocument();
    expect(within(stackSection).getByText("Automation")).toBeInTheDocument();
    expect(screen.queryByText(/\+\d+\s+additional/i)).not.toBeInTheDocument();
  });
});
