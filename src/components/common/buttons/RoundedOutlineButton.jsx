import React from "react";

const RoundedOutlineButton = ({
  buttonName = "Default Name",
  buttonBG = "#5750A2",
}) => {
  return (
    <button
      type="button"
      className="text-white bg-[#5750A2] focus:outline-none  font-medium rounded-full text-sm px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      {buttonName}
    </button>
  );
};

export default RoundedOutlineButton;
