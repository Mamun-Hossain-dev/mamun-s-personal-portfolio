"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Frontend Development",
      description:
        "Build responsive, high-performance UIs with React, Next.js, TypeScript, Redux, and Tailwind. Focus on clean code, SEO, and accessibility.",
    },
    {
      number: "02",
      title: "Backend & API Development",
      description:
        "Develop robust REST APIs and secure authentication systems using Node.js, Express, MongoDB, and JWT.",
    },
    {
      number: "03",
      title: "Full Stack MERN Solutions",
      description:
        "Deliver end-to-end scalable web applications using the MERN stack, integrating modern tools like Firebase, Cloudinary, and Clerk.",
    },
    {
      number: "04",
      title: "UI/UX & Prototyping",
      description:
        "Design and prototype user interfaces in Figma, ensuring pixel-perfect, user-friendly, and accessible experiences.",
    },
    {
      number: "05",
      title: "Performance & SEO Optimization",
      description:
        "Optimize web apps for speed, SEO, and best practices, ensuring top performance and discoverability.",
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="flex flex-col items-center mb-16 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              My Services
            </span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full max-w-md"
          />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-purple-500/20 transition-all"
              whileHover={{ y: -10 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {service.number}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => {
              window.location.href = "/contact";
            }}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-all duration-500 bg-size-200 hover:bg-right-bottom hover:shadow-xl hover:shadow-purple-500/30"
          >
            <span>Get in Touch</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
