import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import HeroEyebrow from "@/components/shared/HeroEyebrow";
import { Button } from "@/components/ui/button";
import { withCampaignSearch } from "@/lib/campaignAttribution";
import { cn } from "@/lib/utils";

interface ExpertiseHeroMetric {
  label: string;
  value: string;
  delta: string;
  accent?: "cyan" | "green" | "blue" | "muted";
}

interface ExpertiseHeroChannel {
  label: string;
  value: string;
  muted?: boolean;
}

interface ExpertiseHeroConversion {
  label: string;
  value: string;
  width: number;
  accent?: "blue" | "cyan" | "green";
}

export interface ExpertiseHeroDashboard {
  title: string;
  statusLabel: string;
  metrics: ExpertiseHeroMetric[];
  chart: {
    title: string;
    valueLabel: string;
    labels: string[];
  };
  channels: {
    title: string;
    rows: ExpertiseHeroChannel[];
  };
  conversion: {
    title: string;
    rows: ExpertiseHeroConversion[];
  };
  performance: {
    title: string;
    spend: string;
    roas: string;
    note: string;
  };
}

export interface ExpertiseHeroContent {
  eyebrow: string;
  title: string;
  highlightedText: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaTo: string;
  secondaryCtaLabel: string;
  secondaryCtaTo: string;
  visual?:
    | "saas-pipeline"
    | "education-enrollment"
    | "ecommerce-revenue"
    | "fmcg-demand"
    | "hospitality-booking"
    | "real-estate-pipeline"
    | "fashion-launch"
    | "gaming-community"
    | "dashboard"
    | "image";
  background?: "saas" | "education" | "ecommerce" | "fmcg" | "hospitality" | "real-estate" | "fashion" | "gaming";
  image?: {
    src: string;
    alt: string;
  };
  dashboard?: ExpertiseHeroDashboard;
}

interface ExpertiseHeroProps {
  content: ExpertiseHeroContent;
  expertiseName: string;
  search: string;
}

const metricAccentClasses = {
  cyan: "text-secondary",
  green: "text-primary",
  blue: "text-atd-blue",
  muted: "text-foreground/70",
} as const;

const conversionAccentClasses = {
  blue: "bg-atd-blue",
  cyan: "bg-secondary",
  green: "bg-primary",
} as const;

const fallbackDashboard: ExpertiseHeroDashboard = {
  title: "AlphaTrack Analytics",
  statusLabel: "Live",
  metrics: [
    { label: "Leads", value: "324", delta: "+18%", accent: "green" },
    { label: "CAC", value: "$42", delta: "-12%", accent: "cyan" },
    { label: "ROAS", value: "3.4x", delta: "improving", accent: "green" },
    { label: "Speed", value: "8m", delta: "follow-up", accent: "cyan" },
  ],
  chart: { title: "Growth Signal", valueLabel: "+24%", labels: ["M1", "M2", "M3", "M4", "M5"] },
  channels: {
    title: "Top Sources",
    rows: [
      { label: "Google Ads", value: "42%" },
      { label: "Meta", value: "28%" },
      { label: "Email", value: "18%" },
    ],
  },
  conversion: {
    title: "Conversion Flow",
    rows: [
      { label: "Captured", value: "100%", width: 100 },
      { label: "Qualified", value: "62%", width: 62, accent: "cyan" },
      { label: "Converted", value: "28%", width: 28, accent: "green" },
    ],
  },
  performance: { title: "Performance", spend: "$8.2K", roas: "3.4x", note: "Cleaner signal" },
};

