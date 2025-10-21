import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click 'Get Started' in the navigation bar, fill in your details, verify your email, and complete the KYC process. It takes less than 5 minutes."
    },
    {
      question: "How does escrow protection work?",
      answer: "When you initiate a trade, your payment is held securely in our escrow system. The seller only receives funds after you confirm receipt of the cryptocurrency. This protects both parties."
    },
    {
      question: "What payment methods are supported?",
      answer: "We support bank transfers, credit/debit cards, PayPal, Venmo, Cash App, and various other payment methods depending on your region."
    },
    {
      question: "How long does a transaction take?",
      answer: "Most transactions are completed within 15-30 minutes. The time depends on the payment method chosen and how quickly both parties respond."
    },
    {
      question: "What fees does Arcanum charge?",
      answer: "We charge a small 1% transaction fee on completed trades. There are no hidden fees or monthly subscriptions."
    },
    {
      question: "How do I verify my identity?",
      answer: "Go to your profile settings, click 'Verification', and upload a government-issued ID and proof of address. Verification typically takes 1-2 business days."
    },
    {
      question: "What if I have a dispute?",
      answer: "Open a support ticket through your transaction page. Our dispute resolution team will review the case and help resolve it within 48 hours."
    },
    {
      question: "Is my cryptocurrency safe?",
      answer: "Yes! We use cold storage for all user funds, multi-signature wallets, and bank-level encryption to keep your assets secure."
    },
    {
      question: "Can I cancel a transaction?",
      answer: "Yes, you can cancel before payment is confirmed. Once payment is in escrow, cancellation requires agreement from both parties or dispute resolution."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our 24/7 support team through live chat, email (support@arcanum.com), or by opening a ticket in your account dashboard."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about trading on Arcanum
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for help..." 
                className="pl-10 h-12"
              />
            </div>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <a href="/contact" className="text-primary hover:underline font-medium">
              Contact our support team →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;