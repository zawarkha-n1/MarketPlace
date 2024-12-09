import { React, useState, useEffect } from "react";
import { totalCards } from "../data/totalcards.js";
import HeroCard from "../components/HeroCard.js";
import Card from "../components/Card.js";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  // States for pagination in each section
  const [topPicksIndex, setTopPicksIndex] = useState(0);
  const [topDealsIndex, setTopDealsIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [textureIndex, setTextureIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);

  const [user, setUser] = useState(null); // Store user info
  const [authToken, setAuthToken] = useState(null); // Store JWT

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const response = await axios.post(
        "http://172.16.15.155:5000/verify-token",
        {
          token,
        }
      );

      console.log("User verified successfully:", response.data.user);

      // Store the custom JWT in localStorage
      const newAuthToken = response.data.token;
      localStorage.setItem("authToken", newAuthToken);

      // Set user info and token in state
      setUser(response.data.user);
      setAuthToken(newAuthToken);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  useEffect(() => {
    // Check for an existing token in localStorage on page load
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT
        console.log("Decoded token:", decodedToken);

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.log("Token expired, clearing storage");
          localStorage.removeItem("authToken");
        } else {
          // Restore user session
          setAuthToken(token);
          setUser({
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture,
          });
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        localStorage.removeItem("authToken");
      }
    }
  }, []); // Run once on component mount

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const timeUntilExpiry = decodedToken.exp * 1000 - Date.now(); // Time in milliseconds

      const timeout = setTimeout(() => {
        console.log("Token expired, logging out");
        handleLogout();
      }, timeUntilExpiry);

      return () => clearTimeout(timeout); // Clear timeout on component unmount
    }
  }, [authToken]); // Run when authToken changes

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token from storage
    setUser(null); // Clear user state
    setAuthToken(null);
    console.log("User logged out");
  };

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

  // Handle page changes for pagination (next and prev)
  const handlePageChange = (section, action) => {
    let index, maxLength;
    switch (section) {
      case "topPicks":
        index = topPicksIndex;
        maxLength = shuffledTopPicks.length;
        break;
      case "topDeals":
        index = topDealsIndex;
        maxLength = shuffledTopDeals.length;
        break;
      case "popular":
        index = popularIndex;
        maxLength = filteredCards.length;
        break;
      case "texture":
        index = textureIndex;
        maxLength = totalCards.filter((card) => card.type === "texture").length;
        break;
      case "experience":
        index = experienceIndex;
        maxLength = totalCards.filter(
          (card) => card.type === "experience"
        ).length;
        break;
      default:
        return;
    }

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

    // Update the index state
    switch (section) {
      case "topPicks":
        setTopPicksIndex(index);
        break;
      case "topDeals":
        setTopDealsIndex(index);
        break;
      case "popular":
        setPopularIndex(index);
        break;
      case "texture":
        setTextureIndex(index);
        break;
      case "experience":
        setExperienceIndex(index);
        break;
      default:
        break;
    }
  };

  const handlePageClick = (section, pageIndex) => {
    switch (section) {
      case "topPicks":
        setTopPicksIndex(pageIndex * 4); // Page index corresponds to the section's offset
        break;
      case "topDeals":
        setTopDealsIndex(pageIndex * 4);
        break;
      case "popular":
        setPopularIndex(pageIndex * 4);
        break;
      case "texture":
        setTextureIndex(pageIndex * 4);
        break;
      case "experience":
        setExperienceIndex(pageIndex * 4);
        break;
      default:
        break;
    }
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
    setPopularIndex(0); // Reset pagination index when the filter is changed
  };

  // Helper function to calculate total pages for each section
  const calculateTotalPages = (section) => {
    let totalItems;
    switch (section) {
      case "topPicks":
        totalItems = shuffledTopPicks.length;
        break;
      case "topDeals":
        totalItems = shuffledTopDeals.length;
        break;
      case "popular":
        totalItems = filteredCards.length;
        break;
      case "texture":
        totalItems = totalCards.filter(
          (card) => card.type === "texture"
        ).length;
        break;
      case "experience":
        totalItems = totalCards.filter(
          (card) => card.type === "experience"
        ).length;
        break;
      default:
        return 0;
    }
    return Math.ceil(totalItems / 4); // Calculate total pages based on 4 items per page
  };

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    navigate(`/product/${card.title}`, {
      state: card,
    });
  };
  return (
    <div className="min-h-screen bg-[#14141F] text-white flex flex-col items-center px-4 md:px-8">
      {/* Hero Section wrapped in a div */}
      <div>
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
          />
        ) : (
          <div>
            <h2>Welcome, {user.name}</h2>
            <img src={user.picture} alt={user.name} />
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
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
                onClick={() => handleCardClick(card)}
              />
            ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 w-full">
          {/* Back Button */}
          <button
            onClick={() => handlePageChange("topPicks", "prev")}
            className={`p-3  ${topPicksIndex === 0 ? "" : ""}`}
            disabled={topPicksIndex === 0}
          >
            <img src="/prev.png" alt="" />
          </button>

          {/* Page Indicator Circles */}
          <div className="flex gap-3 justify-center mx-3">
            {Array.from({ length: calculateTotalPages("topPicks") }).map(
              (_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handlePageClick("topPicks", pageIndex)}
                  className="relative w-5 h-5" // Outer circle size
                >
                  {/* Outer Circle */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ease-in-out 
          ${
            topPicksIndex / 4 === pageIndex
              ? "border-[#5750A2]"
              : "border-transparent"
          }`}
                  ></div>

                  {/* Inner Circle */}
                  <div
                    className={`absolute inset-1 rounded-full transition-all duration-300 ease-in-out 
          ${
            topPicksIndex / 4 === pageIndex
              ? "bg-[#5750A2] border-[#5750A2]"
              : "bg-transparent border-2 border-white"
          }`}
                  ></div>
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange("topPicks", "next")}
            className="p-3 "
          >
            <img src="/next.png" alt="" />
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
        <div className="flex justify-center items-center mt-6 w-full">
          {/* Back Button */}
          <button
            onClick={() => handlePageChange("topDeals", "prev")}
            className={`p-3  ${topDealsIndex === 0 ? "" : ""}`}
            disabled={topDealsIndex === 0}
          >
            <img src="/prev.png" alt="" />
          </button>

          {/* Page Indicator Circles */}
          <div className="flex gap-3 justify-center mx-3">
            {Array.from({ length: calculateTotalPages("topDeals") }).map(
              (_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handlePageClick("topDeals", pageIndex)}
                  className="relative w-5 h-5" // Outer circle size
                >
                  {/* Outer Circle */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ease-in-out 
          ${
            topDealsIndex / 4 === pageIndex
              ? "border-[#5750A2]"
              : "border-transparent"
          }`}
                  ></div>

                  {/* Inner Circle */}
                  <div
                    className={`absolute inset-1 rounded-full transition-all duration-300 ease-in-out 
          ${
            topDealsIndex / 4 === pageIndex
              ? "bg-[#5750A2] border-[#5750A2]"
              : "bg-transparent border-2 border-white"
          }`}
                  ></div>
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange("topDeals", "next")}
            className="p-3 "
          >
            <img src="/next.png" alt="" />
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
            <div className="absolute inset-0 bg-[#4C6BFF] rounded-full opacity-0 "></div>
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
                bgcolor={index % 2 === 0 ? "#8A7FFF" : "#DC90FF"}
                image={card.image}
              />
            ))}
        </div>
        <div className="flex justify-center items-center mt-6 w-full">
          {/* Back Button */}
          <button
            onClick={() => handlePageChange("experience", "prev")}
            className={`p-3  ${experienceIndex === 0 ? "" : ""}`}
            disabled={experienceIndex === 0}
          >
            <img src="/prev.png" alt="" />
          </button>

          {/* Page Indicator Circles */}
          <div className="flex gap-3 justify-center mx-3">
            {Array.from({ length: calculateTotalPages("experience") }).map(
              (_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handlePageClick("experience", pageIndex)}
                  className="relative w-5 h-5" // Outer circle size
                >
                  {/* Outer Circle */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ease-in-out 
          ${
            experienceIndex / 4 === pageIndex
              ? "border-[#5750A2]"
              : "border-transparent"
          }`}
                  ></div>

                  {/* Inner Circle */}
                  <div
                    className={`absolute inset-1 rounded-full transition-all duration-300 ease-in-out 
          ${
            experienceIndex / 4 === pageIndex
              ? "bg-[#5750A2] border-[#5750A2]"
              : "bg-transparent border-2 border-white"
          }`}
                  ></div>
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange("experience", "next")}
            className="p-3 "
          >
            <img src="/next.png" alt="" />
          </button>
        </div>

        {/**Popular collections */}
        <div className="w-[100%] text-left mb-8 mt-32 flex items-center justify-between">
          <h2 className="text-white text-[36px] font-bold leading-[44px] capitalize">
            Popular Collections
          </h2>
          <div className="relative">
            <Link
              to={"/explore"}
              className="text-white text-[14px] font-bold leading-[44px] font-urbanist tracking-[1.4px] uppercase custom-underline hover:text-[#5750A2]"
            >
              EXPLORE MORE
            </Link>
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
        <div className="flex justify-center items-center mt-6 w-full">
          {/* Back Button */}
          <button
            onClick={() => handlePageChange("popular", "prev")}
            className={`p-3  ${popularIndex === 0 ? "" : ""}`}
            disabled={popularIndex === 0}
          >
            <img src="/prev.png" alt="" />
          </button>

          {/* Page Indicator Circles */}
          <div className="flex gap-3 justify-center mx-3">
            {Array.from({ length: calculateTotalPages("popular") }).map(
              (_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handlePageClick("popular", pageIndex)}
                  className="relative w-5 h-5" // Outer circle size
                >
                  {/* Outer Circle */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ease-in-out 
          ${
            popularIndex / 4 === pageIndex
              ? "border-[#5750A2]"
              : "border-transparent"
          }`}
                  ></div>

                  {/* Inner Circle */}
                  <div
                    className={`absolute inset-1 rounded-full transition-all duration-300 ease-in-out 
          ${
            popularIndex / 4 === pageIndex
              ? "bg-[#5750A2] border-[#5750A2]"
              : "bg-transparent border-2 border-white"
          }`}
                  ></div>
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange("popular", "next")}
            className="p-3 "
          >
            <img src="/next.png" alt="" />
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
        <div className="flex justify-center items-center mt-6 w-full">
          {/* Back Button */}
          <button
            onClick={() => handlePageChange("texture", "prev")}
            className={`p-3  ${textureIndex === 0 ? "" : ""}`}
            disabled={textureIndex === 0}
          >
            <img src="/prev.png" alt="" />
          </button>

          {/* Page Indicator Circles */}
          <div className="flex gap-3 justify-center mx-3">
            {Array.from({ length: calculateTotalPages("texture") }).map(
              (_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handlePageClick("texture", pageIndex)}
                  className="relative w-5 h-5" // Outer circle size
                >
                  {/* Outer Circle */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ease-in-out 
          ${
            textureIndex / 4 === pageIndex
              ? "border-[#5750A2]"
              : "border-transparent"
          }`}
                  ></div>

                  {/* Inner Circle */}
                  <div
                    className={`absolute inset-1 rounded-full transition-all duration-300 ease-in-out 
          ${
            textureIndex / 4 === pageIndex
              ? "bg-[#5750A2] border-[#5750A2]"
              : "bg-transparent border-2 border-white"
          }`}
                  ></div>
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange("texture", "next")}
            className="p-3 "
          >
            <img src="/next.png" alt="" />
          </button>
        </div>

        <div
          className="w-auto 2xl:h-[430px] h-[260px] xl:has-[420px] bg-cover bg-center mt-32 mb-32 rounded-3xl relative"
          style={{ backgroundImage: "url('/zenivabackground.png')" }}
        >
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center pl-6 md:pl-8 lg:pl-12 xl:pl-16 pr-6 md:pr-12 lg:pr-16 xl:pr-20">
            <h2 className="text-white text-[22px] sm:text-[36px] md:text-[46px] xl:text-[64px] font-normal leading-[38px] sm:leading-[46px] md:leading-[60px] lg:leading-[70px] font-publicSans mb-4">
              Zeniva Coming Soon To
            </h2>
            <h2 className="text-white text-[20px] sm:text-[28px] md:text-[36px] xl:text-[64px] leading-[40px] sm:leading-[46px] md:leading-[58px] lg:leading-[70px] font-publicSans tracking-[1.2px] sm:tracking-[1.4px]">
              The Digital <span className="font-bold ">Bazar</span>
            </h2>
            <h4 className="2xl:text-[26px] leading-7 mt-3">
              Currently available on Shopify
            </h4>
            <a
              href="https://zeniva.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-[130px] sm:w-[150px] text-white py-2 px-4 rounded-full font-semibold border-2 border-white hover:text-black hover:border-black transition duration-300 mt-6 sm:mt-10">
                Learn More
              </button>
            </a>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-4 sm:pr-6 md:pr-8 lg:pr-10 xl:pr-12">
            <img
              src="/images/avatars.png"
              alt="Zeniva Logo"
              className="h-[30%] sm:h-[40%] md:h-[50%] lg:h-[60%] xl:h-[74%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
