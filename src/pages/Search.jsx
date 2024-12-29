import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import DropDownMenu from "../components/common/menus/DropDownMenu";
import { useAppData } from "../context/AppContext";
import SortMenu from "../components/common/menus/SortMenu";

const menuItemsCategory = [
  { name: "All Products", type: "All" },
  { name: "3D Models", type: "3d" },
  { name: "Textures", type: "texture" },
  { name: "Experience", type: "experience" },
];

const Search = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(8);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isAllNetworkMenuOpen, setIsAllNetworkMenuOpen] = useState(false);
  const {
    assets,
    searchInput,
    setSearchInput,
    selectedCategory,
    setSelectedCategory,
  } = useAppData();
  const sortRef = useRef(null);
  const dropDownRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState("");
  const [isActive, setIsActive] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  }, []);

  useEffect(() => {
    setSearchParams({
      search: searchInput || "",
      category: selectedCategory || "All Products",
    });
  }, [searchInput, selectedCategory]);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All Products";

    setSearchInput(search);
    setSelectedCategory(category);
  }, [searchParams, setSearchInput, setSelectedCategory]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsAllNetworkMenuOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleShowMore = () => {
    setVisibleCards(visibleCards + 4);
  };

  const mapCategoryToType = {
    "All Products": "all",
    "3D Models": "3d",
    Textures: "texture",
    Experience: "experience",
  };

  let filteredCards = assets
    .filter((card) => {
      const type = card?.asset_data?.type.toLowerCase() || ""; // Normalize to lowercase
      const selectedType = mapCategoryToType[selectedCategory] || "all"; // Map to internal type

      return selectedType === "all" || type === selectedType;
    })
    .filter((card) => {
      const title = card?.asset_data?.title.toLowerCase() || ""; // Normalize to lowercase
      const searchNormalized = searchInput?.toLowerCase() || ""; // Normalize search input

      return !searchInput || title.includes(searchNormalized);
    });

  // Apply sorting based on selected option
  if (sortOption === "Alphabetical") {
    filteredCards = filteredCards.sort((a, b) =>
      a.asset_data.title.localeCompare(b.asset_data.title)
    );
  } else if (sortOption === "Exa High to Low") {
    filteredCards = filteredCards.sort(
      (a, b) => b.asset_data.price - a.asset_data.price
    );
  } else if (sortOption === "Exa Low to High") {
    filteredCards = filteredCards.sort(
      (a, b) => a.asset_data.price - b.asset_data.price
    );
  }

  const handleNetworkChange = (selectedNetwork) => {
    setSelectedCategory(selectedNetwork); // Update global state
    setSearchParams({ search: searchInput, category: selectedNetwork }); // Update URL
    setIsAllNetworkMenuOpen(false); // Close the dropdown
  };

  const handleSortClick = (sortOption) => {
    setSortOption(sortOption); // Update the sort option
    setIsSortMenuOpen(false); // Close the dropdown
  };

  const handleCardClick = (card) => {
    navigate(`/product/${card.asset_data.title}`, {
      state: card,
    });
  };

  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center">
      <div className="text-white font-urbanist my-10">
        <h1
          className="text-white font-bold capitalize font-urbanist"
          style={{
            fontSize: "48px",
          }}
        >
          Search results for "{searchInput.slice(0, 30)}"
        </h1>
      </div>

      {/* Category and Network Buttons */}
      <div className="w-[72%] mb-8 flex justify-between">
        <div
          className="font-urbanist text-white font-bold text-[43px] leading-[36px] 
       sm:text-[36px] sm:leading-[32px] 
       md:text-[40px] md:leading-[34px] 
       lg:text-[43px] lg:leading-[36px]"
        >
          {selectedCategory}
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
            {selectedCategory}
            <img
              src="/assets/icons/drop-down/drop-down.png"
              className="w-[10px] h-[5.7px]"
              alt=""
            />
            {isAllNetworkMenuOpen && (
              <div className="absolute top-11 left-0 rounded-[20px] z-10">
                <SortMenu
                  items={menuItemsCategory.map((item) => ({
                    ...item,
                    onClick: () => handleNetworkChange(item.name), // Attach onClick handler
                  }))}
                  closeDropdown={() => setIsAllNetworkMenuOpen(false)} // Close the dropdown
                />
              </div>
            )}
          </div>

          <div
            className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent click from interfering
              setIsSortMenuOpen((prevState) => !prevState); // Toggle the dropdown state
            }}
            ref={sortRef}
          >
            {sortOption || "Sort by"}
            <img
              src="/assets/icons/drop-down/drop-down.png"
              className="w-[10px] h-[5.7px]"
              alt=""
            />
            {isSortMenuOpen && (
              <div className="absolute top-11 left-0 rounded-[20px] z-10">
                <SortMenu
                  items={[
                    {
                      name: "Alphabetical",
                      onClick: () => handleSortClick("Alphabetical"),
                    },
                    {
                      name: "Exa High to Low",
                      onClick: () => handleSortClick("Exa High to Low"),
                    },
                    {
                      name: "Exa Low to High",
                      onClick: () => handleSortClick("Exa Low to High"),
                    },
                  ]}
                  closeDropdown={() => setIsSortMenuOpen(false)} // Close the dropdown
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
              id={card.id}
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
              views={card.asset_data.metadata.views}
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

export default Search;
