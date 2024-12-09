import React from "react";

const LibraryCard = ({ title = "Default Title", image }) => {
  return (
    <div className="w-full max-w-[280px] bg-slate-900 p-4 rounded-2xl">
      <div className="relative">
        <div className="aspect-square rounded-xl bg-indigo-400 overflow-hidden relative mb-2">
          <img
            src={image}
            alt="3D Model Preview"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
            {/* <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> */}
            <img
              src="/assets/icons/star/star.png"
              alt="star"
              className="w-3 h-3 fill-yellow-400 text-yellow-400"
            />
            <span className="text-xs font-medium text-white">4.9</span>
          </div>
        </div>

        <h3 className="text-sm text-slate-200 truncate">{title}</h3>
      </div>
    </div>
  );
};

export default LibraryCard;
