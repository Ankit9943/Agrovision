import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Challenge from "../components/challenge";

function Home() {
  return (
    <div className="w-full  bg-[#F1F0E9] px-10 py-4 flex flex-col gap-4">
      <Navbar />
      <Hero />
      <Challenge />
    </div>
  );
}

export default Home;
