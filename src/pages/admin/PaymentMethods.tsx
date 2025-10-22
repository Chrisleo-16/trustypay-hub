import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const PaymentMethods = () => {
  const methods = [
    { id: 1, name: "Bank Transfer", enabled: true, usage: "High", avgTime: "10-15 min" },
    { id: 2, name: "PayPal", enabled: true, usage: "Medium", avgTime: "5-8 min" },
    { id: 3, name: "Wise", enabled: true, usage: "Medium", avgTime: "8-12 min" },
    { id: 4, name: "Venmo", enabled: false, usage: "Low", avgTime: "5-10 min" },
    { id: 5, name: "Cash App", enabled: true, usage: "High", avgTime: "3-5 min" },
    { id: 6, name: "Zelle", enabled: true, usage: "Medium", avgTime: "5-8 min" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Payment Methods</h1>
          <Button className="bg-primary hover:bg-primary-hover">Add Payment Method</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Methods</div>
            <div className="text-3xl font-bold">{methods.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Active</div>
            <div className="text-3xl font-bold text-success">{methods.filter(m => m.enabled).length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Inactive</div>
            <div className="text-3xl font-bold text-muted-foreground">{methods.filter(m => !m.enabled).length}</div>
          </Card>
        </div>

        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Avg. Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {methods.map((method) => (
                <TableRow key={method.id}>
                  <TableCell className="font-medium">{method.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={method.enabled} />
                      <span className="text-sm text-muted-foreground">
                        {method.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        method.usage === "High" ? "default" :
                        method.usage === "Medium" ? "secondary" :
                        "outline"
                      }
                    >
                      {method.usage}
                    </Badge>
                  </TableCell>
                  <TableCell>{method.avgTime}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Stats</Button>
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

export default PaymentMethods;
