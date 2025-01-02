import React, { useEffect, useRef, useState } from "react";
import Headingpage from "../components/HeadingPage";
import Card from "../components/Card";
import { useAppData } from "../context/AppContext";
import axios from "axios";
import SortMenu from "../components/common/menus/SortMenu";

const menuItems = [
  { name: "Alphabetical", sortKey: "alphabetical" },
  { name: "Exa High to Low", sortKey: "highToLow" },
  { name: "Exa Low to High", sortKey: "lowToHigh" },
];

const SavedProducts = () => {
  const [visibleCards, setVisibleCards] = useState(8);
  const [isActive, setIsActive] = useState("All");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [displayedAssets, setDisplayedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { assets, isLogin, fetchUserAssets } = useAppData();

  const dropDownRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchUserSavedAssets = async () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const useremail = user?.email;

      if (!useremail) {
        console.log("User email not found in sessionStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user-assets`
        );
        const userAssetsData = response.data;

        const currentUserAssets = userAssetsData.find(
          (item) => item.useremail === useremail
        );

        if (currentUserAssets) {
          const libraryAssetIds =
            currentUserAssets.userassetsdata.savedassets || [];

          const userFilteredAssets = assets
            .filter((asset) => libraryAssetIds.includes(asset.id))
            .map((asset) => ({
              ...asset,
              isSaved: true,
            }));

          setFilteredAssets(userFilteredAssets);
          setDisplayedAssets(userFilteredAssets);
        } else {
          setFilteredAssets([]);
          setDisplayedAssets([]);
        }

        setLoading(false);
      } catch (error) {
        console.log("Error fetching user assets:", error);
        setLoading(false);
      }
    };

    fetchUserSavedAssets();
  }, [assets]);

  useEffect(() => {
    const updatedAssets =
      isActive === "All"
        ? filteredAssets
        : filteredAssets.filter((asset) => asset.asset_data.type === isActive);

    let sortedAssets = [...updatedAssets];
    if (sortOption === "alphabetical") {
      sortedAssets.sort((a, b) =>
        a.asset_data.title.localeCompare(b.asset_data.title)
      );
    } else if (sortOption === "highToLow") {
      sortedAssets.sort((a, b) => b.asset_data.price - a.asset_data.price);
    } else if (sortOption === "lowToHigh") {
      sortedAssets.sort((a, b) => a.asset_data.price - b.asset_data.price);
    }

    setDisplayedAssets(sortedAssets);
  }, [isActive, filteredAssets, sortOption]);

  const handleShowMore = () => {
    setVisibleCards(visibleCards + 4);
  };

  const handleSortClick = (sortKey) => {
    setSortOption(sortKey);
    setIsSortMenuOpen(false);
  };

  const closeSortMenu = () => {
    setIsSortMenuOpen(false);
  };

  useEffect(() => {
    if (isLogin) {
      fetchUserAssets();
      setVisibleCards(8);
    } else {
      setFilteredAssets([]);
      setDisplayedAssets([]);
    }
  }, [isLogin]);

  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-center">
      <div className="text-white font-urbanist">
        <Headingpage pagename={"Saved Products"} />
      </div>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          <div className="w-[71%] mb-8 flex justify-between">
            <div className="flex space-x-4 w-auto">
              {["All", "3d", "experience", "texture"].map((btn, index) => (
                <button
                  key={index}
                  className={`text-white px-3 py-1.5 rounded-lg ${
                    isActive === btn ? "bg-[#5750A2]" : "bg-[#343444]"
                  }`}
                  onClick={() => {
                    setIsActive(btn);
                    setVisibleCards(8);
                  }}
                >
                  {btn.charAt(0).toUpperCase() + btn.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex gap-3 text-white text-[15px] font-400 relative">
              <div
                className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center relative cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSortMenuOpen((prevState) => !prevState);
                }}
              >
                {menuItems.find((item) => item.sortKey === sortOption)?.name ||
                  "Sort by"}
                <img
                  src="/assets/icons/drop-down/drop-down.png"
                  className="w-[10px] h-[5.7px]"
                  alt=""
                />
                {isSortMenuOpen && (
                  <div
                    className="absolute top-11 left-0 rounded-[20px] z-10"
                    ref={dropDownRef}
                  >
                    <SortMenu
                      items={menuItems.map((item) => ({
                        ...item,
                        onClick: () => handleSortClick(item.sortKey),
                      }))}
                      closeDropdown={closeSortMenu}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8 w-[70%] 2xl:min-h-[600px]">
            <div className="grid grid-rows-2 grid-cols-4 gap-10">
              {displayedAssets.slice(0, visibleCards).map((card, index) => (
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.asset_data.title}
                  discount={card.asset_data.discount}
                  price={card.asset_data.price}
                  starcount={card.asset_data.metadata.stars}
                  heartcount={card.asset_data.metadata.favourite}
                  savedcount={card.asset_data.metadata.bookmark}
                  smileycount={card.asset_data.metadata.smiley}
                  inlibrary={false}
                  bgcolor={index % 2 === 0 ? "#2A2A37" : "#2A2A37"}
                  image={card.asset_data.url}
                  creatorImage={card.asset_data.creatorLogo}
                  creatorName={card.asset_data.creatorName}
                  saved={card.isSaved}
                  views={card.asset_data.metadata.views}
                />
              ))}
            </div>
          </div>

          {visibleCards < displayedAssets.length && (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleShowMore}
                className="bg-transparent border border-white text-white px-6 py-2 rounded-full"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavedProducts;
