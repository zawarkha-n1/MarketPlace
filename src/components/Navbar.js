import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AILabModal from "./modals/AILabModal";
import ProfileMenu from "./common/menus/ProfileMenu";
import DropDownMenu from "./common/menus/DropDownMenu";
import LoginModal from "./modals/LoginModal";
import { useAppData } from "../context/AppContext";
import CartModal from "./modals/CartModal";
import axios from "axios";
const menuItems = [
  { name: "All Products", type: "All" },
  { name: "3D Models", type: "3d" },
  { name: "Textures", type: "texture" },
  { name: "Experience", type: "experience" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const {
    user,
    isLogin,
    exaCredits,
    cartAssets,
    setExaCredits,
    setIsCartModalOpen,
    isCartModalOpen,
    handleCloseModal,
  } = useAppData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isExploreMenuOpen, setIsExploreMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchExaCredits = async () => {
      if (isLogin && user) {
        try {
          const response = await axios.get(
            `http://localhost:5001/get-exa-credits/${user.email}`
          );
          if (response.data && response.data.exaCredits !== undefined) {
            setExaCredits(response.data.exaCredits); // Set global exaCredits state
          }
        } catch (error) {
          console.error("Error fetching exa credits:", error);
        }
      }
    };

    fetchExaCredits();
  }, [isLogin, user, setExaCredits]); // This effect will run when isLogin or user changes

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

  const handleExploreBtnClick = (itemName) => {
    const selectedItem = menuItems.find((item) => item.name === itemName);
    if (selectedItem) {
      setSelectedItem(selectedItem.name);
      navigate(`/explore/${selectedItem.type}`); // Pass the type to the URL
      setIsExploreMenuOpen(false); // Close the dropdown
    }
  };

  const exploreMenuRef = useRef(null); // Ref to track the dropdown container

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        exploreMenuRef.current &&
        !exploreMenuRef.current.contains(event.target)
      ) {
        setIsExploreMenuOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const profilemenuref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profilemenuref.current &&
        !profilemenuref.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const cartmodalref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        cartmodalref.current &&
        !cartmodalref.current.contains(event.target)
      ) {
        setIsCartModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-l from-[#1E1a39] via-[#14141F] to-[#14141F] text-white px-12 py-6 border-b border-[#4A4763]">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-12 w-1/3  ml-20">
          <Link to="/">
            <img
              src="/bazaar.png"
              alt="Logo"
              className="h-auto object-contain"
            />
          </Link>

          {/* <div className="flex items-center bg-[#343444] rounded-md w-full max-w-[400px] px-2 py-1">
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
        </div> */}

          <div className="flex items-center bg-transparent rounded-md px-2">
            {/* Dropdown */}
            <div className="relative group">
              <button className="bg-[#343444] text-[#8A7FFF] px-3 py-1 rounded-l-md flex items-center">
                All Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Search Input */}
            <div className="flex-grow relative">
              {/* Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8A8AA085]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {/* Input Field */}
              <input
                type="text"
                placeholder="Search products"
                className="bg-[#343444] text-[#8A8AA085] rounded-r-md pl-10 py-1 focus:outline-none w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-white w-auto  ml-20">
          <div
            ref={exploreMenuRef}
            className="font-urbanist font-bold text-[18px] hover:text-gray-400 transition-all duration-300 flex items-center relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent clicks from closing the dropdown
              setIsExploreMenuOpen((state) => !state); // Toggle dropdown
            }}
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
            <div
              className="absolute top-10 left-0 z-50"
              onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing on item click
            >
              {isExploreMenuOpen && (
                <DropDownMenu
                  items={menuItems}
                  onClick={handleExploreBtnClick}
                  closeDropdown={() => setIsExploreMenuOpen(false)} // Ensure dropdown closes
                />
              )}
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
            className="font-urbanist font-bold text-[18px] hover:text-[#5750A2] text-[#9747FF] transition-all duration-300 flex items-center relative cursor-pointer"
          >
            <img
              src="/Ailabs.png"
              alt="AI Labs"
              className="w-5 h-5 mr-2"
              onClick={openModal}
            />
            AI Labs
          </p>
          <div className="w-fit ">
            {isModalOpen && (
              <AILabModal modalIsOpen={isModalOpen} closeModal={closeModal} />
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6 ml-auto">
          {isLogin && (
            <button className="flex items-center text-[#8A7FFF] font-urbanist font-bold text-[15px] leading-[22px] border border-[#3E3E52] rounded-[24px] px-2 py-2 hover:text-gray-400 transition-all duration-300">
              <img src="/coin.png" alt="Coin" className="w-full h-full mr-1" />
              <div className="text-center flex-grow">{exaCredits}</div>{" "}
              {/* Replace with dynamic number */}
              <div className="w-full h-full ml-2 rounded-full bg-[#3E3E52] p-1.5 hover:bg-gray-400">
                <img src="/plus.png" alt="Plus" onClick={plans} />
              </div>
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
            <button
              className="w-12 h-12  rounded-full flex items-center justify-center bg-[#8A8AA0] relative "
              onClick={() => navigate("/cart")}
            >
              <img src="/Cart.png" alt="Platform" className="w-6 h-6" />
              {cartAssets.length > 0 && (
                <span className="absolute -top-2 -right-2  bg-red-700 rounded-full text-white w-6 h-6">
                  {cartAssets.length}
                </span>
              )}
              <div
                className="absolute top-20 -right-10"
                ref={cartmodalref}
                onClick={(e) => e.stopPropagation()} // Stop event propagation
              >
                {isCartModalOpen && <CartModal />}
              </div>
            </button>
          )}

          {isLogin && (
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-[#8A8AA0] relative">
              <img
                src={
                  JSON.parse(sessionStorage.getItem("user"))?.picture ||
                  "/woman.png"
                } // Use user.picture if available, otherwise fallback to woman.png
                alt={user?.name || "User Profile"} // Use user's name for accessibility
                className="w-full h-full rounded-full" // Ensure the image is styled as a circle
                onClick={() => setIsProfileMenuOpen((prevState) => !prevState)}
              />
            </button>
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
        <div
          className="w-fit absolute top-20 right-8 z-50"
          ref={profilemenuref}
        >
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
