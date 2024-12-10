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
  let loggedin = false;
  const plans = () => {
    navigate("/plans");
  };
  const { user, isLogin } = useAppData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isExploreMenuOpen, setIsExploreMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
    // <nav className="bg-gradient-to-l from-[#1E1a39] via-[#14141F] to-[#14141F] text-white px-12 py-6 border-b border-[#4A4763]">
    //   <div className="flex justify-between items-center w-full">
    //     {" "}
    //     <div className="flex items-center space-x-20 w-1/2 pl-28">
    //       {" "}
    //       <Link to={"/"}>
    //         <img
    //           src="/bazaar.png"
    //           alt="Zeniva Logo"
    //           className="h-auto object-contain" // Adjust the size as needed
    //         />
    //       </Link>
    //       {/* Search and Dropdown */}
    //       <div className="flex items-center bg-transparent rounded-md px-2 w-full">
    //         {/* Dropdown */}
    //         <div className="relative group">
    //           <button className="bg-[#343444] text-[#8A7FFF] px-3 py-1 rounded-l-md flex items-center">
    //             All Products
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth={2}
    //               stroke="currentColor"
    //               className="w-4 h-4 ml-2"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M19 9l-7 7-7-7"
    //               />
    //             </svg>
    //           </button>
    //         </div>

    //         {/* Search Input */}
    //         <div className="flex-grow relative">
    //           {/* Search Icon */}
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={2}
    //             stroke="currentColor"
    //             className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8A8AA085]"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    //             />
    //           </svg>

    //           {/* Input Field */}
    //           <input
    //             type="text"
    //             placeholder="Search products"
    //             className="bg-[#343444] text-white rounded-r-md pl-10 py-1 focus:outline-none w-[70%]"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     {/* Right Section (Links and Buttons) */}
    //     <div className="flex items-center space-x-14 ml-auto ">
    //       {" "}
    //       {/* ml-auto to push right content */}
    //       {/* Links */}
    //       <div
    //         className="relative group"
    //         onClick={() => setIsExploreMenuOpen((state) => !state)}
    //       >
    //         <button className="text-[var(--On-Surface, #FFF)] font-urbanist font-bold text-[18px] leading-[26px] hover:text-gray-400 transition-all duration-300 flex items-center">
    //           Explore
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={2}
    //             stroke="#FFF"
    //             className="w-4 h-4 ml-1"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M19 9l-7 7-7-7"
    //             />
    //           </svg>
    //         </button>
    //         {isExploreMenuOpen && (
    //           <div className="absolute top-8 left-0 rounded-[20px] z-10">
    //             <ExploreDropDownMenu items={menuItems} />
    //           </div>
    //         )}
    //       </div>
    //       <Link
    //         to="/library"
    //         className="text-[var(--On-Surface, #FFF)] font-urbanist font-bold text-[18px] leading-[26px] hover:text-gray-400 transition-all duration-300"
    //       >
    //         My Library
    //       </Link>
    //       <Link
    //         to="/plans"
    //         className="text-[var(--On-Surface, #FFF)] font-urbanist font-bold text-[18px] leading-[26px] hover:text-gray-400 transition-all duration-300"
    //       >
    //         Pricing
    //       </Link>
    //       <p
    //         onClick={() => setIsModalOpen((state) => !state)}
    //         // to={"/"}
    //         className="text-[var(--On-Surface, #FFF)] font-urbanist font-bold text-[18px] leading-[26px] hover:text-gray-400 transition-all duration-300 flex items-center"
    //       >
    //         <img
    //           src="/Ailabs.png"
    //           alt="AI Labs"
    //           className="w-5 h-5 mr-2"
    //           onClick={openModal}
    //         />
    //         AI Labs
    //       </p>
    //       {/* Buttons */}
    //       <div className="flex items-center space-x-14">
    //         <button
    //           className="px-6 py-2 font-bold"
    //           style={{
    //             borderRadius: "52px",
    //             background:
    //               "linear-gradient(88deg, #1F3AA8 -21.29%, #801CCC 131.88%)",
    //             boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.25)",
    //             width: "auto", // Set width to auto to fit the image
    //             height: "auto", // Set height to auto to fit the image
    //           }}
    //         >
    //           <img
    //             src="/platform.png" // Image path from the public folder
    //             alt="Platform 3" // Alt text for accessibility
    //             className="w-full h-full object-contain" // Adjust size based on your needs
    //           />
    //         </button>
    //         <div className="relative">
    //           <button
    //             onClick={() => setIsProfileMenuOpen((state) => !state)}
    //             className="px-4 py-2 text-[#5750A2] bg-transparent hover:bg-[#5750A2] hover:text-white font-urbanist font-bold text-[15px] leading-[22px] border border-[#5750A2] rounded-[24px] transition-colors duration-200"
    //           >
    //             Login
    //           </button>
    //           {isProfileMenuOpen && (
    //             <div className="absolute top-12 -left-40 rounded-[20px] z-10">
    //               <ProfileMenu />
    //             </div>
    //           )}
    //         </div>
    //         <div className="w-fit">
    //           {isModalOpen && (
    //             <AILabModal modalIsOpen={isModalOpen} closeModal={closeModal} />
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
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
          <Link
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
            <div className="absolute top-10 left-0">
              {isExploreMenuOpen && <ExploreDropDownMenu items={menuItems} />}
            </div>
          </Link>
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
          {loggedin && (
            <button className="flex items-center text-[#8A7FFF] font-urbanist font-bold text-[15px] leading-[22px] border border-[#5750A2] rounded-[24px] px-1 py-2 hover:text-gray-400 transition-all duration-300">
              <img src="/coin.png" alt="Coin" className="w-full h-full mr-2" />
              <div className="text-center flex-grow">50</div>{" "}
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

          {loggedin && (
            <button className="w-12 h-12  rounded-full flex items-center justify-center bg-[#8A8AA0]">
              <img src="/Cart.png" alt="Platform" className="w-6 h-6" />
            </button>
          )}

          {loggedin && (
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-[#8A8AA0]">
              <img src="/woman.png" alt="Platform" className="w-full h-full" />
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
      </div>
    </nav>
  );
};

export default Navbar;
