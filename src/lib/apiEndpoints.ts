const BACKEND_ORIGIN = "https://alphatra-serv.netlify.app";

const PRODUCTION_STATIC_HOSTS = new Set([
  "alphatrack.digital",
  "www.alphatrack.digital",
]);

export const resolveApiEndpoint = (
  path: string,
  configuredEndpoint?: string,
  hostname = typeof window !== "undefined" ? window.location.hostname : "",
) => {
  if (configuredEndpoint) return configuredEndpoint;

  if (PRODUCTION_STATIC_HOSTS.has(hostname)) {
    return `${BACKEND_ORIGIN}${path}`;
  }

  return path;
};

export const getLeadsEndpoint = () =>
  resolveApiEndpoint("/api/leads", import.meta.env.VITE_LEADS_ENDPOINT);

export const getBrevoSubscribeEndpoint = () =>
  resolveApiEndpoint("/api/brevo-subscribe", import.meta.env.VITE_BREVO_SUBSCRIBE_ENDPOINT);
