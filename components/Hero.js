"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, memo } from "react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floatingVariants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundPosition: "100% 0",
    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)",
  },
  tap: { scale: 0.98 },
};

const Hero = memo(() => {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: "smooth",
    });
  }, []);

  const handleConnectClick = useCallback(() => {
    scrollToSection("connect");
  }, [scrollToSection]);

  const handleResumeClick = useCallback(() => {
    window.open("/resume.pdf", "_blank");
  }, []);

  return (
    <motion.section
      id="home"
      className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-900 to-gray-950"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Simplified background elements - fixed positioning */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                  Im Alex Bennett,
                </span>
                <span className="block mt-2 text-white">
                  Frontend Developer
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
              variants={itemVariants}
            >
              Crafting beautiful, responsive web experiences with React and
              modern JavaScript. Based in California, USA.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleConnectClick}
                className="px-8 py-3.5 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-all duration-500 bg-size-200 hover:bg-right-bottom"
                aria-label="Connect with Alex Bennett"
              >
                Connect with me
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeClick}
                className="px-8 py-3.5 rounded-xl font-medium bg-white/10 border border-white/20 backdrop-blur-lg text-white hover:bg-white/15 transition-all"
                aria-label="View Alex Bennett's resume"
              >
                View Resume
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-14 flex justify-center lg:justify-start space-x-8"
              variants={itemVariants}
            >
              {["Microsoft", "Tesla", "Apple"].map((company) => (
                <div key={company} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-gray-300 font-medium">{company}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image container - simplified without moving elements */}
          <motion.div
            className="relative lg:w-1/2 flex justify-center"
            variants={floatingVariants}
            animate="float"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Profile image with subtle border */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src={"/images/Tanzilhossain.jpg"}
                    alt="Alex Bennett - Frontend Developer"
                    layout="fill"
                    objectFit="cover"
                    className="scale-105"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
          transition: {
            delay: 1.5,
            duration: 2,
            repeat: Infinity,
          },
        }}
      >
        <div className="w-1 h-10 bg-gradient-to-b from-purple-500 to-transparent rounded-full mb-2"></div>
        <span className="text-sm text-gray-400">Scroll down</span>
      </motion.div>
    </motion.section>
  );
});

Hero.displayName = "Hero";

export default Hero;
