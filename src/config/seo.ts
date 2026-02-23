const FALLBACK_SITE_URL = "https://alphatrackdigital.lovable.app";

const normalizeSiteUrl = (url: string) => url.replace(/\/+$/, "");

const runtimeOrigin = typeof window !== "undefined" ? window.location.origin : "";
const configuredSiteUrl = import.meta.env.VITE_SITE_URL || runtimeOrigin || FALLBACK_SITE_URL;

export const SITE_URL = normalizeSiteUrl(configuredSiteUrl);

export const buildCanonicalUrl = (path?: string) => {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (normalizedPath === "/") return SITE_URL;

  return `${SITE_URL}${normalizedPath}`;
};

export const SEO_DEFAULTS = {
  siteName: "AlphaTrack Digital",
  ogImage: buildCanonicalUrl("/social-preview.png"),
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: "image/png",
  ogImageAlt: "AlphaTrack Digital - Data-Driven Performance Marketing Agency",
  ogType: "website" as const,
  twitterCard: "summary_large_image" as const,
};
