import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCheck,
  Mail,
  Smartphone,
  RefreshCw,
  DollarSign,
  Bitcoin,
  ShoppingBag,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border" collapsible="icon">
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-lg">Admin Panel</h2>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Overview</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin" end>
                        <Activity className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Manage P2P</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/running-trades">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Running Trade</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/reported-trades">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        <span>Reported Trade</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/completed-trades">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        <span>Completed Trade</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/manage-ads">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>Manage Ad</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Orders</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/payment-window">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Payment Window</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/payment-method">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>Payment Method</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-y-auto">
          <header className="h-16 border-b border-border flex items-center px-6 bg-card">
            <SidebarTrigger />
            <div className="ml-4 flex items-center justify-between flex-1">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Button variant="outline">
                Cron Setup
              </Button>
            </div>
          </header>

          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={Users}
                label="Total Users"
                value="2,756"
                iconBg="bg-primary/10"
                iconColor="text-primary"
              />
              <StatCard
                icon={UserCheck}
                label="Active Users"
                value="2,473"
                iconBg="bg-success/10"
                iconColor="text-success"
              />
              <StatCard
                icon={Mail}
                label="Email Unverified Users"
                value="244"
                iconBg="bg-warning/10"
                iconColor="text-warning"
              />
              <StatCard
                icon={Smartphone}
                label="Mobile Unverified Users"
                value="0"
                iconBg="bg-destructive/10"
                iconColor="text-destructive"
              />
              <StatCard
                icon={RefreshCw}
                label="Total Trade"
                value="0"
                iconBg="bg-secondary/10"
                iconColor="text-secondary"
              />
              <StatCard
                icon={DollarSign}
                label="Total Currencies"
                value="44"
                iconBg="bg-primary/10"
                iconColor="text-primary"
              />
              <StatCard
                icon={Bitcoin}
                label="Total Crypto Currencies"
                value="14"
                iconBg="bg-warning/10"
                iconColor="text-warning"
              />
            </div>

            {/* P2P Stats */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">P2P Trading Overview</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={Clock}
                  label="P2P Running Trade"
                  value="48"
                  iconBg="bg-warning/10"
                  iconColor="text-warning"
                  clickable
                />
                <StatCard
                  icon={CheckCircle2}
                  label="P2P Completed Trade"
                  value="5,114"
                  iconBg="bg-success/10"
                  iconColor="text-success"
                  clickable
                />
                <StatCard
                  icon={Package}
                  label="P2P Completed Trade"
                  value="5,162"
                  iconBg="bg-secondary/10"
                  iconColor="text-secondary"
                  clickable
                />
                <StatCard
                  icon={ShoppingBag}
                  label="P2P Total Ad"
                  value="355"
                  iconBg="bg-primary/10"
                  iconColor="text-primary"
                  clickable
                />
              </div>
            </div>

            {/* Order Summary */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-2">Order Summary</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Order summary presents visual & listing data of order, categories by pair, excluding canceled orders & scroll below to show all pair.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-semibold">Pair</th>
                      <th className="text-right py-3 font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">TRX_USDT</td>
                      <td className="py-3 text-right font-medium">38.1137 TRX</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">SHIB_USDT</td>
                      <td className="py-3 text-right font-medium">0.2000 SHIB</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 text-muted-foreground">ETH_USDT</td>
                      <td className="py-3 text-right font-medium">0.0019 ETH</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-muted-foreground">BTC_USD</td>
                      <td className="py-3 text-right font-medium">0.0011 BTC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
  clickable?: boolean;
}

const StatCard = ({ icon: Icon, label, value, iconBg, iconColor, clickable }: StatCardProps) => {
  return (
    <Card className={`p-4 ${clickable ? 'hover:shadow-md cursor-pointer transition-all' : ''}`}>
      <div className="flex items-start justify-between">
        <div className={`rounded-lg ${iconBg} p-3`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        {clickable && (
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className="mt-4">
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="text-3xl font-bold">{value}</div>
      </div>
    </Card>
  );
};

export default AdminDashboard;
