import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CompletedOrders = () => {
  const orders = [
    { id: "#ORD001", user: "John Doe", type: "Buy", amount: "0.5 BTC", value: "$22,500", completedDate: "2025-01-15", rating: 5 },
    { id: "#ORD004", user: "Sarah Williams", type: "Sell", amount: "5.0 ETH", value: "$10,500", completedDate: "2025-01-14", rating: 5 },
    { id: "#ORD006", user: "Diana Miller", type: "Buy", amount: "1.2 BTC", value: "$54,000", completedDate: "2025-01-13", rating: 4 },
    { id: "#ORD008", user: "Alice Brown", type: "Sell", amount: "4.0 ETH", value: "$8,400", completedDate: "2025-01-12", rating: 5 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Completed Orders</h1>

        <Card className="p-6 bg-success/10 border-success">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-success">1,156</div>
            <div className="text-sm text-muted-foreground">successfully completed orders</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search completed orders..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Completed Date</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell>{order.user}</TableCell>
                  <TableCell>
                    <Badge variant={order.type === "Buy" ? "default" : "secondary"}>
                      {order.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell className="font-medium">{order.value}</TableCell>
                  <TableCell>{order.completedDate}</TableCell>
                  <TableCell>{"⭐".repeat(order.rating)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
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

export default CompletedOrders;
