import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import ConversionTracking from "./pages/ConversionTracking";
import MarketingAutomation from "./pages/MarketingAutomation";
import BookACall from "./pages/BookACall";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/service" element={<Services />} />
            <Route path="/service/conversion-tracking" element={<ConversionTracking />} />
            <Route path="/service/marketing-automation" element={<MarketingAutomation />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/book-a-call" element={<BookACall />} />
            <Route path="/book-a-call/thank-you" element={<ThankYou />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
