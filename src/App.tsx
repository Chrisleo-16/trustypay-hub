import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import RouteLoader from "./components/RouteLoader";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import SafetyTips from "./pages/SafetyTips";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import Users from "./pages/admin/Users";
import Trades from "./pages/admin/Trades";
import Currencies from "./pages/admin/Currencies";
import Ads from "./pages/admin/Ads";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("preloader-shown");
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("preloader-shown", "true");
    setLoading(false);
  };

  if (loading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteLoader />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/trades" element={<Trades />} />
            <Route path="/admin/currencies" element={<Currencies />} />
            <Route path="/admin/ads" element={<Ads />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
