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
  Activity,
  Menu,
  ChevronDown,
  ChevronRight,
  UserCheck,
  Mail,
  Smartphone,
  RefreshCcw,
  Coins,
  Bitcoin,
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
  {
    title: "Manage Order",
    icon: ShoppingBag,
    url: "/admin/orders",
    subItems: [
      { title: "All Orders", url: "/admin/orders/all" },
      { title: "Pending Orders", url: "/admin/orders/pending" },
      { title: "Completed Orders", url: "/admin/orders/completed" },
    ],
  },
  {
    title: "Manage P2P",
    icon: Users,
    url: "/admin/p2p",
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

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const mainStats = [
    {
      title: "Total Users",
      value: "2,756",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Users",
      value: "2,473",
      icon: UserCheck,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Email Unverified Users",
      value: "244",
      icon: Mail,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Mobile Unverified Users",
      value: "0",
      icon: Smartphone,
      color: "text-danger",
      bgColor: "bg-danger/10",
    },
    {
      title: "Total Trade",
      value: "5,162",
      icon: RefreshCcw,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Total Currencies",
      value: "44",
      icon: Coins,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Crypto Currencies",
      value: "14",
      icon: Bitcoin,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const p2pStats = [
    {
      title: "P2P Running Trade",
      value: "48",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "P2P Completed Trade",
      value: "5,114",
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "P2P Reported Trade",
      value: "23",
      icon: FileText,
      color: "text-danger",
      bgColor: "bg-danger/10",
    },
    {
      title: "P2P Total Ad",
      value: "355",
      icon: ShoppingBag,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const orderSummary = [
    { pair: "TRX_USDT", amount: "38.1137 TRX" },
    { pair: "SHIB_USDT", amount: "0.2000 SHIB" },
    { pair: "ETH_USDT", amount: "0.0019 ETH" },
    { pair: "BTC_USD", amount: "0.0011 BTC" },
    { pair: "SOL_USDT", amount: "0.0450 SOL" },
    { pair: "ADA_USDT", amount: "12.3400 ADA" },
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
                              onClick={() => setActiveTab(item.title)}
                              className="cursor-pointer"
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
                                <SidebarMenuButton
                                  asChild
                                  className="cursor-pointer text-sm"
                                >
                                  <div className="flex items-center gap-2 px-3 py-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                                    <span>{subItem.title}</span>
                                  </div>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
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
                    )
                  )}
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
            {/* Main Stats Grid */}
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
                      <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
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

            {/* P2P Stats */}
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
                        <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
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

            {/* Order Summary */}
            <Card className="border overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Order summary presents visual & listing data of order,
                  categories by pair, excluding canceled orders & scroll below to
                  show all pair.
                </p>
              </div>
              <div className="p-6">
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-4 pb-3 border-b font-semibold text-muted-foreground">
                    <div>Pair</div>
                    <div className="text-right">Amount</div>
                  </div>
                  {orderSummary.map((order, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 gap-4 py-3 border-b last:border-0 hover:bg-muted/50 transition-colors rounded-lg px-3"
                    >
                      <div className="font-medium">{order.pair}</div>
                      <div className="text-right font-semibold text-accent">
                        {order.amount}
                      </div>
                    </div>
                  ))}
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
