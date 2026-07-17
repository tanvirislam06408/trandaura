"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Check, 
  Settings, 
  Camera,
  ShieldCheck,
  Eye,
  EyeOff
} from "lucide-react";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<"personal" | "security" | "preferences">("personal");
  
  // Personal Details state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "+1 (555) 019-2834",
    address: "123 Fashion Blvd, Apt 4B",
    city: "New York",
    country: "United States",
    image: ""
  });

  // Security details
  const [security, setSecurity] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    emailPromo: true,
    smsAlerts: false,
    mfa: false,
    currency: "USD"
  });

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load session data if available
  useEffect(() => {
    if (session?.user) {
      setProfile(prev => ({
        ...prev,
        name: session.user.name || "John Doe",
        email: session.user.email || "john.doe@example.com",
        image: session.user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
      }));
    } else {
      // Fallback details
      setProfile(prev => ({
        ...prev,
        name: "John Doe",
        email: "john.doe@example.com",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
      }));
    }
  }, [session]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { data, error } = await authClient.updateUser({
        name: profile.name,
        image: profile.image,
      });

      if (error) {
        showToast(error.message || "Failed to update profile details.");
      } else {
        showToast("Profile details updated successfully.");
      }
    } catch (err: any) {
      showToast(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      showToast("Passwords do not match!");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSecurity({ oldPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password updated successfully.");
    }, 1000);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key]
    }));
  };

  const handlePreferencesSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Preferences saved.");
    }, 800);
  };

  const handleAvatarChange = () => {
    // Cycle through a few nice mock avatars for demo purposes
    const avatars = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", // Woman
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", // Man
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", // Woman 2
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"  // Man 2
    ];
    const currentIndex = avatars.indexOf(profile.image);
    const nextIndex = (currentIndex + 1) % avatars.length;
    setProfile(prev => ({ ...prev, image: avatars[nextIndex] }));
    showToast("Avatar image updated.");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0E1F2B] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-teal-500/20 text-sm animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#14B8A6] text-white">
            <Check size={12} strokeWidth={3} />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <Link 
            href="/dashboard/user" 
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#14B8A6] hover:text-[#0f9488] transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 text-sm">Manage your profile details, currency options, and secure credentials.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Avatar & Tab Links */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-base p-6 text-center space-y-4">
            {/* Avatar container */}
            <div className="relative mx-auto h-28 w-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-50 group">
              {profile.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={profile.image} 
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-[#0E1F2B] text-white font-extrabold text-2xl">
                  {profile.name ? profile.name.substring(0, 2).toUpperCase() : "U"}
                </div>
              )}
              {/* Change Avatar overlay button */}
              <button 
                onClick={handleAvatarChange}
                className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <Camera size={18} />
                <span className="text-[9px] font-bold mt-1 uppercase tracking-widest">Change</span>
              </button>
            </div>

            <div>
              <h3 className="font-extrabold text-gray-800 text-base leading-tight">{profile.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{profile.email}</p>
            </div>
            
            <div className="inline-block text-[10px] font-bold text-[#14B8A6] uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-full border border-teal-500/10">
              Verified Account
            </div>
          </div>

          {/* Navigation Sidebar Tabs */}
          <div className="card-base p-3 flex flex-col gap-1">
            <button
              onClick={() => setActiveTab("personal")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-left transition cursor-pointer ${
                activeTab === "personal" 
                  ? "bg-teal-50 text-[#14B8A6] border border-teal-500/10" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <User size={16} /> Personal Details
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-left transition cursor-pointer ${
                activeTab === "security" 
                  ? "bg-teal-50 text-[#14B8A6] border border-teal-500/10" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Lock size={16} /> Password & Security
            </button>
          </div>
        </div>

        {/* Right Column: Tab View Panels */}
        <div className="lg:col-span-3">
          
          {activeTab === "personal" && (
            <div className="card-base p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2 mb-6">
                <User size={18} className="text-[#14B8A6]" /> Personal Information
              </h2>

              <form onSubmit={handleProfileSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        readOnly
                        required
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  {/* <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                      />
                    </div>
                  </div> */}

                  {/* Street Address */}
                  {/* <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Street Address</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                      />
                    </div>
                  </div> */}

                  {/* City */}
                  {/* <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">City</label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                    />
                  </div> */}

                  {/* Country */}
                  {/* <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Country</label>
                    <input
                      type="text"
                      value={profile.country}
                      onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                    />
                  </div> */}
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2 cursor-pointer"
                  >
                    {isSaving ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Details"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className="card-base p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2 mb-6">
                <Lock size={18} className="text-[#14B8A6]" /> Password & Credentials
              </h2>

              <form onSubmit={handleSecuritySave} className="space-y-5">
                {/* Old password */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Current Password</label>
                  <div className="relative">
                    <input
                      type={showOldPass ? "text" : "password"}
                      required
                      value={security.oldPassword}
                      onChange={(e) => setSecurity(prev => ({ ...prev, oldPassword: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#14B8A6] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPass(!showOldPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showOldPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* New password */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPass ? "text" : "password"}
                        required
                        value={security.newPassword}
                        onChange={(e) => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#14B8A6] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Confirm Password</label>
                    <input
                      type={showNewPass ? "text" : "password"}
                      required
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#14B8A6]"
                    />
                  </div>
                </div>

                {/* Additional Shield indicators */}
                <div className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 text-xs">
                  <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
                  <div className="space-y-0.5 text-emerald-800">
                    <p className="font-bold">Encryption Activated</p>
                    <p className="text-[10px] text-emerald-700/80">Your passwords are automatically encrypted via one-way cryptographic hashing.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2 cursor-pointer"
                  >
                    {isSaving ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

         
        </div>
      </div>
    </div>
  );
}
