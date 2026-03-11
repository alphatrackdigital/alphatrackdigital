export type HomepageProofCard = {
  clientLabel: string;
  result: string;
  context: string;
  channelOrService: string;
  timeframe?: string;
  sourceRef: string;
  canNameClient: boolean;
};

export const homepageProofSection = {
  eyebrow: "Selected Outcomes",
  title: "Recent Client Outcomes",
  description:
    "Anonymous snapshots from approved case-study material. Client names stay private until permission is granted.",
};

export const homepageProofCards: HomepageProofCard[] = [
  {
    clientLabel: "Education Client",
    result: "Nearly 4.9M impressions",
    context:
      "~2.1M reach from Google Ads and Facebook campaigns built for postgraduate audience targeting.",
    channelOrService: "Paid Media",
    sourceRef: "Brand Assets/Case Study - NiBS.pdf",
    canNameClient: false,
  },
  {
    clientLabel: "Luxury Hospitality Brand",
    result: "3,151 website visits in 12 days",
    context: "Video-led campaign across local and international tourism markets.",
    channelOrService: "Paid Media",
    timeframe: "12 days",
    sourceRef: "Brand Assets/Case Study - TAR.pdf",
    canNameClient: false,
  },
  {
    clientLabel: "Consumer Brand",
    result: "129,862 teaser views",
    context: "25.14% completion rate from an episodic video campaign rollout.",
    channelOrService: "Paid Media",
    sourceRef: "Brand Assets/Case Study - PimSuko.pdf",
    canNameClient: false,
  },
];
