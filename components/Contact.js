"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  Briefcase,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  // Web3Forms access key
  const WEB3FORMS_ACCESS_KEY = "9225e9ec-e066-43d4-8cfb-7dac8c1a57f5";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", WEB3FORMS_ACCESS_KEY);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("service", formData.service || "Not specified");
      formDataToSend.append("message", formData.description);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: "Thank you for your message! We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          service: "",
          description: "",
        });
      } else {
        setMessage({
          type: "error",
          text: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage({
        type: "error",
        text: "Failed to send message. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61575251046929",
      label: "Facebook",
      color: "hover:text-blue-500",
    },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
    {
      icon: Instagram,
      href: "https://www.instagram.com/upskilldigitalagency/?igsh=cXNrN2UyZnBkbXhp#",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/upskill-it-institute-digital-agency/posts/?feedView=all",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="text-purple-400" size={24} />,
      title: "Email Us",
      detail: "Tanjildigital@gmail.com",
      href: "mailto:Tanjildigital@gmail.com",
    },
    {
      icon: (
        <img
          src="/images/call_icon.svg"
          alt="call icon"
          className="w-6 h-6 inline"
        />
      ),
      title: "Call Us",
      detail: "+8801948873556",
      href: "tel:+8801948873556",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <section
      id="connect"
      className="pt-10 pb-20 bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section title */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Contact With Me
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

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Lets Start a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Conversation
                </span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Ready to discuss your project? Fill out the form and Ill get
                back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="hover:scale-[1.02] transition-all duration-200"
                >
                  <ContactItem {...contact} />
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={social.href}
                      aria-label={social.label}
                      className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300`}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:scale-[1.02] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{schedule.day}</span>
                    <span>{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8 lg:p-10 transition-all duration-300"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <AnimatedInputField
                  icon={<User size={18} className="text-gray-400" />}
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  error={errors.name}
                  required
                />
              </div>

              <div>
                <AnimatedInputField
                  icon={<Mail size={18} className="text-gray-400" />}
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  error={errors.email}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Service Interest{" "}
                  <span className="text-gray-500 ml-1">(Optional)</span>
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none text-white transition-all duration-200"
                  >
                    <option value="" className="bg-gray-800">
                      Select a service (optional)
                    </option>
                    <option value="facebook-marketing" className="bg-gray-800">
                      Facebook Marketing
                    </option>
                    <option value="google-marketing" className="bg-gray-800">
                      Google Marketing
                    </option>
                    <option value="web-analytics" className="bg-gray-800">
                      Web Analytics
                    </option>
                    <option
                      value="social-media-marketing"
                      className="bg-gray-800"
                    >
                      Social Media Marketing
                    </option>
                  </select>
                  <Briefcase
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Description <span className="text-purple-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-white transition-all duration-200 ${
                      errors.description
                        ? "border-red-500/50"
                        : "border-gray-600"
                    }`}
                    placeholder="Tell me about your project, requirements, or questions..."
                  />
                  <MessageSquare
                    className="absolute left-3 top-4 text-gray-400"
                    size={18}
                  />
                </div>
                {errors.description && (
                  <p className="text-sm text-red-400 animate-fadeIn">
                    {errors.description}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  The more details you provide, the better I can assist you.
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                    <span>Send Message</span>
                  </div>
                )}
              </motion.button>
            </form>

            {/* Success/Error Message */}
            {message.text && (
              <div
                className={`mt-6 text-center text-base font-medium ${
                  message.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message.text}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sub-components
const AnimatedInputField = ({
  icon,
  label,
  optional,
  error,
  required,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-purple-500">*</span>}
        {optional && <span className="text-gray-500 ml-1">(Optional)</span>}
      </label>
      <motion.div className="relative" whileHover={{ scale: 1.02 }}>
        <input
          className={`w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-200 ${
            error ? "border-red-500/50" : "border-gray-600"
          }`}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </motion.div>
      {error && <p className="text-sm text-red-400 animate-fadeIn">{error}</p>}
    </div>
  );
};

const ContactItem = ({ icon, title, detail, href }) => {
  const content = (
    <motion.div
      className="flex items-start space-x-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-200"
      whileHover={{ y: -5 }}
    >
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-gray-300 mt-1">{detail}</p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export default ContactSection;
