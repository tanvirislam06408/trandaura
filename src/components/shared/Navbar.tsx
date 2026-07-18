"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiSearch } from "react-icons/fi";
import { BadgeCheckIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuAvatar } from "./UserDropDown";
import Logo from "./Logo";
import UserAvater from "./UserAvater";

const getInitials = (name?: string | null) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const role =
    (session?.user && "role" in session.user ? session.user.role : null) ??
    "user";

  const PUBLIC_ROUTES = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Categories", href: "/categories" },
    { label: "Dashboard", href: `/dashboard/${role}` },
    { label: "About", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg shadow-green-500/5"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />

      <div className="mx-auto flex h-16 container items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex items-center gap-1">
          {PUBLIC_ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="relative px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-green-600 group"
            >
              {route.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-3/4 rounded-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Search Button */}
          <button className="relative rounded-full p-2.5 text-gray-500 transition-colors hover:bg-green-50 hover:text-green-600">
            <FiSearch size={18} />
          </button>

          {/* Cart */}
          <Link
            href={`/dashboard/${role}/orders`}
            className="relative rounded-full p-2.5 text-gray-500 transition-colors hover:bg-green-50 hover:text-green-600"
          >
            <FiShoppingCart size={18} />
          </Link>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 mx-1" />

          {session?.user ? (
            <DropdownMenuAvatar user={session?.user} />
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-green-500/25 transition-all hover:shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full p-2 text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600 lg:hidden"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-green-100 bg-white lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="container px-4 py-4 space-y-1">
            {/* Navigation Links */}
            {PUBLIC_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600"
              >
                {route.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="h-px bg-gray-100 my-3" />

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href={`/dashboard/${role}/orders`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-green-200 hover:bg-green-50"
              >
                <FiShoppingCart size={18} />
                Cart
              </Link>

              {session?.user ? (
                <div className="pt-2">
                  <UserAvater user={session.user} />
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-600 transition-colors hover:border-green-200 hover:bg-green-50"
                  >
                    Log in
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-green-500/25"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
