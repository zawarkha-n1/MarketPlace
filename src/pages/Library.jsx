import React, { useState } from "react";
import LibraryCard from "../components/common/library-cards/LibraryCard";
import Headingpage from "../components/HeadingPage";
import Card from "../components/Card";
import { totalCards } from "../data/totalcards";

const Library = () => {
  const [visibleCards, setVisibleCards] = useState(8);
  const [isActive, setIsActive] = useState();

  const handleShowMore = () => {
    setVisibleCards(visibleCards + 4); // Show 4 more cards
  };

  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-center">
      <div className="text-white font-Urbanist">
        <Headingpage pagename={"My Library"} secondheading={"My Library"} />
      </div>
      <div className="w-[70%] mb-8 ">
        <div className=" flex space-x-4 w-auto">
          {["All", "Art", "Music", "Collectibles", "Sports"].map(
            (btn, index) => {
              return (
                <button
                  key={index}
                  className={`text-white   px-3 py-1.5 rounded-lg ${
                    isActive == btn ? "bg-[#5142FC]" : "bg-[#343444]"
                  }`}
                  onClick={() => setIsActive(btn)}
                >
                  {btn}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="px-20 flex flex-row gap-10 flex-wrap justify-start w-[78%] items-center">
          {totalCards.slice(0, visibleCards).map((card, index) => {
            return (
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
            );
          })}
        </div>
      </div>
      {visibleCards < totalCards.length && (
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

export default Library;
