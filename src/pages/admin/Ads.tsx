import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Ads = () => {
  const ads = [
    { id: "#A001", seller: "John Doe", crypto: "BTC", amount: "0.5", price: "$45,000", status: "Active", views: 124 },
    { id: "#A002", seller: "Jane Smith", crypto: "ETH", amount: "2.0", price: "$2,100", status: "Active", views: 89 },
    { id: "#A003", seller: "Mike Johnson", crypto: "BTC", amount: "1.0", price: "$45,200", status: "Paused", views: 56 },
    { id: "#A004", seller: "Sarah Williams", crypto: "USDT", amount: "5000", price: "$5,000", status: "Active", views: 201 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Advertisement Management</h1>
        <Button className="bg-primary hover:bg-primary-hover">Create Ad</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Total Ads</div>
          <div className="text-3xl font-bold">234</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Active</div>
          <div className="text-3xl font-bold text-success">187</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Paused</div>
          <div className="text-3xl font-bold text-warning">32</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Expired</div>
          <div className="text-3xl font-bold text-muted-foreground">15</div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search ads..." className="pl-10" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad ID</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Cryptocurrency</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell className="font-mono">{ad.id}</TableCell>
                <TableCell>{ad.seller}</TableCell>
                <TableCell>
                  <Badge variant="outline">{ad.crypto}</Badge>
                </TableCell>
                <TableCell>{ad.amount}</TableCell>
                <TableCell className="font-medium">{ad.price}</TableCell>
                <TableCell>
                  <Badge variant={ad.status === "Active" ? "default" : "secondary"}>
                    {ad.status}
                  </Badge>
                </TableCell>
                <TableCell>{ad.views}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Manage</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Ads;