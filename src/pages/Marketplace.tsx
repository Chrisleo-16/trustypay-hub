import { useState } from "react";
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

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with real data
  const mockAds = [
    {
      id: 1,
      title: "iPhone 14 Pro Max - Excellent Condition",
      price: 899,
      currency: "USD",
      category: "Electronics",
      location: "New York, NY",
      seller: "John Doe",
      rating: 4.8,
      reviews: 23,
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Gaming Laptop - RTX 3070",
      price: 1299,
      currency: "USD",
      category: "Electronics",
      location: "San Francisco, CA",
      seller: "TechSeller",
      rating: 4.9,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Designer Watch - Limited Edition",
      price: 450,
      currency: "USD",
      category: "Fashion",
      location: "Los Angeles, CA",
      seller: "LuxuryDeals",
      rating: 5.0,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Mountain Bike - Carbon Frame",
      price: 650,
      currency: "USD",
      category: "Sports",
      location: "Denver, CO",
      seller: "BikeGuru",
      rating: 4.7,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Vintage Camera Collection",
      price: 320,
      currency: "USD",
      category: "Electronics",
      location: "Chicago, IL",
      seller: "PhotoPro",
      rating: 4.6,
      reviews: 8,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Leather Sofa - Modern Design",
      price: 1100,
      currency: "USD",
      category: "Furniture",
      location: "Seattle, WA",
      seller: "HomeStyle",
      rating: 4.9,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Marketplace</h1>
          <p className="text-muted-foreground">Discover great deals from verified sellers</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
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
          {mockAds.map((ad, index) => (
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
                    <Badge variant="secondary" className="text-xs">
                      {ad.category}
                    </Badge>
                    <div className="text-2xl font-bold text-primary">
                      ${ad.price}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {ad.title}
                  </h3>
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
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Load More Ads
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
