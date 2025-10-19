import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import {
  ShieldCheck,
  Lock,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Buy & Sell with Confidence
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Secure peer-to-peer marketplace with escrow protection. Your funds are safe until you confirm receipt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8">
                  Browse Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Post an Ad
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TrustMarket</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for security, designed for ease. Trade with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-up border-2 hover:border-primary/20">
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Escrow Protection</h3>
              <p className="text-muted-foreground text-sm">
                Funds held securely until buyer confirms receipt. Complete peace of mind.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-up border-2 hover:border-primary/20" style={{ animationDelay: '0.1s' }}>
              <div className="rounded-lg bg-success/10 p-3 w-fit mb-4">
                <Lock className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">
                Multiple payment options including bank transfer, cards, and crypto.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-up border-2 hover:border-primary/20" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-lg bg-secondary/10 p-3 w-fit mb-4">
                <MessageSquare className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Direct Messaging</h3>
              <p className="text-muted-foreground text-sm">
                Real-time chat with sellers. Negotiate, ask questions, build trust.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-up border-2 hover:border-primary/20" style={{ animationDelay: '0.3s' }}>
              <div className="rounded-lg bg-warning/10 p-3 w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-bold text-lg mb-2">Smart Analytics</h3>
              <p className="text-muted-foreground text-sm">
                Track your transactions, manage your wallet, view trade history.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and transparent process from start to finish
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: 1,
                title: "Browse & Find",
                description: "Search through verified listings. Filter by category, price, location, and seller rating.",
              },
              {
                step: 2,
                title: "Make an Offer",
                description: "Chat with the seller, negotiate terms, and agree on price. Click 'Buy' when ready.",
              },
              {
                step: 3,
                title: "Funds in Escrow",
                description: "Your payment is held securely. Seller ships the item or initiates transfer.",
              },
              {
                step: 4,
                title: "Confirm & Release",
                description: "Verify you received the item/funds. Confirm receipt, and funds are released to seller.",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6 flex gap-6 items-start hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-success mt-1" />
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow">
                Start Trading Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Trusted by Thousands</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="animate-scale-in">
                <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-5xl font-bold bg-gradient-success bg-clip-text text-transparent mb-2">
                  $2M+
                </div>
                <p className="text-muted-foreground">In Secure Transactions</p>
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  99.8%
                </div>
                <p className="text-muted-foreground">Successful Trades</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <div className="rounded-lg bg-gradient-primary p-2">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  TrustMarket
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure P2P marketplace with escrow protection for peace of mind.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/marketplace" className="hover:text-primary transition-colors">Browse Ads</Link></li>
                <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 TrustMarket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
