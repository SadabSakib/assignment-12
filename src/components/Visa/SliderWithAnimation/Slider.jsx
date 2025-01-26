import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const Slider = () => {
  const slides = [
    {
      text: "Welcome to Tourism Ninja",
      description: "Your ultimate portal for tourism information.",
    },
    {
      text: "Find All The Available Packages",
      description: "Get details about all types of packages.",
    },
    {
      text: "Apply for Packages",
      description: "Simple and efficient online tourism Package Buying.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="carousel w-full mb-10">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="carousel-item w-full"
          style={{
            display: index === currentSlide ? "block" : "none",
            transition: "opacity 1s ease-in-out",
            opacity: index === currentSlide ? 1 : 0,
          }}
        >
          <div className="w-full h-64 flex items-center justify-center bg-gray-200">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                <Typewriter
                  words={[slide.text]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h2>
              <p className="text-lg">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
