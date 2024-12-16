import React from "react";
import { useAppData } from "../context/AppContext";
import Headingpage from "../components/HeadingPage";
import CartCard from "../components/common/cart-card/CartCard";
import SummaryCard from "../components/common/cart-card/SummaryCard";

const Cart = () => {
  const { cartAssets, removeFromCart } = useAppData();

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
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
