import { ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
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
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ShieldCheck } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(["Manage Order", "Manage P2P"]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
    {
      title: "Manage Order",
      icon: ShoppingCart,
      subItems: [
        { title: "All Trades", url: "/admin/trades" },
        { title: "Running Trades", url: "/admin/trades?status=running" },
        { title: "Completed Trades", url: "/admin/trades?status=completed" },
        { title: "Reported", url: "/admin/trades?status=reported" }
      ],
    },
    {
      title: "Manage P2P",
      icon: Users,
      subItems: [
        { title: "All Users", url: "/admin/users" },
        { title: "Active Users", url: "/admin/users?status=active" },
        { title: "Unverified Users", url: "/admin/users?status=unverified" }
      ],
    },
    { title: "Manage Currency", icon: DollarSign, url: "/admin/currencies" },
    { title: "Manage Ads", icon: FileText, url: "/admin/ads" },
  ];

  const handleLogout = () => {
    navigate("/auth");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="border-b border-border p-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="rounded-lg bg-primary p-2">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-foreground">Arcanum Admin</span>
            </Link>
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
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="w-full">
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                              {openMenus.includes(item.title) ? (
                                <ChevronDown className="ml-auto h-4 w-4" />
                              ) : (
                                <ChevronRight className="ml-auto h-4 w-4" />
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenu className="ml-4 mt-2">
                              {item.subItems.map((subItem) => (
                                <SidebarMenuItem key={subItem.url}>
                                  <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === subItem.url}
                                  >
                                    <Link to={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ))}
                            </SidebarMenu>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === item.url}
                        >
                          <Link to={item.url || "#"}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Admin Panel</span>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;