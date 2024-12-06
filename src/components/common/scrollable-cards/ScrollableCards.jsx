import React, { useState } from "react";

const ScrollableCards = ({ cards, CardComponent, title = "Default Title" }) => {
  // State for pagination in Scrollable Cards
  const [currentIndex, setCurrentIndex] = useState(0);

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
          <CardComponent
            key={index}
            title={card.title}
            discount={card.discount}
            price={card.price}
            starcount={card.starCount}
            heartcount={card.heartCount}
            savedcount={card.savedCount}
            smileycount={card.smileyCount}
            inlibrary={false} // Assume no library functionality for now
            bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"} // Alternating background color
            image={card.image}
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
