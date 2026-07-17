"use client";

import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  Heart,
  CreditCard,
  User,
  PlusCircle,
  ShoppingCart,
  BarChart3,
  Users,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type SidebarNavItem = {
  name: string;
  path: string;
  icon?: string | LucideIcon;
};

type DashboardSidebarNavItemsProps = {
  items: SidebarNavItem[];
};

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  Package,
  Heart,
  CreditCard,
  User,
  PlusCircle,
  ShoppingCart,
  BarChart3,
  Users,
  ShieldCheck,
};

export function DashboardSidebarNavItems({ items }: DashboardSidebarNavItemsProps) {
  const { setOpenMobile } = useSidebar();

  return items.map((item) => {
    const Icon =
      typeof item.icon === "string"
        ? ICONS[item.icon] ?? LayoutDashboard
        : item.icon ?? LayoutDashboard;

    return (
      <SidebarMenuItem key={item.name}>
        <Link
          href={item.path}
          onClick={() => setOpenMobile(false)}
          className="max-md:h-12 flex items-center gap-3 max-md:text-base max-md:[&>svg]:size-5"
        >
          <SidebarMenuButton tooltip={item.name}>

            <Icon />
            <span>{item.name}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  });
}