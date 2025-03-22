import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

function DashBoard() {
  let recommendation = [
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
    "You need to irrigate because water level get low",
  ];
  return (
    <>
      <div className="w-full bg-[#F1F0E9] px-10 py-4 flex flex-col gap-4">
        <Navbar></Navbar>

        <section
          id="irrigation"
          className="section flex flex-col items-center justify-center bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl p-4"
        >
          <Card
            greeting={true}
            heading="Good morning 🌞, Kisaan!"
            recommendations={recommendation}
          ></Card>
        </section>

        <section
          id="irrigation"
          className="section flex flex-col items-center justify-center px-4 py-4 bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl"
        >
          <h1 className="text-2xl sm:text-3xl text-center">
            Monitor Water Usage
          </h1>
          <Card
            flexdirection="flex-col sm:flex-row-reverse"
            heading="AI Recommendations/Insights"
            recommendations={recommendation}
          ></Card>
        </section>

        <section
          id="soil"
          className="section flex flex-col items-center justify-center px-4 py-4 bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl"
        >
          <h1 className="text-2xl sm:text-3xl text-center">
            Monitor Soil Health
          </h1>
          <Card
            heading="AI Recommendations/Insights"
            recommendations={recommendation}
          ></Card>
        </section>

        <section
          id="weather"
          className="section flex flex-col items-center justify-center px-4 py-4 bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl"
        >
          <h1 className="text-2xl sm:text-3xl text-center">Weather</h1>
          <Card
            flexdirection="flex-col sm:flex-row-reverse"
            heading="AI Recommendations/Insights"
            recommendations={recommendation}
          ></Card>
        </section>
      </div>
    </>
  );
}

export default DashBoard;
