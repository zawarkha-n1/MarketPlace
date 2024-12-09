import React from "react";
import LibraryCard from "../components/common/library-cards/LibraryCard";

const Library = () => {
  return (
    <div className="bg-[#14141F] min-h-screen">
      <div className="text-white font-Urbanist">
        <h1 className="font-urbanist font-bold text-4xl leading-[57.6px] text-center pt-8">
          My Library
        </h1>
        <h3 className="text-center pt-5 font-urbanist font-normal text-[18px] leading-[28px]">
          Home / Pages / My Library
        </h3>
        <div className="px-20 py-12 flex flex-row gap-5 flex-wrap justify-center ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((card, index) => {
            return (
              <LibraryCard
                title="Living Vase 01 By Lanza..."
                image={"/images/img.png"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Library;
