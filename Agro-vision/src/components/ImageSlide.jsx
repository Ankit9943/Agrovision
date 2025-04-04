import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../assets/image-gallery/image1.png";
import img2 from "../assets/image-gallery/image2.webp";
import img3 from "../assets/image-gallery/image3.webp";
import img4 from "../assets/image-gallery/image4.webp";
import img5 from "../assets/image-gallery/image5.webp";
import img6 from "../assets/image-gallery/image6.png";
import img7 from "../assets/image-gallery/image7.png";
import img8 from "../assets/image-gallery/image8.png";
import img9 from "../assets/image-gallery/image9.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

function ImageSlide() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <section className="w-full p-6">
      <div className="max-w-screen-xl mx-auto">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 md:gap-5 w-full mx-auto p-2"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full aspect-square h-auto rounded-lg shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default ImageSlide;
