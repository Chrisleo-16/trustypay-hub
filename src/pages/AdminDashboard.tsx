import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Users,
  AlertCircle,
  BarChart3,
  Settings,
  LogOut,
  Activity,
  Menu,
  ChevronDown,
  ChevronRight,
  UserCheck,
  RefreshCcw,
  Coins,
  Clock,
  CheckCircle2,
  FileText,
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
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
  {
    title: "Manage Order",
    icon: ShoppingBag,
    subItems: [
      { title: "All Orders", url: "/admin/orders" },
      { title: "Pending Orders", url: "/admin/orders/pending" },
      { title: "Completed Orders", url: "/admin/orders/completed" },
    ],
  },
  {
    title: "Manage P2P",
    icon: Users,
    subItems: [
      { title: "Running Trade", url: "/admin/p2p/running" },
      { title: "Reported Trade", url: "/admin/p2p/reported" },
      { title: "Completed Trade", url: "/admin/p2p/completed" },
      { title: "Manage Ad", url: "/admin/p2p/ads" },
      { title: "Payment Window", url: "/admin/p2p/payment-window" },
      { title: "Payment Method", url: "/admin/p2p/payment-method" },
    ],
  },
  { title: "Transactions", icon: CreditCard, url: "/admin/transactions" },
  { title: "Disputes", icon: AlertCircle, url: "/admin/disputes" },
  { title: "Reports", icon: BarChart3, url: "/admin/reports" },
  { title: "Settings", icon: Settings, url: "/admin/settings" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openMenus, setOpenMenus] = useState<string[]>(["Manage P2P"]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    totalTrades: 0,
    totalCurrencies: 0,
    runningTrades: 0,
    completedTrades: 0,
    reportedTrades: 0,
    totalAds: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: verifiedUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("verified", true);

      const { count: totalTrades } = await supabase
        .from("trades")
        .select("*", { count: "exact", head: true });

      const { count: runningTrades } = await supabase
        .from("trades")
        .select("*", { count: "exact", head: true })
        .eq("status", "in_progress");

      const { count: completedTrades } = await supabase
        .from("trades")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed");

      const { count: reportedTrades } = await supabase
        .from("reports")
        .select("*", { count: "exact", head: true });

      const { count: totalCurrencies } = await supabase
        .from("currencies")
        .select("*", { count: "exact", head: true });

      const { count: totalAds } = await supabase
        .from("ads")
        .select("*", { count: "exact", head: true });

      setStats({
        totalUsers: totalUsers || 0,
        verifiedUsers: verifiedUsers || 0,
        totalTrades: totalTrades || 0,
        totalCurrencies: totalCurrencies || 0,
        runningTrades: runningTrades || 0,
        completedTrades: completedTrades || 0,
        reportedTrades: reportedTrades || 0,
        totalAds: totalAds || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleLogout = async () => {
    try {
      // Supabase sign-out
      await supabase.auth.signOut();

      // Clear localStorage/session data
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const mainStats = [
    {
      title: "Total Users",
      value: loading ? "..." : stats.totalUsers.toString(),
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Verified Users",
      value: loading ? "..." : stats.verifiedUsers.toString(),
      icon: UserCheck,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Total Trades",
      value: loading ? "..." : stats.totalTrades.toString(),
      icon: RefreshCcw,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Total Currencies",
      value: loading ? "..." : stats.totalCurrencies.toString(),
      icon: Coins,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const p2pStats = [
    {
      title: "P2P Running Trade",
      value: loading ? "..." : stats.runningTrades.toString(),
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "P2P Completed Trade",
      value: loading ? "..." : stats.completedTrades.toString(),
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "P2P Reported Trade",
      value: loading ? "..." : stats.reportedTrades.toString(),
      icon: FileText,
      color: "text-danger",
      bgColor: "bg-danger/10",
    },
    {
      title: "P2P Total Ad",
      value: loading ? "..." : stats.totalAds.toString(),
      icon: ShoppingBag,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
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
                  {menuItems.map((item) =>
                    item.subItems ? (
                      <Collapsible
                        key={item.title}
                        open={openMenus.includes(item.title)}
                        onOpenChange={() => toggleMenu(item.title)}
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger className="w-full">
                            <SidebarMenuButton
                              isActive={activeTab === item.title}
                              className="cursor-pointer"
                              onClick={() => setActiveTab(item.title)}
                            >
                              <div className="flex items-center justify-between w-full px-3 py-2">
                                <div className="flex items-center gap-3">
                                  <item.icon className="w-5 h-5" />
                                  <span>{item.title}</span>
                                </div>
                                {openMenus.includes(item.title) ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </div>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>

                          <CollapsibleContent className="pl-8 mt-1">
                            {item.subItems.map((subItem) => (
                              <SidebarMenuItem key={subItem.title}>
                                <Link
                                  to={subItem.url}
                                  onClick={() => setActiveTab(subItem.title)}
                                >
                                  <SidebarMenuButton className="cursor-pointer text-sm w-full">
                                    <div className="flex items-center gap-2 px-3 py-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                                      <span>{subItem.title}</span>
                                    </div>
                                  </SidebarMenuButton>
                                </Link>
                              </SidebarMenuItem>
                            ))}
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      <SidebarMenuItem key={item.title}>
                        <Link
                          to={item.url || "#"}
                          onClick={() => setActiveTab(item.title)}
                        >
                          <SidebarMenuButton
                            isActive={activeTab === item.title}
                            className="cursor-pointer w-full"
                          >
                            <div className="flex items-center gap-3 px-3 py-2">
                              <item.icon className="w-5 h-5" />
                              <span>{item.title}</span>
                            </div>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={handleLogout}
            >
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
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Cron Setup
                </Button>
                <Link to="/">
                  <Button variant="outline">View Site</Button>
                </Link>
              </div>
            </div>
          </header>

          <div className="p-4 md:p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mainStats.map((stat) => (
                <Card
                  key={stat.title}
                  className="p-5 border hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-2">
                        {stat.title}
                      </p>
                      <h3 className="text-3xl font-bold mb-1">
                        {stat.value}
                      </h3>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground mt-2 group-hover:translate-x-1 transition-transform" />
                </Card>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">P2P Trading Overview</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {p2pStats.map((stat) => (
                  <Card
                    key={stat.title}
                    className="p-5 border hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          {stat.title}
                        </p>
                        <h3 className="text-3xl font-bold mb-1">
                          {stat.value}
                        </h3>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground mt-2 group-hover:translate-x-1 transition-transform" />
                  </Card>
                ))}
              </div>
            </div>

            <Card className="border overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <h2 className="text-xl font-bold">Quick Actions</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Common administrative actions for platform management.
                </p>
              </div>
              <div className="p-6">
                <div className="grid gap-3">
                  <Link to="/admin/users">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link to="/admin/trades">
                    <Button className="w-full justify-start" variant="outline">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      View All Trades
                    </Button>
                  </Link>
                  <Link to="/admin/disputes">
                    <Button className="w-full justify-start" variant="outline">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Handle Disputes
                    </Button>
                  </Link>
                  <Link to="/admin/settings">
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      Platform Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
