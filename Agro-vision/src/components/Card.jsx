import { useState } from "react";
import SensorChart from "./Chart";

const Card = ({
  flexdirection = "flex-row",
  greeting = false,
  heading = "Default Heading",
  recommendations = [],
  warnings = []
}) => {
  let dateTime = new Date();
  const [date, setDate] = useState(dateTime.toDateString());

  return (
    <div className="section items-center justify-self-center px-9 py-4 bg-blue-50 min-h-[60vh] min-w-11/12 mt-10 rounded-2xl">
      <div className={`Card w-full flex flex-col lg:flex-row xl:flex-row ${flexdirection === "flex-row-reverse" ? "lg:flex-row-reverse xl:flex-row-reverse" : ""} m-1`}>
        <div className="greeting w-full lg:w-1/3 xl:w-1/3">
          {greeting && <p className="text-l font-bold text-gray-500">{date}</p>}
          <h2 className="text-xl font-bold mb-2 indent-2">
            {heading}
          </h2>
          <hr className="text-gray-500" />
          <div
            className="notification-card indent-4 overflow-scroll w-full max-h-[300px] rounded-2xl my-2 p-2"
            style={{ scrollbarWidth: "none" }}
          >
            {recommendations.map((elem, idx) => <p className="bg-red-100 m-1 rounded-xl p-2" key={idx}>{idx}. {elem}</p>)}
            {warnings.map((elem, idx) => <p className="bg-red-100 m-1 rounded-xl p-2" key={idx}>{idx}. {elem}</p>)}
          </div>
        </div>
        <div className="chart w-full lg:w-2/3 xl:w-2/3">
          <SensorChart  />
        </div>
      </div>
    </div>
  );
};

export default Card;
