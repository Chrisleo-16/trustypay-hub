import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, MessageCircle, Lock, CheckCircle, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse Listings",
      description: "Search through verified cryptocurrency ads. Filter by coin type, payment method, price, and seller rating.",
      details: "Our marketplace features thousands of listings from verified traders worldwide. Use advanced filters to find exactly what you're looking for."
    },
    {
      icon: MessageCircle,
      title: "Connect with Seller",
      description: "Chat directly with sellers, negotiate terms, and agree on the final price and payment method.",
      details: "Our real-time messaging system lets you communicate instantly. Ask questions, verify details, and build trust before committing."
    },
    {
      icon: Lock,
      title: "Secure Escrow",
      description: "Your payment is held in our secure escrow until both parties confirm the transaction is complete.",
      details: "Funds are protected by advanced encryption and held in cold storage. Seller can't access them until you confirm receipt."
    },
    {
      icon: CheckCircle,
      title: "Complete & Release",
      description: "Confirm you received your cryptocurrency, and funds are automatically released to the seller.",
      details: "Once confirmed, the transaction is complete. Rate your experience and build your trading reputation on the platform."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
            <p className="text-xl text-muted-foreground">
              Simple, secure, and transparent. Start trading cryptocurrency in minutes.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-primary">STEP {index + 1}</span>
                      <div className="h-px flex-1 bg-border"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-lg text-muted-foreground mb-3">{step.description}</p>
                    <p className="text-sm text-muted-foreground">{step.details}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Trading?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who trust Arcanum for secure P2P cryptocurrency trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <Button size="lg" className="bg-primary hover:bg-primary-hover">
                  Browse Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;