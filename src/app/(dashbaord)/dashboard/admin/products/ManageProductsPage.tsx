"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Trash2,
  RotateCcw,
  Check,
  Package,
  MapPin,
  Clock,
  Star
} from "lucide-react";
import { Product } from "@/types/product";
import ProductsPagination from "@/components/shared/ProductsPagination";
import AdminProductPagination from "@/components/dashboard/AdminProductPagination";
import { deleteProduct } from "@/lib/actions/deleteProduct";
import toast from "react-hot-toast";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";

interface AdminProduct {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  rating: number;
  location: string;
  duration: string;
  category: string;
  image: string;
}

interface ManageProductsPageProps {
  productData: {
    products: AdminProduct[];
    currentPage: number;
    totalPages: number;
  };
}

export default function ManageProductsPage({productData}: ManageProductsPageProps) {
    
    const {products:productArr,currentPage,totalPages}=productData;
    
  const [products, setProducts] = useState<AdminProduct[]>(productArr);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Undo/Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<{ type: "delete"; product: AdminProduct } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDeleteProduct = async(id: string) => {
    const res = await deleteProduct(id);
    if(res.deletedCount > 0){
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    }
  };



  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#0E1F2B] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-teal-500/20 text-sm animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#14B8A6] text-white">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="font-medium">{toastMessage}</span>
          
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <Link 
            href="/dashboard/admin" 
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#14B8A6] hover:text-[#0f9488] transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Manage Catalog</h1>
          <p className="text-gray-500 text-sm">Review, filter, or delete active experience offerings on the platform.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, location, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-xs outline-none focus:border-[#14B8A6] bg-white shadow-sm"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="card-base p-12 text-center max-w-md mx-auto space-y-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-400">
            <Package size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base">No Products Found</h3>
            <p className="text-xs text-gray-400 mt-1">Try searching for other keywords.</p>
          </div>
        </div>
      ) : (
        /* Responsive Table */
        <div className="card-base overflow-hidden border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-550 text-[10px] uppercase font-bold tracking-wider">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/30 transition-colors duration-150">
                    
                    {/* Product Name & Short desc */}
                    <td className="py-4 px-6 max-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={product.image} 
                            alt={product.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-gray-900 block truncate">{product.title}</span>
                          <span className="text-gray-400 text-[10px] block truncate">{product.shortDescription}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-[#14B8A6] border border-teal-500/10">
                        {product.category}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6 text-gray-550 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-gray-400 shrink-0" />
                        <span>{product.location}</span>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-6 text-gray-550 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-gray-400 shrink-0" />
                        <span>{product.duration}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 font-extrabold text-gray-900">
                      ${product.price}
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star size={12} fill="currentColor" />
                        <span>{product.rating}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <DeleteConfirmDialog
                        onConfirm={() => handleDeleteProduct(product._id)}
                        title={`Delete "${product.title}"?`}
                        description="This will permanently delete this product from the platform. This action cannot be undone."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <AdminProductPagination currentPage={currentPage} totalPage={totalPages} />
      
    </div>
  );
}
