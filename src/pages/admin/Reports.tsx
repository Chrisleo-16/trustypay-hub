import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download } from "lucide-react";
import { useState } from "react";

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Select Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Transaction Reports</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span>Daily Transaction Summary</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Monthly Revenue Report</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Currency Exchange Report</span>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Reports</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span>Active Users Report</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>New Registrations</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>User Verification Status</span>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Trade Reports</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span>P2P Trade Summary</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Completed Trades</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Failed Trades Analysis</span>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Financial Reports</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span>Revenue & Fees</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Withdrawal Summary</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Deposit Summary</span>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-muted">
              <div className="text-sm text-muted-foreground">Today's Volume</div>
              <div className="text-2xl font-bold">$234,500</div>
            </Card>
            <Card className="p-4 bg-muted">
              <div className="text-sm text-muted-foreground">Active Trades</div>
              <div className="text-2xl font-bold">45</div>
            </Card>
            <Card className="p-4 bg-muted">
              <div className="text-sm text-muted-foreground">New Users</div>
              <div className="text-2xl font-bold">12</div>
            </Card>
            <Card className="p-4 bg-muted">
              <div className="text-sm text-muted-foreground">Avg. Trade Time</div>
              <div className="text-2xl font-bold">8.5 min</div>
            </Card>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Reports;
