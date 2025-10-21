import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle, Eye, Lock, UserCheck, FileCheck } from "lucide-react";

const SafetyTips = () => {
  const tips = [
    {
      icon: ShieldCheck,
      title: "Always Use Escrow",
      description: "Never complete a transaction outside our escrow system. This is your primary protection against fraud."
    },
    {
      icon: UserCheck,
      title: "Verify User Profiles",
      description: "Check seller ratings, completed trades, and account age before initiating a transaction."
    },
    {
      icon: Eye,
      title: "Watch for Red Flags",
      description: "Be cautious of unusually good deals, pressure to act quickly, or requests to communicate off-platform."
    },
    {
      icon: Lock,
      title: "Protect Your Account",
      description: "Enable 2FA, use a strong unique password, and never share your login credentials with anyone."
    },
    {
      icon: FileCheck,
      title: "Complete Verification",
      description: "Verified users have gone through identity checks. Trade with verified users when possible."
    },
    {
      icon: AlertTriangle,
      title: "Report Suspicious Activity",
      description: "If something feels wrong, report it immediately. Our team investigates all reports promptly."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Safety Tips</h1>
            <p className="text-xl text-muted-foreground">
              Stay safe while trading cryptocurrency. Follow these essential guidelines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {tips.map((tip, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                  <tip.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-destructive/5 border-destructive/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              Common Scams to Avoid
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span><strong>Fake Payment Proofs:</strong> Scammers may send fake screenshots. Always verify payment in your actual account.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span><strong>Off-Platform Communication:</strong> Never communicate or pay outside the Arcanum platform.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span><strong>Phishing Attempts:</strong> We'll never ask for your password via email. Always check the URL is correct.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span><strong>Too Good to Be True:</strong> If a deal seems unrealistic, it probably is. Check market rates before trading.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">•</span>
                <span><strong>Urgent Pressure:</strong> Scammers create false urgency. Take your time to verify everything.</span>
              </li>
            </ul>
          </Card>

          <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-3">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is available 24/7 to help with any security concerns.
            </p>
            <a href="/contact" className="text-primary hover:underline font-medium">
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;