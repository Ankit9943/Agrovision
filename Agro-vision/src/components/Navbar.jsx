import { React, useState } from "react";
import { HiOutlineBars4 } from "react-icons/hi2";
import Sidebar from "./Sidebar";
import { motion } from "motion/react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="w-full flex justify-between items-center p-4 h-20 bg-[#41644A] text-white font-[poppins] rounded-lg">
      <h1 className="text-3xl font-bold ">AgroVision</h1>
      <div className="text-4xl z-10 pr-4 ">
        <HiOutlineBars4 onClick={handleClick} className="cursor-pointer" />
      </div>
      <Sidebar isOpen={isOpen} handleClick={handleClick} />
    </div>
  );
}

export default Navbar;
