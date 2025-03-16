import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar"

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
  ]
  return(
    <>
      <Navbar ></Navbar>

      <section id="irrigation" className="section items-center justify-self-center  bg-blue-50 min-h-[60vh] min-w-11/12 mt-10 rounded-2xl">
        <Card greeting={true} heading="Good morning 🌞, Kisaan!" recommendations={ recommendation }></Card>
      </section>

      <section id="irrigation" className="section items-center justify-self-center px-9 py-4 bg-blue-50 min-h-[60vh] min-w-11/12 mt-10 rounded-2xl">
        <h1 className="text-3xl">Monitor Water Usage</h1>
        <Card flexdirection="flex-row-reverse" heading="AI Recommendations/Insights"  recommendations={recommendation } ></Card>
      </section>

      <section id="soil" className="section items-center justify-self-center px-9 py-4 bg-blue-50 min-h-[60vh] min-w-11/12 mt-10 rounded-2xl">
        <h1  className="text-3xl">Monitor Soil Health</h1>
        <Card heading="AI Recommendations/Insights"  recommendations={recommendation } ></Card>
      </section>

      <section id="weather" className="section items-center justify-self-center px-9 py-4 bg-blue-50 min-h-[60vh] min-w-11/12 mt-10 rounded-2xl">
        <h1 className="text-3xl">Weather</h1>
        <Card flexdirection="flex-row-reverse" heading="AI Recommendations/Insights"  recommendations={recommendation } ></Card>
      </section>
    </>
  )
}

export default DashBoard;
