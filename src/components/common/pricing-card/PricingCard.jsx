import React, { useState } from "react";
import RoundedOutlineButton from "../buttons/RoundedOutlineButton";
import { useAppData } from "../../../context/AppContext";
import axios from "axios";

const PricingCard = ({ title, subtitle, price, pricingOptions }) => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Example of retrieving the token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const [selectedOption, setSelectedOption] = useState(1); // Default selected option is the first one
  const { user } = useAppData();
  // This function will handle the Buy Now button click
  const handleBuyNow = async () => {
    if (!user) {
      alert("User is not logged in");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/one-time-payment-exas",
        {
          useremail: user.email,
          selectedOption,
        }
      );

      const data = response.data; // axios handles JSON parsing
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error: Couldn't process the payment");
      }
    } catch (error) {
      console.error(
        "Error during payment process:",
        error.response || error.message
      );
      alert("There was an issue with your payment. Please try again.");
    }
  };
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
        <p className="pt-4 text-sm sm:text-base">EXA ONE TIME PAYMENT</p>
        <p className="py-4 text-sm sm:text-base">What’s included</p>

        <div className="w-full max-w-md rounded-lg">
          {pricingOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center space-x-2 mb-3 flex-col sm:flex-row"
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer
                ${
                  selectedOption === option.id
                    ? "bg-[#5750A2] border-[#5750A2]"
                    : "border-white"
                }`}
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
                  {option.credits} EXA
                </label>
              </div>
              <div className="flex items-center space-x-6 mt-3 sm:mt-0">
                <span className="text-sm font-medium text-white">
                  ${option.price.toFixed(2)}
                </span>
                {/* <span className="text-md font-medium text-white cursor-pointer">
                  ${option.pricePerCredit.toFixed(3)}/ credit
                </span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center pt-4">
        <RoundedOutlineButton
          buttonName="Buy Now"
          onClick={handleBuyNow} // Trigger the buy now action
        />
      </div>
    </div>
  );
};

export default PricingCard;
