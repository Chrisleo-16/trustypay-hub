import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="rounded-lg bg-primary p-2">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">
              Arcanum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button className="bg-primary hover:bg-primary-hover">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
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
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
