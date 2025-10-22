import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Transactions = () => {
  const transactions = [
    { id: "#TXN001", user: "John Doe", type: "Deposit", currency: "BTC", amount: "0.5", value: "$22,500", status: "Completed", date: "2025-01-15 14:23" },
    { id: "#TXN002", user: "Jane Smith", type: "Withdrawal", currency: "ETH", amount: "2.0", value: "$4,200", status: "Pending", date: "2025-01-15 13:45" },
    { id: "#TXN003", user: "Mike Johnson", type: "Trade", currency: "BTC", amount: "1.5", value: "$67,500", status: "Completed", date: "2025-01-15 12:30" },
    { id: "#TXN004", user: "Sarah Williams", type: "Deposit", currency: "ETH", amount: "5.0", value: "$10,500", status: "Completed", date: "2025-01-15 11:15" },
    { id: "#TXN005", user: "Alice Brown", type: "Withdrawal", currency: "BTC", amount: "0.8", value: "$36,000", status: "Failed", date: "2025-01-15 10:00" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Transactions</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Volume</div>
            <div className="text-2xl font-bold">$5.2M</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Today's Transactions</div>
            <div className="text-2xl font-bold">234</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Pending</div>
            <div className="text-2xl font-bold text-warning">12</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Failed</div>
            <div className="text-2xl font-bold text-destructive">3</div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono">{txn.id}</TableCell>
                  <TableCell>{txn.user}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        txn.type === "Deposit" ? "default" :
                        txn.type === "Withdrawal" ? "secondary" :
                        "outline"
                      }
                    >
                      {txn.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{txn.currency}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell className="font-medium">{txn.value}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        txn.status === "Completed" ? "default" :
                        txn.status === "Pending" ? "secondary" :
                        "destructive"
                      }
                    >
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{txn.date}</TableCell>
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

export default Transactions;
