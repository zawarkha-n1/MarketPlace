import React from "react";
import { useAppData } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({
  name = "Irfan Ullah",
  plan = "Free",
  setIsProfileMenuOpen,
}) => {
  const { handleLogout, user, handleClickOnMyProfile } = useAppData();

  const handleClick = () => {
    handleLogout();
    setIsProfileMenuOpen(false);
  };
  const navigate = useNavigate();

  const handleSavedproducts = () => {
    setIsProfileMenuOpen(false);
    navigate("/saved-products");
  };

  const handleClickOnMyProfileButton = () => {
    handleClickOnMyProfile();
    setIsProfileMenuOpen(false);
  };

  const capitalizeTitle = (title) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="bg-[#343444] rounded-[20px] lg:w-[327px] flex flex-col gap-3">
      <div className="flex items-center justify-between px-3 pt-4">
        <h1 className="flex-1 font-urbanist font-bold text-[16px] leading-[22px]">
          {capitalizeTitle(user.name)}
        </h1>
        <div className="bg-customIndigo text-white text-center px-2 py-1 rounded-2xl">
          {plan}
        </div>
      </div>
      <hr className="border-gray-500" />
      <div
        className="flex gap-3 justify-start items-center px-3 py-2 cursor-pointer hover:bg-[#4f4f66]"
        onClick={handleClickOnMyProfileButton}
      >
        <img src="/assets/icons/profile-logos/profile.png" alt="icon" />
        <h3 className="font-urbanist font-normal text-[14px] leading-[22px]">
          My Profile
        </h3>
      </div>
      <div className="flex gap-3 justify-start items-center px-3 py-2 cursor-pointer hover:bg-[#4f4f66]">
        <img src="/assets/icons/profile-logos/setting.png" alt="icon" />
        <h3 className="font-urbanist font-normal text-[14px] leading-[22px]">
          Settings
        </h3>
      </div>
      <div
        className="flex gap-3 justify-start items-center px-3 py-2 cursor-pointer hover:bg-[#4f4f66]"
        onClick={handleSavedproducts}
      >
        <img src="/assets/icons/profile-logos/saved.png" alt="icon" />
        <div className="font-urbanist font-normal text-[14px] leading-[22px]">
          Saved Products
        </div>
      </div>
      <div className="flex gap-3 justify-start items-center px-3 py-2 cursor-pointer hover:bg-[#4f4f66]">
        <img src="/assets/icons/profile-logos/profile.png" alt="icon" />
        <h3 className="font-urbanist font-normal text-[14px] leading-[22px]">
          Languges
        </h3>
      </div>
      <div className="flex items-center justify-between px-3 pt-0 pb-4 cursor-pointer">
        <button className="rounded-lg px-3 py-[5px] text-[14px] hover:bg-[#4f4f66]">
          Terms of Use
        </button>
        <button
          onClick={handleClick}
          className="border border-white rounded-3xl px-3 py-[4px] text-[14px] hover:bg-[#4f4f66]"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
