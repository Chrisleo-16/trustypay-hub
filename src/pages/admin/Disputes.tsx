import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Dispute {
  id: string;
  dispute_number: string;
  trade_id: string;
  reason: string;
  status: string;
  created_at: string;
}

const Disputes = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [stats, setStats] = useState({ total: 0, open: 0, underReview: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('disputes').select('*').order('created_at', { ascending: false });
      setDisputes(data || []);
      
      const { count: total } = await supabase.from('disputes').select('*', { count: 'exact', head: true });
      const { count: open } = await supabase.from('disputes').select('*', { count: 'exact', head: true }).eq('status', 'open');
      const { count: underReview } = await supabase.from('disputes').select('*', { count: 'exact', head: true }).eq('status', 'under_review');
      const { count: resolved } = await supabase.from('disputes').select('*', { count: 'exact', head: true }).eq('status', 'resolved');
      
      setStats({ total: total || 0, open: open || 0, underReview: underReview || 0, resolved: resolved || 0 });
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Disputes</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Disputes</div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Open</div>
            <div className="text-3xl font-bold text-destructive">{stats.open}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Under Review</div>
            <div className="text-3xl font-bold text-warning">{stats.underReview}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Resolved</div>
            <div className="text-3xl font-bold text-success">{stats.resolved}</div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Active Disputes</h2>
          {loading ? <div className="text-center py-8">Loading...</div> : disputes.length === 0 ? 
            <div className="text-center py-8 text-muted-foreground">No disputes found</div> : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispute ID</TableHead>
                <TableHead>Trade ID</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono">{d.dispute_number}</TableCell>
                  <TableCell className="font-mono">{d.trade_id}</TableCell>
                  <TableCell className="max-w-xs truncate">{d.reason}</TableCell>
                  <TableCell><Badge variant={d.status === 'open' ? 'destructive' : d.status === 'resolved' ? 'default' : 'secondary'}>{d.status}</Badge></TableCell>
                  <TableCell>{new Date(d.created_at).toLocaleDateString()}</TableCell>
                  <TableCell><Button size="sm">Review</Button></TableCell>
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

export default Disputes;
