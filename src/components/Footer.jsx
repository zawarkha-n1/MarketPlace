import React from "react";
import SocialIcon from "./common/social-icons/SocialIcon";

const Footer = () => {
  return (
    <div className="bg-[#0D0D11] w-full px-4 sm:px-8 lg:px-52 py-10 text-white">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 justify-between">
        <div className="flex flex-col items-center justify-center lg:w-[25%] lg:items-start p-2 lg:p-4 gap-1">
          <img
            src="/assets/icons/odyssey/odyssey.png"
            alt=""
            className="mb-4"
          />
          <p className="font-urbanist font-normal text-[14px] leading-[22px] text-center lg:text-start w-full lg:w-[50%] mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis non,
            fugit totam vel laboriosam vitae.
          </p>
          <div className="flex items-start justify-center lg:justify-start">
            <SocialIcon
              icon="facebook/facebook"
              bgColor="#3b5998"
              altText="Facebook"
            />
            <SocialIcon icon="x/x" bgColor="#1DA1F2" altText="X" />
            <SocialIcon
              icon="google/google"
              bgColor="#E1306C"
              altText="Google"
            />
            <SocialIcon
              icon="twitch/twitch"
              bgColor="#0077B5"
              altText="Twitch"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-10 justify-between lg:flex-row flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-1 w-auto gap-1 p-4">
            <h1 className="font-[Urbanist] font-bold text-[18px] leading-[26px]">
              My Account
            </h1>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Authors
            </p>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Collection
            </p>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Author Profile
            </p>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Create Collection
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-1 w-auto gap-1 p-4">
            <h1 className="font-[Urbanist] font-bold text-[18px] leading-[26px]">
              Resources
            </h1>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Help & Support
            </p>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Live Auctions
            </p>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Author Profile
            </p>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Activity
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-1 w-auto gap-1 p-4">
            <h1 className="font-[Urbanist] font-bold text-[18px] leading-[26px]">
              Company
            </h1>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Authors
            </p>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Collection
            </p>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Author Profile
            </p>
            <p className="font-[Urbanist] font-normal text-[14px] leading-[22px]">
              Create Collection
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:items-start items-center pt-4">
          <h1 className="font-[Urbanist] font-bold text-[18px] leading-[26px]">
            Subscribe Us
          </h1>

          <div className="relative border-[1px] border-[#343444] bg-black rounded-[10px] ">
            <input
              type="text"
              placeholder="Info@yourgmail.com"
              className="bg-transparent pl-4 pr-16 py-3 text-md"
            />
            <button className="bg-[#5750A2] rounded-r-[10px] py-3 absolute right-0 px-3">
              <img src="/assets/icons/send-message/send.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
