import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <Card className="p-8">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Arcanum, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
                <p className="text-muted-foreground">
                  You must be at least 18 years old to use this platform. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Trading Rules</h2>
                <p className="text-muted-foreground">
                  All trades must be conducted through our escrow system. Users must not engage in fraudulent activities, money laundering, or any illegal activities. We reserve the right to suspend or terminate accounts that violate these rules.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Fees</h2>
                <p className="text-muted-foreground">
                  Arcanum charges a 1% transaction fee on completed trades. Additional fees may apply for certain payment methods or services. All fees are clearly displayed before you complete a transaction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Dispute Resolution</h2>
                <p className="text-muted-foreground">
                  In the event of a dispute, users should first attempt to resolve issues directly. If resolution is not possible, you may open a formal dispute through our platform. Our team will review evidence from both parties and make a fair determination.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  Arcanum provides a platform for peer-to-peer transactions. We are not responsible for the quality, safety, or legality of items listed, the accuracy of listings, or the ability of sellers to complete sales. Users trade at their own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on this platform, including text, graphics, logos, and software, is the property of Arcanum and protected by copyright laws. Users may not reproduce, distribute, or create derivative works without permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to terminate or suspend your account at any time for violations of these terms, suspicious activity, or at our discretion. Upon termination, your right to use the platform will immediately cease.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We may revise these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or platform notification.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground">
                  Questions about these Terms of Service should be sent to legal@arcanum.com.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;