export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://alphatrack.digital";

export const SEO_DEFAULTS = {
  siteName: "AlphaTrack Digital",
  ogImage: "https://alphatrack.digital/wp-content/uploads/2025/08/Group-320.png",
  ogType: "website",
};

export const buildCanonicalUrl = (path?: string) => {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};
