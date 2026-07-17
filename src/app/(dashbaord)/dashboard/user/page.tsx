
import React from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { 
  LayoutDashboard, 
  PlusCircle, 
  ShoppingCart, 
  User, 
  Package, 
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { getSession } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";

export default async function UserDashboard() {

  const session=await getSession();

  const getUserStats=await protectedFetch(`/get-user-data/${session?.id}`)


  const user = session;

  // Mock dashboard statistics
  const stats = [
    {
      title: " Listed Orders",
      value: getUserStats?.totalOrders,
      description: "Manage tours & experiences",
      icon: Package,
      color: "from-teal-500 to-emerald-600",
      href: "/dashboard/user/products"
    },
    {
      title: "Items in Cart",
      value: getUserStats?.totalCartItems,
      description: "Ready for booking checkout",
      icon: ShoppingCart,
      color: "from-[#0E1F2B] to-[#1a3a50]",
      href: "/dashboard/user/orders"
    },
    {
      title: "Wallet / Spent",
      value: getUserStats?.totalSpent,
      description: "Total experience bookings",
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
      href: "/dashboard/user/orders"
    },
   
  ];



  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0E1F2B] via-[#122A3C] to-[#14B8A6] p-6 md:p-10 text-white shadow-xl">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,var(--color-primary),transparent)]" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-teal-300">
            <CheckCircle2 size={12} />
            User Account
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Welcome back, <span className="text-teal-300">{user?.name || "Guest User"}</span>!
          </h1>
          <p className="text-teal-50/80 text-sm md:text-base leading-relaxed">
            Create premium listings, manage your items, track your shopping cart, and keep your user profile up to date all in one sleek dashboard.
          </p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={idx} 
              href={stat.href} 
              className="card-base card-hover p-6 flex flex-col justify-between group hover:border-[#14B8A6]/40 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                  <Icon size={22} />
                </div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-[#14B8A6] flex items-center gap-1 transition-colors">
                  View <ArrowRight size={12} />
                </span>
              </div>
              <div className="mt-5 space-y-1">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-950 transition-colors">{stat.value}</h3>
                <p className="text-xs text-gray-400">{stat.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Split: Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            

           

            <Link 
              href="/dashboard/user/orders"
              className="card-base card-hover p-5 flex items-center gap-4 border border-gray-100 hover:border-teal-500/20 group"
            >
              <div className="p-3 rounded-xl bg-teal-50 text-teal-800 group-hover:bg-teal-950 group-hover:text-white transition-colors duration-300">
                <ShoppingCart size={22} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800 text-sm">Checkout Shopping Cart</h4>
                <p className="text-xs text-gray-400">Review selected experiences</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-teal-800 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link 
              href="/dashboard/user/profile"
              className="card-base card-hover p-5 flex items-center gap-4 border border-gray-100 hover:border-teal-500/20 group"
            >
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                <User size={22} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800 text-sm">Update Profile Info</h4>
                <p className="text-xs text-gray-400">Edit billing and security info</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* Right Column: Recent Activities */}
        {/* <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-xs font-semibold text-[#14B8A6] hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </button>
          </div>

          <div className="card-base p-6 space-y-6">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex gap-4 items-start group">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-500 group-hover:bg-[#14B8A6]/10 group-hover:text-[#14B8A6] transition-colors">
                  <Clock size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{act.title}</p>
                    <span className={`self-start sm:self-auto text-[10px] px-2 py-0.5 font-bold rounded-full border ${act.statusColor}`}>
                      {act.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {act.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      User Logs
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        
      </div>
    </div>
  );
}