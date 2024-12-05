import React from "react";

const RoundedOutlineButton = ({
  buttonName = "Default Name",
  buttonBG = "#5750A2",
  flexProp,
  customPaddingX = "24px",
  customPaddingY = "10px",
}) => {
  return (
    <button
      type="button"
      className={`${flexProp} text-white bg-[${buttonBG}] focus:outline-none font-medium rounded-full text-sm me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
      style={{
        paddingLeft: customPaddingX,
        paddingRight: customPaddingX,
        paddingTop: customPaddingY,
        paddingBottom: customPaddingY,
      }}
    >
      {buttonName}
    </button>
  );
};

export default RoundedOutlineButton;
