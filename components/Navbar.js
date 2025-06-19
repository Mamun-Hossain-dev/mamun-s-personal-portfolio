"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { User as UserIcon, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Latest Works", href: "/latest-works" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setProfileOpen(false);
  }, [pathname, user]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 bg-gradient-to-br from-gray-800 to-black backdrop-blur-md z-50 w-full transition-all duration-300 ${
        scrolled
          ? "py-2 bg-gradient-to-br from-gray-900 to-black backdrop-blur-md"
          : "py-4 bg-black"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Hamburger */}
          <div className="flex items-center">
            <button
              className="md:hidden text-white mr-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            <Link href="/" className="btn btn-ghost text-lg md:text-xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-lg">
                  <div className="bg-gray-900 p-2 rounded-md">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                      Tanzil Hossain
                    </h2>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 rounded-lg group shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/15 focus:outline-none"
                  >
                    <UserIcon size={22} />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 p-4 text-gray-800">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold">
                          {user.displayName?.[0] || user.email?.[0] || "U"}
                        </div>
                        <div>
                          <div className="font-semibold">
                            {user.displayName || user.email}
                          </div>
                          <div className="text-xs text-gray-500">{role}</div>
                        </div>
                      </div>
                      {role === "admin" && (
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            router.push("/dashboard");
                          }}
                          className="block w-full text-left px-4 py-2 rounded hover:bg-purple-100 text-purple-700 mb-2"
                        >
                          Admin Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                        }}
                        className="block w-full text-left px-4 py-2 rounded hover:bg-red-100 text-red-700 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/register">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundPosition: "100% 0",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-xl font-medium bg-white/10 border border-white/20 backdrop-blur-lg text-white hover:bg-white/15 transition-all"
                  >
                    Register
                  </motion.button>
                </Link>
                <Link href="/login">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundPosition: "100% 0",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-all duration-500 bg-size-200 hover:bg-right-bottom"
                  >
                    Login
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Auth Button - Visible only on mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl overflow-hidden rounded-xl mt-2"
            >
              <div className="container mx-auto px-4 py-4">
                <ul className="space-y-3 mb-6">
                  {navItems.map((item) => (
                    <motion.li
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-purple-800/40 shadow-lg hover:shadow-xl transition-colors transition-shadow"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {user ? (
                  <div className="px-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-800">
                        {user.displayName?.[0] || user.email?.[0] || "U"}
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {user.displayName || user.email}
                        </div>
                        <div className="text-xs text-gray-400">{role}</div>
                      </div>
                    </div>
                    {role === "admin" && (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          router.push("/dashboard");
                        }}
                        className="block w-full text-left px-4 py-2 rounded hover:bg-purple-100 text-purple-700 mb-2"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                      }}
                      className="block w-full text-left px-4 py-2 rounded hover:bg-red-100 text-red-700 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4 px-4">
                    <Link
                      href="/register"
                      className="flex-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2.5 rounded-lg font-medium bg-white/10 border border-white/20 text-white"
                      >
                        Register
                      </motion.button>
                    </Link>
                    <Link
                      href="/login"
                      className="flex-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2.5 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      >
                        Login
                      </motion.button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
