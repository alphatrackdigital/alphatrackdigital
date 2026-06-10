const BACKEND_ORIGIN = "https://alphatra-serv.netlify.app";

const LOCAL_HOSTS = new Set(["", "localhost", "127.0.0.1", "::1"]);

const isLocalHostname = (hostname: string) =>
  LOCAL_HOSTS.has(hostname) || hostname.endsWith(".localhost");

const isVercelHostname = (hostname: string) =>
  hostname === "website-internal-test.vercel.app" ||
  hostname === "atd-website-test.vercel.app" ||
  hostname === "atd-website-test-alphatrackdigitals-projects.vercel.app" ||
  hostname.endsWith("-alphatrackdigitals-projects.vercel.app");

export const resolveApiEndpoint = (
  path: string,
  configuredEndpoint?: string,
  hostname = typeof window !== "undefined" ? window.location.hostname : "",
) => {
  if (configuredEndpoint) return configuredEndpoint;

  if (isLocalHostname(hostname) || isVercelHostname(hostname)) {
    return path;
  }

  return `${BACKEND_ORIGIN}${path}`;
};

export const getLeadsEndpoint = () =>
  resolveApiEndpoint("/api/leads", import.meta.env.VITE_LEADS_ENDPOINT);

export const getBrevoSubscribeEndpoint = () =>
  resolveApiEndpoint("/api/brevo-subscribe", import.meta.env.VITE_BREVO_SUBSCRIBE_ENDPOINT);
