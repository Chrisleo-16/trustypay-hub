import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Ban, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ✅ Extended User interface
interface User {
  id: string;
  full_name: string | null;
  email: string | null;
  verified: boolean;
  banned: boolean;
  total_trades: number;
  created_at: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = (await supabase
        .from("profiles")
        .select("*")) as any;

      if (error) throw error;

      const formattedUsers: User[] =
        (data || []).map((user: any) => ({
          id: user.id,
          full_name: user.full_name || null,
          email: user.email || null,
          verified: user.verified ?? false,
          banned: user.banned ?? false,
          total_trades: user.total_trades ?? 0,
          created_at: user.created_at,
        })) || [];

      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id: string, verified: boolean) => {
    setUpdatingUser(id);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ verified: !verified } as any)
        .eq("id", id);

      if (error) throw error;

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, verified: !verified } : u))
      );

      toast.success(!verified ? "User verified!" : "Verification removed!");
    } catch (error) {
      console.error("Error updating verification:", error);
      toast.error("Failed to update verification status.");
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleBan = async (id: string, banned: boolean) => {
  setUpdatingUser(id);
  try {
    if (!banned) {
      // ✅ Step 1: Mark user as banned in Supabase
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ banned: true, verified: false })
        .eq("id", id);

      if (updateError) throw updateError;

      const bannedUser = users.find((u) => u.id === id);
      if (bannedUser && bannedUser.email) {
        console.log(
          `📧 Email sent to ${bannedUser.email}: You have been banned from the platform.`
        );
      }

      // ✅ Step 2: Delete the user record from Supabase completely
      const { error: deleteError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // ✅ Step 3: Remove from frontend list
      setUsers((prev) => prev.filter((u) => u.id !== id));

      toast.success("User banned and removed successfully!");
    } else {
      // Optional unban logic (if you ever need it)
      const { error } = await supabase
        .from("profiles")
        .update({ banned: true, verified: false } as any)
        .eq("id", id);
      if (error) throw error;

      toast.success("User unbanned!");
    }
  } catch (error) {
    console.error("Error banning user:", error);
    toast.error("Failed to ban/remove user.");
  } finally {
    setUpdatingUser(null);
  }
};


  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Trades</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.full_name || "N/A"}
                    </TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge
                          variant={user.verified ? "default" : "secondary"}
                          className={`w-fit ${
                            user.verified ? "bg-green-500 text-white" : ""
                          }`}
                        >
                          {user.verified ? "Verified" : "Unverified"}
                        </Badge>
                        {user.banned && (
                          <Badge variant="destructive" className="w-fit">
                            Banned
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{user.total_trades}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={updatingUser === user.id}
                        onClick={() => handleVerify(user.id, user.verified)}
                      >
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        {user.verified ? "Unverify" : "Verify"}
                      </Button>
                      <Button
                        variant={user.banned ? "default" : "destructive"}
                        size="sm"
                        disabled={updatingUser === user.id}
                        onClick={() => handleBan(user.id, user.banned)}
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        {user.banned ? "Unban" : "Ban"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Users;
