import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CompletedTrades = () => {
  const trades = [
    { id: "#TRD095", buyer: "John Doe", seller: "Jane Smith", amount: "0.5 BTC", value: "$22,500", completedDate: "2025-01-15", duration: "14 min" },
    { id: "#TRD096", buyer: "Mike Johnson", seller: "Sarah Williams", amount: "2.0 ETH", value: "$4,200", completedDate: "2025-01-15", duration: "8 min" },
    { id: "#TRD097", buyer: "Bob Wilson", seller: "Alice Brown", amount: "1.2 BTC", value: "$54,000", completedDate: "2025-01-14", duration: "12 min" },
    { id: "#TRD098", buyer: "Charlie Davis", seller: "Diana Miller", amount: "5.0 ETH", value: "$10,500", completedDate: "2025-01-14", duration: "10 min" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Completed P2P Trades</h1>

        <Card className="p-6 bg-success/10 border-success">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-success">2,456</div>
            <div className="text-sm text-muted-foreground">successful P2P trades</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search trades..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trade ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Completed Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="font-mono">{trade.id}</TableCell>
                  <TableCell>{trade.buyer}</TableCell>
                  <TableCell>{trade.seller}</TableCell>
                  <TableCell>{trade.amount}</TableCell>
                  <TableCell className="font-medium">{trade.value}</TableCell>
                  <TableCell>{trade.completedDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{trade.duration}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CompletedTrades;
