import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* navbar section */}
      {/* <Navbar /> */}

      {/* Hero section */}
      <Hero />

      {/* about section */}
      <About />

      {/* services section */}
      <Services />

      {/* footer section */}
      {/* <Footer /> */}
    </div>
  );
};

export default page;
