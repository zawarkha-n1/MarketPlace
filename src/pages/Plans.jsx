import React from "react";
import PricingCard from "./../components/common/pricing-card/PricingCard";

const Plans = () => {
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
        <div className="w-[60%] flex flex-row items-center justify-center gap-8">
          <PricingCard
            title={"Subscription Plan"}
            subtitle={"Monthly credit budget"}
            price={0.061}
          />
          <PricingCard
            title={"Pay as you go"}
            subtitle={"For individuals"}
            price={0.061}
          />
        </div>
      </div>
    </div>
  );
};

export default Plans;
