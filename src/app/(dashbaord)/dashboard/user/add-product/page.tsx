"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  Package,
  Leaf,
  Star,
  Sparkles,
  CheckCircle,
  ShoppingBag,
  Hash,
  Apple,
} from "lucide-react";
import { addProduct } from "@/lib/actions/add-product";
import { authClient } from "@/lib/auth-client";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    fruitName: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    unit: "kg",
    category: "Tropical",
    season: "Summer",
    origin: "",
    stockQuantity: "",
    featured: false,
    imageUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<any>(null);

  const categories = ["Tropical", "Citrus", "Berries", "Stone Fruits", "Exotic", "Organic", "Seasonal"];
  const units = ["kg", "piece", "dozen", "box", "bag"];
  const seasons = ["Summer", "Winter", "Spring", "Autumn", "All Season"];

  const { data: session } = authClient.useSession()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fruitName.trim()) newErrors.fruitName = "Fruit name is required";
    if (!formData.shortDescription.trim()) newErrors.shortDescription = "Short description is required";
    if (!formData.fullDescription.trim()) newErrors.fullDescription = "Full description is required";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Enter a valid positive price";
    if (!formData.origin.trim()) newErrors.origin = "Origin is required";
    if (!formData.stockQuantity || Number(formData.stockQuantity) < 0) newErrors.stockQuantity = "Enter valid stock quantity";
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newProduct = {
        fruitName: formData.fruitName,
        sellerId : session?.user.id,
        shortDescription: formData.shortDescription,
        description: formData.fullDescription,
        price: Number(formData.price),
        unit: formData.unit,
        category: formData.category,
        season: formData.season,
        origin: formData.origin,
        stockQuantity: Number(formData.stockQuantity),
        featured: formData.featured,
        imageUrl: formData.imageUrl,
        rating: 4.5,
        location: formData.origin,
        duration: "",
        availableDate: "",
        nutritionInfo: "",
        image: formData.imageUrl,
      };
      const result = await addProduct(newProduct);
      console.log(result);

      setCreatedProduct({ ...formData, price: Number(formData.price), stockQuantity: Number(formData.stockQuantity) });
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fruitName: "",
      shortDescription: "",
      fullDescription: "",
      price: "",
      unit: "kg",
      category: "Tropical",
      season: "Summer",
      origin: "",
      stockQuantity: "",
      featured: false,
      imageUrl: "",
    });
    setErrors({});
    setIsSuccess(false);
    setCreatedProduct(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <Link
            href="/dashboard/user"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#14B8A6] hover:text-[#0f9488] transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Add New Fruit</h1>
          <p className="text-gray-500 text-sm">List a fresh fruit product for your customers.</p>
        </div>
      </div>

      {isSuccess && createdProduct ? (
        /* Success Screen */
        <div className="card-base p-8 md:p-12 text-center max-w-2xl mx-auto border border-emerald-100 bg-emerald-50/10 shadow-lg space-y-6 animate-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
            <CheckCircle size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Fruit Listed Successfully!</h2>
            <p className="text-gray-500 text-sm">
              Your fruit <span className="font-semibold text-gray-800">&quot;{createdProduct.fruitName}&quot;</span> has been saved and listed in the catalog.
            </p>
          </div>

          {/* Product Quick View Card */}
          <div className="card-base bg-white p-4 max-w-md mx-auto flex gap-4 text-left border border-gray-100 shadow-sm">
            <div className="relative h-24 w-24 rounded-lg overflow-hidden shrink-0 bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={createdProduct.imageUrl}
                alt={createdProduct.fruitName}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80";
                }}
              />
            </div>
            <div className="flex-1 space-y-1 min-w-0">
              <span className="inline-block text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded">
                {createdProduct.category}
              </span>
              <h4 className="font-bold text-gray-800 text-sm truncate">{createdProduct.fruitName}</h4>
              <p className="text-xs text-gray-400 truncate">{createdProduct.shortDescription}</p>
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-50">
                <span className="text-sm font-extrabold text-gray-900">${createdProduct.price} <span className="text-xs font-normal text-gray-500">/ {createdProduct.unit}</span></span>
                <span className="text-xs font-semibold text-amber-500 flex items-center gap-0.5">
                  <Leaf size={12} /> {createdProduct.season}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <button
              onClick={handleReset}
              className="btn-primary w-full sm:w-auto"
            >
              Add Another Fruit
            </button>
            <Link
              href="/explore"
              className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} /> View Catalog
            </Link>
          </div>
        </div>
      ) : (
        /* Form Screen */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-base p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-[#14B8A6]" /> Fruit Details
              </h2>

              <div className="space-y-5">
                {/* Fruit Name */}
                <div className="space-y-1">
                  <label htmlFor="fruitName" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Fruit Name
                  </label>
                  <div className="relative">
                    <Apple size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="fruitName"
                      name="fruitName"
                      value={formData.fruitName}
                      onChange={handleInputChange}
                      placeholder="e.g. Organic Alphonso Mango"
                      className={`w-full rounded-xl border ${errors.fruitName ? "border-red-400 bg-red-50/10" : "border-gray-200"} pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                    />
                  </div>
                  {errors.fruitName && <p className="text-xs text-red-500 font-medium">{errors.fruitName}</p>}
                </div>

                {/* Short Description */}
                <div className="space-y-1">
                  <label htmlFor="shortDescription" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Short Description
                  </label>
                  <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="e.g. Premium sweet mango harvested from certified organic farms."
                    className={`w-full rounded-xl border ${errors.shortDescription ? "border-red-400 bg-red-50/10" : "border-gray-200"} px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                  />
                  {errors.shortDescription && <p className="text-xs text-red-500 font-medium">{errors.shortDescription}</p>}
                </div>

                {/* Full Description */}
                <div className="space-y-1">
                  <label htmlFor="fullDescription" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Full Description
                  </label>
                  <textarea
                    id="fullDescription"
                    name="fullDescription"
                    rows={5}
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    placeholder="Provide details about the fruit's taste, growing process, nutritional benefits, and ideal uses."
                    className={`w-full rounded-xl border ${errors.fullDescription ? "border-red-400 bg-red-50/10" : "border-gray-200"} px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 resize-none`}
                  />
                  {errors.fullDescription && <p className="text-xs text-red-500 font-medium">{errors.fullDescription}</p>}
                </div>
              </div>
            </div>

            {/* Product Attributes */}
            <div className="card-base p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3">Product Attributes</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category */}
                <div className="space-y-1">
                  <label htmlFor="category" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Category
                  </label>
                  <div className="relative">
                    <Leaf size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none bg-white transition-all focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Season */}
                <div className="space-y-1">
                  <label htmlFor="season" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Season
                  </label>
                  <div className="relative">
                    <Star size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      id="season"
                      name="season"
                      value={formData.season}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none bg-white transition-all focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                    >
                      {seasons.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label htmlFor="price" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Price (USD)
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="8.99"
                      className={`w-full rounded-xl border ${errors.price ? "border-red-400 bg-red-50/10" : "border-gray-200"} pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                    />
                  </div>
                  {errors.price && <p className="text-xs text-red-500 font-medium">{errors.price}</p>}
                </div>

                {/* Unit */}
                <div className="space-y-1">
                  <label htmlFor="unit" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Unit
                  </label>
                  <div className="relative">
                    <Package size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      id="unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none bg-white transition-all focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                    >
                      {units.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Origin */}
                <div className="space-y-1">
                  <label htmlFor="origin" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Origin
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="origin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajshahi, Bangladesh"
                      className={`w-full rounded-xl border ${errors.origin ? "border-red-400 bg-red-50/10" : "border-gray-200"} pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                    />
                  </div>
                  {errors.origin && <p className="text-xs text-red-500 font-medium">{errors.origin}</p>}
                </div>

                {/* Stock Quantity */}
                <div className="space-y-1">
                  <label htmlFor="stockQuantity" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Stock Quantity
                  </label>
                  <div className="relative">
                    <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      id="stockQuantity"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                      placeholder="120"
                      className={`w-full rounded-xl border ${errors.stockQuantity ? "border-red-400 bg-red-50/10" : "border-gray-200"} pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                    />
                  </div>
                  {errors.stockQuantity && <p className="text-xs text-red-500 font-medium">{errors.stockQuantity}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Image & Submit */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Preview & URL */}
            <div className="card-base p-6 space-y-5">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2">
                <ImageIcon size={18} className="text-[#14B8A6]" /> Product Image
              </h2>

              <div className="space-y-1">
                <label htmlFor="imageUrl" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/..."
                  className={`w-full rounded-xl border ${errors.imageUrl ? "border-red-400 bg-red-50/10" : "border-gray-200"} px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                />
              </div>

              {/* Preview image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                {formData.imageUrl.trim() ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover animate-in fade-in duration-300"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2 text-gray-400">
                    <ImageIcon size={32} className="mx-auto" />
                    <p className="text-xs font-semibold">No Image Selected</p>
                  </div>
                )}
              </div>
            </div>

            {/* Feature & Submit */}
            <div className="card-base p-6 space-y-6">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-800">Featured Listing</h4>
                  <p className="text-[10px] text-gray-400">Display prominently on the home page</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#14B8A6]"></div>
                </label>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      Saving Fruit...
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> Publish Fruit
                    </>
                  )}
                </button>

                <Link
                  href="/dashboard/user"
                  className="btn-outline w-full block text-center cursor-pointer"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
