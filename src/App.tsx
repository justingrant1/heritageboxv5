
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import PackageSelected from "./pages/PackageSelected";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ServicePage from "./pages/ServicePage";
import LocationPage from "./pages/LocationPage";
import ServiceCombinationPage from "./pages/ServiceCombinationPage";
import ComparisonPage from "./pages/ComparisonPage";
import GuidePage from "./pages/GuidePage";
import { CityPage } from "./pages/CityPage";
import SeasonalPage from "./pages/SeasonalPage";
import InteractiveToolPage from "./pages/InteractiveToolPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/package-selected" element={<PackageSelected />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* Programmatic SEO Routes */}
            <Route path="/services/:serviceSlug" element={<ServicePage />} />
            <Route path="/services/:serviceSlug/:locationSlug" element={<ServiceCombinationPage />} />
            <Route path="/locations/:state" element={<LocationPage />} />
            <Route path="/locations/:state/:city" element={<LocationPage />} />
            <Route path="/compare/:comparisonSlug" element={<ComparisonPage />} />
            <Route path="/guides/:guideSlug" element={<GuidePage />} />
            <Route path="/cities/:citySlug" element={<CityPage />} />
            <Route path="/seasonal/:seasonalSlug" element={<SeasonalPage />} />
            <Route path="/tools/:toolSlug" element={<InteractiveToolPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
