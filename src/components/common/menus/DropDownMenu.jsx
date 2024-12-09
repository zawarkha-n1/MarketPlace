import React from "react";

const DropDownMenu = ({
  items,
  backgroundColor = "#343444",
  hoverColor = "#5750A2",
  fontColor = "#fff",
}) => {
  return (
    <div className="bg-[#343444] rounded-lg z-10 min-w-[150px] w-full py-4 flex flex-col justify-center font-urbanist font-normal text-[13px] leading-[20px] shadow-md">
      {items.map((item, index) => (
        <div
          key={index}
          className="group w-full hover:bg-[#5750A2] transition-colors duration-300"
        >
          <h3 className="p-3 text-center text-white group-hover:text-white">
            {item.name}
          </h3>
          {index < items.length - 1 && <hr className="border-gray-500" />}
        </div>
      ))}
    </div>
  );
};

export default DropDownMenu;
