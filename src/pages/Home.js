import React from "react";
import HeroCard from "../components/HeroCard.js";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#14141F] text-white flex flex-col justify-center items-center px-4 md:px-8">
      {/* Hero Text */}
      <HeroCard />
    </div>
  );
};

export default Home;
