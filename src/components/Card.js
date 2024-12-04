import React, { useState } from "react";

const Card = ({
  title,
  discount,
  price,
  starcount,
  heartcount,
  savedcount,
  smileycount,
  inlibrary,
  bgcolor,
  image,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div
      className={`w-[280px] ${
        inlibrary ? "h-[342px]" : "h-[442px]"
      } bg-[#343444] rounded-[20px] p-4 relative flex flex-col`}
    >
      {/* Main Image Container with White Border */}
      <div
        className="w-full h-[297px] bg-cover bg-center rounded-[15px] mb-4 relative"
        style={{
          backgroundColor: bgcolor,
          backgroundImage: `url('/${image}')`, // Replace with your image path
        }}
      >
        {/* Box Positioned at Top Right */}
        <div
          className="absolute top-2 right-4 w-[50px] h-[32px] min-w-[38px] rounded-[8px] flex justify-between items-center cursor-pointer"
          style={{
            background: "#42425a", // Apply background color
            opacity: 0.7, // Apply opacity
          }}
          onClick={handleSaveClick} // Toggle saved state on click
        >
          {/* Use filled or empty heart depending on isSaved state */}
          {!inlibrary ? (
            <img
              src={isSaved ? "/filledsaved.png" : "/save.png"} // Toggle between filled and empty heart
              alt="Save"
              className="w-[16px] h-[16px] ml-2"
            />
          ) : (
            <img
              src="/star.png" // Change to the image you want when inLibrary is true
              alt="Library"
              className="w-[16px] h-[16px] ml-2"
            />
          )}
          <span
            className="text-white mr-2"
            style={{
              fontFamily: "Urbanist",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "24px", // or adjust based on design
              textTransform: "uppercase",
            }}
          >
            {!inlibrary ? savedcount : starcount}
          </span>
        </div>

        {/* Boxes Positioned at Bottom Left */}
        {!inlibrary && (
          <div className="absolute bottom-1 left-2 flex space-x-2">
            {/* Box 1 */}
            <div
              className="w-[50px] h-[32px] min-w-[38px] rounded-[8px] flex justify-between items-center relative"
              style={{
                background: "#42425a", // Apply background color
                opacity: 0.7, // Apply opacity
              }}
            >
              <img
                src="/smiley.png"
                alt="Smiley"
                className="w-[16px] h-[16px] ml-2"
              />
              <span
                className="text-white mr-2"
                style={{
                  fontFamily: "Urbanist",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px", // or adjust based on design
                  textTransform: "uppercase",
                }}
              >
                {smileycount}
              </span>
            </div>

            {/* Box 2 */}
            <div
              className="w-[50px] h-[32px] min-w-[38px] rounded-[8px] flex justify-between items-center relative"
              style={{
                background: "#42425a", // Apply background color
                opacity: 0.7, // Apply opacity
              }}
            >
              <img
                src="/star.png"
                alt="Star"
                className="w-[16px] h-[16px] ml-2"
              />
              <span
                className="text-white mr-2 mt-1"
                style={{
                  fontFamily: "Urbanist",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px", // or adjust based on design
                  textTransform: "uppercase",
                }}
              >
                {starcount}
              </span>
            </div>

            {/* Box 3 */}
            <div
              className="w-[50px] h-[32px] min-w-[38px] rounded-[8px] flex justify-between items-center relative"
              style={{
                background: "#42425a", // Apply background color
                opacity: 0.7, // Apply opacity
              }}
            >
              <img
                src="/heart.png"
                alt="Heart"
                className="w-[16px] h-[16px] ml-2"
              />
              <span
                className="text-white mr-2"
                style={{
                  fontFamily: "Urbanist",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "24px", // or adjust based on design
                  textTransform: "uppercase",
                }}
              >
                {heartcount}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Title and Discount Offer Section */}
      <div className="flex justify-between items-center mt-0">
        {/* Title */}
        <h3
          className="text-white text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis  w-[70%]"
          style={{
            fontFamily: "Urbanist",
            fontSize: "18px", // Title font size
            fontWeight: 700,
            lineHeight: "26px", // Title line height
            textTransform: "capitalize",
            color: "var(--On-Surface, #FFF)", // Title color
          }}
          title={title} // Tooltip on hover to show full title
        >
          {title}
        </h3>

        {/* Discount Offer (Only if discount is available) */}

        {!inlibrary && discount && (
          <span
            className="flex items-center justify-center gap-2 bg-[#58873A] text-white font-semibold text-xs p-[3px_10px] rounded-[40px] capitalize"
            style={{
              fontFamily: "Urbanist",
              fontSize: "12px", // Discount text size
              fontWeight: 700,
              lineHeight: "16px", // Discount text line height
              textTransform: "capitalize",
              color: "var(--On-Surface, #FFF)", // Discount color
            }}
          >
            {discount}
          </span>
        )}
      </div>
      {/* Creator Section at the Bottom */}
      {!inlibrary && (
        <div className="w-full flex justify-between items-center mt-4">
          {/* Left Section: Image in a Square Div */}
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-[20px] overflow-hidden">
            <img
              src="/creatorImage.png"
              alt="Creator"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Section: Creator Name */}
          <div className="flex flex-col ml-4">
            <span className="text-[#8A8AA0] text-sm font-normal leading-[20px] capitalize">
              Creator
            </span>
            <span className="text-[#EBEBEB] text-[15px] font-semibold leading-[22px] capitalize">
              exarta
            </span>
          </div>

          {/* Right Section: Price */}
          <div className="flex flex-col text-right ml-auto">
            <span className="text-[#8A8AA0] text-sm font-normal leading-[20px] capitalize">
              Price
            </span>
            <span className="text-[#EBEBEB] text-[15px] font-semibold leading-[22px] capitalize">
              {price ? price : "FREE"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
