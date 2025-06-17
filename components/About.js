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
      className="py-24 bg-gradient-to-b from-gray-900 to-gray-950"
    >
      <div className="container mx-auto px-4">
        {/* Section title with more space above */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
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
            className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full max-w-md"
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile image - larger and centered on large devices */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden w-full lg:w-1/2 lg:flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <Image
                  src="/images/Tanzilhossain.jpg"
                  alt="Alex Bennett - Frontend Developer"
                  layout="fill"
                  objectFit="cover"
                  className="transform transition duration-500 hover:scale-105 rounded-xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-6 text-white"
            >
              Frontend Developer & UI/UX Enthusiast
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 text-gray-300 text-lg"
            >
              <p>
                I am an experienced Frontend Developer with over a decade of
                professional expertise in the field. Throughout my career, I
                have had the privilege of collaborating with prestigious
                organizations, contributing to their success and growth.
              </p>
              <p>
                My passion for frontend development is not only reflected in my
                extensive experience but also in the enthusiasm and dedication I
                bring to each project. I specialize in creating responsive,
                accessible, and performant web applications.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              viewport={{ once: true }}
              className="mt-12 space-y-6"
            >
              <h4 className="text-xl font-bold text-white">
                My Technical Skills
              </h4>

              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-200">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 * index + 1.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 * index + 1.7 }}
                  viewport={{ once: true }}
                  className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
                >
                  {stat.value}+
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 * index + 1.9 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-300 mt-2"
                >
                  {stat.label}
                </motion.span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
