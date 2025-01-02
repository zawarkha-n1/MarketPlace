import React, { useState } from "react";
import CheckoutPopup from "../../modals/CheckoutPopup";
import LowBalance from "../../modals/LowBalancePopup";
import { useAppData } from "../../../context/AppContext";

const SummaryCard = ({
  summaryTitle = "Summary",
  productCount = 0,
  lineItems = [
    { label: "Price", value: "$0.00" },
    { label: "Shipping", value: "$0.00" },
  ],
  totalLabel = "Total",
  totalValue = "$0.00", // totalValue will be in EXA or equivalent
  checkoutLabel = "Checkout",
  onCheckout = () => {}, // Pass user's current EXA credits
  className = "",
  buttonClassName = "bg-customIndigo text-md rounded-3xl px-3 py-1.5 mt-3 text-white w-[90%]",
}) => {
  const { exaCredits } = useAppData();

  const [isCheckOutPopupOpen, setIsCheckOutPopupOpen] = useState(false);
  const [isLowBalanceModalOpen, setIsLowBalanceModalOpen] = useState(false);

  const handleCheckout = () => {
    // Strip the dollar sign and convert totalValue to a number
    const numericTotalValue = parseFloat(totalValue.replace("$", "").trim());

    // Check if the user's EXA balance is sufficient
    if (exaCredits < numericTotalValue) {
      setIsLowBalanceModalOpen(true); // Show low balance modal if EXA balance is lower than the total bill
    } else {
      setIsCheckOutPopupOpen(true); // Otherwise, show checkout popup
    }
  };

  const handleLowBalanceClose = () => {
    setIsLowBalanceModalOpen(false); // Close low balance modal
  };

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
        {/* Show the appropriate modal or button based on balance */}
        <button
          className={`transition duration-300 ${buttonClassName}`}
          onClick={handleCheckout}
        >
          {exaCredits < parseFloat(totalValue.replace("$", "").trim())
            ? "Low Balance"
            : checkoutLabel}
        </button>
      </div>

      {/* Low Balance Modal */}
      {isLowBalanceModalOpen && (
        <LowBalance
          modalIsOpen={isLowBalanceModalOpen}
          closeModal={handleLowBalanceClose}
          text={`You want to Purchase more EXA's?`}
        />
      )}

      {/* Checkout Popup */}
      {isCheckOutPopupOpen && (
        <CheckoutPopup
          modalIsOpen={isCheckOutPopupOpen}
          closeModal={() => setIsCheckOutPopupOpen(false)}
          text={`You want to confirm checkout? ${totalValue} EXA will be cut from your account`}
          onCheckout={onCheckout}
        />
      )}
    </div>
  );
};

export default SummaryCard;
