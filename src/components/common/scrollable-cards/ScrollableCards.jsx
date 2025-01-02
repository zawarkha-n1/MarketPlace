import React, { useState } from "react";
import Card from "../../Card";
import { useNavigate } from "react-router-dom";

const ScrollableCards = ({ cards, CardComponent, title = "Default Title" }) => {
  // State for pagination in Scrollable Cards
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Handle page changes for pagination (next and prev)
  const handlePageChange = (action) => {
    let index = currentIndex;
    const maxLength = cards.length;

    if (action === "next") {
      if (index + 4 >= maxLength) {
        index = 0; // Go back to the first page
      } else {
        index += 4; // Move to the next 4 cards
      }
    } else if (action === "prev") {
      if (index - 4 < 0) {
        index = maxLength - 4; // Go back to the last page
      } else {
        index -= 4; // Move to the previous 4 cards
      }
    }

    setCurrentIndex(index);
  };

  const handlePageClick = (pageIndex) => {
    setCurrentIndex(pageIndex * 4); // Page index corresponds to the section's offset
  };

  // Helper function to calculate total pages for Scrollable Cards
  const calculateTotalPages = () => {
    return Math.ceil(cards.length / 4); // Calculate total pages based on 4 items per page
  };

  const handleCardClick = async (card) => {
    window.scrollTo(0, 0);
    const assetTitle = card.asset_data.title;
    navigate(`/product/${assetTitle}`, {
      state: card,
    });
    return;
  };
  return (
    <div>
      {/* Scrollable Cards Title */}
      <div className="w-[60%] text-left ">
        <h2 className="font-urbanist font-bold text-[36px] leading-[44px] text-white mb-8">
          {title}
        </h2>
      </div>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mb-8">
        {/* Slice the cards array based on the currentIndex */}
        {cards.slice(currentIndex, currentIndex + 4).map((card, index) => (
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
            bgcolor={index % 2 === 0 ? "#2A2A37" : "#2A2A37"} // Alternating background color
            image={card.asset_data.url}
            creatorImage={card.asset_data.creatorLogo}
            creatorName={card.asset_data.creatorName}
            onClick={() => handleCardClick(card)}
            saved={card.isSaved}
            views={card.asset_data.metadata.views}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 w-full">
        {/* Back Button */}
        <button
          onClick={() => handlePageChange("prev")}
          className={`p-3 ${currentIndex === 0 ? "cursor-not-allowed" : ""}`}
          disabled={currentIndex === 0}
        >
          <img src="/prev.png" alt="Previous" />
        </button>

        {/* Page Indicator Circles */}
        <div className="flex gap-3 justify-center mx-3">
          {Array.from({ length: calculateTotalPages() }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageClick(pageIndex)}
              className="relative w-5 h-5"
            >
              {/* Outer Circle */}
              <div
                className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ease-in-out ${
                  currentIndex / 4 === pageIndex
                    ? "border-[#5750A2]"
                    : "border-transparent"
                }`}
              ></div>

              {/* Inner Circle */}
              <div
                className={`absolute inset-1 rounded-full transition-all duration-300 ease-in-out ${
                  currentIndex / 4 === pageIndex
                    ? "bg-[#5750A2] border-[#5750A2]"
                    : "bg-transparent border-2 border-white"
                }`}
              ></div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button onClick={() => handlePageChange("next")} className="p-3">
          <img src="/next.png" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default ScrollableCards;
