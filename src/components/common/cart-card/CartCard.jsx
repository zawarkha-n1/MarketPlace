import React from "react";

const CartCard = ({
  imageSrc = "/fantacy.png",
  imageAlt = "Product image",
  title = "Product Title",
  priceLabel = "Price",
  price = "0.00",
  onRemove = () => {},
  className = "",
  buttonClassName = "",
}) => {
  return (
    <div
      className={`bg-[#42425A] rounded-lg shadow-md p-4 xl:p-4 flex font-urbanist flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 ${className}`}
    >
      <div className="w-full md:w-1/3">
        <img src={imageSrc} alt={imageAlt} className="w-full h-auto rounded" />
      </div>

      <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
        <h1 className="text-white text-lg md:text-xl font-bold">{title}</h1>
        <div>
          <p className="text-[#EBEBEB] xl:text-[16px] leading-6">
            {priceLabel}
          </p>
          <h2 className="text-white text-xl xl:text-2xl mt-1">{price}</h2>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex xl:self-end md:self-end">
        <button
          onClick={onRemove}
          className={`bg-[#595977] xl:text-[17px] text-white px-4 py-2 rounded hover:bg-[#7979A2] transition duration-300 ${buttonClassName}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;