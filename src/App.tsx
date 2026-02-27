import { Toaster as Sonner } from "@/components/ui/sonner";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import WhatsAppWidget from "@/components/shared/WhatsAppWidget";

const Index = lazy(() => import("./pages/Index"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Services = lazy(() => import("./pages/Services"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ContactUsThankYou = lazy(() => import("./pages/ContactUsThankYou"));
const ConversionTracking = lazy(() => import("./pages/ConversionTracking"));
const MarketingAutomation = lazy(() => import("./pages/MarketingAutomation"));
const PaidMedia = lazy(() => import("./pages/PaidMedia"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BookACall = lazy(() => import("./pages/BookACall"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const TrackingLandingPage = lazy(() => import("./pages/TrackingLandingPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">Loading page...</div>
);

const App = () => (
  <>
    <Sonner />
    <WhatsAppWidget />
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/service" element={<Services />} />
              <Route path="/service/conversion-tracking" element={<ConversionTracking />} />
              <Route path="/service/marketing-automation" element={<MarketingAutomation />} />
              <Route path="/service/paid-media" element={<PaidMedia />} />
              <Route path="/service/:slug" element={<ServiceDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/contact-us/thank-you" element={<ContactUsThankYou />} />
              <Route path="/book-a-call" element={<BookACall />} />
              <Route path="/book-a-call/thank-you" element={<ThankYou />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/offer/tracking-audit" element={<TrackingLandingPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </>
);

export default App;
