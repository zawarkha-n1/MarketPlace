import React from "react";
import { useAppData } from "../context/AppContext";
import Headingpage from "../components/HeadingPage";
import CartCard from "../components/common/cart-card/CartCard";
import SummaryCard from "../components/common/cart-card/SummaryCard";

const Cart = () => {
  const { cartAssets, removeFromCart } = useAppData();

  const calculateTotal = () => {
    return cartAssets.reduce((total, asset) => total + asset.price, 0);
  };

  console.log(cartAssets);
  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-start">
      <Headingpage pagename={"Cart"} secondheading={"Explore"} />
      <div className="w-full max-w-6xl px-4 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-6 md:w-2/3">
          {cartAssets.map((asset) => (
            <CartCard
              key={asset.id}
              title={asset.title}
              price={`${asset.price} EXA`}
              imageSrc={asset.image}
              onRemove={() => removeFromCart(asset.id)}
            />
          ))}
        </div>
        <div className="md:w-1/3">
          <SummaryCard
            productCount={cartAssets.length}
            totalValue={`${calculateTotal()} EXA`}
            lineItems={[
              { label: "Subtotal", value: `${calculateTotal()} EXA` },
              { label: "Shipping", value: "Free" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
