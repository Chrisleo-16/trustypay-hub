import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Users,
  AlertCircle,
  BarChart3,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Package,
  Menu,
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
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
  { title: "Ads", icon: ShoppingBag, url: "/admin/ads" },
  { title: "Transactions", icon: CreditCard, url: "/admin/transactions" },
  { title: "Users", icon: Users, url: "/admin/users" },
  { title: "Disputes", icon: AlertCircle, url: "/admin/disputes" },
  { title: "Reports", icon: BarChart3, url: "/admin/reports" },
  { title: "Settings", icon: Settings, url: "/admin/settings" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const stats = [
    {
      title: "Total Revenue",
      value: "$127,458",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Active Ads",
      value: "2,847",
      change: "+8.2%",
      trend: "up",
      icon: Package,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Total Users",
      value: "12,456",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Pending Disputes",
      value: "23",
      change: "-5.1%",
      trend: "down",
      icon: AlertCircle,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN-001",
      user: "john.doe@email.com",
      crypto: "Bitcoin",
      amount: "$43,250",
      status: "completed",
      date: "2025-01-15",
    },
    {
      id: "TXN-002",
      user: "jane.smith@email.com",
      crypto: "Ethereum",
      amount: "$2,280",
      status: "escrow",
      date: "2025-01-15",
    },
    {
      id: "TXN-003",
      user: "mike.wilson@email.com",
      crypto: "Solana",
      amount: "$1,969",
      status: "pending",
      date: "2025-01-14",
    },
    {
      id: "TXN-004",
      user: "sarah.jones@email.com",
      crypto: "Cardano",
      amount: "$2,600",
      status: "completed",
      date: "2025-01-14",
    },
    {
      id: "TXN-005",
      user: "alex.brown@email.com",
      crypto: "Ripple",
      amount: "$4,960",
      status: "dispute",
      date: "2025-01-13",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/20 text-success border-success/30";
      case "escrow":
        return "bg-accent/20 text-accent border-accent/30";
      case "pending":
        return "bg-warning/20 text-warning border-warning/30";
      case "dispute":
        return "bg-danger/20 text-danger border-danger/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">SecureSwap</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={activeTab === item.title}
                        onClick={() => setActiveTab(item.title)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3 px-3 py-2">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-border">
            <Button variant="outline" className="w-full justify-start gap-3">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="flex items-center justify-between p-4 md:p-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger>
                  <Menu className="w-6 h-6" />
                </SidebarTrigger>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    Welcome back, Admin
                  </p>
                </div>
              </div>
              <Link to="/">
                <Button variant="outline">View Site</Button>
              </Link>
            </div>
          </header>

          <div className="p-4 md:p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card
                  key={stat.title}
                  className="p-6 border-2 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-danger" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {stat.value}
                      </h3>
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === "up" ? "text-success" : "text-danger"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Transactions */}
            <Card className="border-2">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Recent Transactions</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Latest crypto transactions and their status
                    </p>
                  </div>
                  <Button variant="outline">View All</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Transaction ID</TableHead>
                      <TableHead className="font-semibold">User</TableHead>
                      <TableHead className="font-semibold">Cryptocurrency</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-muted/50">
                        <TableCell className="font-mono font-medium">
                          {transaction.id}
                        </TableCell>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell className="font-medium">
                          {transaction.crypto}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {transaction.amount}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(
                              transaction.status
                            )} capitalize font-medium`}
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {transaction.date}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border-2">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Manage Ads</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Users className="w-5 h-5" />
                  <span>View Users</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Resolve Disputes</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>View Reports</span>
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
