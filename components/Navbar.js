"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Me", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Latest Works", href: "#latest" },
    { name: "Contact", href: "#connect" },
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section with offset for fixed navbar
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 80; // navbar height
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // Handle link click for mobile menu
  const handleLinkClick = (href) => {
    setIsMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "py-2 bg-gray-900/80 backdrop-blur-md"
          : "py-4 bg-transparent"
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
                      Alex Bennett
                    </h2>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <div className="flex items-center space-x-1 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="relative px-4 py-2 rounded-lg group"
                >
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Connect Button */}
          <div className="hidden md:block">
            <a
              href="#connect"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#connect");
              }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundPosition: "100% 0",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-all duration-500 bg-size-200 hover:bg-right-bottom"
              >
                Connect With Me
              </motion.button>
            </a>
          </div>

          {/* Mobile Connect Button */}
          <div className="md:hidden">
            <a
              href="#connect"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#connect");
              }}
            >
              <button className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                Connect
              </button>
            </a>
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
              className="md:hidden bg-gray-900/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <ul className="space-y-3">
                  {navItems.map((item) => (
                    <motion.li
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(item.href);
                        }}
                        className="block px-4 py-3 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
