import { useState } from "react";
import SensorChart from "./SensorChart";

const Card = ({
  flexdirection = "flex-row",
  greeting = false,
  heading = "Default Heading",
  recommendations = [],
  warnings = [],
}) => {
  let dateTime = new Date();
  const [date] = useState(dateTime.toDateString());

  return (
    <div className="section flex justify-center px-4 py-6 bg-blue-500 min-h-[60vh] w-full sm:w-11/12 mt-6 rounded-2xl">
      <div
        className={`Card bg-white w-full flex flex-col md:flex-row ${
          flexdirection === "flex-row-reverse" ? "md:flex-row-reverse" : ""
        } shadow-lg rounded-2xl overflow-hidden`}
      >
        {/* Left: Greeting & Notifications */}
        <div className="greeting w-full md:w-1/3 bg-yellow-300 p-4 flex flex-col">
          {greeting && (
            <p className="text-xs sm:text-sm md:text-base font-bold text-gray-600">
              {date}
            </p>
          )}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold my-2">
            {heading}
          </h2>
          <hr className="border-gray-400 my-2" />

          {/* Notification List */}
          <div className="notification-card w-full max-h-[300px] overflow-y-auto rounded-2xl my-2 p-2 scrollbar-hide">
            {[...recommendations, ...warnings].map((elem, idx) => (
              <p
                className="bg-red-100 m-1 rounded-lg p-2 text-xs sm:text-sm md:text-base shadow-sm"
                key={idx}
              >
                {idx + 1}. {elem}
              </p>
            ))}
          </div>
        </div>

        {/* Right: Enlarged Chart Section */}
        <div className="chart w-full md:w-2/3 p-4 flex items-center justify-center bg-gray-100 flex-1 h-[250px] md:h-[400px] lg:h-[500px] min-h-[250px]">
          <SensorChart />
        </div>
      </div>
    </div>
  );
};

export default Card;
