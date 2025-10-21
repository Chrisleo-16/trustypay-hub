import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bitcoin, Coins } from "lucide-react";

const Currencies = () => {
  const currencies = [
    { name: "Bitcoin", symbol: "BTC", status: true, volume: "$1.2M", trades: 450 },
    { name: "Ethereum", symbol: "ETH", status: true, volume: "$850K", trades: 380 },
    { name: "Tether", symbol: "USDT", status: true, volume: "$620K", trades: 520 },
    { name: "Cardano", symbol: "ADA", status: false, volume: "$0", trades: 0 },
    { name: "Solana", symbol: "SOL", status: true, volume: "$340K", trades: 180 },
    { name: "Ripple", symbol: "XRP", status: true, volume: "$290K", trades: 160 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Currency Management</h1>
        <Button className="bg-primary hover:bg-primary-hover">Add Currency</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Active Currencies</div>
              <div className="text-2xl font-bold">5</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-success/10 p-3">
              <Bitcoin className="h-6 w-6 text-success" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
              <div className="text-2xl font-bold">$3.3M</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-warning/10 p-3">
              <Bitcoin className="h-6 w-6 text-warning" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Trades</div>
              <div className="text-2xl font-bold">1,690</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Supported Cryptocurrencies</h2>
        <div className="space-y-4">
          {currencies.map((currency, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">{currency.symbol.substring(0, 1)}</span>
                </div>
                <div>
                  <div className="font-bold">{currency.name}</div>
                  <div className="text-sm text-muted-foreground">{currency.symbol}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">24h Volume</div>
                  <div className="font-medium">{currency.volume}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Trades</div>
                  <div className="font-medium">{currency.trades}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={currency.status ? "default" : "secondary"}>
                    {currency.status ? "Active" : "Inactive"}
                  </Badge>
                  <Switch checked={currency.status} />
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Currencies;