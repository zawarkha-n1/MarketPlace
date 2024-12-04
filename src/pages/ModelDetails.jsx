import React from "react";

const ModelDetails = () => {
  return (
    <div className="bg-[#14141F] min-h-screen">
      <div className="text-white font-Urbanist">
        <h1 className="font-urbanist font-bold text-4xl leading-[57.6px] text-center pt-8">
          Our pricing plans
        </h1>
        <h3 className="text-center pt-5 font-urbanist font-normal text-[18px] leading-[28px]">
          Home / Pages / Pricing
        </h3>
      </div>
      <div className="w-full flex items-center justify-center pt-16">
        <div className="w-[70%] flex flex-row items-start gap-16">
          <div className="flex-1">
            <img src="/experience.png" alt="" className="w-full " />
          </div>
          <div className="flex flex-col flex-1 items-start gap-6">
            <div className="text-white text-3xl">
              "The Fantasy Flower illustration"
            </div>
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-row gap-3">
                <div className="w-full">
                  <div className="p-1 bg-slate-800 flex gap-2 rounded-lg items-center justify-center">
                    <img src="/star.png" alt="" className="w-4 h-4" />
                    <span className="text-white">4</span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-1 bg-slate-800 flex gap-2 rounded-lg items-center justify-center">
                    <img src="/heart.png" alt="" className="w-4 h-4" />
                    <span className="text-white">3</span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-1 bg-slate-800 flex gap-2 rounded-lg items-center justify-center">
                    <img src="/smiley.png" alt="" className="w-4 h-4" />
                    <span className="text-white">8</span>
                  </div>
                </div>
              </div>
              <div>
                <button className="bg-white">m</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
