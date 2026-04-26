import { Toaster as Sonner } from "@/components/ui/sonner";
import { Suspense, lazy, type ComponentType, type LazyExoticComponent, type ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import WhatsAppWidget from "@/components/shared/WhatsAppWidget";
import { routeImporters } from "@/lib/routePrefetch";
import Index from "./pages/Index";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminBlogEdit from "@/pages/admin/AdminBlogEdit";

const AboutUs = lazy(routeImporters.aboutUs);
const ExpertiseDetail = lazy(routeImporters.expertiseDetail);
const Services = lazy(routeImporters.services);
const ContactUs = lazy(routeImporters.contactUs);
const ContactUsThankYou = lazy(routeImporters.contactUsThankYou);
const ConversionTracking = lazy(routeImporters.conversionTracking);
const MarketingAutomation = lazy(routeImporters.marketingAutomation);
const PaidMedia = lazy(routeImporters.paidMedia);
const ServiceDetail = lazy(routeImporters.serviceDetail);
const Blog = lazy(routeImporters.blog);
const BlogPost = lazy(routeImporters.blogPost);
const BookACall = lazy(routeImporters.bookACall);
const ThankYou = lazy(routeImporters.thankYou);
const TrackingLandingPage = lazy(routeImporters.trackingLandingPage);
const PrivacyPolicy = lazy(routeImporters.privacyPolicy);
const TermsOfService = lazy(routeImporters.termsOfService);
const NotFound = lazy(routeImporters.notFound);

const RouteContentFallback = () => (
  <div className="min-h-[50vh]" aria-hidden="true">
    <span className="sr-only">Loading page</span>
  </div>
);

const withRouteSuspense = (Component: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<RouteContentFallback />}>
    <Component />
  </Suspense>
);

export const AppShell = ({ children }: { children: ReactNode }) => (
  <>
    <Sonner />
    <WhatsAppWidget />
    {children}
  </>
);

export const AppRouter = () => (
  <ErrorBoundary>
    <ScrollToTop />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/about-us" element={withRouteSuspense(AboutUs)} />
        <Route path="/expertise/:slug" element={withRouteSuspense(ExpertiseDetail)} />
        <Route path="/service" element={withRouteSuspense(Services)} />
        <Route path="/service/conversion-tracking" element={withRouteSuspense(ConversionTracking)} />
        <Route path="/service/marketing-automation" element={withRouteSuspense(MarketingAutomation)} />
        <Route path="/service/paid-media" element={withRouteSuspense(PaidMedia)} />
        <Route path="/service/:slug" element={withRouteSuspense(ServiceDetail)} />
        <Route path="/blog" element={withRouteSuspense(Blog)} />
        <Route path="/blog/:slug" element={withRouteSuspense(BlogPost)} />
        <Route path="/contact-us" element={withRouteSuspense(ContactUs)} />
        <Route path="/contact-us/thank-you" element={withRouteSuspense(ContactUsThankYou)} />
        <Route path="/book-a-call" element={withRouteSuspense(BookACall)} />
        <Route path="/book-a-call/thank-you" element={withRouteSuspense(ThankYou)} />
        <Route path="/privacy-policy" element={withRouteSuspense(PrivacyPolicy)} />
        <Route path="/terms-of-service" element={withRouteSuspense(TermsOfService)} />
        <Route path="/offer/tracking-audit" element={withRouteSuspense(TrackingLandingPage)} />
        <Route path="*" element={withRouteSuspense(NotFound)} />
      </Route>

      {/* Admin — outside main Layout, no header/footer */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/blog/new" element={<AdminBlogEdit />} />
        <Route path="/admin/blog/edit/:slug" element={<AdminBlogEdit />} />
      </Route>
    </Routes>
  </ErrorBoundary>
);

const App = () => (
  <AdminAuthProvider>
    <AppShell>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRouter />
      </BrowserRouter>
    </AppShell>
  </AdminAuthProvider>
);

export default App;
