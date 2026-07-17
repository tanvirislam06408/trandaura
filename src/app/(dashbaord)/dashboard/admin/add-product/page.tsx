"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Plus, 
  Image as ImageIcon, 
  DollarSign, 
  MapPin, 
  Clock, 
  Calendar, 
  Star, 
  Sparkles,
  CheckCircle,
  ShoppingBag
} from "lucide-react";
import { addProduct } from "@/lib/actions/add-product";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    price: "",
    rating: "4.5",
    location: "",
    duration: "",
    category: "Women",
    availableDate: "2026-09-01",
    featured: false,
    image: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<any>(null);

  const categories = ["Women", "Men", "Accessories", "Unisex", "Luggage"];

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
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.shortDescription.trim()) newErrors.shortDescription = "Short description is required";
    if (!formData.description.trim()) newErrors.description = "Full description is required";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Enter a valid positive price";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required (e.g. 2 Days)";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newProduct = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
      };
      const result = await addProduct(newProduct);
      console.log(result);
      
      setCreatedProduct(newProduct);
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      price: "",
      rating: "4.5",
      location: "",
      duration: "",
      category: "Women",
      availableDate: "2026-09-01",
      featured: false,
      image: ""
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Add New Product</h1>
          <p className="text-gray-500 text-sm">List a high-quality fashion tour, workshop, or product experience.</p>
        </div>
      </div>

      {isSuccess && createdProduct ? (
        /* Success Screen */
        <div className="card-base p-8 md:p-12 text-center max-w-2xl mx-auto border border-emerald-100 bg-emerald-50/10 shadow-lg space-y-6 animate-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
            <CheckCircle size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Product Listed Successfully!</h2>
            <p className="text-gray-500 text-sm">
              Your item <span className="font-semibold text-gray-800">"{createdProduct.title}"</span> has been saved in demo state and listed in the catalog.
            </p>
          </div>

          {/* Product Quick View Card */}
          <div className="card-base bg-white p-4 max-w-md mx-auto flex gap-4 text-left border border-gray-100 shadow-sm">
            <div className="relative h-24 w-24 rounded-lg overflow-hidden shrink-0 bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={createdProduct.image} 
                alt={createdProduct.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80";
                }}
              />
            </div>
            <div className="flex-1 space-y-1 min-w-0">
              <span className="inline-block text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded">
                {createdProduct.category}
              </span>
              <h4 className="font-bold text-gray-800 text-sm truncate">{createdProduct.title}</h4>
              <p className="text-xs text-gray-400 truncate">{createdProduct.shortDescription}</p>
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-50">
                <span className="text-sm font-extrabold text-gray-900">${createdProduct.price}</span>
                <span className="text-xs font-semibold text-amber-500 flex items-center gap-0.5">
                  <Star size={12} fill="currentColor" /> {createdProduct.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <button 
              onClick={handleReset}
              className="btn-primary w-full sm:w-auto"
            >
              Add Another Product
            </button>
            <Link 
              href="/dashboard/admin/products"
              className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} /> View My Products
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
                <Sparkles size={18} className="text-[#14B8A6]" /> Core Details
              </h2>
              
              <div className="space-y-5">
                {/* Title */}
                <div className="space-y-1">
                  <label htmlFor="title" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Product/Experience Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Parisian Haute Couture Walk"
                    className={`w-full rounded-xl border ${errors.title ? "border-red-400 bg-red-50/10" : "border-gray-200"} px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                  />
                  {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title}</p>}
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
                    placeholder="e.g. Step into the world of high fashion."
                    className={`w-full rounded-xl border ${errors.shortDescription ? "border-red-400 bg-red-50/10" : "border-gray-200"} px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                  />
                  {errors.shortDescription && <p className="text-xs text-red-500 font-medium">{errors.shortDescription}</p>}
                </div>

                {/* Full Description */}
                <div className="space-y-1">
                  <label htmlFor="description" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Full Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide a detailed breakdown of the experience, schedule, exclusive access points, etc."
                    className={`w-full rounded-xl border ${errors.description ? "border-red-400 bg-red-50/10" : "border-gray-200"} px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 resize-none`}
                  />
                  {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description}</p>}
                </div>
              </div>
            </div>

            {/* Logistics & Attributes */}
            <div className="card-base p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3">Logistics & Attributes</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category */}
                <div className="space-y-1">
                  <label htmlFor="category" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none bg-white transition-all focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
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
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="899"
                      className={`w-full rounded-xl border ${errors.price ? "border-red-400 bg-red-50/10" : "border-gray-200"} pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                    />
                  </div>
                  {errors.price && <p className="text-xs text-red-500 font-medium">{errors.price}</p>}
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label htmlFor="location" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Paris, France"
                      className={`w-full rounded-xl border ${errors.location ? "border-red-400 bg-red-50/10" : "border-gray-200"} pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                    />
                  </div>
                  {errors.location && <p className="text-xs text-red-500 font-medium">{errors.location}</p>}
                </div>

                {/* Duration */}
                <div className="space-y-1">
                  <label htmlFor="duration" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Duration
                  </label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g. 2 Days"
                      className={`w-full rounded-xl border ${errors.duration ? "border-red-400 bg-red-50/10" : "border-gray-200"} pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                    />
                  </div>
                  {errors.duration && <p className="text-xs text-red-500 font-medium">{errors.duration}</p>}
                </div>

                {/* Available Date */}
                <div className="space-y-1">
                  <label htmlFor="availableDate" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Available Date
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      id="availableDate"
                      name="availableDate"
                      value={formData.availableDate}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none transition-all focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 bg-white"
                    />
                  </div>
                </div>

                {/* Mock Rating Setting */}
                <div className="space-y-1">
                  <label htmlFor="rating" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                    Mock Starting Rating
                  </label>
                  <div className="relative">
                    <Star size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="5.0"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none transition-all focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Media & Side Config */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Preview & URL */}
            <div className="card-base p-6 space-y-5">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2">
                <ImageIcon size={18} className="text-[#14B8A6]" /> Product Image
              </h2>

              {/* URL input */}
              <div className="space-y-1">
                <label htmlFor="image" className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://unsplash.com/..."
                  className={`w-full rounded-xl border ${errors.image ? "border-red-400 bg-red-50/10" : "border-gray-200"} px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10`}
                />
                
              </div>

              {/* Preview image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                {formData.image.trim() ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={formData.image} 
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

            {/* Feature configuration & submit */}
            <div className="card-base p-6 space-y-6">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-800">Featured Listing</h4>
                  <p className="text-[10px] text-gray-400">Display prominently on explore page</p>
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

              {/* Submit / Cancel Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      Saving Listing...
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> Publish Listing
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
