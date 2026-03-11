export type HomepageProofMetric = {
  value: string;
  label: string;
  sourceRef: string;
  canNameClient: boolean;
};

export const homepageProofSection = {
  eyebrow: "Results from recent paid media campaigns",
};

export const homepageProofMetrics: HomepageProofMetric[] = [
  {
    value: "4.9M",
    label: "Impressions delivered in an education campaign",
    sourceRef: "Brand Assets/Case Study - NiBS.pdf",
    canNameClient: false,
  },
  {
    value: "3,151",
    label: "Website visits generated in a 12-day hospitality campaign",
    sourceRef: "Brand Assets/Case Study - TAR.pdf",
    canNameClient: false,
  },
  {
    value: "129,862",
    label: "Teaser views generated for a consumer brand rollout",
    sourceRef: "Brand Assets/Case Study - PimSuko.pdf",
    canNameClient: false,
  },
];
