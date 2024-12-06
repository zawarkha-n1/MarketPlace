import React from "react";
import Headingpage from "../components/HeadingPage";
import CartCard from "../components/common/cart-card/CartCard";
import SummaryCard from "../components/common/cart-card/SummaryCard";

const Cart = () => {
  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-start">
      <Headingpage pagename={"Cart"} secondheading={"Cart"} />
      <div className="w-full max-w-6xl px-4 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-6 md:w-2/3">
          <CartCard title="“The Fantasy Flower illustration ”" />
          <CartCard />
        </div>
        <div className="md:w-1/3">
          <SummaryCard />
        </div>
      </div>
    </div>
  );
};

export default Cart;
