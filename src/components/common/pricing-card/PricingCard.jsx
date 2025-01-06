import React, { useState } from "react";
import RoundedOutlineButton from "../buttons/RoundedOutlineButton";
import { useAppData } from "../../../context/AppContext";
import axios from "axios";
import LoginModal from "../../modals/LoginModal";
import CryptoJS from "crypto-js";

const PricingCard = ({ title, subtitle, price, pricingOptions }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1); // Default selected option is the first one
  const { user } = useAppData();

  function closeLoginModal() {
    setIsLoginModalOpen(false);
  }

  // Add the interceptor for Authorization header
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

  const handleBuyNow = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      // Prepare data for HMAC signature generation
      const data = {
        useremail: user.email,
        selectedOption,
      };

      // Ensure sorted keys before stringifying the data
      const sortedData = Object.keys(data)
        .sort() // Sort keys to ensure consistent ordering
        .reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {});

      const dataString = JSON.stringify(sortedData);

      // Define your shared secret
      const secret =
        "bcdd13e4b669a047d99e1ba6f310f3ad0868630ec7320b96598aef9997b87c59";

      // Generate HMAC signature using SHA256
      const signature = CryptoJS.HmacSHA256(dataString, secret).toString(
        CryptoJS.enc.Hex
      );

      // Create the API request object with all details
      const apiRequest = {
        url: `${process.env.REACT_APP_BASE_URL}/one-time-payment-exas`,
        data,
        headers: {
          "x-signature": signature, // Include the signature in the request header
        },
      };

      // Log the full API request including headers for debugging
      console.log("API Request: ", apiRequest);

      // Make the request with the HMAC signature in the header
      const response = await axios.post(apiRequest.url, apiRequest.data, {
        headers: apiRequest.headers,
      });

      const responseData = response.data;
      if (responseData.url) {
        window.location.href = responseData.url; // Redirect to the payment URL
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
      {isLoginModalOpen && (
        <LoginModal
          modalIsOpen={isLoginModalOpen}
          closeModal={closeLoginModal}
        />
      )}
    </div>
  );
};

export default PricingCard;
