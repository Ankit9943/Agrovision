import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import AiChat from "../components/aichat";
import { getGreeting } from "../utils/getGreeting";

function DashBoard() {
  return (
    <>
      <div className="w-full bg-[#F1F0E9] px-10 py-4 flex flex-col gap-4">
        <Navbar />

        {/* New Greeting Section */}
        <section className="w-full sm:w-11/12 mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-[#89AC46]">
                {getGreeting()}, Kisaan!
              </h1>
              <p className="text-gray-600">
                Welcome to your farm dashboard. Monitor Or Ask.
              </p>
            </div>
          </div>
        </section>

        <section
          id="aichat"
          className="section flex flex-col items-center justify-center bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl p-4"
        >
          <AiChat />
        </section>

        <section
          id="irrigation"
          className="section flex flex-col items-center justify-center bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl p-4"
        >
          <Card 
            heading="Farm Overview"
            greeting={false} // Remove greeting from first card
          />
        </section>

        <section
          id="irrigation"
          className="section flex flex-col items-center justify-center px-4 py-4 bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl"
        >
          <h1 className="text-2xl sm:text-3xl text-center">
            Monitor Water Usage
          </h1>
          <Card
            flexdirection="flex-row-reverse"
            heading="AI Recommendations/Insights"
          />
        </section>

        <section
          id="soil"
          className="section flex flex-col items-center justify-center px-4 py-4 bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl"
        >
          <h1 className="text-2xl sm:text-3xl text-center">
            Monitor Soil Health
          </h1>
          <Card heading="AI Recommendations/Insights" />
        </section>

        <section
          id="weather"
          className="section flex flex-col items-center justify-center px-4 py-4 bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl"
        >
          <h1 className="text-2xl sm:text-3xl text-center">Weather</h1>
          <Card
            flexdirection="flex-row-reverse"
            heading="AI Recommendations/Insights"
          />
        </section>
      </div>
    </>
  );
}

export default DashBoard;
