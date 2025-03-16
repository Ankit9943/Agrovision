import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ai from "../assets/ai.avif";
import iot from "../assets/iot.avif";
import cloud from "../assets/cloud.jpg";
import irrigation from "../assets/smart-irrigation.avif";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "50%",
        outline: "none",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "50%",
        outline: "none",
      }}
      onClick={onClick}
    />
  );
}

const Solution = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section className="w-full px-6 md:px-10 py-8 ">
      <h1 className="text-center text-5xl font-normal font-[poppins] p-4 md:pb-8">
        SOLUTION
      </h1>
      <Slider {...settings}>
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white p-6 rounded-lg flex flex-col md:flex-row items-center gap-6 "
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
              <img
                src={item.img}
                alt={item.heading}
                className="w-full md:w-1/2 h-auto rounded-lg shadow-md"
              />

              <div className="w-full md:w-2/3 p-6 md:flex md:justify-between md:items-center md:flex-col md:h-full">
                <h1 className="text-3xl font-bold text-gray-900 text-left">
                  {item.heading}
                </h1>
                <p className="text-lg text-gray-700 mt-2">{item.about}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

const data = [
  {
    heading: "01. AI-Powered Decision Making",
    img: ai,
    about:
      "AI-driven decision-making enhances farming efficiency by analyzing real-time sensor data to optimize irrigation, soil health, pest control, and nutrient management. IoT sensors track soil moisture, temperature, and crop health, while AI models predict risks like water stress, pest infestations, and nutrient deficiencies, enabling proactive action. By providing personalized irrigation and fertilization recommendations, AI reduces resource wastage and environmental impact. Cloud-based dashboards and mobile apps ensure farmers receive instant insights and alerts, improving yield, sustainability, and decision-making.",
  },
  {
    heading: "02. IoT Sensors for Precision Agriculture",
    img: iot,
    about:
      "IoT sensors revolutionize farming by providing real-time monitoring of soil, water, and environmental conditions. These sensors track soil moisture, temperature, and nutrient levels, ensuring optimal crop growth. By continuously collecting and transmitting data, they help farmers detect issues early and prevent resource wastage.With automated alerts and integration with AI models, farmers can make data-driven decisions on irrigation and fertilization, reducing manual effort and costs. This approach enhances efficiency, sustainability, and overall agricultural productivity.",
  },
  {
    heading: "03. Cloud-Based Data Processing & Real-Time Alerts",
    img: cloud,
    about:
      "Cloud-based systems store and analyze real-time agricultural data, providing farmers with instant insights via mobile apps and web dashboards. This allows for remote monitoring of soil conditions, water usage, and crop health, reducing dependency on manual field inspections. Using platforms like AWS IoT Core and Google Cloud IoT, the system ensures secure and scalable data processing. Real-time alerts help farmers take immediate action on critical issues, improving efficiency, resource management, and decision-making.",
  },
  {
    heading: "04. Automated Smart Irrigation & Sustainability",
    img: irrigation,
    about:
      "Smart irrigation systems optimize water distribution by using real-time soil moisture and weather data. These systems automatically adjust water flow, reducing wastage by 30-50% while ensuring crops receive the right amount of hydration. Automation extends to fertilizer application and pest control, using drones or IoT-driven devices to precisely distribute resources, minimizing environmental impact. By reducing manual labor and resource inefficiency, smart irrigation improves sustainability, productivity, and cost-effectiveness.",
  },
];

export default Solution;
