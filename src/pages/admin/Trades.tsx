import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Trade {
  id: string;
  trade_number: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  total_value: number;
  currency_code: string;
  status: string;
  created_at: string;
}

const Trades = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
    disputed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrades();
    fetchStats();
  }, []);

  const fetchTrades = async () => {
    try {
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTrades(data || []);
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { count: total } = await supabase
        .from('trades')
        .select('*', { count: 'exact', head: true });

      const { count: inProgress } = await supabase
        .from('trades')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'in_progress');

      const { count: completed } = await supabase
        .from('trades')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      const { count: disputed } = await supabase
        .from('trades')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'disputed');

      setStats({
        total: total || 0,
        inProgress: inProgress || 0,
        completed: completed || 0,
        disputed: disputed || 0,
      });
    } catch (error) {
      console.error('Error fetching trade stats:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'disputed':
        return <Badge variant="destructive">Disputed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Trade Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Trades</div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">In Progress</div>
            <div className="text-3xl font-bold text-warning">{stats.inProgress}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Completed</div>
            <div className="text-3xl font-bold text-success">{stats.completed}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Disputed</div>
            <div className="text-3xl font-bold text-destructive">{stats.disputed}</div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Trades</h2>
          {loading ? (
            <div className="text-center py-8">Loading trades...</div>
          ) : trades.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No trades found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trade ID</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell className="font-mono">{trade.trade_number}</TableCell>
                    <TableCell>{trade.currency_code}</TableCell>
                    <TableCell>{trade.amount}</TableCell>
                    <TableCell className="font-medium">${trade.total_value}</TableCell>
                    <TableCell>{getStatusBadge(trade.status)}</TableCell>
                    <TableCell>{new Date(trade.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Details</Button>
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

export default Trades;
