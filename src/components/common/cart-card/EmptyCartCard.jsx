import React from "react";

const EmptyCartCard = () => {
  return (
    <div className="bg-[#343444] rounded-3xl pb-8 pt-4 text-center max-w-md flex flex-col w-full items-center mx-auto">
      {/* Cart Header */}
      <div className="w-full text-left">
        <h1 className="text-white font-urbanist text-lg ml-5">Cart</h1>
        <hr className="border-slate-600 mt-2 mb-6" />
      </div>
      {/* Card Content */}
      <div className="flex flex-col items-center">
        {/* Icon Section */}
        <div className="bg-[#403E65] rounded-full p-4 mb-6">
          <img src="/assets/icons/cart/cart.png" alt="Cart Icon" />
        </div>
        {/* Heading */}
        <h2 className="text-[#FFFFFF] font-urbanist text-[28px] font-bold mb-4">
          Your shopping cart is Empty!
        </h2>
        {/* Description */}
        <p className="text-[#BEBEBE] font-urbanist text-[16px] w-[90%]">
          Any products you add to your cart will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default EmptyCartCard;
