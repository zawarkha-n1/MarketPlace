import React, { useEffect, useState } from "react";
import Headingpage from "../components/HeadingPage";
import Card from "../components/Card";
import { useAppData } from "../context/AppContext";
import DropDownMenu from "../components/common/menus/DropDownMenu";
import axios from "axios";

const menuItems = [
  { name: "Sort by" },
  { name: "Top rate" },
  { name: "Mid rate" },
  { name: "Low rate" },
];

const Library = () => {
  const [visibleCards, setVisibleCards] = useState(8);
  const [isActive, setIsActive] = useState("All");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isAllNetworkMenuOpen, setIsAllNetworkMenuOpen] = useState(false);
  const [filteredAssets, setFilteredAssets] = useState([]); // Fetched and filtered assets
  const [displayedAssets, setDisplayedAssets] = useState([]); // Assets based on the active filter
  const [loading, setLoading] = useState(true);
  const { assets } = useAppData(); // Fetch all assets from context

  useEffect(() => {
    const fetchUserAssets = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const useremail = user?.email;

      if (!useremail) {
        console.error("User email not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://172.16.15.155:5000/user-assets"
        );
        const userAssetsData = response.data;

        // Filter data for the current user
        const currentUserAssets = userAssetsData.find(
          (item) => item.useremail === useremail
        );

        if (currentUserAssets) {
          const libraryAssetIds =
            currentUserAssets.userassetsdata.libraryassets || [];

          // Filter assets based on libraryAssetIds
          const userFilteredAssets = assets.filter((asset) =>
            libraryAssetIds.includes(asset.id)
          );

          setFilteredAssets(userFilteredAssets); // Store fetched assets
          setDisplayedAssets(userFilteredAssets); // Initially display all assets
        } else {
          setFilteredAssets([]); // No library assets for this user
          setDisplayedAssets([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user assets:", error);
        setLoading(false);
      }
    };

    fetchUserAssets();
  }, [assets]);

  useEffect(() => {
    // Filter displayed assets based on isActive
    const updatedAssets =
      isActive === "All"
        ? filteredAssets
        : filteredAssets.filter((asset) => asset.asset_data.type === isActive);

    setDisplayedAssets(updatedAssets);
  }, [isActive, filteredAssets]);

  const handleShowMore = () => {
    setVisibleCards(visibleCards + 4); // Show 4 more cards
  };

  const handleSortClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent element
    setIsSortMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-center">
      <div className="text-white font-Urbanist">
        <Headingpage pagename={"My Library"} secondheading={"Pages"} />
      </div>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          {/* Category Buttons */}
          <div className="w-[70%]  mb-8 flex justify-between">
            <div className="flex space-x-4 w-auto">
              {["All", "3d", "experience", "texture"].map((btn, index) => (
                <button
                  key={index}
                  className={`text-white px-3 py-1.5 rounded-lg ${
                    isActive === btn ? "bg-[#5750A2]" : "bg-[#343444]"
                  }`}
                  onClick={() => {
                    setIsActive(btn);
                    setVisibleCards(8); // Reset to initial 8 cards when a new category is selected
                  }}
                >
                  {btn.charAt(0).toUpperCase() + btn.slice(1)}{" "}
                  {/* Capitalize first letter */}
                </button>
              ))}
            </div>
            <div className="flex gap-3 text-white text-[15px] font-400 relative">
              <div
                className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center"
                onClick={() =>
                  setIsAllNetworkMenuOpen((prevState) => !prevState)
                }
              >
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

          <div className="flex justify-center mb-8 w-[70%] 2xl:min-h-[800px]">
            <div className="grid grid-rows-1 grid-cols-4 gap-16">
              {displayedAssets.slice(0, visibleCards).map((card, index) => (
                <Card
                  key={index}
                  title={card.asset_data.title}
                  discount={card.asset_data.discount}
                  price={card.asset_data.price}
                  starcount={card.asset_data.metadata.stars}
                  heartcount={card.asset_data.metadata.favourite}
                  savedcount={card.asset_data.metadata.bookmark}
                  smileycount={card.asset_data.metadata.smiley}
                  inlibrary={true}
                  bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"} // Alternating background color
                  image={card.asset_data.url}
                  creatorImage={card.asset_data.creatorLogo}
                  creatorName={card.asset_data.creatorName}
                />
              ))}
            </div>
          </div>

          {/* Show More Button */}
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

export default Library;
