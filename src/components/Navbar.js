import React from "react";

const Navbar = () => {
  return (
    <nav
      className="bg-[#14141F] text-white px-6 py-8 h-10 mt-1"
      //   style={{
      //     opacity: "0.7",
      //   }}
    >
      <div className="container  flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8 -mt-10">
          <h1 className="text-xl font-bold">MarketPlace</h1>
        </div>

        {/* Search and Dropdown */}
        <div className="flex items-center bg-transparent rounded-md px-2  -mt-10">
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
            <div className="absolute hidden group-hover:block mt-2 w-48 bg-[#8A8AA0] text-black rounded-md shadow-md z-10">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Category 1
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Category 2
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Category 3
                </li>
              </ul>
            </div>
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

        {/* Links */}
        <div className="flex items-center space-x-6 -mt-10">
          {/* Explore with Dropdown */}
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
            {/* Dropdown Menu */}
            <div className="absolute hidden group-hover:block bg-gray-800 text-white rounded shadow-md mt-2">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Subitem 1
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Subitem 2
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Subitem 3
                </li>
              </ul>
            </div>
          </div>

          {/* My Library */}
          <a href="/" className=" text-indigo hover:text-gray-400">
            My Library
          </a>

          {/* Pricing */}
          <a href="/" className="hover:text-gray-400">
            Pricing
          </a>

          {/* AI Labs with Image */}
          <a href="/" className="hover:text-gray-400 flex items-center">
            <img src="/Ailabs.png" alt="AI Labs" className="w-5 h-5 mr-2" />
            AI Labs
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4 ">
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
    </nav>
  );
};

export default Navbar;
