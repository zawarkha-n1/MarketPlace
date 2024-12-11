// import React, { useState } from "react";
// import Headingpage from "../components/HeadingPage";
// import Card from "../components/Card";
// import { totalCards } from "../data/totalcards";
// import DropDownMenu from "../components/common/menus/DropDownMenu";
// import { useParams } from "react-router-dom";

// const menuItems = [
//   { name: "Sort by" },
//   { name: "Top rate" },
//   { name: "Mid rate" },
//   { name: "Low rate" },
// ];

// const menuItemsCategory = [
//   { name: "All Products" },
//   { name: "3D Models" },
//   { name: "Textures" },
//   { name: "Experience" },
// ];

// const Explore = () => {
//   const [visibleCards, setVisibleCards] = useState(8);
//   const [isActive, setIsActive] = useState("All");
//   const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
//   const [isAllNetworkMenuOpen, setIsAllNetworkMenuOpen] = useState(false);
//   const { itemName } = useParams();

//   const handleShowMore = () => {
//     setVisibleCards(visibleCards + 4);
//   };

//   const pageTitle = itemName
//     ? itemName === "texture"
//       ? "Textures"
//       : itemName === "3d"
//       ? "3D Models"
//       : itemName === "experience"
//       ? "Experience"
//       : "All Products"
//     : "All Products";

//   const handleSortClick = (e) => {
//     e.stopPropagation();
//     setIsSortMenuOpen((prevState) => !prevState);
//   };
//   const filteredCards =
//     itemName === "All"
//       ? totalCards
//       : totalCards.filter(
//           (card) => card.type.toLowerCase().includes(itemName.toLowerCase()) // Normalize both sides for comparison
//         );

//   console.log("Filtered Cards", itemName);
//   return (
//     <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-center">
//       <div className="text-white font-Urbanist">
//         <Headingpage pagename={"Explore"} secondheading={"Pages"} />
//       </div>

//       {/* Category Buttons */}
//       <div className="w-[70%] mb-8 flex justify-between">
//         <div
//           className="font-Urbanist text-white font-bold text-[43px] leading-[36px]
//        sm:text-[36px] sm:leading-[32px]
//        md:text-[40px] md:leading-[34px]
//        lg:text-[43px] lg:leading-[36px]"
//         >
//           {pageTitle}
//         </div>
//         <div
//           className="flex  gap-3 text-white text-[15px] font-400 relative"
//           onClick={() => setIsAllNetworkMenuOpen((prevState) => !prevState)}
//         >
//           <div className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center">
//             {pageTitle}
//             <img
//               src="/assets/icons/drop-down/drop-down.png"
//               className="w-2 h-2"
//               alt=""
//             />
//             {isAllNetworkMenuOpen && (
//               <div className="absolute top-11 left-0 rounded-[20px] z-10">
//                 <DropDownMenu items={menuItemsCategory} />
//               </div>
//             )}
//           </div>
//           <div
//             className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center relative"
//             onClick={handleSortClick}
//           >
//             Sort by
//             <img
//               src="/assets/icons/drop-down/drop-down.png"
//               className="w-2 h-2"
//               alt=""
//             />
//             {isSortMenuOpen && (
//               <div className="absolute top-11 left-0 rounded-[20px] z-10">
//                 <DropDownMenu items={menuItems} />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center justify-center mb-8 w-[70%]">
//         <div className="grid grid-rows-1 grid-cols-4  gap-16">
//           {filteredCards.slice(0, visibleCards).map((card, index) => (
//             <Card
//               key={index}
//               title={card.title}
//               discount={card.discount}
//               price={card.price}
//               starcount={card.starCount}
//               heartcount={card.heartCount}
//               savedcount={card.savedCount}
//               smileycount={card.smileyCount}
//               bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"}
//               image={card.image}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Show More Button */}
//       {visibleCards < filteredCards.length && (
//         <div className="flex justify-center mb-8">
//           <button
//             onClick={handleShowMore}
//             className="bg-transparent border border-white text-white px-6 py-2 rounded-full"
//           >
//             Show More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Explore;

import React, { useState } from "react";
import Headingpage from "../components/HeadingPage";
import Card from "../components/Card";
import { totalCards } from "../data/totalcards";
import DropDownMenu from "../components/common/menus/DropDownMenu";
import { useParams } from "react-router-dom";

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
  const [visibleCards, setVisibleCards] = useState(8);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isAllNetworkMenuOpen, setIsAllNetworkMenuOpen] = useState(false);
  const [networkFilter, setNetworkFilter] = useState("All Products"); // Track the selected network
  const { itemName } = useParams();

  // Handle showing more cards
  const handleShowMore = () => {
    setVisibleCards(visibleCards + 4);
  };

  // Set page title based on itemName
  // const pageTitle = itemName
  //   ? itemName === "texture"
  //     ? "Textures"
  //     : itemName === "3d"
  //     ? "3D Models"
  //     : itemName === "experience"
  //     ? "Experience"
  //     : "All Products"
  //   : "All Products";

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

  // Filter cards based on both itemName (category) and networkFilter (network type)
  const filteredCards =
    (itemName === "All" || !itemName) &&
    (networkFilter === "All Products" || "All")
      ? totalCards
      : totalCards.filter(
          (card) =>
            (itemName &&
              card.type.toLowerCase().includes(itemName.toLowerCase())) ||
            (networkFilter !== "All Products" &&
              networkFilter.toLowerCase().includes(card.type.toLowerCase()))
        );

  const handleSortClick = (e) => {
    e.stopPropagation();
    setIsSortMenuOpen((prevState) => !prevState);
  };

  const handleNetworkChange = (network) => {
    console.log("Network filter", network);
    setNetworkFilter(network); // Update networkFilter when a network is selected
    setIsAllNetworkMenuOpen(false); // Close the dropdown after selection
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
        <div
          className="flex gap-3 text-white text-[15px] font-400 relative"
          onClick={() => setIsAllNetworkMenuOpen((prevState) => !prevState)}
        >
          <div className="bg-[#343444] px-4 py-2 rounded-lg flex gap-2 items-center justify-center">
            {networkFilter} {/* Display the selected network */}
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
                />
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

      {/* Display Cards */}
      <div className="flex items-center justify-center mb-8 w-[70%]">
        <div className="grid grid-rows-1 grid-cols-4 gap-16">
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
