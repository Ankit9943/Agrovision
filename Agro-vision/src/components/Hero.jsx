import React from "react";
import { motion } from "motion/react";

function Hero() {
  return (
    <div className="relative font-[poppins] rounded-lg">
      <div className="w-full h-150 rounded-lg relative">
        <img
          src="https://images.unsplash.com/photo-1623377688443-13afeda6aa8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-lg"></div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            delay: 0.5,
          },
        }}
        className="flex flex-col gap-3 items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4"
      >
        <h1 className="text-4xl md:text-8xl text-center font-bold text-white">
          TEAM AGROVISION
        </h1>
        <span className="text-center font-medium text-2xl md:text-4xl text-white">
          PRESENTS
        </span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.7 },
          }}
          className="text-lg md:text-2xl text-white max-w-3xl bg-white/10 backdrop-blur-md px-6  rounded-lg shadow-lg font-medium leading-relaxed border-l-4 border-green-400 text-left"
        >
          🌱{" "}
          <span className="font-semibold text-green-300">
            Empowering Farmers
          </span>{" "}
          with AI-driven insights for{" "}
          <span className="text-green-200">smart irrigation</span>,
          <span className="text-green-200"> soil health</span>, and{" "}
          <span className="text-green-200">sustainable agriculture</span>.
          Optimize water usage, monitor crops, and receive real-time
          recommendations to boost productivity. 🚜✨
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Hero;
