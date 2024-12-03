import React from "react";

const RoundedPillButton = ({ buttonName = "Default Name" }) => {
  return (
    <button className="px-6 py-3 text-white bg-gradient-to-r from-[#1F3AA8] to-[#801CCC] font-bold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
      {buttonName}
    </button>
  );
};

export default RoundedPillButton;
