import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <Card className="p-8">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">What Are Cookies</h2>
                <p className="text-muted-foreground">
                  Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
                <p className="text-muted-foreground mb-4">We use cookies for several purposes:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Essential Cookies:</strong> Required for the platform to function properly, including authentication and security</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our platform</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Track your visits across websites to provide relevant advertisements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Session Cookies</h3>
                    <p className="text-muted-foreground">Temporary cookies that expire when you close your browser. Used for authentication and security.</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Persistent Cookies</h3>
                    <p className="text-muted-foreground">Remain on your device for a set period or until manually deleted. Used to remember your preferences.</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Third-Party Cookies</h3>
                    <p className="text-muted-foreground">Set by external services we use, such as analytics providers and payment processors.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground">
                  You can control and manage cookies through your browser settings. You can set your browser to refuse cookies or delete cookies. However, this may impact your ability to use certain features of our platform. Essential cookies cannot be disabled if you want to use the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Cookie Consent</h2>
                <p className="text-muted-foreground">
                  When you first visit our platform, you'll see a cookie consent banner. By clicking "Accept" or continuing to use the platform, you consent to our use of cookies as described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about our use of cookies, please contact us at privacy@arcanum.com.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;