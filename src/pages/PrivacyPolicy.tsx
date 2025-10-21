import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <Card className="p-8">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, including name, email address, phone number, government-issued ID, and payment information. We also collect information about your transactions, communication with other users, and how you interact with our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground">
                  We use your information to provide, maintain, and improve our services; process transactions; send you technical notices and support messages; respond to your comments and questions; prevent fraud and abuse; and comply with legal obligations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell your personal information. We may share information with service providers who perform services on our behalf, law enforcement when required by law, or other users as necessary to facilitate transactions (e.g., payment details, delivery addresses).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no system is completely secure, and we cannot guarantee absolute security of your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground">
                  You have the right to access, correct, or delete your personal information; object to or restrict processing; data portability; and withdraw consent. Contact us at privacy@arcanum.com to exercise these rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this privacy policy, please contact us at privacy@arcanum.com or through our contact page.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;