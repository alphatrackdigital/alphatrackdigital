import { screen, within } from "@testing-library/react";
import Index from "@/pages/Index";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("Homepage proof and stack sections", () => {
  it("renders the stat-strip proof section with real campaign metrics and keeps the stack before blog", () => {
    renderWithPageProviders(<Index />);

    const proofEyebrow = screen.getByText("Results from recent paid media campaigns");
    const stackHeading = screen.getByRole("heading", { name: "Built Across Your Revenue Stack" });
    const blogHeading = screen.getByRole("heading", { name: "From Our Blog" });

    expect(proofEyebrow.compareDocumentPosition(stackHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(stackHeading.compareDocumentPosition(blogHeading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    const proofSection = screen.getByTestId("proof-strip-section");

    expect(within(proofSection).getAllByTestId("proof-metric")).toHaveLength(3);
    expect(within(proofSection).getByText("4.9M")).toBeInTheDocument();
    expect(within(proofSection).getByText("3,151")).toBeInTheDocument();
    expect(within(proofSection).getByText("129,862")).toBeInTheDocument();
    expect(within(proofSection).getByText("Impressions delivered in an education campaign")).toBeInTheDocument();
    expect(within(proofSection).getByText("Website visits generated in a 12-day hospitality campaign")).toBeInTheDocument();
    expect(within(proofSection).getByText("Teaser views generated for a consumer brand rollout")).toBeInTheDocument();
    expect(screen.getAllByText("2.1M+")).toHaveLength(2);
    expect(screen.getAllByText("55%")).toHaveLength(2);
    expect(screen.getAllByText("25.14%")).toHaveLength(2);
    expect(screen.getAllByText("Reach")).toHaveLength(2);
    expect(screen.getAllByText("Viewer-to-Site Rate")).toHaveLength(2);
    expect(screen.getAllByText("Completion Rate")).toHaveLength(2);
    expect(screen.getAllByText("Website Visits")).toHaveLength(2);
    expect(screen.queryByText("4.2×")).not.toBeInTheDocument();
    expect(screen.queryByText("+68%")).not.toBeInTheDocument();
    expect(screen.queryByText("99.4%")).not.toBeInTheDocument();
    expect(screen.queryByText("−25%")).not.toBeInTheDocument();
    expect(screen.queryByText("Pearl House Ghana")).not.toBeInTheDocument();
    expect(screen.queryByText("Courtney Quist-Therson")).not.toBeInTheDocument();
    expect(screen.queryByText("A Client Perspective")).not.toBeInTheDocument();
    expect(screen.queryByText("Recent Client Outcomes")).not.toBeInTheDocument();

    const stackSection = screen.getByTestId("growth-stack-section");

    expect(within(stackSection).getAllByTestId("growth-stack-card")).toHaveLength(3);
    expect(within(stackSection).getByText("Measurement")).toBeInTheDocument();
    expect(within(stackSection).getByText("Paid Media")).toBeInTheDocument();
    expect(within(stackSection).getByText("Automation")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Representative platforms we work with across analytics, paid media, and automation."
      )
    ).toBeInTheDocument();
    expect(within(stackSection).getByText("Microsoft Clarity")).toBeInTheDocument();
    expect(screen.queryByText(/\+\d+\s+additional/i)).not.toBeInTheDocument();
    expect(screen.getByText("We Also Deliver")).toBeInTheDocument();
    expect(screen.getByText("Complementary services to round out your digital growth stack.")).toBeInTheDocument();
    const supportingItems = screen.getAllByTestId("supporting-service-item");

    expect(supportingItems).toHaveLength(4);
    expect(within(supportingItems[0]).getByText("Website Development")).toBeInTheDocument();
    expect(within(supportingItems[1]).getByText("Content & Media Strategy")).toBeInTheDocument();
    expect(within(supportingItems[2]).getByText("Email Marketing")).toBeInTheDocument();
    expect(within(supportingItems[3]).getByText("SEO")).toBeInTheDocument();
    expect(screen.getByText("Lead nurture and re-engagement")).toBeInTheDocument();
    expect(screen.getByText("Launches and landing paths")).toBeInTheDocument();
    expect(screen.getByText("Longer-term demand capture")).toBeInTheDocument();
    expect(screen.getByText("Creative direction and planning")).toBeInTheDocument();
    expect(screen.queryAllByText("Learn more")).toHaveLength(3);
    expect(screen.getAllByTestId("process-step")).toHaveLength(8);
    expect(screen.getAllByText("Output")).toHaveLength(8);
    expect(screen.getAllByText("Fit check and priority scope")).toHaveLength(2);
    expect(screen.getAllByText("Prioritised action plan")).toHaveLength(2);
    expect(screen.getAllByText("Live setup and workflow launch")).toHaveLength(2);
    expect(screen.getAllByText("Reporting rhythm and next steps")).toHaveLength(2);
    expect(
      screen.getByText("Can you work with our existing setup, or do we need to rebuild everything?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Usually we start with what you already have. We audit your tracking, campaigns, and follow-up systems first, then recommend only the fixes or rebuilds that are actually necessary."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("A few practical answers before you book a call.")).toBeInTheDocument();
    expect(
      screen.queryByText("What platforms do you support across tracking, paid media, and automation?")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("What sets AlphaTrack Digital apart from other agencies?")).not.toBeInTheDocument();
  });
});
