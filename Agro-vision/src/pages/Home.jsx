import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Challenge from "../components/Challenge";
import Solution from "../components/Solution";
import ImageSlide from "../components/ImageSlide";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="w-full bg-[#F1F0E9] px-4 md:px-10 py-4 flex flex-col gap-4">
        <Navbar />
        <Hero />
        <Challenge />
        <Solution />
        <ImageSlide />
      </div>
      <Footer />
    </>
  );
}

export default Home;
