import { screen, within } from "@testing-library/react";
import Index from "@/pages/Index";
import { renderWithPageProviders } from "@/test/renderWithPageProviders";

describe("Homepage proof and stack sections", () => {
  it("renders the stat-strip proof section with real campaign metrics and keeps the stack before blog", () => {
    renderWithPageProviders(<Index />);

    const proofEyebrow = screen.getByText("Selected results from recent engagements");
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
    expect(screen.getByRole("heading", { name: /Growth should never/i })).toBeInTheDocument();
    expect(
      screen.getByText(
        "AlphaTrack Digital helps brands turn strategy, measurement, paid media, and follow-up into one clear growth system, so performance is easier to see, trust, and scale."
      )
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Book a Free Strategy Call/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Explore Services/i }).length).toBeGreaterThan(0);
    expect(screen.queryByText("Strategy-led execution")).not.toBeInTheDocument();
    expect(screen.queryByText("Measurement-first delivery")).not.toBeInTheDocument();
    expect(screen.queryByText("Clear reporting and next steps")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hero-system-board")).not.toBeInTheDocument();
    expect(screen.queryByText("How the system connects")).not.toBeInTheDocument();
    expect(screen.queryByText("Connected delivery map")).not.toBeInTheDocument();
    expect(screen.queryByText("Qualified demand with clearer visibility")).not.toBeInTheDocument();
    expect(screen.queryByText("2.1M+")).not.toBeInTheDocument();
    expect(screen.queryByText("55%")).not.toBeInTheDocument();
    expect(screen.queryByText("25.14%")).not.toBeInTheDocument();
    expect(screen.queryByText("Reach")).not.toBeInTheDocument();
    expect(screen.queryByText("Viewer-to-Site Rate")).not.toBeInTheDocument();
    expect(screen.queryByText("Completion Rate")).not.toBeInTheDocument();
    expect(screen.queryByText(/^Website Visits$/)).not.toBeInTheDocument();
    expect(screen.queryByText("4.2Ã—")).not.toBeInTheDocument();
    expect(screen.queryByText("+68%")).not.toBeInTheDocument();
    expect(screen.queryByText("99.4%")).not.toBeInTheDocument();
    expect(screen.queryByText("âˆ’25%")).not.toBeInTheDocument();
    expect(screen.queryByText("Pearl House Ghana")).not.toBeInTheDocument();
    expect(screen.queryByText("Courtney Quist-Therson")).not.toBeInTheDocument();
    expect(screen.queryByText("A Client Perspective")).not.toBeInTheDocument();
    expect(screen.queryByText("Recent Client Outcomes")).not.toBeInTheDocument();

    const industriesSection = screen.getByTestId("industries-section");

    expect(within(industriesSection).getByRole("heading", { name: "Our Primary Sectors" })).toBeInTheDocument();
    expect(within(industriesSection).getAllByTestId("industry-card")).toHaveLength(6);
    expect(within(industriesSection).getByText("Ecommerce & Retail")).toBeInTheDocument();
    expect(within(industriesSection).getByText("SaaS")).toBeInTheDocument();
    expect(within(industriesSection).getByText("Entertainment & Hospitality")).toBeInTheDocument();
    expect(within(industriesSection).getByText("Real Estate")).toBeInTheDocument();
    expect(screen.queryByText("Retail + E-commerce")).not.toBeInTheDocument();
    expect(screen.queryByText("Travel + Hospitality")).not.toBeInTheDocument();

    const stackSection = screen.getByTestId("growth-stack-section");

    expect(within(stackSection).getAllByTestId("growth-stack-card")).toHaveLength(3);
    expect(within(stackSection).getByText("Measurement")).toBeInTheDocument();
    expect(within(stackSection).getByText("Paid Media")).toBeInTheDocument();
    expect(within(stackSection).getByText("Automation")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Representative platforms we work with across tracking, paid media, reporting, and automation."
      )
    ).toBeInTheDocument();
    expect(within(stackSection).getByText("Microsoft Clarity")).toBeInTheDocument();
    expect(screen.queryByText("Measure first. Acquire with intent. Nurture for retention.")).not.toBeInTheDocument();
    expect(screen.queryByText(/\+\d+\s+additional/i)).not.toBeInTheDocument();
    expect(screen.getByText("Supporting Services")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Complementary services that support campaign execution, creative delivery, and longer-term demand capture."
      )
    ).toBeInTheDocument();
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
    expect(screen.queryByRole("link", { name: /View Services/i })).not.toBeInTheDocument();
    expect(
      screen.queryByText("What platforms do you support across tracking, paid media, and automation?")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("What sets AlphaTrack Digital apart from other agencies?")).not.toBeInTheDocument();
  });
});
