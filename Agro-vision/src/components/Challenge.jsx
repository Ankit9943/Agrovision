import React from "react";
import croploss from "../assets/crop-loss.png";
import water from "../assets/water-scarcity.png";
import monitor from "../assets/monitor.png";
import mineral from "../assets/mineral.png";

function Challenge() {
  return (
    <section className="w-full font-[poppins]">
      <h1 className="text-center text-4xl font-normal font-[poppins] p-4 md:pb-8">
        CHALLENGES
      </h1>
      <div className="w-full flex flex-col gap-6 md:flex-row md:gap-10 ">
        <div className="w-full rounded-lg flex flex-col items-center justify-center p-4 gap-3 bg-[#E9762B] text-white">
          <div className=" flex items-center justify-center pb-0 ">
            <img src={croploss} alt="" className="w-1/3" />
          </div>
          <h2 className="text-2xl font-bold text-center">
            Crop Losses Due to Pests and Diseases
          </h2>
          <p className="text-lg font-normal">
            Annually, around 40% of global crop yield is lost due to pests,
            diseases, and weeds. This leads to food shortages and lower incomes
            for farmers. Traditional pest control methods are often inefficient,
            expensive, and environmentally harmful.
          </p>
        </div>
        <div className="w-full rounded-lg flex flex-col items-center justify-center bg-[#E9762B] text-white  p-4 gap-3">
          <div className=" flex items-center justify-center pb-0 ">
            <img src={water} alt="" className="w-1/3" />
          </div>
          <h2 className="text-2xl font-bold text-center">
            Rising Water Scarcity
          </h2>
          <p className="text-lg font-normal">
            Agriculture consumes over 70% of global freshwater, but inefficient
            irrigation leads to significant wastage. In India alone, over 600
            million people face water stress, making sustainable water
            management critical for food security.
          </p>
        </div>
        <div className="w-full rounded-lg flex flex-col items-center justify-center bg-[#E9762B] text-white  p-4 gap-3">
          <div className=" flex items-center justify-center pb-0 ">
            <img src={monitor} alt="" className="w-1/3" />
          </div>
          <h2 className="text-2xl font-bold text-center">
            Lack of Real-Time Monitoring & Insights
          </h2>
          <p className="text-lg font-normal">
            Farmers often lack real-time data on soil conditions, water levels,
            and crop health. This results in delayed decision-making, increased
            resource wastage, and preventable yield losses.
          </p>
        </div>
        <div className="w-full rounded-lg flex flex-col items-center justify-center bg-[#E9762B] text-white  p-4 gap-3">
          <div className=" flex items-center justify-center pb-0 ">
            <img src={mineral} alt="" className="w-1/3" />
          </div>
          <h2 className="text-2xl font-bold text-center">
            Imbalanced Nutrient Application
          </h2>
          <p className="text-lg font-normal">
            Excessive or imbalanced use of fertilizers affects soil health,
            pollutes water bodies, and contributes to greenhouse gas emissions.
            Overuse of nitrogen, phosphorus, and potassium depletes soil
            fertility and harms ecosystems.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Challenge;
