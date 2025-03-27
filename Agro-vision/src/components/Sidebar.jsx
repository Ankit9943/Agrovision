import React from "react";
import { motion } from "motion/react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";

function Sidebar({ isOpen, handleClick }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{
        duration: 0.3,
        type: "spring",
        damping: 30,
      }}
      className="fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 h-screen bg-zinc-800 z-20 flex flex-col justify-center items-center text-white"
    >
      <button
        onClick={handleClick}
        className="absolute top-5 right-5 text-4xl font-bold"
      >
        <RxCross2 />
      </button>
      <div className="flex flex-col gap-6 text-4xl">
        <Link to="/" className="cursor-pointer">
          Home
        </Link>
        <Link to="/dashboard" className="cursor-pointer">
          Dashboard
        </Link>
      </div>
    </motion.div>
  );
}

export default Sidebar;
