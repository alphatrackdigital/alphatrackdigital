const getStorage = () => {
  if (typeof window === "undefined") return null;
  return window.sessionStorage;
};

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

const intentKey = (event: string, path: string) =>
  `atd_conversion_intent:${event}:${normalizePath(path)}`;

const firedKey = (event: string, path: string) =>
  `atd_conversion_fired:${event}:${normalizePath(path)}`;

export const markConversionIntent = (event: string, path: string) => {
  getStorage()?.setItem(intentKey(event, path), "true");
};

export const hasConversionIntent = (event: string, path: string) => {
  return getStorage()?.getItem(intentKey(event, path)) === "true";
};

export const hasConversionFired = (event: string, path: string) => {
  return getStorage()?.getItem(firedKey(event, path)) === "true";
};

export const markConversionFired = (event: string, path: string) => {
  getStorage()?.setItem(firedKey(event, path), "true");
};
