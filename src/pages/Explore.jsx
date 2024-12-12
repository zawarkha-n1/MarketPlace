import React, { useEffect, useRef, useState } from "react";
import Headingpage from "../components/HeadingPage";
import Card from "../components/Card";
import DropDownMenu from "../components/common/menus/DropDownMenu";
import { useParams, useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppContext";

const menuItems = [
  { name: "Sort by" },
  { name: "Top rate" },
  { name: "Mid rate" },
  { name: "Low rate" },
];

const menuItemsCategory = [
  { name: "All Products", type: "All" },
  { name: "3D Models", type: "3d" },
  { name: "Textures", type: "texture" },
  { name: "Experience", type: "experience" },
];

const Explore = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(8);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isAllNetworkMenuOpen, setIsAllNetworkMenuOpen] = useState(false);
  const { assets } = useAppData();
  const sortRef = useRef(null);
  const dropDownRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  }, []);

  const [networkFilter, setNetworkFilter] = useState("All Products"); // Track the selected network
  const { itemName } = useParams();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsAllNetworkMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Handle showing more cards
  const handleShowMore = () => {
    setVisibleCards(visibleCards + 4);
  };

  const pageTitle =
    networkFilter === "All Products"
      ? itemName === "texture"
        ? "Textures"
        : itemName === "3d"
        ? "3D Models"
        : itemName === "experience"
        ? "Experience"
        : "All Products"
      : networkFilter;

  const filteredCards = assets.filter((card) => {
    const matchesItemName =
      !itemName ||
      itemName.toLowerCase() === "all" ||
      card.asset_data.type.toLowerCase() === itemName.toLowerCase();
    const matchesNetworkFilter =
      networkFilter === "All Products" ||
      card.asset_data.type.toLowerCase() === networkFilter.toLowerCase();

    return matchesItemName && matchesNetworkFilter;
  });

  const handleNetworkChange = (selectedNetwork) => {
    setIsAllNetworkMenuOpen(false); // Close the dropdown

    // Update the route based on the selected network
    if (selectedNetwork === "All Products") {
      navigate("/explore/All");
    } else if (selectedNetwork === "3D Models") {
      navigate("/explore/3d");
    } else if (selectedNetwork === "Textures") {
      navigate("/explore/texture");
    } else if (selectedNetwork === "Experience") {
      navigate("/explore/experience");
    }
  };

  const handleSortClick = (e) => {
    e.stopPropagation();
    setIsSortMenuOpen((prevState) => !prevState);
  };
  const handleCardClick = (card) => {
    navigate(`/product/${card.asset_data.title}`, {
      state: card,
    });
  };
  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-center">
      <div className="text-white font-Urbanist">
        <Headingpage pagename={"Explore"} secondheading={"Pages"} />
      </div>

      {/* Category and Network Buttons */}
      <div className="w-[70%] mb-8 flex justify-between">
        <div
          className="font-Urbanist text-white font-bold text-[43px] leading-[36px] 
       sm:text-[36px] sm:leading-[32px] 
       md:text-[40px] md:leading-[34px] 
       lg:text-[43px] lg:leading-[36px]"
        >
          {pageTitle}
        </div>
        <div className="flex gap-3 text-white text-[15px] font-400 relative">
          <div
            className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center cursor-pointer relative"
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent click from interfering
              setIsAllNetworkMenuOpen((prevState) => !prevState);
            }}
            ref={dropDownRef}
          >
            {networkFilter}
            <img
              src="/assets/icons/drop-down/drop-down.png"
              className="w-2 h-2"
              alt=""
            />
            {isAllNetworkMenuOpen && (
              <div className="absolute top-11 left-0 rounded-[20px] z-10">
                <DropDownMenu
                  items={menuItemsCategory}
                  onClick={handleNetworkChange} // Pass the handler to update network filter
                  closeDropdown={() => setIsAllNetworkMenuOpen(false)} // Close the dropdown
                />
              </div>
            )}
          </div>
          <div
            className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center relative cursor-pointer"
            onClick={handleSortClick}
            ref={sortRef}
          >
            Sort by
            <img
              src="/assets/icons/drop-down/drop-down.png"
              className="w-2 h-2"
              alt=""
            />
            {isSortMenuOpen && (
              <div className="absolute top-11 left-0 rounded-[20px] z-10">
                <DropDownMenu
                  items={menuItems}
                  closeDropdown={() => setIsSortMenuOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Display Cards */}
      <div className="flex items-center justify-center mb-8 w-[70%]">
        <div className="grid grid-rows-1 grid-cols-4 gap-16">
          {filteredCards.slice(0, visibleCards).map((card, index) => (
            <Card
              key={index}
              title={card.asset_data.title}
              discount={card.asset_data.discount}
              price={card.asset_data.price}
              starcount={card.asset_data.metadata.stars}
              heartcount={card.asset_data.metadata.favourite}
              savedcount={card.asset_data.metadata.bookmark}
              smileycount={card.asset_data.metadata.smiley}
              bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"}
              image={card.asset_data.url}
              creatorImage={card.asset_data.creatorLogo}
              creatorName={card.asset_data.creatorName}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>

      {/* Show More Button */}
      {visibleCards < filteredCards.length && (
        <div className="flex justify-center mb-8">
          <button
            onClick={handleShowMore}
            className="bg-transparent border border-white text-white px-6 py-2 rounded-full"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
