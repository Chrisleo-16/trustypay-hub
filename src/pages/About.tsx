import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Users, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Abiaxe</h1>
          <p className="text-xl text-muted-foreground mb-12">
            We're building the future of secure digital asset trading. Our mission is to make cryptocurrency trading accessible, secure, and transparent for everyone.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 hover:shadow-lg transition-all">
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To create a trustworthy platform where users can trade digital assets with complete confidence and security.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all">
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the world's most trusted peer-to-peer cryptocurrency marketplace, empowering millions of users globally.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all">
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Team</h3>
              <p className="text-muted-foreground">
                Built by experienced traders and developers who understand the challenges of P2P trading.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all">
              <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <p className="text-muted-foreground">
                Transparency, security, and user empowerment are at the core of everything we do.
              </p>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2024, Abiaxe was born from the frustration of dealing with unreliable P2P platforms. We saw traders losing money due to scams, delayed payments, and poor dispute resolution.
            </p>
            <p className="text-muted-foreground mb-4">
              We built Abiaxe to solve these problems. With advanced escrow protection, real-time verification, and 24/7 customer support, we've created a platform where trust is built into every transaction.
            </p>
            <p className="text-muted-foreground">
              Today, thousands of traders use Abiaxe daily to buy and sell cryptocurrencies safely. Join us in building the future of decentralized finance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;