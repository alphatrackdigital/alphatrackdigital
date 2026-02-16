import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  noindex?: boolean;
  schema?: Record<string, unknown>;
}

const SEO = ({ title, description, noindex, schema }: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}
    {schema && (
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    )}
  </Helmet>
);

export default SEO;
