import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Shield, 
  Clock, 
  DollarSign,
  Loader2,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type OrderStage = 'listing' | 'placing' | 'waiting' | 'confirming' | 'success';
type TradeType = 'buy' | 'sell';

interface Ad {
  id: number;
  user: string;
  verified: boolean;
  currency: string;
  price: number;
  paymentMethods: string[];
  minAmount: number;
  maxAmount: number;
  rating: number;
  trades: number;
}

const P2PMarket = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TradeType>('buy');
  const [orderStage, setOrderStage] = useState<OrderStage>('listing');
  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [amount, setAmount] = useState("");
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (orderStage === "waiting" || orderStage === "confirming") {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [orderStage]);

  // Mock ads data
  const sellAds: Ad[] = [
    {
      id: 1,
      user: "CryptoKing99",
      verified: true,
      currency: "USDT",
      price: 1.02,
      paymentMethods: ["Bank Transfer", "PayPal"],
      minAmount: 50,
      maxAmount: 5000,
      rating: 4.9,
      trades: 1250
    },
    {
      id: 2,
      user: "BitMaster",
      verified: true,
      currency: "BTC",
      price: 43250,
      paymentMethods: ["Bank Transfer", "Wise"],
      minAmount: 100,
      maxAmount: 10000,
      rating: 4.8,
      trades: 890
    },
    {
      id: 3,
      user: "EthTrader",
      verified: true,
      currency: "ETH",
      price: 2280,
      paymentMethods: ["PayPal", "Venmo"],
      minAmount: 200,
      maxAmount: 8000,
      rating: 4.7,
      trades: 567
    },
  ];

  const buyAds: Ad[] = [
    {
      id: 4,
      user: "WhaleInvestor",
      verified: true,
      currency: "USDT",
      price: 0.98,
      paymentMethods: ["Bank Transfer"],
      minAmount: 100,
      maxAmount: 20000,
      rating: 5.0,
      trades: 2100
    },
    {
      id: 5,
      user: "CryptoCollector",
      verified: true,
      currency: "BNB",
      price: 315,
      paymentMethods: ["Bank Transfer", "Zelle"],
      minAmount: 50,
      maxAmount: 5000,
      rating: 4.9,
      trades: 1450
    },
  ];

  const handleOpenOrder = (ad: Ad, type: TradeType) => {
    setSelectedAd(ad);
    setActiveTab(type);
    setShowModal(true);
    setOrderStage('placing');
  };

  const handlePlaceOrder = () => {
    if (!amount || parseFloat(amount) < (selectedAd?.minAmount || 0)) {
      toast({
        title: "Invalid Amount",
        description: `Minimum amount is $${selectedAd?.minAmount}`,
        variant: "destructive"
      });
      return;
    }

    setOrderDetails({
      amount: parseFloat(amount),
      price: selectedAd?.price,
      currency: selectedAd?.currency,
      paymentMethod: selectedAd?.paymentMethods[0],
      user: selectedAd?.user
    });

    setOrderStage('waiting');
    setCountdown(300); // Start at 5 minutes for waiting stage

    toast({
      title: "Order Placed!",
      description: "Waiting for the other party to confirm.",
    });

    // Simulate seller confirmation after 2–5 minutes
    const confirmDelay = Math.floor(Math.random() * (300 - 120 + 1)) + 120; // random between 120–300 sec
    setTimeout(() => {
      setOrderStage('confirming');
      setCountdown(900); // Reset timer for release stage (15 minutes)
      toast({
        title: activeTab === 'buy' ? "Funds Transferred!" : "Payment Received!",
        description: "Please confirm to continue.",
      });
    }, confirmDelay * 1000);
  };

  const handleConfirmReceipt = () => {
    setOrderStage('success');
    toast({
      title: "Success!",
      description: "Assets released successfully.",
    });

    // Simulate release confirmation after 10–15 minutes
    const releaseDelay = Math.floor(Math.random() * (900 - 600 + 1)) + 600; // 600–900 seconds
    setTimeout(() => {
      setShowModal(false);
      setOrderStage('listing');
      setAmount("");
      setCountdown(900);
    }, releaseDelay * 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const AdCard = ({ ad, type }: { ad: Ad; type: TradeType }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-2">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-bold text-primary">{ad.user[0]}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{ad.user}</span>
                {ad.verified && (
                  <Shield className="w-4 h-4 text-success fill-success" />
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {ad.trades} trades | {ad.rating}★
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm font-bold">
            {ad.currency}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Price</span>
            <span className="text-xl font-bold text-primary">
              ${ad.price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Limit</span>
            <span className="font-medium">
              ${ad.minAmount} - ${ad.maxAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ad.paymentMethods.map((method) => (
              <Badge key={method} variant="outline" className="text-xs">
                {method}
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={() => handleOpenOrder(ad, type)}
          variant={type === 'buy' ? 'default' : 'accent'}
        >
          {type === 'buy' ? 'Buy' : 'Sell'} {ad.currency}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            P2P Trading Market
          </h1>
          <p className="text-muted-foreground">
            Trade directly with verified users in a secure escrow environment
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TradeType)} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="buy" className="text-lg">Buy Crypto</TabsTrigger>
            <TabsTrigger value="sell" className="text-lg">Sell Crypto</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-0 animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} type="buy" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sell" className="mt-0 animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buyAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} type="sell" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ✅ Your Modal remains completely intact */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          {orderStage === 'placing' && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {activeTab === 'buy' ? 'Buy' : 'Sell'} {selectedAd?.currency}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Price</span>
                  <span className="text-xl font-bold">${selectedAd?.price}</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={`Min: $${selectedAd?.minAmount}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Range: ${selectedAd?.minAmount} - ${selectedAd?.maxAmount}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>You will receive</span>
                    <span className="font-bold">
                      {amount && selectedAd?.price 
                        ? (parseFloat(amount) / selectedAd.price).toFixed(4)
                        : '0.0000'
                      } {selectedAd?.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Payment</span>
                    <span>{selectedAd?.paymentMethods[0]}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={!amount}
                >
                  Place Order
                </Button>
              </div>
            </>
          )}

          {orderStage === 'waiting' && (
            <div className="py-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                  <Clock className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">
                  Waiting for {activeTab === 'buy' ? 'Seller' : 'Buyer'}...
                </h3>
                <p className="text-muted-foreground">
                  {activeTab === 'buy' 
                    ? 'Waiting for seller to transfer funds' 
                    : 'Waiting for buyer to transfer payment'
                  }
                </p>
              </div>

              {activeTab === 'sell' && (
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-mono font-bold text-primary">
                    {formatTime(countdown)}
                  </span>
                </div>
              )}

              <Card className="p-4 text-left space-y-2 bg-muted">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">${orderDetails?.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">${orderDetails?.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium">{orderDetails?.paymentMethod}</span>
                </div>
              </Card>
            </div>
          )}

          {orderStage === 'confirming' && (
            <div className="py-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">
                  {activeTab === 'buy' ? 'Funds Received!' : 'Payment Confirmed!'}
                </h3>
                <p className="text-muted-foreground">
                  Confirm you have received {activeTab === 'buy' ? 'the funds' : 'payment'} before releasing assets
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-lg border-2 border-warning/20">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm text-left">
                  <strong>Important:</strong> Only click "Release Assets" after verifying {activeTab === 'buy' ? 'the funds are in your account' : 'you received the payment'}.
                </p>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleConfirmReceipt}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Release Assets
              </Button>
            </div>
          )}

          {orderStage === 'success' && (
            <div className="py-12 text-center space-y-6 animate-scale-in">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="w-12 h-12 text-success" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2 text-success">
                  Trade Completed!
                </h3>
                <p className="text-muted-foreground">
                  Your transaction has been completed successfully
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span>Redirecting...</span>
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default P2PMarket;
