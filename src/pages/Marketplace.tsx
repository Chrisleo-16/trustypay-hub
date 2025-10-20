import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, MapPin, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const [selectedCrypto, setSelectedCrypto] = useState("all");

  // Mock crypto ads data
  const mockAds = [
    {
      id: 1,
      title: "Bitcoin (BTC)",
      price: 43250.50,
      amount: 0.5,
      currency: "USD",
      category: "Bitcoin",
      location: "New York, NY",
      seller: "CryptoKing",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop",
      change24h: 2.5,
    },
    {
      id: 2,
      title: "Ethereum (ETH)",
      price: 2280.75,
      amount: 2.5,
      currency: "USD",
      category: "Ethereum",
      location: "San Francisco, CA",
      seller: "EthTrader",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=300&fit=crop",
      change24h: -1.2,
    },
    {
      id: 3,
      title: "Binance Coin (BNB)",
      price: 315.20,
      amount: 10,
      currency: "USD",
      category: "Altcoin",
      location: "Los Angeles, CA",
      seller: "BinanceExpert",
      rating: 4.7,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=300&fit=crop",
      change24h: 3.8,
    },
    {
      id: 4,
      title: "Cardano (ADA)",
      price: 0.52,
      amount: 5000,
      currency: "USD",
      category: "Altcoin",
      location: "Chicago, IL",
      seller: "AdaHolder",
      rating: 4.6,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=400&h=300&fit=crop",
      change24h: 1.5,
    },
    {
      id: 5,
      title: "Solana (SOL)",
      price: 98.45,
      amount: 20,
      currency: "USD",
      category: "Altcoin",
      location: "Miami, FL",
      seller: "SolanaTrader",
      rating: 4.9,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      change24h: 5.2,
    },
    {
      id: 6,
      title: "Ripple (XRP)",
      price: 0.62,
      amount: 8000,
      currency: "USD",
      category: "Altcoin",
      location: "Austin, TX",
      seller: "XRPArmy",
      rating: 4.5,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=300&fit=crop",
      change24h: -0.8,
    },
  ];

  const filteredAds = selectedCrypto === "all" 
    ? mockAds 
    : mockAds.filter(ad => ad.category.toLowerCase() === selectedCrypto.toLowerCase());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Crypto Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell cryptocurrencies securely with verified traders</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 mb-8 border-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
              <SelectTrigger className="w-full md:w-52">
                <SelectValue placeholder="Select Crypto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cryptocurrencies</SelectItem>
                <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                <SelectItem value="altcoin">Altcoins</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Ads Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full aspect-video" />
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-7 w-16" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between items-center pt-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            filteredAds.map((ad, index) => (
            <Link key={ad.id} to={`/ad/${ad.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {ad.category}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${ad.price.toLocaleString()}
                      </div>
                      <div className={`text-xs font-medium ${ad.change24h >= 0 ? 'text-success' : 'text-danger'}`}>
                        {ad.change24h >= 0 ? '↑' : '↓'} {Math.abs(ad.change24h)}%
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                    {ad.title}
                  </h3>
                  <div className="text-sm text-muted-foreground mb-3">
                    Amount: {ad.amount.toLocaleString()} {ad.category === 'Bitcoin' ? 'BTC' : ad.category === 'Ethereum' ? 'ETH' : 'units'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {ad.location}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="text-sm font-medium">{ad.seller}</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm font-medium">{ad.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({ad.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
            ))
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="accent">
            Load More Listings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
