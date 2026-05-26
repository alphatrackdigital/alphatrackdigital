import type { Config } from "@netlify/edge-functions";

/**
 * Block crawlers on non-production deployments (staging, branch deploys,
 * deploy previews) to prevent duplicate content indexing and Search Console
 * crawl errors for hostnames like stage.alphatrack.digital.
 *
 * On production (alphatrack.digital / www.alphatrack.digital) this function
 * returns nothing, so Netlify falls through to serve the static
 * public/robots.txt that allows all crawlers.
 */
export default async (request: Request) => {
  const host = new URL(request.url).hostname;
  const isProduction =
    host === "alphatrack.digital" || host === "www.alphatrack.digital";

  if (isProduction) return; // fall through → serve static public/robots.txt

  return new Response("User-agent: *\nDisallow: /\n", {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};

export const config: Config = {
  path: "/robots.txt",
};
