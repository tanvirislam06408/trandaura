"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function AdminOrdersPlaceholder() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-1">
        <Link 
          href="/dashboard/admin" 
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#14B8A6] hover:text-[#0f9488] transition-colors mb-2"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Manage Orders</h1>
        <p className="text-gray-500 text-sm">Review global ticket bookings and customer reservations.</p>
      </div>

      <div className="card-base p-12 text-center max-w-md mx-auto space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-400">
          <ShoppingCart size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-base">Booking Orders View</h3>
          <p className="text-xs text-gray-400 mt-1">This section is currently automated. All customer transactions are processed dynamically.</p>
        </div>
      </div>
    </div>
  );
}
