import React from "react";
import PricingCard from "./../components/common/pricing-card/PricingCard";
import Headingpage from "../components/HeadingPage";

const Plans = () => {
  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-start">
      <Headingpage pagename={"Our Pricing Plans"} secondheading={"Pricing"} />
      <div className="w-full flex items-center justify-center">
        <div className="xl:w-[70%] 2xl:w-[60%] flex flex-row items-center justify-center gap-8">
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
