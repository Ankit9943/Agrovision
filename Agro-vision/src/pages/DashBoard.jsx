import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import AiChat from "../components/aichat";
import { getGreeting } from "../utils/getGreeting";

function DashBoard() {
  return (
    <>
      <div className="w-full bg-[#F1F0E9] px-4 md:px-10 py-4 flex flex-col gap-4">
        <Navbar />

        {/* New Greeting Section */}
        <section className="w-full mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-[#89AC46]">
                {getGreeting()}, किसान! <br />
              </h1>
              <p className="text-gray-600">
                अपने खेत के डैशबोर्ड में आपका स्वागत है। निगरानी करें या पूछें। <br />
              </p>
            </div>
          </div>
        </section>
        <div className="w-full flex flex-col items-center justify-center gap-4 ">
          <section
            id="aichat"
            className="section flex flex-col items-center justify-center bg-blue-50 min-h-[60vh] w-full  mt-10 rounded-2xl p-2 md:p-4"
          >
            <AiChat />
          </section>

          <section
            id="irrigation"
            className="section flex flex-col items-center justify-center bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl p-4"
          >
            <Card
              heading={
                <>
                  खेत का अवलोकन <br />
                  <span className="text-sm text-gray-500">(Farm Overview)</span>
                </>
              }
              greeting={false}
              summary={
                <>
                  यह कार्ड आपके खेत की वर्तमान स्थिति और प्रदर्शन का अवलोकन प्रदान करता है। <br />
                  <span className="text-sm text-gray-500">
                    (This card provides an overview of your farm's current status and performance.)
                  </span>
                </>
              }
            />
          </section>

          <section
            id="irrigation"
            className="section flex flex-col items-center justify-center px-4 py-4 bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl"
          >
            <h1 className="text-2xl sm:text-3xl text-center">
              पानी के उपयोग की निगरानी करें <br />
              <span className="text-sm text-gray-500">(Monitor Water Usage)</span>
            </h1>
            <Card
              heading={
                <>
                  पानी के उपयोग की निगरानी करें <br />
                  <span className="text-sm text-gray-500">(Monitor Water Usage)</span>
                </>
              }
              flexdirection="flex-row-reverse"
              summary={
                <>
                  यह कार्ड पानी के उपयोग को अनुकूलित करने के लिए एआई आधारित सिफारिशें प्रदान करता है। <br />
                  <span className="text-sm text-gray-500">
                    (This card provides AI-based recommendations to optimize water usage.)
                  </span>
                </>
              }
            />
          </section>

          <section
            id="soil"
            className="section flex flex-col items-center justify-center px-4 py-4 bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl"
          >
            <h1 className="text-2xl sm:text-3xl text-center">
              मिट्टी के स्वास्थ्य की निगरानी करें <br />
              <span className="text-sm text-gray-500">(Monitor Soil Health)</span>
            </h1>
            <Card
              heading={
                <>
                  मिट्टी के स्वास्थ्य की निगरानी करें <br />
                  <span className="text-sm text-gray-500">(Monitor Soil Health)</span>
                </>
              }
              summary={
                <>
                  यह कार्ड मिट्टी की गुणवत्ता और पोषक तत्वों की स्थिति पर अंतर्दृष्टि प्रदान करता है। <br />
                  <span className="text-sm text-gray-500">
                    (This card provides insights into soil quality and nutrient status.)
                  </span>
                </>
              }
            />
          </section>

          <section
            id="weather"
            className="section flex flex-col items-center justify-center px-4 py-4 bg-blue-50 min-h-[60vh] w-full sm:w-11/12 mt-10 rounded-2xl"
          >
            <h1 className="text-2xl sm:text-3xl text-center">
              मौसम <br />
              <span className="text-sm text-gray-500">(Weather)</span>
            </h1>
            <Card
              heading={
                <>
                  मौसम <br />
                  <span className="text-sm text-gray-500">(Weather)</span>
                </>
              }
              flexdirection="flex-row-reverse"
              summary={
                <>
                  यह कार्ड मौसम के पूर्वानुमान और खेती के लिए सुझाव प्रदान करता है। <br />
                  <span className="text-sm text-gray-500">
                    (This card provides weather forecasts and suggestions for farming.)
                  </span>
                </>
              }
            />
          </section>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
