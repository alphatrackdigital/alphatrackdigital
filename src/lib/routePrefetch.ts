type RouteImporter = () => Promise<unknown>;

const routeImporters = {
  aboutUs: () => import("../pages/AboutUs"),
  services: () => import("../pages/Services"),
  contactUs: () => import("../pages/ContactUs"),
  contactUsThankYou: () => import("../pages/ContactUsThankYou"),
  conversionTracking: () => import("../pages/ConversionTracking"),
  marketingAutomation: () => import("../pages/MarketingAutomation"),
  paidMedia: () => import("../pages/PaidMedia"),
  serviceDetail: () => import("../pages/ServiceDetail"),
  blog: () => import("../pages/Blog"),
  blogPost: () => import("../pages/BlogPost"),
  bookACall: () => import("../pages/BookACall"),
  thankYou: () => import("../pages/ThankYou"),
  trackingLandingPage: () => import("../pages/TrackingLandingPage"),
  privacyPolicy: () => import("../pages/PrivacyPolicy"),
  termsOfService: () => import("../pages/TermsOfService"),
  notFound: () => import("../pages/NotFound"),
} as const;

const prefetchedRoutes = new Set<string>();

const routePrefetchMap: Record<string, RouteImporter[]> = {
  "/about-us": [routeImporters.aboutUs],
  "/service": [routeImporters.services],
  "/service/conversion-tracking": [routeImporters.conversionTracking],
  "/service/marketing-automation": [routeImporters.marketingAutomation],
  "/service/paid-media": [routeImporters.paidMedia],
  "/blog": [routeImporters.blog],
  "/contact-us": [routeImporters.contactUs],
  "/book-a-call": [routeImporters.bookACall],
  "/privacy-policy": [routeImporters.privacyPolicy],
  "/terms-of-service": [routeImporters.termsOfService],
};

export { routeImporters };

export const prefetchRoute = (path: string) => {
  if (prefetchedRoutes.has(path)) return;

  const importers = routePrefetchMap[path];
  if (!importers) return;

  prefetchedRoutes.add(path);
  void Promise.all(importers.map((importRoute) => importRoute())).catch(() => {
    prefetchedRoutes.delete(path);
  });
};
