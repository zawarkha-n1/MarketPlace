import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-l from-[#1E1a39] via-[#14141F] to-[#14141F] text-white px-12 py-6 border-b border-[#4A4763]">
      <div className="flex justify-between items-center w-full">
        {" "}
        <div className="flex items-center space-x-20 w-1/2">
          {" "}
          <h1 className="text-xl font-bold">MarketPlace</h1>
          {/* Search and Dropdown */}
          <div className="flex items-center bg-transparent rounded-md px-2 w-full">
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
                className="bg-[#343444] text-white rounded-r-md pl-10 py-1 focus:outline-none w-[70%]"
              />
            </div>
          </div>
        </div>
        {/* Right Section (Links and Buttons) */}
        <div className="flex items-center space-x-14 ml-auto">
          {" "}
          {/* ml-auto to push right content */}
          {/* Links */}
          <div className="relative group">
            <button className="hover:text-gray-400 flex items-center">
              Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <a href="/" className="text-indigo hover:text-gray-400">
            My Library
          </a>
          <a href="/" className="hover:text-gray-400">
            Pricing
          </a>
          <a href="/" className="hover:text-gray-400 flex items-center">
            <img src="/Ailabs.png" alt="AI Labs" className="w-5 h-5 mr-2" />
            AI Labs
          </a>
          {/* Buttons */}
          <div className="flex items-center space-x-14">
            <button
              className="px-6 py-2 text-white font-bold"
              style={{
                borderRadius: "52px",
                background:
                  "linear-gradient(88deg, #1F3AA8 -21.29%, #801CCC 131.88%)",
                boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              PLATFORM 3
            </button>
            <button
              className="px-4 py-2 text-[#5750A2] bg-transparent hover:bg-[#5750A2] hover:text-white font-medium transition-colors duration-200"
              style={{
                borderRadius: "24px",
                border: "1px solid #5750A2",
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
