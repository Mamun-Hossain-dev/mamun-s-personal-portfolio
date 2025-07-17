"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const skills = [
    { name: "HTML & CSS", level: 90 },
    { name: "React JS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "Next JS", level: 75 },
    { name: "TypeScript", level: 70 },
    { name: "UI/UX Design", level: 65 },
  ];

  const stats = [
    { value: 10, label: "Years of experience" },
    { value: 90, label: "Projects completed" },
    { value: 15, label: "Happy clients" },
  ];

  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/theme_pattern.svg"
          alt="pattern-icon"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16 md:gap-20">
        {/* Left: Large Square Image */}
        <div className="flex-1 flex justify-center md:justify-start">
          <div className="hidden md:block relative w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-2xl overflow-hidden border-4 border-purple-500 shadow-2xl">
            <Image
              src="/images/mamun.jpg"
              alt="Mamun Hossain"
              fill
              sizes="(max-width: 1024px) 320px, 400px"
              style={{ objectFit: "cover" }}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex-1 text-center md:text-left">
          {/* Section Title Styled Like My Services */}
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center md:text-left mb-4"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                About Me
              </span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full max-w-md mx-auto md:mx-0"
            />
          </div>
          <p className="text-gray-300 text-lg mb-6">
            Detail-oriented MERN Stack Developer skilled in building scalable,
            responsive apps using React, Next.js, Node.js, and MongoDB. Strong
            grasp of TypeScript, Redux, REST APIs, and secure authentication
            systems. Passionate about clean code, SEO, and performance
            optimization.
          </p>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Redux",
                "Tailwind",
                "Node.js",
                "Express",
                "MongoDB",
                "REST",
                "JWT",
                "Firebase",
                "Git/GitHub",
                "Cloudinary",
                "Clerk",
                "Figma",
                "SEO",
                "Responsive Design",
                "React Hook Form",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats with gradient backgrounds */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <div className="flex flex-col items-center px-6 py-4 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-lg">
              <span className="text-3xl font-bold text-white drop-shadow">
                1+
              </span>
              <span className="text-white text-sm font-medium">
                years of experience
              </span>
            </div>
            <div className="flex flex-col items-center px-6 py-4 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-lg">
              <span className="text-3xl font-bold text-white drop-shadow">
                15+
              </span>
              <span className="text-white text-sm font-medium">
                projects completed
              </span>
            </div>
            <div className="flex flex-col items-center px-6 py-4 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-lg">
              <span className="text-3xl font-bold text-white drop-shadow">
                05+
              </span>
              <span className="text-white text-sm font-medium">
                satisfied clients
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
