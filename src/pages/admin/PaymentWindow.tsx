import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PaymentWindow = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Payment Window Settings</h1>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Default Time Windows</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="buy-window">Buy Order Payment Window</Label>
                  <div className="flex gap-2 mt-2">
                    <Input id="buy-window" type="number" defaultValue="15" className="max-w-20" />
                    <span className="flex items-center text-muted-foreground">minutes</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="sell-window">Sell Order Payment Window</Label>
                  <div className="flex gap-2 mt-2">
                    <Input id="sell-window" type="number" defaultValue="15" className="max-w-20" />
                    <span className="flex items-center text-muted-foreground">minutes</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Confirmation Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="confirm-window">Asset Release Confirmation Time</Label>
                  <div className="flex gap-2 mt-2">
                    <Input id="confirm-window" type="number" defaultValue="5" className="max-w-20" />
                    <span className="flex items-center text-muted-foreground">minutes</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dispute-window">Auto-Dispute After</Label>
                  <div className="flex gap-2 mt-2">
                    <Input id="dispute-window" type="number" defaultValue="30" className="max-w-20" />
                    <span className="flex items-center text-muted-foreground">minutes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button>Save Settings</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Current Active Windows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-muted">
              <div className="text-sm text-muted-foreground">Average Payment Time</div>
              <div className="text-2xl font-bold">8.5 min</div>
            </Card>
            <Card className="p-4 bg-muted">
              <div className="text-sm text-muted-foreground">Average Confirmation Time</div>
              <div className="text-2xl font-bold">2.3 min</div>
            </Card>
            <Card className="p-4 bg-muted">
              <div className="text-sm text-muted-foreground">Timeout Rate</div>
              <div className="text-2xl font-bold">3.2%</div>
            </Card>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PaymentWindow;
