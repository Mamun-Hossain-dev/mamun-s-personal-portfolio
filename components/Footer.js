"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Github,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Facebook size={24} />,
      url: "https://www.facebook.com/mamun.hossain.565330",
      label: "Facebook",
    },
    {
      icon: <Linkedin size={24} />,
      url: "https://www.linkedin.com/in/mamun-hossain-3a568b248/",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={24} />,
      url: "#",
      label: "Twitter",
    },
    {
      icon: <Github size={24} />,
      url: "https://github.com/Mamun128169",
      label: "Github",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={20} className="inline-block mr-2" />,
      text: "mamundev1281@gmail.com",
    },
    {
      icon: <Phone size={20} className="inline-block mr-2" />,
      text: "+880 1640-571091",
    },
    {
      icon: <MapPin size={20} className="inline-block mr-2" />,
      text: "Dhaka, Bangladesh",
    },
  ];

  const footerLinks = [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <motion.footer
      className="bg-gradient-to-b from-gray-900 to-black pt-20 pb-10 border-t border-gray-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div>
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-lg inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gray-900 p-2 rounded-md">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  Mamun Hossain
                </h2>
              </div>
            </motion.div>
            <p className="mt-4 text-gray-400 max-w-xs">
              I&apos;m a full stack JavaScript developer based in Bangladesh,
              specializing in building modern, secure, and scalable web
              applications.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-gradient-to-r from-purple-600 to-pink-600 transition-all"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="text-white">{social.icon}</div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.2 }}
                >
                  <div className="text-purple-500 mt-0.5">{contact.icon}</div>
                  <span className="text-gray-400">{contact.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="my-10 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2024 Mamun Hossain. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Term of Services
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/contact"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Connect with me
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none" />
    </motion.footer>
  );
};

export default Footer;
