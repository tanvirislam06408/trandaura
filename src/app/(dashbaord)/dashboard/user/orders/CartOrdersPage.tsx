"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  CreditCard,
  User,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { addOrders } from "@/lib/actions/orders";
import type { User as UserProfile } from "@/types/user";
import { AlertDialogDestructive } from "@/components/shared/DeleteDaioloug";

export interface CartItem {
  _id: string;
  fruitName: string;
  shortDescription: string;
  price: number;
  origin: string;
  season: string;
  category: string;
  imageUrl: string;
  quantity: number;
}

interface BillingDetails {
  name: string;
  userId: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

const createInitialBilling = (user?: UserProfile): BillingDetails => ({
  name: user?.name ?? "",
  email: user?.email ?? "",
  userId: user?.id ?? "",
  phone: "",
  address: "",
  city: "",
  zip: "",
});

export default function CartOrdersPage({ cartP : cart , user }: { cartP: CartItem[]; user: UserProfile | undefined }) {
  
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");

  const [discountPercent, setDiscountPercent] = useState(0);

  // Checkout form details
  const [billing, setBilling] = useState<BillingDetails>(() => createInitialBilling(user));

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * 1), 0);
  const bookingFee = subtotal > 0 ? 45 : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal + bookingFee - discountAmount;



  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as keyof BillingDetails;

    setBilling((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!billing.name.trim()) errs.name = "Name is required";
    if (!billing.email.trim() || !billing.email.includes("@")) errs.email = "Valid email is required";
    if (!billing.address.trim()) errs.address = "Address is required";
    if (!billing.city.trim()) errs.city = "City is required";


    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };




  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // 1. Generate the Order ID first so you can include it in your data
    const generatedOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);

    // 2. Gather all the data into a single object
    const orderData = {
      orderId: generatedOrderId,
      customerDetails: billing,      // Contains name, email, phone, address, city
      purchasedItems: cart,          // Array of items in the cart
      pricingSummary: {
        subtotal: subtotal,
        bookingFee: bookingFee,
        discountPercent: discountPercent,
        discountAmount: discountAmount,
        totalPaid: total
      },
      orderDate: new Date().toISOString()
    };

    await addOrders(orderData);

    // 3. YOU CAN SEE YOUR DATA HERE!
    // Check your browser console after clicking "Authorize Payment"
    console.log("Final Order Data:", orderData);



    // Simulated processing (Remove this if you use the fetch API above)
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 1800);
  };


  const handleResetCart = () => {
    setStep("cart");
    setDiscountPercent(0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Header & Steps Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <Link
            href="/dashboard/user"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#14B8A6] hover:text-[#0f9488] transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
          <p className="text-gray-500 text-sm">Review your selected fresh fruits and secure delivery.</p>
        </div>

        {/* Step Indicator */}
        {cart.length > 0 && (
          <div className="flex items-center gap-2 self-start md:self-auto bg-gray-50 border border-gray-100 p-1.5 rounded-full text-xs font-bold text-gray-500">
            <span className={`px-3 py-1 rounded-full ${step === "cart" ? "bg-[#14B8A6] text-white" : ""}`}>1. Cart</span>
            <ChevronRight size={12} className="text-gray-300" />
            <span className={`px-3 py-1 rounded-full ${step === "checkout" ? "bg-[#14B8A6] text-white" : ""}`}>2. Checkout</span>
            <ChevronRight size={12} className="text-gray-300" />
            <span className={`px-3 py-1 rounded-full ${step === "success" ? "bg-[#14B8A6] text-white" : ""}`}>3. Confirm</span>
          </div>
        )}
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="card-base p-12 text-center max-w-md mx-auto space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-[#14B8A6] animate-pulse">
            <ShoppingBag size={28} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Your Cart is Empty</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              You haven&apos;t added any fresh organic fruits yet.
            </p>
          </div>
          <Link
            href="/explore"
            className="btn-primary inline-block text-xs font-bold"
          >
            Explore Fruits
          </Link>
        </div>
      ) : step === "cart" ? (
        /* Cart Review Step */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="card-base p-4 flex flex-col sm:flex-row gap-4 items-center border border-gray-100 hover:border-teal-500/10 group"
              >
                {/* Image */}
                <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.fruitName}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Main details */}
                <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[9px] self-center sm:self-start font-extrabold text-[#14B8A6] uppercase tracking-wider bg-teal-55 bg-teal-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm truncate group-hover:text-[#22c55e] transition-colors">{item.fruitName}</h4>
                  <p className="text-xs text-gray-400 truncate">{item.origin} • {item.season}</p>
                </div>

                {/* Quantity Adjusters */}


                {/* Price & Delete */}
                <div className="flex items-center gap-4 shrink-0 justify-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-gray-900">${item.price * 1}</span>
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-gray-400 block">${item.price} each</span>
                    )}
                  </div>
                  
                   
                    <AlertDialogDestructive itemId={item._id}/>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Pricing Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-base p-6 space-y-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 text-base">Order Summary</h3>

              <div className="space-y-3.5 text-sm pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Booking & Service Fees</span>
                  <span className="font-semibold text-gray-900">${bookingFee}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100 text-xs">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-extrabold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-50">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code Input */}


              {/* Checkout CTA */}
              <button
                onClick={() => setStep("checkout")}
                className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg mt-2"
              >
                <CreditCard size={16} /> Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : step === "checkout" ? (
        /* Checkout Forms Step */
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-base p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2">
                <User size={18} className="text-[#14B8A6]" /> Guest Billing & Attendee Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Attendee Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={billing.name}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                    />
                  </div>
                  {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={billing.email}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                    />
                  </div>
                  {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                  <input
                    required
                    type="text"
                    name="phone"

                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Street Address</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      required
                      type="text"
                      name="address"
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                    />
                  </div>
                  {formErrors.address && <p className="text-xs text-red-500">{formErrors.address}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">City</label>
                  <input
                    required
                    type="text"
                    name="city"

                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                  />
                  {formErrors.city && <p className="text-xs text-red-500">{formErrors.city}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="card-base p-6 space-y-5 border border-gray-100">
              <h3 className="font-bold text-gray-800 text-base">Booking Summary</h3>

              <div className="max-h-36 overflow-y-auto space-y-2.5 pr-1">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between text-xs text-gray-600">
                    <span className="truncate max-w-37.5">{item.fruitName} (x{1})</span>
                    <span className="font-bold text-gray-900">${item.price * 1}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3.5 text-sm pt-4 border-t border-gray-100 pb-4">
                <div className="flex justify-between text-gray-500 text-xs">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 text-xs">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Booking & Service Fees</span>
                  <span>${bookingFee}</span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-50">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      Processing order...
                    </>
                  ) : (
                    "Confirm Order"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="btn-outline w-full block text-center cursor-pointer"
                >
                  Back to Review
                </button>
              </div>
            </div>
          </div>
        </form>

      ) : (

        <div className="card-base p-8 md:p-12 text-center max-w-2xl mx-auto border border-emerald-100 bg-emerald-50/10 shadow-lg space-y-8 animate-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Order Confirmed!</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Your payments have been processed successfully. We&apos;ve sent a detailed order receipt to
              <span className="font-semibold text-gray-800"> {billing.email}</span>.
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="card-base bg-white p-6 max-w-md mx-auto border border-gray-100 shadow-sm text-left space-y-4 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-gray-50">
              <div>
                <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Order ID</span>
                <span className="font-bold text-gray-800">{orderId}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Date</span>
                <span className="font-bold text-gray-800">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
              </div>
            </div>

            {/* Items summary */}
            <div className="space-y-2">
              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Ordered Fruits</span>
              {cart.map(item => (
                <div key={item._id} className="flex justify-between text-gray-700 font-medium">
                  <span>{item.fruitName} (x{item.quantity})</span>
                  <span className="font-bold text-gray-900">${item.price * 1}</span>
                </div>
              ))}
            </div>

            {/* Price lines */}
            <div className="space-y-2 pt-3 border-t border-gray-50">
              <div className="flex justify-between text-gray-500 text-[10px]">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 text-[10px]">
                  <span>Promo discount (-{discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500 text-[10px]">
                <span>Service Fee</span>
                <span>${bookingFee}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-100">
                <span>Paid Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Attendee details */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Attendee</span>
              <p className="font-bold text-gray-800 text-[11px]">{billing.name}</p>
              <p className="text-gray-500 text-[10px]">{billing.phone} • {billing.city}, {billing.zip}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Link
              href="/dashboard/user"
              onClick={handleResetCart}
              className="btn-primary w-full sm:w-auto"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={handleResetCart}
              className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
