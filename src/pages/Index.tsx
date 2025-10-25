import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  ArrowRight,
  Star,
  Mail,
} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import platformDashboard from "@/assets/platform-dashboard.jpg";
import securityFeature from "@/assets/security-feature.jpg";
import walletInterface from "@/assets/wallet-interface.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import tradingChart from "@/assets/trading-chart.jpg";
import p2pInterface from "@/assets/p2p-interface.jpg";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/20 rounded-full border border-primary/40">
              <span className="text-sm text-primary">WELCOME TO THE FUTURE</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Secure Your Digital </span><br />
              <span className="text-primary">Financial Future.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Trade cryptocurrencies with confidence. Advanced security, instant transactions, and complete control over your digital assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-lg px-8 h-14">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-primary/40 hover:bg-primary/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Assets Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold tracking-wider">DIGITAL ECOSYSTEM</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">The Digital Assets You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage, trade, and grow your cryptocurrency portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-glow transition-all duration-300 bg-card border-border group">
              <div className="rounded-lg bg-primary/10 p-4 w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Advanced Security</h3>
              <p className="text-muted-foreground">
                Multi-layer encryption, cold storage, and biometric authentication keep your assets safe 24/7.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-glow transition-all duration-300 bg-card border-border group">
              <div className="rounded-lg bg-primary/10 p-4 w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Trading</h3>
              <p className="text-muted-foreground">
                Execute trades in milliseconds with our high-performance trading engine and real-time market data.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-glow transition-all duration-300 bg-card border-border group">
              <div className="rounded-lg bg-primary/10 p-4 w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Analytics</h3>
              <p className="text-muted-foreground">
                Advanced charts, portfolio tracking, and AI-powered insights to maximize your returns.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Power Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold tracking-wider">POWERFUL FEATURES</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">The Power of Our Platform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade tools designed for traders of all levels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={platformDashboard} 
                  alt="Advanced Trading Dashboard" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Advanced Dashboard</h3>
                <p className="text-muted-foreground">Real-time market data and portfolio management in one place</p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={p2pInterface} 
                  alt="P2P Trading" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">P2P Trading</h3>
                <p className="text-muted-foreground">Connect directly with buyers and sellers worldwide</p>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={walletInterface} 
                  alt="User-Friendly Interface" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">User-Friendly Interface</h3>
                <p className="text-muted-foreground">Intuitive design that makes crypto trading accessible to everyone</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <span className="text-primary text-sm font-bold tracking-wider">ENTERPRISE SECURITY</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">Your Assets Are Safe</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We employ military-grade security measures to protect your investments
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-3 w-fit h-fit">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Cold Storage</h3>
                    <p className="text-muted-foreground">95% of funds stored offline in secure vaults, protected from online threats.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-3 w-fit h-fit">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Regulatory Compliance</h3>
                    <p className="text-muted-foreground">Fully licensed and compliant with international financial regulations.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-3 w-fit h-fit">
                    <FileCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Advanced Encryption</h3>
                    <p className="text-muted-foreground">Bank-level 256-bit encryption for all data transmission and storage.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={securityFeature} 
                alt="Security Features" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-sm text-muted-foreground">Protected Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img 
                src={tradingChart} 
                alt="Trading Statistics" 
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div>
              <span className="text-primary text-sm font-bold tracking-wider">REAL-TIME DATA</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">Your Assets Are Growing</h2>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <Card className="p-6">
                  <div className="text-4xl font-bold text-success mb-2">$87,830.12</div>
                  <div className="text-sm text-muted-foreground">Portfolio Value</div>
                  <div className="text-success text-sm mt-2">+12% This Month</div>
                </Card>

                <Card className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">$35.2B</div>
                  <div className="text-sm text-muted-foreground">Trading Volume</div>
                  <div className="text-primary text-sm mt-2">24h Volume</div>
                </Card>

                <Card className="p-6">
                  <div className="text-4xl font-bold text-warning mb-2">$1.31</div>
                  <div className="text-sm text-muted-foreground">Average Fee</div>
                  <div className="text-success text-sm mt-2">Lower than market</div>
                </Card>

                <Card className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">+4.45%</div>
                  <div className="text-sm text-muted-foreground">24h Change</div>
                  <div className="text-success text-sm mt-2">BTC Performance</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Potential Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-bold tracking-wider">START TODAY</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">Unlock Your Trading Potential</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of traders who trust Abiaxe for secure, fast, and profitable cryptocurrency trading
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">150+</div>
                <div className="text-muted-foreground">Cryptocurrencies</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Active Traders</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">$2B+</div>
                <div className="text-muted-foreground">Daily Volume</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold tracking-wider">TESTIMONIALS</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from real traders who've transformed their financial future
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem className="md:basis-1/2">
                  <Card className="p-8 h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-lg mb-6 text-muted-foreground">
                      "Abiaxe has completely transformed how I trade crypto. The security features give me peace of mind, and the interface is incredibly intuitive. Best platform I've used!"
                    </p>
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial1} 
                        alt="Sarah Chen" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold">Sarah Chen</div>
                        <div className="text-sm text-muted-foreground">Professional Trader</div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>

                <CarouselItem className="md:basis-1/2">
                  <Card className="p-8 h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-lg mb-6 text-muted-foreground">
                      "I was hesitant about P2P trading until I found Abiaxe. The escrow system works flawlessly, and I've never felt safer trading cryptocurrency online."
                    </p>
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial2} 
                        alt="Michael Rodriguez" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold">Michael Rodriguez</div>
                        <div className="text-sm text-muted-foreground">Crypto Investor</div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>

                <CarouselItem className="md:basis-1/2">
                  <Card className="p-8 h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-lg mb-6 text-muted-foreground">
                      "The analytics and real-time data have helped me make better trading decisions. Customer support is also top-notch - they respond within minutes!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold">Emma Thompson</div>
                        <div className="text-sm text-muted-foreground">Day Trader</div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold tracking-wider">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">Your Questions Answered</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about trading on Abiaxe
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg text-foreground">
                  What is P2P cryptocurrency trading?
                </AccordionTrigger>
                <AccordionContent className="text-foreground">
                  P2P (peer-to-peer) cryptocurrency trading allows you to buy and sell crypto directly with other users without an intermediary. Abiaxe provides the secure platform and escrow service to ensure safe transactions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg text-foreground">
                  How does the escrow system work?
                </AccordionTrigger>
                <AccordionContent className="text-foreground">
                  When a trade is initiated, the seller's cryptocurrency is locked in escrow. Once the buyer confirms payment, the crypto is released to the buyer. This protects both parties and ensures fair transactions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg text-foreground">
                  Is cryptocurrency trading risky?
                </AccordionTrigger>
                <AccordionContent className="text-foreground">
                  All investments carry risk, but Abiaxe minimizes trading risks through escrow protection, user verification, and 24/7 security monitoring. We recommend starting small and only trading what you can afford to lose.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg text-foreground">
                  What fees does Abiaxe charge?
                </AccordionTrigger>
                <AccordionContent className="text-foreground">
                  We charge a competitive 1% transaction fee on completed trades. There are no hidden fees, monthly subscriptions, or withdrawal charges. What you see is what you pay.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg text-foreground">
                  How long does verification take?
                </AccordionTrigger>
                <AccordionContent className="text-foreground">
                  Account verification typically takes 1-2 business days. You'll need to provide a government-issued ID and proof of address. Verified users get higher trading limits and access to premium features.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Begin?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of traders who've already discovered the future of cryptocurrency trading
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-lg px-12 h-16">
                Create Your Account
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <span className="text-primary text-sm font-bold tracking-wider">CONTACT US</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">Get in Touch</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Have questions? Our team is here to help you 24/7
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold">Email Us</div>
                      <div className="text-muted-foreground">support@Abiaxe.com</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold">Live Chat</div>
                      <div className="text-muted-foreground">Available 24/7</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold">Trading Support</div>
                      <div className="text-muted-foreground">Instant help with trades</div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <Input placeholder="Your name" required />
                  </div>
                  <div>
                    <Input type="email" placeholder="your@email.com" required />
                  </div>
                  <div>
                    <Input placeholder="Subject" required />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Your message..." 
                      rows={5}
                      required 
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-hover">
                    Send Message
                  </Button>
                </form>
              </Card>
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
                <div className="rounded-lg bg-primary p-2">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="text-foreground">
                  Abiaxe
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure P2P cryptocurrency marketplace with escrow protection for peace of mind.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
                <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/safety-tips" className="hover:text-primary transition-colors">Safety Tips</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Abiaxe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
