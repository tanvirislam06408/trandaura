
import React from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { protectedFetch, serverFetch } from "@/lib/core/server";
import AdminAnalyticsCharts from "@/components/dashboard/AdminAnalyticsCharts";

export default async function AdminAnalyticsPage() {
  const getAdminInfo = await protectedFetch(`/get-admin-infos`);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#14B8A6] hover:text-[#0f9488] transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <BarChart3 size={28} className="text-[#14B8A6]" />
            Platform Analytics
          </h1>
          <p className="text-gray-500 text-sm">View platform metrics, revenue, and performance insights.</p>
        </div>
      </div>

      {/* Charts */}
      <AdminAnalyticsCharts
        activeProducts={getAdminInfo?.activeProducts || 0}
        orders={getAdminInfo?.orders || 0}
        totalEarning={getAdminInfo?.totalEarning || 0}
        users={getAdminInfo?.users || 0}
      />
    </div>
  );
}
