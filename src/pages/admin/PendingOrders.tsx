import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PendingOrders = () => {
  const orders = [
    { id: "#ORD002", user: "Jane Smith", type: "Sell", amount: "2.0 ETH", value: "$4,200", waitingFor: "Payment", date: "2025-01-15" },
    { id: "#ORD007", user: "Bob Wilson", type: "Buy", amount: "0.3 BTC", value: "$13,500", waitingFor: "Confirmation", date: "2025-01-15" },
    { id: "#ORD009", user: "Charlie Davis", type: "Sell", amount: "3.5 ETH", value: "$7,350", waitingFor: "Transfer", date: "2025-01-15" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Pending Orders</h1>

        <Card className="p-6 bg-warning/10 border-warning">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-warning">{orders.length}</div>
            <div className="text-sm text-muted-foreground">orders awaiting action</div>
          </div>
        </Card>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Waiting For</TableHead>
                <TableHead>Date</TableHead>
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
                  <TableCell>
                    <Badge variant="outline">{order.waitingFor}</Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button size="sm">Resolve</Button>
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

export default PendingOrders;
