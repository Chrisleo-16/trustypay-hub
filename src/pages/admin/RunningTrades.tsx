import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RunningTrades = () => {
  const trades = [
    { id: "#TRD101", buyer: "John Doe", seller: "Jane Smith", amount: "0.5 BTC", value: "$22,500", timeRemaining: "12:34", status: "In Progress" },
    { id: "#TRD102", buyer: "Mike Johnson", seller: "Sarah Williams", amount: "2.0 ETH", value: "$4,200", timeRemaining: "08:45", status: "Awaiting Payment" },
    { id: "#TRD103", buyer: "Bob Wilson", seller: "Alice Brown", amount: "1.2 BTC", value: "$54,000", timeRemaining: "14:22", status: "Payment Confirmed" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Running Trades</h1>

        <Card className="p-6 bg-primary/10 border-primary">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-primary">{trades.length}</div>
            <div className="text-sm text-muted-foreground">active P2P trades</div>
          </div>
        </Card>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trade ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Time Remaining</TableHead>
                <TableHead>Status</TableHead>
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
                    <Badge variant="outline" className="font-mono">{trade.timeRemaining}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{trade.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Monitor</Button>
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

export default RunningTrades;
