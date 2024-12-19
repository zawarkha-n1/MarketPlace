import React from "react";
import { useAppData } from "../context/AppContext";
import Headingpage from "../components/HeadingPage";
import CartCard from "../components/common/cart-card/CartCard";
import SummaryCard from "../components/common/cart-card/SummaryCard";
import axios from "axios";
const Cart = () => {
  const {
    cartAssets,
    setIsCartModalOpen,
    setTotalPrice,
    isLogin,
    user,
    removeFromCart,
    setExaCredits,
    exaCredits,
    setUser,
  } = useAppData();

  setIsCartModalOpen(false);
  const calculateTotal = () => {
    // Ensure all asset prices are valid numbers
    return cartAssets
      .reduce((total, asset) => {
        const price = Number(asset.asset_data.price) || 0; // Fallback to 0 if price is invalid
        return total + price;
      }, 0)
      .toFixed(2); // Format to 2 decimal places
  };
  console.log("Cart Assets: ", cartAssets);
  console.log("Total Price: ", calculateTotal());
  setTotalPrice(calculateTotal());

  const onCheckout = async () => {
    const useremail = user?.email;
    if (!useremail) {
      console.error("User email not found.");
      return;
    }

    // Calculate total price
    const totalPrice = cartAssets.reduce(
      (acc, asset) => acc + asset.asset_data.price,
      0
    );

    const confirmPurchase = window.confirm(
      `You want to confirm checkout? ${totalPrice} Exas will be cut from your account.`
    );

    if (!confirmPurchase) return;

    try {
      // Process payment first
      const paymentResponse = await axios.post(
        "http://localhost:5001/process-payment",
        {
          email: useremail,
          paymentType: "onetime",
          amount: totalPrice,
        }
      );

      if (paymentResponse.data.success) {
        console.log("Payment successful. Adding assets to library...");

        const updatedCredits = paymentResponse.data.newCredits;
        setExaCredits(updatedCredits); // Set the updated EXA credits globally
        const updatedUser = { ...user, exaCredits: updatedCredits };
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        console.log(`Updated EXA Credits: ${updatedCredits}`);
        // Collect all asset titles for the API
        const assetTitles = cartAssets.map((asset) => asset.asset_data.title);
        const assetIds = cartAssets.map((asset) => asset.id);

        if (!Array.isArray(assetIds) || assetIds.length === 0) {
          console.error("No asset Ids found.");
          alert("Error: No assets to add to the library.");
          return;
        }

        // Call the bulk add-to-library API
        const response = await axios.post(
          "http://localhost:5001/update-user-assets-library",
          {
            useremail,
            assetIds,
          }
        );

        if (response.status === 200) {
          console.log("Assets added to library successfully.");
          alert("Checkout successful! Your assets are added to the library.");

          // Remove all items from the cart after successful checkout
          for (const asset of cartAssets) {
            await removeFromCart(asset.id); // Remove each asset from cart
          }
          window.location.reload();
        } else {
          console.error("Error adding assets to library:", response.data.error);
          alert("Error adding assets to library.");
        }
      } else {
        console.error("Payment failed:", paymentResponse.data.message);
        alert(`Payment failed: ${paymentResponse.data.message}`);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-start">
      <Headingpage pagename={"Cart"} secondheading={"Explore"} />
      <div className="w-full max-w-6xl px-4 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-6 md:w-2/3 mb-8">
          {cartAssets.map((asset) => (
            <CartCard
              key={asset.id}
              title={asset.title || asset.asset_data.title}
              price={asset.price || asset.asset_data.price}
              imageSrc={asset.image || asset.asset_data.url}
              onRemove={() => removeFromCart(asset.id)}
            />
          ))}
        </div>
        <div className="md:w-1/3">
          <SummaryCard
            productCount={cartAssets.length} // Number of products
            totalValue={`${calculateTotal()} EXA`} // Total price
            lineItems={[
              { label: "Price", value: `${calculateTotal()} EXA` },
              { label: "Taxes", value: "0.00 EXA" }, // Static shipping
            ]}
            onCheckout={onCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
