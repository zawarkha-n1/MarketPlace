import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppData } from "../context/AppContext";

const Card = ({
  id, // Assuming you have an asset `id` passed as a prop now
  title,
  discount,
  price,
  starcount,
  heartcount,
  smileycount,
  savedcount,
  inlibrary,
  bgcolor,
  image,
  onClick,
  creatorImage,
  creatorName,
  saved,
  onSaveToggle,
}) => {
  const [isSaved, setIsSaved] = useState(saved);
  const { fetchUserAssets, user } = useAppData();
  const [localSavedCount, setLocalSavedCount] = useState(savedcount);
  const [localStarCount, setLocalStarCount] = useState(starcount);
  const [localHeartCount, setLocalHeartCount] = useState(heartcount);
  const [localSmileyCount, setLocalSmileyCount] = useState(smileycount);

  const [clicked, setClicked] = useState({
    stars: false,
    smiley: false,
    favourite: false,
  });

  const handleActionClick = async (actionType) => {
    if (clicked[actionType]) return; // Prevent multiple clicks

    try {
      // Optimistically update the UI
      setClicked((prev) => ({ ...prev, [actionType]: true }));
      if (actionType === "stars") {
        setLocalStarCount((prev) => prev + 1);
      } else if (actionType === "smiley") {
        setLocalSmileyCount((prev) => prev + 1);
      } else if (actionType === "favourite") {
        setLocalHeartCount((prev) => prev + 1);
      }

      // Make the backend API call
      await axios.post("http://172.16.15.155:5000/update-asset-action", {
        assetId: id,
        actionType,
      });

      console.log(`${actionType} count incremented for asset: ${id}`);
    } catch (error) {
      console.error(`Error updating ${actionType} count:`, error);

      // Revert UI state if the API call fails
      setClicked((prev) => ({ ...prev, [actionType]: false }));
      if (actionType === "stars") {
        setLocalStarCount((prev) => prev - 1);
      } else if (actionType === "smiley") {
        setLocalSmileyCount((prev) => prev - 1);
      } else if (actionType === "favourite") {
        setLocalHeartCount((prev) => prev - 1);
      }
    }
  };

  const handleSaveClick = async (event) => {
    event.stopPropagation();

    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    const useremail = user.email;

    try {
      // Optimistically update the UI
      const newSavedStatus = !isSaved;
      setIsSaved(newSavedStatus);
      setLocalSavedCount((prevCount) =>
        newSavedStatus ? prevCount + 1 : Math.max(prevCount - 1, 0)
      );

      // Notify the parent component if needed (e.g., to remove unsaved items)
      if (onSaveToggle) {
        onSaveToggle(newSavedStatus, title);
      }

      // Make the API call to update the saved status
      await axios.post("http://172.16.15.155:5000/update-user-assets-saved", {
        useremail,
        assetId: id, // Pass assetId instead of assetTitle
        status: newSavedStatus,
      });

      console.log(
        `Asset ${newSavedStatus ? "saved" : "unsaved"} successfully.`
      );
    } catch (error) {
      console.error("Error updating saved status in backend:", error);

      // Revert the UI state if the API call fails
      setIsSaved((prevSaved) => !prevSaved);
      setLocalSavedCount((prevCount) =>
        !isSaved ? prevCount - 1 : prevCount + 1
      );

      if (onSaveToggle) {
        onSaveToggle(!isSaved, title);
      }
    }
  };

  return (
    <div
      onClick={onClick}
      className={`w-[280px] ${
        inlibrary ? "h-[342px]" : "h-[442px]"
      } bg-[#343444] rounded-[20px] p-4 relative flex flex-col`}
    >
      {/* Main Image Container with White Border */}
      <div
        className="w-full h-[297px] bg-cover bg-center rounded-[15px] mb-4 relative"
        style={{
          backgroundColor: bgcolor,
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Box Positioned at Top Right */}
        {!inlibrary && (
          <div
            className="absolute top-2 right-4 w-[50px] h-[32px] min-w-[38px] rounded-[8px] flex justify-between items-center cursor-pointer"
            style={{
              background: "#42425a", // Apply background color
              opacity: 0.7, // Apply opacity
            }}
            onClick={handleSaveClick} // Toggle saved state on click
          >
            {/* Use filled or empty heart depending on isSaved state */}

            <img
              src={isSaved ? "/filledsaved.png" : "/save.png"} // Toggle between filled and empty heart
              alt="Save"
              className="w-[16px] h-[16px] ml-2"
            />

            <span
              className="text-white mr-2"
              style={{
                fontFamily: "Urbanist",
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "24px",
                textTransform: "uppercase",
              }}
            >
              {localSavedCount}
            </span>
          </div>
        )}

        {/* Boxes Positioned at Bottom Left */}
        {!inlibrary && (
          <div className="absolute bottom-1 left-2 flex space-x-2">
            {/* Box 1 */}
            <div
              className="w-[50px] h-[32px] min-w-[38px] rounded-[8px] flex justify-between items-center relative cursor-pointer"
              style={{
                background: "#42425a", // Apply background color
                opacity: 0.7, // Apply opacity
              }}
              disabled={clicked.smiley}
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click
                handleActionClick("smiley");
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
                {localSmileyCount}
              </span>
            </div>

            {/* Box 2 */}
            <div
              className="w-[50px] h-[32px] min-w-[38px] rounded-[8px] flex justify-between items-center relative cursor-pointer"
              style={{
                background: "#42425a", // Apply background color
                opacity: 0.7, // Apply opacity
              }}
              disabled={clicked.stars}
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click
                handleActionClick("stars");
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
                {localStarCount}
              </span>
            </div>

            {/* Box 3 */}
            <div
              className="w-[50px] h-[32px] min-w-[38px] rounded-[8px] flex justify-between items-center relative cursor-pointer"
              style={{
                background: "#42425a", // Apply background color
                opacity: 0.7, // Apply opacity
              }}
              disabled={clicked.favourite}
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click
                handleActionClick("favourite");
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
                {localHeartCount}
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
            {`${discount} %`}
          </span>
        )}
      </div>
      {/* Creator Section at the Bottom */}

      <div className="w-full flex justify-between items-center mt-4">
        {/* Left Section: Image in a Square Div */}
        <div className="w-[50px] h-[50px] bg-gray-200 rounded-[20px] overflow-hidden">
          <img
            src={creatorImage}
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
            {creatorName || "exartaaaaa"}
          </span>
        </div>

        {/* Right Section: Price */}
        <div className="flex flex-col text-right ml-auto">
          <span className="text-[#8A8AA0] text-sm font-normal leading-[20px] capitalize">
            {!inlibrary ? "Price" : "Status"}
          </span>
          {!inlibrary && (
            <span className="text-[#EBEBEB] text-[15px] font-semibold leading-[22px] capitalize">
              {price ? `${price} EXA` : "FREE"}
            </span>
          )}
          {inlibrary && (
            <img
              src="/owned.png"
              alt="Creator"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
