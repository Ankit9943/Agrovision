import React from "react";

function Hero() {
  return (
    <div className="w-full h-screen relative font-[poppins]">
      <div className="bg-red-500 w-full h-[80%] rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1623377688443-13afeda6aa8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-3 items-center justify-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg">
        <h1 className="text-8xl text-center font-bold text-white">
          TEAM AGROVISION
        </h1>
        <span className="text-center font-medium text-4xl text-white">
          PRESENTS
        </span>
      </div>
    </div>
  );
}

export default Hero;