const DashboardCard = ({ dashboard = fallbackDashboard }: { dashboard?: ExpertiseHeroDashboard }) => (
  <div className="relative mx-auto w-full max-w-[35rem] overflow-hidden rounded-2xl border border-white/[0.075] bg-[#0b1424]/95 shadow-[0_28px_90px_rgba(0,0,0,0.38)] lg:max-w-none">
    <div className="flex min-h-14 items-center justify-between border-b border-white/[0.055] px-4 sm:px-5">
      <div className="flex items-center gap-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <p className="ml-2 hidden text-xs font-semibold text-muted-foreground/70 sm:block">
          {dashboard.title}
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/12 px-3 py-1.5 text-[11px] font-bold text-secondary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {dashboard.statusLabel}
      </span>
    </div>

    <div className="grid gap-3 p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {dashboard.metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/70">
              {metric.label}
            </p>
            <p className="mt-1 text-xl font-extrabold leading-none tracking-normal text-foreground sm:text-2xl">
              {metric.value}
            </p>
            <p className={cn("mt-2 text-[11px] font-semibold", metricAccentClasses[metric.accent ?? "green"])}>
              {metric.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.45fr_0.85fr]">
        <div className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-bold text-muted-foreground/80">{dashboard.chart.title}</p>
            <span className="rounded-md bg-secondary px-2.5 py-1 text-[11px] font-extrabold text-secondary-foreground">
              {dashboard.chart.valueLabel}
            </span>
          </div>
          <div className="relative h-36 overflow-hidden">
            <div className="absolute inset-x-0 top-4 h-px bg-white/[0.055]" />
            <div className="absolute inset-x-0 top-12 h-px bg-white/[0.055]" />
            <div className="absolute inset-x-0 top-20 h-px bg-white/[0.055]" />
            <div className="absolute inset-x-0 bottom-7 h-px bg-white/[0.055]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 330 144" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="saasHeroChartFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgb(0,175,239)" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="rgb(0,175,239)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M18 107 L70 86 L122 64 L174 46 L226 35 L278 22 L312 17 L312 121 L18 121 Z" fill="url(#saasHeroChartFill)" />
              <path d="M18 107 L70 86 L122 64 L174 46 L226 35 L278 22 L312 17" fill="none" stroke="rgb(0,175,239)" strokeWidth="3" strokeLinecap="round" />
              {[18, 70, 122, 174, 226, 278, 312].map((x, index) => (
                <circle key={x} cx={x} cy={[107, 86, 64, 46, 35, 22, 17][index]} r="3.2" fill="rgb(0,175,239)" />
              ))}
            </svg>
            <div className="absolute inset-x-3 bottom-0 flex justify-between text-[9px] font-semibold text-muted-foreground/55">
              {dashboard.chart.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3.5">
          <p className="mb-2 text-[11px] font-bold text-muted-foreground/80">{dashboard.channels.title}</p>
          <div className="space-y-2">
            {dashboard.channels.rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3 border-b border-white/[0.035] pb-1.5 last:border-b-0 last:pb-0">
                <span className={cn("truncate text-[11px] font-semibold", row.muted ? "text-muted-foreground/55" : "text-foreground/75")}>
                  {row.label}
                </span>
                <span className={cn("text-[11px] font-extrabold", row.muted ? "text-muted-foreground/55" : "text-secondary")}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3.5">
          <p className="mb-3 text-[11px] font-bold text-muted-foreground/80">{dashboard.conversion.title}</p>
          <div className="space-y-2.5">
            {dashboard.conversion.rows.map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex justify-between text-[10px] font-bold text-muted-foreground/65">
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded bg-white/[0.055]">
                  <div
                    className={cn("h-full rounded", conversionAccentClasses[row.accent ?? "cyan"])}
                    style={{ width: `${row.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3.5">
          <p className="mb-3 text-[11px] font-bold text-muted-foreground/80">{dashboard.performance.title}</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">Monthly spend</p>
              <p className="mt-1 text-xl font-extrabold leading-none text-foreground">{dashboard.performance.spend}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">ROAS</p>
              <p className="mt-1 text-xl font-extrabold leading-none text-foreground">{dashboard.performance.roas}</p>
            </div>
          </div>
          <div className="mt-5 flex items-end gap-1.5">
            {[18, 26, 22, 34, 39, 43, 46].map((height) => (
              <span key={height} className="w-full rounded-t bg-primary/80" style={{ height: `${height}px` }} />
            ))}
          </div>
          <p className="mt-2 text-right text-[10px] font-semibold text-primary">{dashboard.performance.note}</p>
        </div>
      </div>
    </div>
  </div>
);

const ChannelNode = ({
  className,
  glow,
  label,
}: {
  className: string;
  glow: string;
  label: string;
}) => (
  <div className={cn("absolute flex items-center justify-center", className)}>
    <div className={cn("absolute h-24 w-24 rounded-full blur-2xl", glow)} />
    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-[#0b1424] text-[11px] font-black uppercase tracking-normal text-foreground shadow-[0_18px_44px_rgba(0,0,0,0.42)]">
      {label}
    </div>
  </div>
);

const MetricTile = ({
  className,
  label,
  value,
  tone = "green",
}: {
  className: string;
  label: string;
  value: string;
  tone?: "green" | "cyan" | "blue";
}) => {
  const toneClasses = {
    green: "border-primary/20 bg-primary/[0.08] text-primary",
    cyan: "border-secondary/20 bg-secondary/[0.08] text-secondary",
    blue: "border-atd-blue/25 bg-atd-blue/[0.12] text-secondary",
  };

  return (
    <div className={cn("absolute rounded-2xl border bg-[#111724]/90 px-4 py-3 shadow-[0_18px_54px_rgba(0,0,0,0.36)] backdrop-blur-md", className, toneClasses[tone])}>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70">{label}</p>
      <p className="mt-1 text-2xl font-extrabold leading-none text-foreground">{value}</p>
    </div>
  );
};

const SaasPipelineVisual = () => (
  <div className="relative mx-auto min-h-[25rem] w-full max-w-[36rem] overflow-visible lg:min-h-[34rem]">
    <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_44%,rgba(0,175,239,0.18),transparent_30%),radial-gradient(circle_at_30%_48%,rgba(0,51,153,0.18),transparent_24%),radial-gradient(circle_at_73%_54%,rgba(51,204,153,0.16),transparent_25%)] blur-xl" />
    <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] bg-[#0c1422]/92 opacity-95 shadow-[0_0_90px_rgba(0,175,239,0.16),inset_0_0_70px_rgba(51,204,153,0.08)]" />
    <div className="absolute left-[12%] right-[12%] top-1/2 h-px bg-secondary/35" />
    <div className="absolute left-1/2 top-[12%] h-[76%] w-px bg-white/[0.08]" />

    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 576 544" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="signalLeft" x1="80" x2="286" y1="272" y2="272">
          <stop stopColor="#003399" stopOpacity="0.06" />
          <stop offset="0.52" stopColor="#00afef" stopOpacity="0.36" />
          <stop offset="1" stopColor="#00afef" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="signalRight" x1="290" x2="496" y1="272" y2="272">
          <stop stopColor="#00afef" stopOpacity="0.28" />
          <stop offset="1" stopColor="#33cc99" stopOpacity="0.48" />
        </linearGradient>
      </defs>
      {Array.from({ length: 10 }).map((_, index) => (
        <path
          key={`left-${index}`}
          d={`M80 ${220 + index * 11} C150 ${204 + index * 8}, 202 ${238 + index * 4}, 286 ${272}`}
          stroke="url(#signalLeft)"
          strokeWidth="2"
          strokeOpacity={0.12 + index * 0.035}
        />
      ))}
      {Array.from({ length: 10 }).map((_, index) => (
        <path
          key={`right-${index}`}
          d={`M290 ${272} C364 ${238 + index * 4}, 430 ${204 + index * 8}, 498 ${220 + index * 11}`}
          stroke="url(#signalRight)"
          strokeWidth="2"
          strokeOpacity={0.16 + index * 0.03}
        />
      ))}
      <path d="M96 196C148 184 154 236 196 236H238" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <path d="M102 350C154 356 160 310 204 310H238" stroke="rgba(255,255,255,0.52)" strokeWidth="2" />
      <path d="M338 236H382C426 236 432 184 484 196" stroke="rgba(255,255,255,0.54)" strokeWidth="2" />
      <path d="M338 310H382C426 310 432 356 484 350" stroke="rgba(255,255,255,0.48)" strokeWidth="2" />
    </svg>

    <ChannelNode className="left-[5%] top-[24%]" glow="bg-secondary/60" label="Ads" />
    <ChannelNode className="left-[8%] bottom-[22%]" glow="bg-primary/60" label="CRM" />
    <ChannelNode className="right-[7%] top-[20%]" glow="bg-secondary/65" label="GA4" />
    <ChannelNode className="right-[9%] top-[43%]" glow="bg-atd-blue/60" label="API" />
    <ChannelNode className="right-[9%] bottom-[17%]" glow="bg-atd-blue/55" label="MQL" />

    <div className="absolute left-1/2 top-1/2 flex h-[12.5rem] w-[12.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#111724] shadow-[0_30px_84px_rgba(0,0,0,0.48)]">
      <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(0,175,239,0.18),transparent_42%,rgba(51,204,153,0.14))]" />
      <div className="absolute -inset-3 rounded-2xl border border-white/[0.05]" />
      <div className="relative h-28 w-36 rounded-2xl border border-white/[0.08] bg-[#171c2a] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="h-12 w-16 rounded-xl border-2 border-secondary bg-secondary/[0.08]" />
        <div className="absolute right-4 top-4 h-12 w-12 rounded-xl border border-white/[0.1] bg-white/[0.035]" />
        <div className="mt-4 h-2 w-20 rounded-full bg-white/35" />
        <div className="mt-2 h-2 w-14 rounded-full bg-white/15" />
      </div>
      <div className="absolute -bottom-10 h-12 w-16 rounded-b-xl bg-[#151a27] shadow-[0_22px_34px_rgba(0,0,0,0.38)]" />
      <div className="absolute -bottom-12 h-3 w-24 rounded bg-[#242936]" />
    </div>

    <MetricTile className="left-[1%] top-[4%] hidden sm:block" label="Trials" value="1,240" tone="cyan" />
    <MetricTile className="right-[2%] top-[5%] hidden sm:block" label="Pipeline" value="$48.2K" tone="green" />
    <MetricTile className="bottom-[2%] left-[28%]" label="CAC" value="$184" tone="cyan" />
    <MetricTile className="bottom-[8%] right-[10%]" label="LTV:CAC" value="4.8x" tone="green" />
  </div>
);

const sectorVisuals = {
  "education-enrollment": {
    center: "Enrolment",
    left: ["Open Day", "Programme"],
    right: ["Application", "Admissions"],
    metricA: ["Enquiries", "412"],
    metricB: ["Applications", "86"],
    metricC: ["Response", "94%"],
    line: "Student journey",
    accent: "education",
  },
  "ecommerce-revenue": {
    center: "Revenue",
    left: ["Product", "Cart"],
    right: ["Order", "Retention"],
    metricA: ["Revenue", "$84K"],
    metricB: ["AOV", "$72"],
    metricC: ["Repeat", "31%"],
    line: "Purchase signal",
    accent: "ecommerce",
  },
  "fmcg-demand": {
    center: "Demand",
    left: ["Launch", "Retailer"],
    right: ["Stockist", "Coupon"],
    metricA: ["Reach", "1.8M"],
    metricB: ["Clicks", "42K"],
    metricC: ["Store visits", "+19%"],
    line: "Retail demand",
    accent: "fmcg",
  },
  "hospitality-booking": {
    center: "Bookings",
    left: ["Event", "Offer"],
    right: ["Reservation", "Repeat"],
    metricA: ["Bookings", "624"],
    metricB: ["Occupancy", "78%"],
    metricC: ["Return", "+22%"],
    line: "Guest demand",
    accent: "hospitality",
  },
  "real-estate-pipeline": {
    center: "Property leads",
    left: ["Listing", "Viewing"],
    right: ["Agent", "Pipeline"],
    metricA: ["Enquiries", "318"],
    metricB: ["Viewings", "74"],
    metricC: ["Qualified", "41%"],
    line: "Buyer journey",
    accent: "realEstate",
  },
  "fashion-launch": {
    center: "Drop signal",
    left: ["Launch", "Creator"],
    right: ["Cart", "Repeat"],
    metricA: ["Sales", "$52K"],
    metricB: ["Carts", "1,206"],
    metricC: ["Retention", "+17%"],
    line: "Collection demand",
    accent: "fashion",
  },
  "gaming-community": {
    center: "Community",
    left: ["Trailer", "Wishlist"],
    right: ["Discord", "Event"],
    metricA: ["Signups", "8.4K"],
    metricB: ["Wishlists", "3.1K"],
    metricC: ["Active", "64%"],
    line: "Player signal",
    accent: "gaming",
  },
} as const;

const heroBackgrounds = {
  saas: "radial-gradient(circle at 18% 28%, rgba(51,204,153,0.10), transparent 29%), radial-gradient(circle at 76% 35%, rgba(0,175,239,0.12), transparent 30%), radial-gradient(circle at 50% 82%, rgba(0,51,153,0.16), transparent 36%), linear-gradient(180deg, #05070d 0%, #061017 54%, #05070d 100%)",
  education: "radial-gradient(circle at 20% 26%, rgba(51,204,153,0.10), transparent 30%), radial-gradient(circle at 74% 32%, rgba(0,175,239,0.17), transparent 32%), radial-gradient(circle at 52% 84%, rgba(0,51,153,0.13), transparent 35%), linear-gradient(180deg, #05070d 0%, #06111a 54%, #05070d 100%)",
  ecommerce: "radial-gradient(circle at 18% 34%, rgba(51,204,153,0.16), transparent 30%), radial-gradient(circle at 78% 35%, rgba(0,175,239,0.09), transparent 30%), radial-gradient(circle at 48% 84%, rgba(0,51,153,0.12), transparent 34%), linear-gradient(180deg, #05070d 0%, #061311 54%, #05070d 100%)",
  fmcg: "radial-gradient(circle at 18% 26%, rgba(0,175,239,0.10), transparent 30%), radial-gradient(circle at 78% 35%, rgba(0,51,153,0.22), transparent 33%), radial-gradient(circle at 50% 82%, rgba(51,204,153,0.08), transparent 34%), linear-gradient(180deg, #05070d 0%, #071020 54%, #05070d 100%)",
  hospitality: "radial-gradient(circle at 20% 30%, rgba(0,175,239,0.09), transparent 29%), radial-gradient(circle at 76% 35%, rgba(51,204,153,0.15), transparent 31%), radial-gradient(circle at 52% 82%, rgba(0,51,153,0.13), transparent 35%), linear-gradient(180deg, #05070d 0%, #061412 54%, #05070d 100%)",
  "real-estate": "radial-gradient(circle at 17% 31%, rgba(0,51,153,0.18), transparent 31%), radial-gradient(circle at 78% 34%, rgba(0,175,239,0.13), transparent 31%), radial-gradient(circle at 50% 82%, rgba(51,204,153,0.07), transparent 34%), linear-gradient(180deg, #05070d 0%, #07111d 54%, #05070d 100%)",
  fashion: "radial-gradient(circle at 18% 30%, rgba(0,51,153,0.17), transparent 30%), radial-gradient(circle at 76% 34%, rgba(51,204,153,0.13), transparent 31%), radial-gradient(circle at 50% 84%, rgba(0,175,239,0.08), transparent 34%), linear-gradient(180deg, #05070d 0%, #07101a 54%, #05070d 100%)",
  gaming: "radial-gradient(circle at 18% 29%, rgba(0,175,239,0.12), transparent 30%), radial-gradient(circle at 78% 34%, rgba(0,51,153,0.25), transparent 34%), radial-gradient(circle at 50% 84%, rgba(51,204,153,0.08), transparent 35%), linear-gradient(180deg, #05070d 0%, #070f21 54%, #05070d 100%)",
} as const;

const sectorAccentClasses = {
  education: {
    glow: "radial-gradient(circle_at_34%_38%,rgba(0,175,239,0.22),transparent_30%),radial-gradient(circle_at_72%_60%,rgba(51,204,153,0.16),transparent_30%)",
    center: "border-secondary/25 bg-[#0b1724]",
  },
  ecommerce: {
    glow: "radial-gradient(circle_at_38%_36%,rgba(51,204,153,0.22),transparent_30%),radial-gradient(circle_at_72%_58%,rgba(0,175,239,0.14),transparent_30%)",
    center: "border-primary/28 bg-[#0d1b1a]",
  },
  fmcg: {
    glow: "radial-gradient(circle_at_34%_42%,rgba(0,51,153,0.26),transparent_32%),radial-gradient(circle_at_72%_54%,rgba(0,175,239,0.18),transparent_30%)",
    center: "border-atd-blue/30 bg-[#0b1226]",
  },
  hospitality: {
    glow: "radial-gradient(circle_at_34%_38%,rgba(0,175,239,0.18),transparent_30%),radial-gradient(circle_at_72%_58%,rgba(51,204,153,0.20),transparent_30%)",
    center: "border-primary/28 bg-[#0b1818]",
  },
  realEstate: {
    glow: "radial-gradient(circle_at_38%_34%,rgba(0,175,239,0.15),transparent_30%),radial-gradient(circle_at_74%_62%,rgba(0,51,153,0.30),transparent_30%)",
    center: "border-secondary/24 bg-[#0a1424]",
  },
  fashion: {
    glow: "radial-gradient(circle_at_34%_38%,rgba(51,204,153,0.20),transparent_30%),radial-gradient(circle_at_72%_58%,rgba(0,51,153,0.28),transparent_32%)",
    center: "border-primary/26 bg-[#0e1724]",
  },
  gaming: {
    glow: "radial-gradient(circle_at_34%_36%,rgba(0,51,153,0.30),transparent_32%),radial-gradient(circle_at_72%_58%,rgba(0,175,239,0.24),transparent_30%)",
    center: "border-atd-blue/32 bg-[#0b1022]",
  },
} as const;

type SectorVisualKey = keyof typeof sectorVisuals;

const SectorSignalVisual = ({ visual }: { visual: SectorVisualKey }) => {
  const config = sectorVisuals[visual];
  const accent = sectorAccentClasses[config.accent];

  return (
    <div className="relative mx-auto min-h-[31rem] w-full max-w-[36rem] overflow-visible">
    <div className="absolute inset-0 rounded-2xl blur-xl" style={{ background: accent.glow }} />
      <div className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] bg-[#09101b]/85 shadow-[inset_0_0_80px_rgba(0,175,239,0.08)]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 576 496" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`sectorLine-${visual}`} x1="84" x2="492" y1="248" y2="248">
            <stop stopColor="#00afef" stopOpacity="0.16" />
            <stop offset="0.5" stopColor="#00afef" stopOpacity="0.52" />
            <stop offset="1" stopColor="#33cc99" stopOpacity="0.48" />
          </linearGradient>
        </defs>
        <path d="M86 248H490" stroke={`url(#sectorLine-${visual})`} strokeWidth="2" />
        <path d="M288 92V404" stroke="rgba(255,255,255,0.06)" />
        <path d="M116 156C178 172 196 216 246 230" stroke={`url(#sectorLine-${visual})`} strokeWidth="2" />
        <path d="M116 340C178 324 196 280 246 266" stroke={`url(#sectorLine-${visual})`} strokeWidth="2" />
        <path d="M330 230C382 216 400 172 462 156" stroke={`url(#sectorLine-${visual})`} strokeWidth="2" />
        <path d="M330 266C382 280 400 324 462 340" stroke={`url(#sectorLine-${visual})`} strokeWidth="2" />
      </svg>

      {[config.left[0], config.left[1], config.right[0], config.right[1]].map((label, index) => (
        <div
          key={label}
          className={cn(
            "absolute flex h-16 w-28 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#101724]/90 px-3 text-center text-[11px] font-black uppercase tracking-[0.06em] text-foreground shadow-[0_18px_44px_rgba(0,0,0,0.36)]",
            index === 0 && "left-[3%] top-[22%]",
            index === 1 && "left-[5%] bottom-[22%]",
            index === 2 && "right-[3%] top-[22%]",
            index === 3 && "right-[5%] bottom-[22%]",
          )}
        >
          {label}
        </div>
      ))}

      <div className={cn("absolute left-1/2 top-1/2 flex h-[12.5rem] w-[12.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border shadow-[0_30px_84px_rgba(0,0,0,0.46)]", accent.center)}>
        <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(0,175,239,0.16),transparent_42%,rgba(51,204,153,0.14))]" />
        <div className="relative mb-4 h-16 w-20 rounded-2xl border border-white/[0.08] bg-white/[0.035]">
          <div className="absolute left-4 top-4 h-3 w-12 rounded-full bg-secondary/75" />
          <div className="absolute left-4 top-8 h-3 w-9 rounded-full bg-primary/55" />
        </div>
        <p className="relative max-w-[9rem] text-center text-xl font-extrabold leading-tight text-foreground">{config.center}</p>
        <p className="relative mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{config.line}</p>
      </div>

      <MetricTile className="left-[3%] top-[4%]" label={config.metricA[0]} value={config.metricA[1]} tone="cyan" />
      <MetricTile className="right-[4%] top-[5%]" label={config.metricB[0]} value={config.metricB[1]} tone="green" />
      <MetricTile className="bottom-[3%] left-[32%]" label={config.metricC[0]} value={config.metricC[1]} tone="blue" />
    </div>
  );
};

const ExpertiseHero = ({ content, expertiseName, search }: ExpertiseHeroProps) => {
  const primaryTo = withCampaignSearch(content.primaryCtaTo, search);
  const backgroundKey = content.background ?? "saas";
  const background = heroBackgrounds[backgroundKey];
  const usesResultsHeroTreatment = backgroundKey === "saas";

  return (
    <section className="relative overflow-hidden bg-[#05070d] pb-20 pt-6 text-center md:pb-24 md:pt-14 lg:text-left">
      <div className="pointer-events-none absolute inset-0" style={{ background }} />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle,rgba(0,175,239,0.75)_1px,transparent_1.5px)] bg-[size:38px_38px] lg:block",
          usesResultsHeroTreatment
            ? "opacity-[0.055] [mask-image:radial-gradient(ellipse_at_50%_42%,black_0%,transparent_68%)]"
            : "opacity-[0.065] [mask-image:radial-gradient(ellipse_at_68%_42%,black_0%,transparent_66%)]",
        )}
      />
      {!usesResultsHeroTreatment && (
        <svg className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[62%] opacity-70 lg:block" viewBox="0 0 860 640" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={`heroSignal-${backgroundKey}`} x1="70" x2="800" y1="320" y2="320">
              <stop stopColor="#00afef" stopOpacity="0" />
              <stop offset="0.42" stopColor="#00afef" stopOpacity="0.22" />
              <stop offset="1" stopColor="#33cc99" stopOpacity="0.14" />
            </linearGradient>
          </defs>
          <path d="M40 170C170 122 266 162 374 250C496 350 614 364 820 286" stroke={`url(#heroSignal-${backgroundKey})`} strokeWidth="1.5" />
          <path d="M80 450C236 388 310 418 434 344C548 276 666 258 828 326" stroke={`url(#heroSignal-${backgroundKey})`} strokeWidth="1.5" />
          <path d="M216 80V558M512 48V592M710 126V508" stroke="rgba(255,255,255,0.035)" />
        </svg>
      )}
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-[#05070d] to-transparent", usesResultsHeroTreatment ? "h-28" : "h-48")} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#05070d]/55 to-[#05070d]" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Expertise", path: "/expertise" },
            { label: expertiseName },
          ]}
        />

        <div className="mt-12 grid gap-8 md:mt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,0.78fr)] lg:items-center lg:gap-12">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <HeroEyebrow>{content.eyebrow}</HeroEyebrow>
            <h1 className="title-safe mx-auto mt-5 max-w-[13ch] text-[2.25rem] font-extrabold leading-[1.14] tracking-normal text-foreground sm:text-[3.65rem] lg:mx-0 lg:mt-6 lg:max-w-[14ch] lg:text-[3.3rem] lg:leading-[1.06] xl:text-[3.7rem]">
              {content.title.split(content.highlightedText)[0]}
              <span className="text-gradient-atd-hero">{content.highlightedText}</span>
              {content.title.split(content.highlightedText)[1]}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/70 sm:text-base sm:leading-8 lg:mx-0 lg:mt-5 lg:text-[17px]">
              {content.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 sm:px-8"
              >
                <Link to={primaryTo}>
                  {content.primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hidden h-11 rounded-xl border-white/20 bg-white/[0.035] px-6 text-sm font-bold text-foreground hover:bg-white/[0.07] sm:inline-flex sm:px-8"
              >
                <Link to={content.secondaryCtaTo}>{content.secondaryCtaLabel}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="hidden lg:block"
          >
            {content.visual === "saas-pipeline" ? (
              <SaasPipelineVisual />
            ) : content.visual && content.visual in sectorVisuals ? (
              <SectorSignalVisual visual={content.visual as SectorVisualKey} />
            ) : (
              <DashboardCard dashboard={content.dashboard} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseHero;
