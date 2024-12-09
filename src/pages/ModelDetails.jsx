import React, { useState } from "react";
import RoundedOutlineButton from "../components/common/buttons/RoundedOutlineButton";
import Headingpage from "../components/HeadingPage";
import ScrollableCards from "../components/common/scrollable-cards/ScrollableCards";
import Card from "../components/Card";
import { totalCards } from "../data/totalcards";
import { useLocation } from "react-router-dom";

const ModelDetails = () => {
  const [isRated, setIsRated] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const handleRateProductClick = () => {
    setIsRated(true);
    setIsSelected(true);
  };

  const location = useLocation();
  const data = location.state;

  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-start">
      <Headingpage pagename={"Model Details"} secondheading={"Model Details"} />
      <div className="w-full flex items-center justify-center text-white">
        <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[66%] flex flex-col md:flex-row items-start gap-16">
          <div className="relative flex-1">
            <img src="/experience.png" alt="" className="w-full rounded-xl" />

            <div className="absolute top-4 right-4 flex gap-4">
              <div className="bg-[#70598C] text-white px-3 py-2 rounded-lg flex items-center gap-2">
                <img src="/eye.png" alt="icon1" className="w-5 h-4" />
                <span className="font-semibold">5</span>
              </div>
              <div className="bg-[#70598C] text-white px-3 py-2 rounded-lg flex items-center gap-2">
                <img src="/save-filled.png" alt="icon2" className="w-4 h-4" />
                <span className="font-semibold">{data.savedCount}</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-[#70598C] text-white p-3 rounded-lg flex items-center gap-2">
              <img src="/creatorImage.png" alt="Powered By" className="w-12" />
              <span className="font-700 text-[14px]">
                <span className="text-[#8A8AA0] text-[13px] font-400 block">
                  Powered
                </span>{" "}
                By Zeniva
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1 items-start gap-6">
            <div className="text-white text-3xl sm:text-4xl md:text-[36px]">
              {/* "The Fantasy Flower illustration" */}
              {data.title}
            </div>

            <div className="flex items-start justify-between w-full">
              <div className="flex flex-row gap-3">
                <div className="w-full">
                  <div className="py-1 px-3 bg-slate-800 flex gap-2 rounded-lg items-center justify-center">
                    <img src="/star.png" alt="" className="w-4 h-4" />
                    <span className="text-white">{data.starCount}</span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="py-1 px-3 bg-slate-800 flex gap-2 rounded-lg items-center justify-center">
                    <img src="/heart.png" alt="" className="w-4 h-4" />
                    <span className="text-white">{data.heartCount}</span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="py-1 px-3 bg-slate-800 flex gap-2 rounded-lg items-center justify-center">
                    <img src="/smiley.png" alt="" className="w-4 h-4" />
                    <span className="text-white">{data.smileyCount}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="bg-[#343444] rounded-full text-center flex items-center justify-center w-8 h-8">
                  <img src="/assets/icons/send/send-regular.png" alt="" />
                </button>
                <button className="bg-[#343444] w-8 h-8 rounded-full flex items-center justify-center text-justify">
                  <span className="text-center">...</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 my-4">
              <p className="font-urbanist font-medium text-[18px] leading-[26px]">
                Price
              </p>
              <h3 className="font-urbanist font-bold text-[24px] leading-[26px]">
                {data.price} EXA
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-7">
              <RoundedOutlineButton
                buttonBG="#5750A2"
                flexProp="flex-1"
                buttonName="Buy Now"
                customPaddingY="12px"
              />

              <RoundedOutlineButton
                flexProp="flex-1"
                buttonName="Add to Cart"
                buttonBG="#343444"
                customPaddingY="12px"
              />
            </div>

            <div className="pt-4 w-full">
              <div className="flex gap-6 border-b border-custbg-[#70598C]">
                <button
                  className={`pb-2 ${
                    activeTab === "details"
                      ? "text-primary border-b-2 border-customIndigo text-customIndigo"
                      : "text-white"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  className={`pb-2 ${
                    activeTab === "offers"
                      ? "text-primary border-b-2 border-customIndigo text-customIndigo"
                      : "text-white"
                  }`}
                  onClick={() => setActiveTab("offers")}
                >
                  Offers
                </button>
              </div>

              <div className="pt-4">
                {activeTab === "details" ? (
                  <div className="text-sm text-white">
                    <div>
                      Habitant sollicitudin faucibus cursus lectus pulvinar
                      dolor non ultrices eget. Facilisi lobortisal morbi
                      fringilla urna amet sed ipsum vitae ipsum malesuada.
                      Habitant sollicitudin faucibus cursus lectus pulvinar
                      dolor non ultrices eget. Facilisi lobortisal morbi
                      fringilla urna amet sed ipsum. Habitant sollicitudin
                      faucibus cursus lectus pulvinar dolor non ultrices eget.
                      Facilisi lobortisal morbi fringilla urna amet sed ipsum
                      vitae ipsum malesuada. Habitant sollicitudin faucibus
                      cursus lectus pulvinar dolor non ultrices eget. Facilisi
                      lobortisal morbi fringilla urna amet sed ipsum
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-300">
                    <p>No active offers at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-16">
        <ScrollableCards
          cards={totalCards} // Passing the cards to the component
          CardComponent={Card} // Passing the Card component as the prop
          title="Recent Products"
        />
      </div>
    </div>
  );
};

export default ModelDetails;
