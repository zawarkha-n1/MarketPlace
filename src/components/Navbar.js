import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AILabModal from "./modals/AILabModal";
import ProfileMenu from "./common/menus/ProfileMenu";
import ExploreDropDownMenu from "./common/menus/DropDownMenu";
import LoginModal from "./modals/LoginModal";
import { useAppData } from "../context/AppContext";

const menuItems = [
  { name: "All Products" },
  { name: "3D Models" },
  { name: "Textures" },
  { name: "Music" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLogin, exaCredits } = useAppData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isExploreMenuOpen, setIsExploreMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const plans = () => {
    navigate("/plans");
  };

  // google login code

  //ends here
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  function openLoginModal() {
    setIsLoginModalOpen(true);
  }

  function closeLoginModal() {
    setIsLoginModalOpen(false);
  }
  return (
    <nav className="bg-gradient-to-l from-[#1E1a39] via-[#14141F] to-[#14141F] text-white px-12 py-6 border-b border-[#4A4763]">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-12 w-1/3  ml-20">
          <Link to="/">
            <img
              src="/thedigitalbazar.png"
              alt="Logo"
              className="h-auto object-contain"
            />
          </Link>

          <div className="flex items-center bg-[#343444] rounded-md w-full max-w-[400px] px-2 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-[#8A8AA085] mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products"
              className="bg-[#343444] text-white w-full py-1 rounded-md focus:outline-none pl-2"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6 text-white w-auto  ml-20">
          <div
            className="font-urbanist font-bold text-[18px] hover:text-gray-400 transition-all duration-300 flex items-center relative"
            onClick={() => setIsExploreMenuOpen((state) => !state)}
          >
            Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#FFF"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <div className="absolute top-10 left-0 z-50">
              {isExploreMenuOpen && <ExploreDropDownMenu items={menuItems} />}
            </div>
          </div>
          <Link
            to="/library"
            className="font-urbanist font-bold text-[18px] hover:text-gray-400 transition-all duration-300"
          >
            My Library
          </Link>
          <Link
            to="/plans"
            className="font-urbanist font-bold text-[18px] hover:text-gray-400 transition-all duration-300"
          >
            Pricing
          </Link>
          <p
            onClick={() => setIsModalOpen((state) => !state)}
            className="font-urbanist font-bold text-[18px] hover:text-gray-400 transition-all duration-300 flex items-center relative"
          >
            <img
              src="/Ailabs.png"
              alt="AI Labs"
              className="w-5 h-5 mr-2"
              onClick={openModal}
            />
            AI Labs
          </p>
        </div>

        <div className="flex items-center space-x-6 ml-auto">
          {isLogin && (
            <button className="flex items-center text-[#8A7FFF] font-urbanist font-bold text-[15px] leading-[22px] border border-[#5750A2] rounded-[24px] px-1 py-2 hover:text-gray-400 transition-all duration-300">
              <img src="/coin.png" alt="Coin" className="w-full h-full mr-2" />
              <div className="text-center flex-grow">{exaCredits}</div>{" "}
              {/* Replace with dynamic number */}
              <img
                src="/plus.png"
                alt="Plus"
                className="w-full h-full ml-2"
                onClick={plans}
              />
            </button>
          )}

          <button
            className="flex items-center text-[#8A7FFF] rounded-[24px]"
            onClick={() =>
              window.open(
                "https://odyssey-independent-platform.vercel.app/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <img
              src="/platformm.png"
              alt="Platform"
              className="w-full h-full"
            />
          </button>
          {!isLogin && (
            <button
              onClick={openLoginModal}
              className="text-white font-urbanist font-bold text-[15px] leading-[22px] border border-[#5750A2] rounded-[50px] px-4 py-3 hover:text-gray-400 transition-all duration-300"
            >
              Login
            </button>
          )}

          {isLogin && (
            <button className="w-12 h-12  rounded-full flex items-center justify-center bg-[#8A8AA0]">
              <img src="/Cart.png" alt="Platform" className="w-6 h-6" />
            </button>
          )}

          {isLogin && (
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-[#8A8AA0] relative">
              <img
                src={user?.picture || "/woman.png"} // Use user.picture if available, otherwise fallback to woman.png
                alt={user?.name || "User Profile"} // Use user's name for accessibility
                className="w-full h-full rounded-full" // Ensure the image is styled as a circle
                onClick={() => setIsProfileMenuOpen((prevState) => !prevState)}
              />
            </button>
          )}
        </div>
        <div className="w-fit">
          {isModalOpen && (
            <AILabModal modalIsOpen={isModalOpen} closeModal={closeModal} />
          )}
        </div>
        <div className="w-fit">
          {isLoginModalOpen && (
            <LoginModal
              modalIsOpen={isLoginModalOpen}
              closeModal={closeLoginModal}
            />
          )}
        </div>
        <div className="w-fit absolute top-20 right-8 z-50">
          {isProfileMenuOpen && (
            <ProfileMenu
              name="Irfan Ullah"
              plan="Free"
              setIsProfileMenuOpen={setIsProfileMenuOpen}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
