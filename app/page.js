import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto min-h-screen bg-gray-900">
      {/* navbar section */}
      <Navbar />

      {/* Hero section */}
      <Hero />

      {/* about section */}
      <About />

      {/* services section */}
      <Services />

      {/* footer section */}
      <Footer />
    </div>
  );
};

export default page;
