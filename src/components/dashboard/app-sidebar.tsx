

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/core/session";
import { DashboardSidebarNavItems } from "./DashboardSidebarNavItems";
import { redirect } from "next/navigation";
import Logo from "../shared/Logo";
// Icon components are resolved inside the client component
// to avoid passing non-plain objects from a Server Component.





const navItems = {

  user: [
    {
      name: "Dashboard",
      path: "/dashboard/user",
      icon: "LayoutDashboard",
    },

    {
      name: "Cart",
      path: "/dashboard/user/orders",
      icon: "ShoppingCart",
    },

    {
      name: "Profile",
      path: "/dashboard/user/profile",
      icon: "User",
    },
  ],

  admin: [
    {
      name: "Dashboard",
      path: "/dashboard/admin",
      icon: "LayoutDashboard",
    },
    {
      name: "Add Product",
      path: "/dashboard/admin/add-product",
      icon: "PlusCircle",
    },
    {
      name: "Manage Products",
      path: "/dashboard/admin/products",
      icon: "Package",
    },
    {
      name: "Manage Users",
      path: "/dashboard/admin/users",
      icon: "Users",
    },


    {
      name: "Platform Analytics",
      path: "/dashboard/admin/analytics",
      icon: "BarChart3",
    },

    {
      name: "Profile",
      path: "/dashboard/admin/profile",
      icon: "User",
    },
  ],
};




export async function DashboardSidebar() {
  const user = await getSession();
  const role = user?.role === "admin" || user?.role === "user" ? user.role : "user";
  const items = navItems[role];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <DashboardSidebarNavItems items={items} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-sm text-muted-foreground">
          © 2026 My App
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}