import React from "react";

const DropDownMenu = ({}) => {
  return (
    <div className="bg-[#343444] rounded-lg z-10 lg:min-w-[150px] lg:w-fit py-4 flex flex-col justify-center font-urbanist font-normal text-[13px] leading-[20px]">
      <div className=" hover:bg-[#5750A2] w-full">
        <h3 className="p-3 text-center">All Products</h3>
        <hr className=" border-gray-500" />
      </div>
      <div className=" hover:bg-[#5750A2] w-full">
        <h3 className="p-3 text-center">All Products</h3>
        <hr className=" border-gray-500" />
      </div>
      <div className=" hover:bg-[#5750A2] w-full">
        <h3 className="p-3 text-center">All Products</h3>
        <hr className=" border-gray-500" />
      </div>
      <div className=" hover:bg-[#5750A2] w-full">
        <h3 className="p-3 text-center">All Products</h3>
        {/* <hr className=" border-gray-500" /> */}
      </div>
    </div>
  );
};

export default DropDownMenu;
