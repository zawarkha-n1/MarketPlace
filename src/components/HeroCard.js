import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define an array of content for the HeroCard
const heroContent = [
  {
    title: "Shape your own world with assets that bring your vision to life.",
    description:
      "Dive into a curated collection of 3D assets, textures, and tools designed to fuel your creativity. Whether you’re building a virtual store, interactive experience, or unique environment, Bazaar has everything you need to bring your ideas to life.",
  },
  {
    title: "Join Our Community",
    description:
      "Be a part of our community and gain access to resources, support, insights, and exciting events.",
  },
  {
    title: "Discover the latest assets",
    description:
      "Check out the recent assets we’ve added—designed to help you innovate, grow, and succeed in today’s fast-moving world.",
  },
];

const HeroCard = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage the current content index

  const handleClick = () => {
    navigate("/create-model"); // Navigate to the /CreateModel route
  };

  // Function to move to the next content
  const nextContent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length); // Loop back to the first content
  };

  // Function to move to the previous content
  const prevContent = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroContent.length) % heroContent.length
    ); // Loop to the last content
  };

  return (
    <div className="relative w-[70%] min-h-[450px] bg-gradient-to-r from-[#5750A2] via-[#5750A2] to-[#8482d3] text-white flex flex-col justify-center items-start px-8 md:px-8 rounded-xl opacity-90 shadow-lg  border border-transparent">
      {/* Hero Image */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center z-[-1]">
        {/* Background image */}
      </div>

      {/* Content Container */}
      <div className="text-left max-w-3xl z-10 p-6 space-y-6">
        {/* Title */}
        <h1 className="text-[38px] font-extrabold text-white font-urbanist mb-4 md:text-[38px] lg:text-[38px] leading-[55px]">
          {heroContent[currentIndex].title}
        </h1>

        {/* Description */}
        <p className="text-white mb-6 text-[18px] font-mulish font-medium leading-[27px]">
          {heroContent[currentIndex].description}
        </p>

        {/* Common Buttons on Left */}
        <div className="flex space-x-8">
          {" "}
          {/* Use flex to align buttons in a row */}
          <button className="px-8 py-3 text-white bg-gradient-to-r from-[#1F3AA8] to-[#801CCC] font-montserrat font-semibold text-[16px] leading-normal rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 flex items-center justify-center">
            <img
              src="/platform.png" // Image path from the public folder
              alt="Platform 3" // Alt text for accessibility
              className="w-full h-full object-contain" // Set a fixed width and height for the image
              onClick={() =>
                window.open(
                  "https://odyssey-independent-platform.vercel.app/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            />
          </button>
          <button
            className="px-6 py-3 text-white bg-transparent border-2 border-white font-urbanist font-medium text-[16px] leading-normal rounded-full hover:bg-[#5750A2] hover:text-white transition-all duration-300 flex items-center justify-center"
            onClick={handleClick}
          >
            Generate with AI
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-4 right-4 flex flex-row items-center space-x-4 z-20">
        <button
          onClick={prevContent}
          className="bg-white p-2 rounded-full text-[#14141F] hover:bg-gray-200 transition"
        >
          <img src="/arrow-left.png" alt="" className="w-5 h-5" />
        </button>
        <button
          onClick={nextContent}
          className="bg-white p-2 rounded-full text-[#14141F] hover:bg-gray-200 transition"
        >
          <img src="/arrow-right.png" alt="" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
