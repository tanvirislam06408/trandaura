"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
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
  const { data: session } =  authClient.useSession();
  const router = useRouter(); // only used for push after sign-out

  const role = (session?.user && "role" in session.user ? session.user.role : null) ?? "user";

  const PUBLIC_ROUTES = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Categories", href: "/categories" },
    { label: "dashboard", href: `/dashboard/${role}` },
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

  // ⚠️  Do NOT call router.refresh() here — it re-renders the entire layout
  //     tree and causes the navbar to visibly flash/remount.
  //     authClient.useSession() is reactive and updates automatically.
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
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : ""
        }`}
    >
      <div className="mx-auto flex h-16 container items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
       <Logo/>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {PUBLIC_ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm font-medium text-gray-700 transition hover:text-[#22c55e]"
            >
              {route.label}
            </Link>
          ))}
        </div>


        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">

          <Link
            href={`/dashboard/${role}/orders`}
            className="relative rounded-full p-2 text-[#0E1F2B] hover:bg-gray-100"
          >
            <FiShoppingCart size={22} />
          </Link>

          {session?.user ? (
           <DropdownMenuAvatar user={session?.user} />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2 text-sm font-medium text-[#0E1F2B] hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#22c55e] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#16a34a]"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-[#0E1F2B] md:hidden"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

      </div>


      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white px-4 py-5 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">

          <div className="flex flex-col gap-3">

            {PUBLIC_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {route.label}
              </Link>
            ))}


            <div className="mt-3 border-t pt-4 flex flex-col gap-3">

              <Link
                href={`/dashboard/${role}/orders`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border py-2 text-gray-700 hover:bg-gray-50"
              >
                <FiShoppingCart />
                Cart
              </Link>

              {session?.user ? (
                <>
                  <UserAvater user={session.user}/>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full py-2 text-center hover:bg-gray-100 border border-gray-200 text-gray-700"
                  >
                    Login
                  </Link>


                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-[#22c55e] py-2 text-center text-white font-semibold"
                  >
                    Sign Up
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