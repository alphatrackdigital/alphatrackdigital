import { Helmet } from "react-helmet-async";
import { SEO_DEFAULTS, SITE_URL, buildCanonicalUrl } from "@/config/seo";

interface SEOProps {
  title: string;
  description: string;
  noindex?: boolean;
  schema?: Record<string, unknown>;
  canonicalUrl?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: "website" | "article";
  twitterImage?: string;
}

const SEO = ({
  title,
  description,
  noindex,
  schema,
  canonicalUrl,
  ogImage,
  ogUrl,
  ogType = SEO_DEFAULTS.ogType,
  twitterImage,
}: SEOProps) => {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  const resolvedCanonical = buildCanonicalUrl(canonicalUrl || currentPath);
  const resolvedOgUrl = buildCanonicalUrl(ogUrl || canonicalUrl || currentPath);
  const resolvedOgImage = ogImage || SEO_DEFAULTS.ogImage;
  const resolvedTwitterImage = twitterImage || resolvedOgImage;
  const twitterDomain = (() => {
    try {
      return new URL(SITE_URL).hostname;
    } catch {
      return "alphatrack.digital";
    }
  })();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={resolvedCanonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SEO_DEFAULTS.siteName} />
      <meta property="og:url" content={resolvedOgUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedTwitterImage} />
      <meta name="twitter:domain" content={twitterDomain} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default SEO;
