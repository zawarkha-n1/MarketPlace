import React, { useState } from "react";
import RoundedOutlineButton from "../buttons/RoundedOutlineButton";

const pricingOptions = [
  { id: 1, credits: 40, price: 5.0, pricePerCredit: 0.061 },
  { id: 2, credits: 40, price: 5.0, pricePerCredit: 0.061 },
  { id: 3, credits: 40, price: 5.0, pricePerCredit: 0.061 },
  { id: 4, credits: 40, price: 5.0, pricePerCredit: 0.061 },
  { id: 5, credits: 40, price: 5.0, pricePerCredit: 0.061 },
  { id: 6, credits: 40, price: 5.0, pricePerCredit: 0.061 },
];

const PricingCard = ({ title, subtitle, price }) => {
  const [selectedOption, setSelectedOption] = useState(1);
  return (
    <div className="py-6 px-5 bg-[#343444] text-white rounded-[21.26px] min-w-[90%] sm:min-w-[45%] md:min-w-[34%] lg:min-w-[32%] xl:min-w-[34%] max-w-[100%] sm:max-w-[45%] md:max-w-[34%] lg:max-w-[32%] xl:max-w-[34%]">
      <div>
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="bg-[#ECEBFF] w-16 h-16 rounded-[14.17px] flex justify-center items-center">
            <div className="bg-[#453D9A] rounded-l-full w-4 h-8"></div>
            <div className="bg-[#B8B1FF] rounded-r-full w-4 h-8"></div>
          </div>
          <div>
            <h2 className="text-[#AEA7FF] leading-8 text-[21.25px] font-bold">
              {title}
            </h2>
            <h3>{subtitle}</h3>
          </div>
        </div>
        <p className="pt-4 text-sm sm:text-base">
          Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing
          elit.
        </p>
        <h1 className="text-[#998FFF] text-[47.83px] leading-[58px] font-bold pt-4 sm:text-[36px] md:text-[40px] lg:text-[44px]">
          ${price}{" "}
          <span className="text-[#8E8E8E] text-[17.71px] leading-[20px] font-normal">
            {" "}
            / Credits
          </span>
        </h1>
        <p className="py-4 text-sm sm:text-base">What’s included</p>

        <div className="w-full max-w-md rounded-lg">
          {pricingOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center space-x-2 mb-3 flex-col sm:flex-row"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer
                ${
                  selectedOption === option.id
                    ? "bg-[#5750A2] border-[#5750A2]"
                    : "border-white"
                }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  {selectedOption === option.id && (
                    <img
                      src="/assets/icons/check/check.png"
                      className="h-3 w-3 items-center text-white"
                      alt=""
                    />
                  )}
                </div>
                <label
                  htmlFor={`option${option.id}`}
                  className="text-md font-medium text-white cursor-pointer"
                >
                  {option.credits} Credits/ month
                </label>
              </div>
              <div className="flex items-center space-x-6 mt-3 sm:mt-0">
                <span className="text-sm font-medium text-white">
                  ${option.price.toFixed(2)}
                </span>
                <span className="text-md font-medium text-white cursor-pointer">
                  ${option.pricePerCredit.toFixed(3)}/ credit
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center pt-4">
        <RoundedOutlineButton buttonName="Subscribe Now" />
      </div>
    </div>
  );
};

export default PricingCard;
