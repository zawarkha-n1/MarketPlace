import { React, useState } from "react";
import HeroCard from "../components/HeroCard.js";
import Card from "../components/Card.js";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create an array of 20 objects, each representing a card with title, discount, and price
  const totalCards = [
    {
      title: "Exploring the Universe",
      discount: "20% Off",
      price: "EXA 29.99",
    },
    {
      title: "Mastering React Development",
      discount: null,
      price: "EXA 19.99",
    },
    {
      title: "The Secret to Digital Transformation",
      discount: "10% Off",
      price: "EXA 49.99",
    },
    {
      title: "Understanding AI and Machine Learning",
      discount: null,
      price: null,
    },
    {
      title: "How to Build a Startup from Scratch",
      discount: "15% Off",
      price: "EXA 39.99",
    },
    { title: "The Future of Web3", discount: null, price: "EXA 59.99" },
    {
      title: "Unraveling the Mystery of Quantum Computing",
      discount: "30% Off",
      price: null,
    },
    {
      title: "Crypto 101: What You Need to Know",
      discount: null,
      price: "EXA 49.99",
    },
    {
      title: "Digital Marketing for the Modern Era",
      discount: "20% Off",
      price: "EXA 29.99",
    },
    {
      title: "Creating Beautiful UX/UI Designs",
      discount: null,
      price: "EXA 19.99",
    },
    {
      title: "AI in Healthcare: The Next Frontier",
      discount: "10% Off",
      price: "EXA 69.99",
    },
    {
      title: "The Art of Storytelling in Tech",
      discount: null,
      price: null,
    },
    {
      title: "Building a Sustainable Tech Company",
      discount: null,
      price: "EXA 29.99",
    },
    {
      title: "Blockchain: A Game Changer for Finance",
      discount: "20% Off",
      price: "EXA 59.99",
    },
    {
      title: "Mastering Cloud Computing",
      discount: "25% Off",
      price: "EXA 79.99",
    },
    {
      title: "Cybersecurity: Protecting the Digital World",
      discount: null,
      price: "EXA 59.99",
    },
    {
      title: "The Power of Data Science in 2024",
      discount: null,
      price: "EXA 89.99",
    },
    {
      title: "The Rise of Virtual Reality",
      discount: "10% Off",
      price: null,
    },
    { title: "How to Code Like a Pro", discount: null, price: "EXA 29.99" },
    {
      title: "Leadership in Tech: The Skills You Need",
      discount: "30% Off",
      price: "EXA 49.99",
    },
  ];

  // Slice the cards array to show only 4 cards at a time
  const visibleCards = totalCards.slice(currentIndex, currentIndex + 4);

  // Function to handle next button click to show the next set of 4 cards
  const handleNext = () => {
    // If we're at the end of the array, go back to the beginning
    if (currentIndex + 4 >= totalCards.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 4);
    }
  };

  // Function to handle prev button click to show the previous set of 4 cards
  const handlePrev = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };
  return (
    <div className="min-h-screen bg-[#14141F] text-white flex flex-col items-center px-4 md:px-8">
      {/* Hero Section wrapped in a div */}
      <div className="w-full mt-20 mb-32 flex justify-center">
        <HeroCard />
      </div>

      {/* Content Section */}
      <div className="w-full max-w-screen-xl">
        {/* Additional Content Below Hero Card */}
        <div className="w-[60%] text-left mb-8">
          <h2 className="text-white text-[36px] font-bold leading-[44px] capitalize">
            Today's Picks
          </h2>
        </div>

        {/* Card Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mb-8">
          {visibleCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              discount={card.discount}
              price={card.price}
            />
          ))}
        </div>
        <div className="flex justify-between mt-6 w-full max-w-[1200px] items-center">
          <button
            onClick={handlePrev}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">{/* Left Arrow Icon */} &#8592;</span>
          </button>

          <button
            onClick={handleNext}
            className="bg-[#42425a] text-white rounded-full p-3 hover:bg-[#2d2e3f] transition-all"
          >
            <span className="text-2xl">{/* Right Arrow Icon */} &#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
