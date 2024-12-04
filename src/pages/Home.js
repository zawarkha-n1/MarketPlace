import { React, useState, useEffect } from "react";
import { totalCards } from "../data/totalcards.js";
import HeroCard from "../components/HeroCard.js";
import Card from "../components/Card.js";

const Home = () => {
  // States for pagination in each section
  const [topPicksIndex, setTopPicksIndex] = useState(0);
  const [topDealsIndex, setTopDealsIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [textureIndex, setTextureIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);

  let inlibrary = false;
  const [filter, setFilter] = useState("All");

  // State to store shuffled cards for Top Picks and Top Deals
  const [shuffledTopPicks, setShuffledTopPicks] = useState([]);
  const [shuffledTopDeals, setShuffledTopDeals] = useState([]);

  // Filtered cards based on the selected filter
  const filteredCards = totalCards.filter((card) => {
    if (filter === "All") return true;
    return card.type === filter;
  });

  // Shuffle cards function (this will be used only once to shuffle the data)
  const shuffleCards = (cards) => {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    return shuffledCards;
  };

  // Shuffle cards once when the component mounts or when the filter changes
  useEffect(() => {
    setShuffledTopPicks(shuffleCards(totalCards));
    setShuffledTopDeals(shuffleCards(totalCards));
  }, [filter]); // Dependency on filter so that it reshuffles when the filter is changed

  // Pagination logic for each section (same as before)

  const handleNext = (section) => {
    switch (section) {
      case "topPicks":
        if (topPicksIndex + 4 >= shuffledTopPicks.length) {
          setTopPicksIndex(0); // Go back to the first page when the end is reached
        } else {
          setTopPicksIndex(topPicksIndex + 4); // Move to the next 4 cards
        }
        break;
      case "topDeals":
        if (topDealsIndex + 4 >= shuffledTopDeals.length) {
          setTopDealsIndex(0);
        } else {
          setTopDealsIndex(topDealsIndex + 4);
        }
        break;
      case "popular":
        // Ensure we loop back to the start of the list if the index exceeds the available cards
        if (popularIndex + 4 >= filteredCards.length) {
          setPopularIndex(0); // Go back to the first page when the end is reached
        } else {
          setPopularIndex(popularIndex + 4); // Move to the next 4 cards
        }
        break;
      case "texture":
        if (
          textureIndex + 4 >=
          totalCards.filter((card) => card.type === "texture").length
        ) {
          setTextureIndex(0);
        } else {
          setTextureIndex(textureIndex + 4);
        }
        break;
      case "experience":
        if (
          experienceIndex + 4 >=
          totalCards.filter((card) => card.type === "experience").length
        ) {
          setExperienceIndex(0);
        } else {
          setExperienceIndex(experienceIndex + 4);
        }
        break;
      default:
        break;
    }
  };

  const handlePrev = (section) => {
    switch (section) {
      case "topPicks":
        if (topPicksIndex - 4 < 0) {
          setTopPicksIndex(shuffledTopPicks.length - 4); // Go back to the last page
        } else {
          setTopPicksIndex(topPicksIndex - 4); // Move to the previous 4 cards
        }
        break;
      case "topDeals":
        if (topDealsIndex - 4 < 0) {
          setTopDealsIndex(shuffledTopDeals.length - 4);
        } else {
          setTopDealsIndex(topDealsIndex - 4);
        }
        break;
      case "popular":
        if (popularIndex - 4 < 0) {
          setPopularIndex(0); // If we're at the first page, prevent going further back
        } else {
          setPopularIndex(popularIndex - 4); // Move to the previous 4 cards
        }
        break;
      case "texture":
        if (textureIndex - 4 < 0) {
          setTextureIndex(0);
        } else {
          setTextureIndex(textureIndex - 4);
        }
        break;
      case "experience":
        if (experienceIndex - 4 < 0) {
          setExperienceIndex(0);
        } else {
          setExperienceIndex(experienceIndex - 4);
        }
        break;
      default:
        break;
    }
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
    setPopularIndex(0); // Reset pagination index when the filter is changed
  };
  return (
    <div className="min-h-screen bg-[#14141F] text-white flex flex-col items-center px-4 md:px-8">
      {/* Hero Section wrapped in a div */}
      <div className="w-full mt-20  flex justify-center">
        <HeroCard />
      </div>

      {/* Content Section */}
      <div className="w-full max-w-screen-xl">
        {/*Top Picks */}
        <div className="w-[60%] text-left mb-8 mt-32">
          <h2 className="text-white text-[36px] font-bold leading-[44px] capitalize">
            Today's Picks
          </h2>
        </div>

        {/* Card Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mb-8">
          {/* Slice the `toppicks` array based on the `topPicksIndex` */}
          {shuffledTopPicks
            .slice(topPicksIndex, topPicksIndex + 4)
            .map((card, index) => (
              <Card
                key={index}
                title={card.title}
                discount={card.discount}
                price={card.price}
                starcount={card.starCount}
                heartcount={card.heartCount}
                savedcount={card.savedCount}
                smileycount={card.smileyCount}
                inlibrary={inlibrary}
                bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"} // Set alternating background color
                image={card.image}
              />
            ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6 w-full max-w-[1200px] items-center">
          <button
            onClick={() => handlePrev("topPicks")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8592;</span>
          </button>
          <button
            onClick={() => handleNext("topPicks")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8594;</span>
          </button>
        </div>

        {/* Top Deals */}
        <div className="w-[60%] text-left mb-8 mt-32">
          <h2 className="text-white text-[36px] font-bold leading-[44px] capitalize">
            Top deals
          </h2>
        </div>

        {/* Card Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mb-8">
          {shuffledTopDeals
            .slice(topDealsIndex, topDealsIndex + 4)
            .map((card, index) => (
              <Card
                key={index}
                title={card.title}
                discount={card.discount}
                price={card.price}
                starcount={card.starCount}
                heartcount={card.heartCount}
                savedcount={card.savedCount}
                smileycount={card.smileyCount}
                inlibrary={inlibrary}
                bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"} // Set alternating background color
                image={card.image}
              />
            ))}
        </div>
        <div className="flex justify-between mt-6 w-full max-w-[1200px] items-center">
          <button
            onClick={() => handlePrev("topDeals")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8592;</span>
          </button>
          <button
            onClick={() => handleNext("topDeals")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8594;</span>
          </button>
        </div>

        {/*Oddyssey experiencesd*/}
        <div className="w-[100%] text-left mb-8 mt-32 flex items-center justify-between">
          <h2 className="text-white text-[36px] font-bold leading-[44px] capitalize">
            Top Immersive Experiences from Odyssey3D
          </h2>
          <div className="relative">
            <img
              src="/platform3.png" // Replace with your image path
              alt="Explore Now"
              className="w-auto h-auto  cursor-pointer "
            />
            <div className="absolute inset-0 bg-[#4C6BFF] rounded-full opacity-0 hover:opacity-80 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Card Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mb-8">
          {totalCards
            .filter((card) => card.type === "experience")
            .slice(experienceIndex, experienceIndex + 4)
            .map((card, index) => (
              <Card
                key={index}
                title={card.title}
                discount={card.discount}
                price={card.price}
                starcount={card.starCount}
                heartcount={card.heartCount}
                savedcount={card.savedCount}
                smileycount={card.smileyCount}
                inlibrary={inlibrary}
                bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"} // Set alternating background color
                image={card.image}
              />
            ))}
        </div>
        <div className="flex justify-between mt-6 w-full max-w-[1200px] items-center">
          <button
            onClick={() => handlePrev("experience")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8592;</span>
          </button>
          <button
            onClick={() => handleNext("experience")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8594;</span>
          </button>
        </div>

        {/**Popular collections */}
        <div className="w-[100%] text-left mb-8 mt-32 flex items-center justify-between">
          <h2 className="text-white text-[36px] font-bold leading-[44px] capitalize">
            Popular Collections
          </h2>
          <div className="relative">
            <h2 className="text-white text-[14px] font-bold leading-[44px] capitalize font-urbanist tracking-[1.4px] uppercase custom-underline hover:text-[#5750A2]">
              EXPLORE MORE
            </h2>
          </div>
        </div>

        <div className="flex gap-4 mt-6 mb-8">
          <button
            className="bg-[#5750A2] text-[#fff] py-2 px-6 rounded-full font-normal hover:bg-[#343444] transition duration-300 font-poppins text-[17.811px] leading-normal flex items-center"
            onClick={() => handleFilterChange("All")} // Set filter to "All"
          >
            <img src="/all.png" alt="All" className="w-auto h-auto mr-2" /> All
          </button>

          <button
            className="bg-[#343444] text-[#888B93] py-2 px-6 rounded-full font-normal hover:bg-[#5750A2] transition duration-300 font-poppins text-[17.811px] leading-normal"
            onClick={() => handleFilterChange("3d")} // Set filter to "3D"
          >
            3D Models
          </button>

          <button
            className="bg-[#343444] text-[#888B93] py-2 px-6 rounded-full font-normal hover:bg-[#5750A2] transition duration-300 font-poppins text-[17.811px] leading-normal"
            onClick={() => handleFilterChange("texture")} // Set filter to "Textures"
          >
            Textures
          </button>

          <button
            className="bg-[#343444] text-[#888B93] py-2 px-6 rounded-full font-normal hover:bg-[#5750A2] transition duration-300 font-poppins text-[17.811px] leading-normal"
            onClick={() => handleFilterChange("experience")} // Set filter to "Environments"
          >
            Environments
          </button>
        </div>

        {/* Card Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mb-8">
          {filteredCards
            .slice(popularIndex, popularIndex + 4)
            .map((card, index) => (
              <Card
                key={index}
                title={card.title}
                discount={card.discount}
                price={card.price}
                starcount={card.starCount}
                heartcount={card.heartCount}
                savedcount={card.savedCount}
                smileycount={card.smileyCount}
                inlibrary={inlibrary}
                bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"} // Set alternating background color
                image={card.image}
              />
            ))}
        </div>
        <div className="flex justify-between mt-6 w-full max-w-[1200px] items-center">
          <button
            onClick={() => handlePrev("popular")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8592;</span>
          </button>
          <button
            onClick={() => handleNext("popular")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8594;</span>
          </button>
        </div>

        {/*Textures*/}
        <div className="w-[60%] text-left mb-8 mt-32">
          <h2 className="text-white text-[36px] font-bold leading-[44px] capitalize">
            Textures
          </h2>
        </div>

        {/* Card Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mb-8">
          {totalCards
            .filter((card) => card.type === "texture") // Filter for only "Experience" type
            .slice(textureIndex, textureIndex + 4)
            .map((card, index) => (
              <Card
                key={index}
                title={card.title}
                discount={card.discount}
                price={card.price}
                starcount={card.starCount}
                heartcount={card.heartCount}
                savedcount={card.savedCount}
                smileycount={card.smileyCount}
                inlibrary={inlibrary}
                bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"} // Alternating background color
                image={card.image}
              />
            ))}
        </div>
        <div className="flex justify-between mt-6 w-full max-w-[1200px] items-center">
          <button
            onClick={() => handlePrev("texture")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8592;</span>
          </button>
          <button
            onClick={() => handleNext("texture")}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">&#8594;</span>
          </button>
        </div>

        <div
          className="w-auto h-[430px] bg-cover bg-center mt-32 mb-32 rounded-3xl relative"
          style={{ backgroundImage: "url('/zenivabackground.png')" }}
        >
          {/* Left Side Content */}
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center pl-8 pr-20">
            <h2 className="text-white text-[64px] font-normal leading-[78px] font-publicSans mb-4">
              Zeniva Coming Soon To
            </h2>
            <h2 className="text-white text-[64px] font-bold leading-[78px] font-publicSans tracking-[1.4px] ">
              The Digital Bazar
            </h2>
            <a
              href="https://zeniva.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-[150px] text-white py-2 px-4 rounded-full font-semibold border-2 border-white hover:text-black hover:border-black transition duration-300 mt-10 underline">
                Learn More
              </button>
            </a>
          </div>

          {/* Right Side Image */}
          <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-8">
            <img
              src="/zenivalogo.png"
              alt="Zeniva Logo"
              className="h-auto object-contain" // Adjust the size as needed
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
