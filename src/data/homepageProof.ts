export type HomepageProofMetric = {
  value: string;
  label: string;
  compactLabel: string;
  sourceRef: string;
  canNameClient: boolean;
};

export const homepageProofLine = "RESULTS FROM SELECTED CAMPAIGNS";

export const homepageProofMetrics: HomepageProofMetric[] = [
  {
    value: "4.9M",
    label: "Education campaign impressions",
    compactLabel: "Education impressions",
    sourceRef: "Brand Assets/Case Study - NiBS.pdf",
    canNameClient: false,
  },
  {
    value: "3,151",
    label: "Hospitality campaign website visits",
    compactLabel: "Hospitality visits",
    sourceRef: "Brand Assets/Case Study - TAR.pdf",
    canNameClient: false,
  },
  {
    value: "129,862",
    label: "Consumer brand teaser views",
    compactLabel: "Consumer teaser views",
    sourceRef: "Brand Assets/Case Study - PimSuko.pdf",
    canNameClient: false,
  },
];
