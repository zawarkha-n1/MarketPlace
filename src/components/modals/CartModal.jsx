import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../context/AppContext";

const CartModal = ({
  modalIsOpen,
  closeModal,
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
  buttonClassName = " text-md rounded-3xl px-3 py-1.5 mt-3 text-white w-[40%]  rounded-3xl cursor-pointer",
  inlibrary = false,
  price = 20,
  creatorImage,
  creatorName = "Exarta",
  title = " This is zawar's",
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/create-model");
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="rounded-xl p-6"
      overlayClassName="modal-overlay"
    >
      <div
        className={`bg-[#42425A] rounded-3xl py-3 md:py-4 space-y-3 xl:space-y-4 text-white xl:min-w-[400px] ${className} h-fit`}
      >
        <span className="ml-4 font-bold text-lg">Cart</span>
        <hr className="border-slate-600" />

        {/* Main Content */}
        <div className="flex items-start gap-4 px-4">
          {/* Image */}
          <div className="w-28 h-28 rounded-md bg-[#C9A2FF] flex items-center justify-center">
            <img src="/3D.png" alt="Product" className="w-full rounded-md" />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Title and Delete Icon */}
            <div className="flex items-start justify-between w-full">
              <h3
                className="text-white text-lg font-medium truncate w-3/4"
                title="This is the title of the card.."
                style={{ maxWidth: "70%" }} // Ensure it truncates without changing width
              >
                {`"${title || "This is the title of the card..."}"`}
              </h3>
              <button
                onClick={() => console.log("Remove Item")}
                className="text-gray-400 hover:text-white"
              >
                <img src="/trash.png" alt="Delete" className="w-5 h-5" />
              </button>
            </div>

            {/* Price and Creator */}
            <div className="flex items-center justify-between mt-3">
              {/* Creator */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gray-300 overflow-hidden">
                  <img
                    src={creatorImage || "/creatorImage.png"}
                    alt="Creator"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[#8A8AA0] text-xs">Creator</span>
                  <p className="text-white font-semibold">{creatorName}</p>
                </div>
              </div>

              {/* Price */}
              <div>
                <span className="text-[#8A8AA0] pl-4 text-xs">Price</span>
                <p className="text-white font-bold text-lg">
                  {price ? `${price} EXA` : "FREE"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="font-semibold text-sm md:text-base px-3 xl:px-4">
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

        {/* Buttons */}
        <div className="w-full flex gap-3 items-center justify-center mt-4">
          <button
            className={`bg-[#3E3E52] transition duration-300 cursor-pointer px-4 py-2  ${buttonClassName}`}
            onClick={handleNavigate}
          >
            View Cart
          </button>
          <button
            className={`transition duration-300 bg-customIndigo px-4 py-2  ${buttonClassName}`}
            onClick={onCheckout}
          >
            {checkoutLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
