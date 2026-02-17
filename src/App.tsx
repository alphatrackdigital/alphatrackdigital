import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import ContactUsThankYou from "./pages/ContactUsThankYou";
import ConversionTracking from "./pages/ConversionTracking";
import MarketingAutomation from "./pages/MarketingAutomation";
import PaidMedia from "./pages/PaidMedia";
import ServiceDetail from "./pages/ServiceDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BookACall from "./pages/BookACall";
import ThankYou from "./pages/ThankYou";
import TrackingLandingPage from "./pages/TrackingLandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
        <ScrollToTop />
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
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
