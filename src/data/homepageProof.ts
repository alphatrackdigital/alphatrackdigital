export type HomepageProofCard = {
  clientLabel: string;
  result: string;
  context: string;
  campaignType: string;
  timeframe?: string;
  sourceRef: string;
  canNameClient: boolean;
};

export const homepageProofSection = {
  eyebrow: "Selected Outcomes",
  title: "Selected Campaign Outcomes",
  description:
    "Selected results from recent paid media campaigns across education, hospitality, and consumer brands.",
  confidentialityNote: "Some client details are withheld for confidentiality.",
};

export const homepageProofCards: HomepageProofCard[] = [
  {
    clientLabel: "Luxury Hospitality Brand",
    result: "3,151 website visits",
    context:
      "Video-led campaign across local and international tourism markets, delivered in a focused 12-day run.",
    campaignType: "Video campaign",
    timeframe: "12 days",
    sourceRef: "Brand Assets/Case Study - TAR.pdf",
    canNameClient: false,
  },
  {
    clientLabel: "Education Client",
    result: "Nearly 4.9M impressions",
    context:
      "~2.1M reach from Google Ads and Facebook campaigns built for postgraduate audience targeting in Ghana and Nigeria.",
    campaignType: "Google Ads + Facebook",
    sourceRef: "Brand Assets/Case Study - NiBS.pdf",
    canNameClient: false,
  },
  {
    clientLabel: "Consumer Brand",
    result: "129,862 teaser views",
    context:
      "25.14% completion rate from an episodic rollout designed to build brand visibility with Ghanaian youth audiences.",
    campaignType: "YouTube + partner network",
    sourceRef: "Brand Assets/Case Study - PimSuko.pdf",
    canNameClient: false,
  },
];
