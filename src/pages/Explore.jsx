import React, { useState } from "react";
import Headingpage from "../components/HeadingPage";
import Card from "../components/Card";
import { totalCards } from "../data/totalcards";
import DropDownMenu from "../components/common/menus/DropDownMenu";

const menuItems = [
  { name: "Sort by" },
  { name: "Top rate" },
  { name: "Mid rate" },
  { name: "Low rate" },
];

const Explore = () => {
  const [visibleCards, setVisibleCards] = useState(8);
  const [isActive, setIsActive] = useState("All");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isAllNetworkMenuOpen, setIsAllNetworkMenuOpen] = useState(false);

  const handleShowMore = () => {
    setVisibleCards(visibleCards + 4); // Show 4 more cards
  };

  const handleSortClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent element
    setIsSortMenuOpen((prevState) => !prevState);
  };
  // Filter cards based on the selected type
  const filteredCards =
    isActive === "All"
      ? totalCards // Show all cards if "All" is selected
      : totalCards.filter((card) => card.type === isActive); // Filter by type

  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-center">
      <div className="text-white font-Urbanist">
        <Headingpage pagename={"Explore"} secondheading={"Pages"} />
      </div>

      {/* Category Buttons */}
      <div className="w-[70%] mb-8 flex justify-between">
        <div
          className="font-Urbanist text-white font-bold text-[43px] leading-[36px] 
       sm:text-[36px] sm:leading-[32px] 
       md:text-[40px] md:leading-[34px] 
       lg:text-[43px] lg:leading-[36px]"
        >
          3D Models
        </div>
        <div
          className="flex  gap-3 text-white text-[15px] font-400 relative"
          onClick={() => setIsAllNetworkMenuOpen((prevState) => !prevState)}
        >
          <div className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center">
            All Artworks{" "}
            <img
              src="/assets/icons/drop-down/drop-down.png"
              className="w-2 h-2"
              alt=""
            />
            {isAllNetworkMenuOpen && (
              <div className="absolute top-11 left-0 rounded-[20px] z-10">
                <DropDownMenu items={menuItems} />
              </div>
            )}
          </div>
          <div
            className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center relative"
            onClick={handleSortClick}
          >
            Sort by
            <img
              src="/assets/icons/drop-down/drop-down.png"
              className="w-2 h-2"
              alt=""
            />
            {isSortMenuOpen && (
              <div className="absolute top-11 left-0 rounded-[20px] z-10">
                <DropDownMenu items={menuItems} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-8 w-[70%]">
        <div className="grid grid-rows-1 grid-cols-4  gap-16">
          {filteredCards.slice(0, visibleCards).map((card, index) => (
            <Card
              key={index}
              title={card.title}
              discount={card.discount}
              price={card.price}
              starcount={card.starCount}
              heartcount={card.heartCount}
              savedcount={card.savedCount}
              smileycount={card.smileyCount}
              bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"}
              image={card.image}
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
