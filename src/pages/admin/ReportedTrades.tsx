import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ReportedTrades = () => {
  const trades = [
    { id: "#TRD089", buyer: "Alice Brown", seller: "Bob Wilson", amount: "1.5 BTC", value: "$67,500", reason: "Payment not received", date: "2025-01-14", priority: "High" },
    { id: "#TRD092", buyer: "Charlie Davis", seller: "Diana Miller", amount: "3.0 ETH", value: "$6,300", reason: "Wrong amount transferred", date: "2025-01-13", priority: "Medium" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Reported Trades</h1>

        <Card className="p-6 bg-destructive/10 border-destructive">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-destructive">{trades.length}</div>
            <div className="text-sm text-muted-foreground">trades requiring attention</div>
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
                <TableHead>Reason</TableHead>
                <TableHead>Priority</TableHead>
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
                  <TableCell>{trade.reason}</TableCell>
                  <TableCell>
                    <Badge variant={trade.priority === "High" ? "destructive" : "secondary"}>
                      {trade.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{trade.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Review</Button>
                      <Button size="sm" variant="destructive">Resolve</Button>
                    </div>
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

export default ReportedTrades;
