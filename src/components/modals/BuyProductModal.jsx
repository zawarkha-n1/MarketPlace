import React from "react";
import Modal from "react-modal";

const BuyProductModal = ({
  modalIsOpen,
  closeModal,
  productData,
  onCheckout,
  checkoutLabel = "Place Order",
}) => {
  if (!productData) {
    return null; // Safeguard against missing productData
  }

  const { asset_data: assetData } = productData;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="modal-content absolute w-fit"
      overlayClassName="modal-overlay"
    >
      <div className="bg-[#42425A] rounded-2xl py-3 md:py-4 space-y-3 xl:space-y-4 text-white xl:min-w-[400px] h-fit relative">
        <div className="flex flex-col px-4 pt-2 gap-3">
          <span className="font-urbanist text-[29px] font-bold leading-6">
            Order Summary
          </span>
          <span className="font-urbanist text-[18px] leading-6">
            Verify your information and click Place Order
          </span>
        </div>
        <div className="flex items-center justify-between px-6 absolute top-0 right-0">
          <button
            onClick={closeModal}
            className="p-2 hover:bg-slate-400 rounded-full bg-[#252538] -mr-2"
          >
            <img
              src="/assets/icons/cross/cross.png"
              alt="Close"
              className="h-3 w-3"
            />
          </button>
        </div>
        <hr className="border-slate-600" />

        {/* Main Content */}
        <div className="flex items-start gap-4 px-4">
          {/* Image */}
          <div className="w-28 h-28 rounded-md bg-[#C9A2FF] flex items-center justify-center">
            <img
              src={assetData.url}
              alt="Product"
              className="w-full rounded-md"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Title */}
            <div className="flex items-start justify-between w-full">
              <h3
                className="text-white text-lg font-medium truncate w-3/4"
                title={assetData.title}
                style={{ maxWidth: "70%" }} // Ensure it truncates without changing width
              >
                {`"${assetData.title.slice(0, 18)}${
                  assetData.title.length > 18 ? "..." : ""
                }"`}
              </h3>
            </div>

            {/* Price and Creator */}
            <div className="flex items-center justify-between mt-3">
              {/* Creator */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gray-300 overflow-hidden">
                  <img
                    src={assetData.creatorLogo}
                    alt="Creator"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[#8A8AA0] text-xs">Creator</span>
                  <p className="text-white font-semibold">
                    {assetData.creatorName}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div>
                <span className="text-[#8A8AA0] pl-4 text-xs">Price</span>
                <p className="text-white font-bold text-lg">
                  {assetData.price ? `${assetData.price} EXA` : "FREE"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="font-semibold text-sm md:text-base px-3 xl:px-4">
          Summary (1 Product)
        </div>

        <div className="flex items-center justify-between text-sm md:text-base px-3 xl:px-4">
          <p>Price</p>
          <p>{`${assetData.price} EXA`}</p>
        </div>
        <div className="flex items-center justify-between text-sm md:text-base px-3 xl:px-4">
          <p>Shipping</p>
          <p>Free</p>
        </div>

        <hr className="border-slate-600" />

        <div className="flex items-center justify-between text-sm md:text-base font-semibold px-3 xl:px-4">
          <p>Subtotal</p>
          <p>{`${assetData.price} EXA`}</p>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-3 items-center justify-center mt-4 px-4">
          <button
            className="transition duration-300 bg-customIndigo px-4 py-2 w-full text-md rounded-3xl"
            onClick={onCheckout}
          >
            {checkoutLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BuyProductModal;
