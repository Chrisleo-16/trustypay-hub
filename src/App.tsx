import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import RouteLoader from "./components/RouteLoader";
import ProtectedRoute from "./components/ProtectedRoute";
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
import Orders from "./pages/admin/Orders";
import PendingOrders from "./pages/admin/PendingOrders";
import CompletedOrders from "./pages/admin/CompletedOrders";
import RunningTrades from "./pages/admin/RunningTrades";
import ReportedTrades from "./pages/admin/ReportedTrades";
import CompletedTrades from "./pages/admin/CompletedTrades";
import PaymentWindow from "./pages/admin/PaymentWindow";
import PaymentMethods from "./pages/admin/PaymentMethods";
import Transactions from "./pages/admin/Transactions";
import Disputes from "./pages/admin/Disputes";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("preloader-shown");
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);
const testSendEmail = async () => {
  try {
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Tester",
        email: "test@example.com",
        subject: "Vercel API Route Test",
        message: "This is a test message from the testSendEmail button.",
      }),
    });

    const data = await response.json();
    console.log("✅ API Response:", data);

    if (data.success) {
      alert("✅ Test email sent successfully!");
    } else {
      alert("❌ Failed to send email: " + data.message);
    }
  } catch (error: any) {
    console.error("Error testing email:", error);
    alert("⚠️ Network or server error: " + error.message);
  }
};

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
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute requireAdmin><Orders /></ProtectedRoute>} />
            <Route path="/admin/orders/pending" element={<ProtectedRoute requireAdmin><PendingOrders /></ProtectedRoute>} />
            <Route path="/admin/orders/completed" element={<ProtectedRoute requireAdmin><CompletedOrders /></ProtectedRoute>} />
            <Route path="/admin/p2p/running" element={<ProtectedRoute requireAdmin><RunningTrades /></ProtectedRoute>} />
            <Route path="/admin/p2p/reported" element={<ProtectedRoute requireAdmin><ReportedTrades /></ProtectedRoute>} />
            <Route path="/admin/p2p/completed" element={<ProtectedRoute requireAdmin><CompletedTrades /></ProtectedRoute>} />
            <Route path="/admin/ads" element={<ProtectedRoute requireAdmin><Ads /></ProtectedRoute>} />
            <Route path="/admin/p2p/payment-window" element={<ProtectedRoute requireAdmin><PaymentWindow /></ProtectedRoute>} />
            <Route path="/admin/p2p/payment-method" element={<ProtectedRoute requireAdmin><PaymentMethods /></ProtectedRoute>} />
            <Route path="/admin/transactions" element={<ProtectedRoute requireAdmin><Transactions /></ProtectedRoute>} />
            <Route path="/admin/disputes" element={<ProtectedRoute requireAdmin><Disputes /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute requireAdmin><Reports /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><Settings /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requireAdmin><Users /></ProtectedRoute>} />
            <Route path="/admin/trades" element={<ProtectedRoute requireAdmin><Trades /></ProtectedRoute>} />
            <Route path="/admin/currencies" element={<ProtectedRoute requireAdmin><Currencies /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
