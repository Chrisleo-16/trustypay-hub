import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Trades = () => {
  const trades = [
    { id: "#12345", buyer: "John Doe", seller: "Jane Smith", amount: "0.5 BTC", value: "$22,500", status: "Completed", date: "2025-01-15" },
    { id: "#12344", buyer: "Mike Johnson", seller: "Sarah Williams", amount: "2.0 ETH", value: "$4,200", status: "In Progress", date: "2025-01-15" },
    { id: "#12343", buyer: "Alice Brown", seller: "Bob Wilson", amount: "1.5 BTC", value: "$67,500", status: "Disputed", date: "2025-01-14" },
    { id: "#12342", buyer: "Charlie Davis", seller: "Diana Miller", amount: "5.0 ETH", value: "$10,500", status: "Completed", date: "2025-01-14" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trade Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Total Trades</div>
          <div className="text-3xl font-bold">1,234</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Active</div>
          <div className="text-3xl font-bold text-warning">45</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Completed</div>
          <div className="text-3xl font-bold text-success">1,156</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Disputed</div>
          <div className="text-3xl font-bold text-destructive">3</div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Recent Trades</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trade ID</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
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
                <TableCell>
                  <Badge 
                    variant={
                      trade.status === "Completed" ? "default" :
                      trade.status === "In Progress" ? "secondary" :
                      "destructive"
                    }
                  >
                    {trade.status}
                  </Badge>
                </TableCell>
                <TableCell>{trade.date}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Trades;