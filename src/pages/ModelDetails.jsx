import React, { useState, useEffect } from "react";
import axios from "axios";

import RoundedOutlineButton from "../components/common/buttons/RoundedOutlineButton";
import Headingpage from "../components/HeadingPage";
import ScrollableCards from "../components/common/scrollable-cards/ScrollableCards";
import Card from "../components/Card";
import { useParams, useLocation } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import LoginModal from "../components/modals/LoginModal";
import { useNavigate } from "react-router-dom";
import BuyProductModal from "../components/modals/BuyProductModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { Canvas, useLoader } from "@react-three/fiber"; // <-- Make sure useLoader is imported
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = ({ glbUrl }) => {
  // Load and render the GLB file using useLoader
  const gltf = useLoader(GLTFLoader, glbUrl);
  return <primitive object={gltf.scene} scale={1} />;
};
const ModelDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const { title } = useParams(); // Extract title from URL
  const location = useLocation();
  const cardData = location.state || {}; // Use the state passed from navigation
  console.log(cardData);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const renderContent = () => {
    if (cardData.asset_data && cardData.asset_data.glbUrl) {
      // Render 3D model (GLB file)
      return (
        <Canvas style={{ height: "400px", width: "100%" }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
          <Model glbUrl={cardData.asset_data.glbUrl} />
          <OrbitControls />
        </Canvas>
      );
    } else if (cardData.asset_data && cardData.asset_data.url) {
      // Render the image if GLB URL is not available
      return (
        <img
          src={cardData.asset_data.url}
          alt={cardData.asset_data.title}
          className="w-full rounded-lg"
        />
      );
    } else {
      return null; // Return nothing if there's no URL or GLB URL
    }
  };
  const {
    isLogin,
    user,
    setUser,
    assets,
    addToCart,
    cartAssets,
    setIsCartModalOpen,
    setExaCredits,
  } = useAppData();
  const [recentAssets, setRecentAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOwned, setIsOwned] = useState(false); // New state to track ownership
  const [isSaved, setIsSaved] = useState(false);
  const [isBuyProductModalOpen, setIsBuyProductModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleBuy = () => {
    if (!isLogin || !user) {
      setIsOwned(false); // User is not logged in, no ownership
      setIsLoginModalOpen(true);
      return;
    }

    setIsBuyProductModalOpen(true);
  };

  const handleOwned = () => {
    navigate("/library");
  };

  useEffect(() => {
    // Check if the asset is already in the cart
    const isInCart = cartAssets.some((item) => item.id === cardData.id);
    setIsAddedToCart(isInCart);
  }, [cartAssets, cardData]);

  function openLoginModal() {
    setIsLoginModalOpen(true);
  }

  function closeLoginModal() {
    setIsLoginModalOpen(false);
  }

  const closeBuyProductModal = () => setIsBuyProductModalOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  }, []);

  useEffect(() => {
    const fetchLibraryStatus = async () => {
      if (!isLogin || !user) {
        setIsOwned(false); // User is not logged in, no ownership
        return;
      }

      try {
        // Fetch user assets
        const response = await axios.get(
          `http://172.16.15.155:5001/user-assets`
        );
        const userAssetsData = response.data.find(
          (item) => item.useremail === user.email
        );

        // Check if the asset is in libraryassets
        const libraryAssets =
          userAssetsData?.userassetsdata?.libraryassets || [];
        const assetId = cardData.id; // Assuming cardData has the asset's ID

        if (userAssetsData) {
          // Get saved assets of the user
          const savedAssets = userAssetsData?.userassetsdata?.savedassets || [];

          // Check if the current assetId is in savedAssets
          setIsSaved(savedAssets.includes(cardData.id));
        } else {
          setIsSaved(false); // If user data not found, assume not saved
        }
        if (libraryAssets.includes(assetId)) {
          setIsOwned(true); // Asset is already owned
        } else {
          setIsOwned(false); // Asset is not owned
        }
      } catch (error) {
        console.error("Error fetching library status:", error);
        setIsOwned(false); // Fallback in case of an error
      }
    };

    fetchLibraryStatus();
  }, [isLogin, user, cardData]);

  const handleBuyNowClick = async () => {
    if (!isLogin || !user) {
      openLoginModal();
      return;
    }

    const useremail = user?.email;

    if (!useremail) {
      console.error("User email not found.");
      return;
    }

    try {
      console.log("Starting payment process...");

      // Call the payment API first
      const paymentResponse = await axios.post(
        "http://172.16.15.155:5001/process-payment",
        {
          email: useremail,
          paymentType: "onetime",
          amount: cardData.asset_data.price,
        }
      );

      console.log("Payment Response:", paymentResponse.data);

      if (paymentResponse.data.success) {
        console.log(
          "Payment successful. Proceeding to add asset to library..."
        );
        const updatedCredits = paymentResponse.data.newCredits;
        setExaCredits(updatedCredits);
        const updatedUser = { ...user, exaCredits: updatedCredits };
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        // Proceed with adding the asset to the library
        const addLibraryResponse = await axios.post(
          "http://172.16.15.155:5001/update-user-assets-library",
          {
            useremail,
            assetIds: [cardData.id], // Make sure to send an array of titles
          }
        );

        if (addLibraryResponse.status === 200) {
          console.log(`Asset "${cardData.id}" added to library successfully.`);
          setIsOwned(true);
        }
        closeBuyProductModal();
        setIsConfirmModalOpen(true);
      } else {
        console.error("Payment failed:", paymentResponse.data.message);
        alert(`Payment Failed: ${paymentResponse.data.message}`);
      }
    } catch (error) {
      console.error("Error during payment or adding asset to library:", error);
      alert("An error occurred during the process. Please try again.");
    }
  };
  useEffect(() => {
    const fetchRecentAssets = async () => {
      setLoading(true);

      try {
        if (isLogin && user) {
          const response = await axios.get(
            `http://172.16.15.155:5001/user-assets`
          );
          const userAssetsData = response.data.find(
            (item) => item.useremail === user.email
          );

          const recentAssets =
            userAssetsData?.userassetsdata?.recentassets || [];

          if (recentAssets.length >= 4) {
            // Display recent assets if 4 or more exist
            setRecentAssets(
              assets
                .filter((asset) => recentAssets.includes(asset.id))
                .filter((asset) => asset.id !== cardData.id)
            );
          } else {
            // Display 6 random assets if recent assets are fewer than 4
            const randomAssets = assets
              .sort(() => 0.5 - Math.random())
              .slice(0, 6);
            setRecentAssets(randomAssets);
          }
        } else {
          // User not logged in: Show 6 random assets
          const randomAssets = assets
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          setRecentAssets(randomAssets);
        }
      } catch (error) {
        console.error("Error fetching recent assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentAssets();
  }, [isLogin, user, assets]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  const handleAddToCart = () => {
    if (!isLogin || !user) {
      openLoginModal();
      return;
    }

    if (!isAddedToCart) {
      const assetToAdd = {
        id: cardData.id,
        title: cardData.asset_data.title,
        price: cardData.asset_data.price,
        image: cardData.asset_data.url,
      };
      addToCart(assetToAdd);
      setIsAddedToCart(true); // Update button state
    }

    // Delay opening the cart modal by 1 second
    setTimeout(() => {
      setIsCartModalOpen(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-start">
      <Headingpage pagename={"Model Details"} secondheading={"Explore"} />
      <div className="w-full flex items-center justify-center text-white">
        <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[66%] flex flex-col md:flex-row items-start gap-28">
          <div className="relative flex-1 bg-[#DC90FF] rounded-lg">
            {renderContent()}

            <div className="absolute top-4 right-4 flex gap-4">
              <div className="bg-[#70598C] text-white px-3 py-2 rounded-lg flex items-center gap-2">
                <img src="/eye.png" alt="icon1" className="w-5 h-4" />
                <span className="font-semibold">
                  {cardData.asset_data.metadata.views}
                </span>
              </div>
              <div className="bg-[#70598C] text-white px-3 py-2 rounded-lg flex items-center gap-2">
                {isSaved && (
                  <img src="/save-filled.png" alt="icon2" className="w-4 h-4" />
                )}
                {!isSaved && (
                  <img src="/save.png" alt="icon2" className="w-4 h-4" />
                )}
                <span className="font-semibold">
                  {cardData.asset_data.metadata.bookmark}
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-[#70598C] text-white p-3 rounded-lg flex items-center gap-2">
              <img
                src={cardData.asset_data.creatorLogo}
                alt="Powered By"
                className="w-12"
              />
              <span className="font-700 text-[14px]">
                <span className="text-[#8A8AA0] text-[13px] font-400 block">
                  Powered
                </span>{" "}
                By {cardData.asset_data.creatorName}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1 items-start gap-6">
            <div className="text-white text-3xl sm:text-4xl md:text-[36px]">
              {/* "The Fantasy Flower illustration" */}
              {title}
            </div>

            <div className="flex items-start justify-between w-full">
              <div className="flex flex-row gap-3">
                <div className="w-full">
                  <div className="py-1 px-3 bg-slate-800 flex gap-2 rounded-lg items-center justify-center">
                    <img src="/star.png" alt="" className="w-4 h-4" />
                    <span className="text-white">
                      {cardData.asset_data.metadata?.stars}
                    </span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="py-1 px-3 bg-slate-800 flex gap-2 rounded-lg items-center justify-center">
                    <img src="/heart.png" alt="" className="w-4 h-4" />
                    <span className="text-white">
                      {cardData.asset_data.metadata?.favourite}
                    </span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="py-1 px-3 bg-slate-800 flex gap-2 rounded-lg items-center justify-center">
                    <img src="/smiley.png" alt="" className="w-4 h-4" />
                    <span className="text-white">
                      {cardData.asset_data.metadata?.smiley}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="bg-[#343444] rounded-full text-center flex items-center justify-center w-8 h-8">
                  <img src="/assets/icons/send/send-regular.png" alt="" />
                </button>
                <button className="bg-[#343444] w-8 h-8 rounded-full flex items-center justify-center text-justify">
                  <img src="/assets/icons/dots/option.png" alt="" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 my-4">
              <p className="font-urbanist font-medium text-[18px] leading-[26px]">
                Price
              </p>
              <h3 className="font-urbanist font-bold text-[24px] leading-[26px]">
                {cardData.asset_data.price == 0
                  ? "Free"
                  : `${cardData.asset_data.price} EXA`}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-7">
              {!isOwned ? (
                <>
                  <RoundedOutlineButton
                    buttonBG="#5750A2"
                    flexProp="flex-1"
                    buttonName="Buy Now"
                    customPaddingY="12px"
                    // onClick={handleBuyNowClick}
                    onClick={handleBuy}
                  />
                  <RoundedOutlineButton
                    onClick={handleAddToCart}
                    flexProp="flex-1"
                    buttonName={
                      isAddedToCart ? "Added to Cart!" : "Add to Cart"
                    }
                    buttonBG={isAddedToCart ? "#7979A2" : "#343444"}
                    customPaddingY="12px"
                    disabled={isAddedToCart}
                  />
                </>
              ) : (
                <RoundedOutlineButton
                  buttonBG="#343444"
                  flexProp="flex-1"
                  buttonName="Check in My Library"
                  customPaddingY="12px"
                  onClick={handleOwned}
                />
              )}
            </div>

            <div className="pt-4 w-full">
              <div className="flex gap-6 border-b border-[#1F1F2C]">
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
                  Rate Product
                </button>
              </div>

              <div className="pt-4">
                {activeTab === "details" ? (
                  <div className="text-sm text-white">
                    <div>{cardData.asset_data.description}</div>
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
          cards={recentAssets} // Passing the cards to the component
          CardComponent={Card} // Passing the Card component as the prop
          title="Recent Products"
        />
      </div>
      {isLoginModalOpen && (
        <LoginModal
          modalIsOpen={isLoginModalOpen}
          closeModal={closeLoginModal}
        />
      )}

      {isBuyProductModalOpen && (
        <BuyProductModal
          productData={cardData} // Pass cardData to modal
          onCheckout={handleBuyNowClick} // Pass checkout function
          // Pass close modal function
          modalIsOpen={isBuyProductModalOpen}
          closeModal={closeBuyProductModal}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmationModal
          handleNavigation={handleOwned}
          modalIsOpen={isConfirmModalOpen}
          closeModal={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ModelDetails;
