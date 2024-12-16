import React from "react";

const SummaryCard = ({
  summaryTitle = "Summary",
  productCount = 0,
  lineItems = [
    { label: "Price", value: "$0.00" },
    { label: "Shipping", value: "$0.00" },
  ],
  totalLabel = "Total",
  totalValue = "$0.00",
  checkoutLabel = "Checkout",
  onCheckout = () => {},
  className = "",
  buttonClassName = "bg-customIndigo text-md rounded-3xl px-3 py-1.5 mt-3 text-white w-[90%] ",
}) => {
  return (
    <div
      className={`bg-[#42425A] rounded-lg py-3 md:py-4 space-y-3 xl:space-y-4 text-white xl:min-w-[350px] ${className} h-fit`}
    >
      <div className="font-semibold text-sm md:text-base px-3 xl:px-6">
        {summaryTitle} ({productCount}{" "}
        {productCount === 1 ? "Product" : "Products"})
      </div>

      {lineItems.map((item, index) => (
        <div
          className="flex items-center justify-between text-sm md:text-base px-3 xl:px-4"
          key={index}
        >
          <p>{item.label}</p>
          <p>{item.value}</p>
        </div>
      ))}

      <hr className="border-slate-600" />

      <div className="flex items-center justify-between text-sm md:text-base font-semibold px-3 xl:px-4">
        <p>Subtotal</p>
        <p>{totalValue}</p>
      </div>

      <div className="w-full flex items-center justify-center">
        <button
          className={`transition duration-300 ${buttonClassName}`}
          onClick={onCheckout}
        >
          {checkoutLabel}
        </button>
      </div>
    </div>
  );
};

export default SummaryCard;
