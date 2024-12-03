import React from "react";

const SocialIcon = ({ icon, bgColor = "#343444", altText = "Social Icon" }) => {
  return (
    <div className={`w-16 h-16 rounded-lg bg-[${bgColor}]`}>
      <img
        src={`/assets/icons/${icon}.png`}
        alt={altText}
        className="rounded-lg"
      />
    </div>
  );
};

export default SocialIcon;
