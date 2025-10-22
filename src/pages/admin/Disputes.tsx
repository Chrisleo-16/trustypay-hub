import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Disputes = () => {
  const disputes = [
    { id: "#DIS001", tradeId: "#TRD089", reporter: "Alice Brown", reported: "Bob Wilson", reason: "Payment not received", status: "Open", priority: "High", date: "2025-01-14" },
    { id: "#DIS002", tradeId: "#TRD092", reporter: "Charlie Davis", reported: "Diana Miller", reason: "Wrong amount", status: "Under Review", priority: "Medium", date: "2025-01-13" },
    { id: "#DIS003", tradeId: "#TRD085", reporter: "Eve Johnson", reported: "Frank White", reason: "Delayed release", status: "Resolved", priority: "Low", date: "2025-01-12" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Disputes</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Disputes</div>
            <div className="text-3xl font-bold">87</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Open</div>
            <div className="text-3xl font-bold text-destructive">5</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Under Review</div>
            <div className="text-3xl font-bold text-warning">8</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Resolved</div>
            <div className="text-3xl font-bold text-success">74</div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Active Disputes</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispute ID</TableHead>
                <TableHead>Trade ID</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-mono">{dispute.id}</TableCell>
                  <TableCell className="font-mono">{dispute.tradeId}</TableCell>
                  <TableCell>{dispute.reporter}</TableCell>
                  <TableCell>{dispute.reported}</TableCell>
                  <TableCell>{dispute.reason}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        dispute.priority === "High" ? "destructive" :
                        dispute.priority === "Medium" ? "secondary" :
                        "outline"
                      }
                    >
                      {dispute.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        dispute.status === "Open" ? "destructive" :
                        dispute.status === "Under Review" ? "secondary" :
                        "default"
                      }
                    >
                      {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dispute.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Review</Button>
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

export default Disputes;
