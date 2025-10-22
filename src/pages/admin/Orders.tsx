import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Orders = () => {
  const orders = [
    { id: "#ORD001", user: "John Doe", type: "Buy", amount: "0.5 BTC", value: "$22,500", status: "Completed", date: "2025-01-15" },
    { id: "#ORD002", user: "Jane Smith", type: "Sell", amount: "2.0 ETH", value: "$4,200", status: "Pending", date: "2025-01-15" },
    { id: "#ORD003", user: "Mike Johnson", type: "Buy", amount: "1.5 BTC", value: "$67,500", status: "Processing", date: "2025-01-14" },
    { id: "#ORD004", user: "Sarah Williams", type: "Sell", amount: "5.0 ETH", value: "$10,500", status: "Completed", date: "2025-01-14" },
    { id: "#ORD005", user: "Alice Brown", type: "Buy", amount: "0.8 BTC", value: "$36,000", status: "Cancelled", date: "2025-01-13" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">All Orders</h1>
          <Button className="bg-primary hover:bg-primary-hover">Export Data</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Orders</div>
            <div className="text-3xl font-bold">1,234</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Pending</div>
            <div className="text-3xl font-bold text-warning">45</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Completed</div>
            <div className="text-3xl font-bold text-success">1,156</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Cancelled</div>
            <div className="text-3xl font-bold text-destructive">33</div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search orders..." className="pl-10" />
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
                <TableHead>Status</TableHead>
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
                    <Badge 
                      variant={
                        order.status === "Completed" ? "default" :
                        order.status === "Pending" ? "secondary" :
                        order.status === "Processing" ? "outline" :
                        "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
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

export default Orders;
