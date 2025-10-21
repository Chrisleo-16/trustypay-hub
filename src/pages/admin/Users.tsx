import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserCheck, UserX } from "lucide-react";

const Users = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", verified: true, trades: 45 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", verified: true, trades: 32 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "Suspended", verified: false, trades: 12 },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", status: "Active", verified: true, trades: 67 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button className="bg-primary hover:bg-primary-hover">Add User</Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Trades</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.verified ? (
                    <UserCheck className="h-5 w-5 text-success" />
                  ) : (
                    <UserX className="h-5 w-5 text-destructive" />
                  )}
                </TableCell>
                <TableCell>{user.trades}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Users;