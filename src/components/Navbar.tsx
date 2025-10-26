import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [dashboardPath, setDashboardPath] = useState(
    "https://abiaxe-wallet.vercel.app/"
  );

  // ✅ Helper: Fetch user role from user_roles table
  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.warn("Error fetching user role:", error.message);
      setUserRole(null);
      setDashboardPath("https://abiaxe-wallet.vercel.app/");
      return;
    }

    setUserRole(data?.role || null);
    setDashboardPath(
      data?.role === "admin" ? "/admin" : "https://abiaxe-wallet.vercel.app/"
    );
  };

  useEffect(() => {
    // ✅ 1. Check if a session already exists (page refresh)
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        await fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setUserRole(null);
        setDashboardPath("https://abiaxe-wallet.vercel.app/");
      }
    };

    init();

    // ✅ 2. Subscribe to auth state changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setUserRole(null);
        setDashboardPath("https://abiaxe-wallet.vercel.app/");
      }
    });

    // ✅ 3. Optional: Realtime updates if role changes in DB
    const roleSubscription = supabase
      .channel("user_roles-updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "user_roles" },
        (payload) => {
          if (payload.new.user_id === user?.id) {
            setUserRole(payload.new.role);
            setDashboardPath(
              payload.new.role === "admin"
                ? "/admin"
                : "https://abiaxe-wallet.vercel.app/"
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(roleSubscription);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="rounded-lg bg-primary p-2">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">Abiaxe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/marketplace"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Marketplace
            </Link>
            <Link
              to="/how-it-works"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>

            {/* ✅ Wallet Link (visible only for logged-in users with "user" role)
            {user && userRole === "user" && (
              <a
                href="https://abiaxe-wallet.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Wallet
              </a>
            )} */}
          </div>

          {/* Desktop Auth / Dashboard */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link to={dashboardPath}>
                <Button className="bg-primary hover:bg-primary-hover">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    className="text-primary border-2 border-primary hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button className="bg-primary hover:bg-primary-hover">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <Link
              to="/marketplace"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Ads
            </Link>
            <Link
              to="/how-it-works"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* ✅ Mobile Wallet Link
            {user && userRole === "user" && (
              <a
                href="https://abiaxe-wallet.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wallet
              </a>
            )} */}

            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <Link
                  to={dashboardPath}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    Wallet
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
