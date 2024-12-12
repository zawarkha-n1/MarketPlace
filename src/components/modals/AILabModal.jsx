import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const AILabModal = ({ modalIsOpen, closeModal }) => {
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
      className="modal-content absolute top-20 right-1/4 w-fit"
      overlayClassName="modal-overlay"
    >
      <div className="space-y-2 bg-[#343444] py-3">
        <button
          className="w-full bg-[#343444] hover:bg-slate-700 transition-colors rounded-xl p-4 flex items-center gap-4 group"
          onClick={handleNavigate}
        >
          <div className="w-10 h-10 bg-[#5750A2] rounded-lg flex items-center justify-center">
            <img src="/assets/icons/content-logos/3d.png" alt="" />
          </div>
          <div className="text-left">
            <h3 className="text-white font-medium">Generate 3D Model</h3>
            <p className="text-sm text-slate-400">
              Generate 3D Model from top AI generators.
            </p>
          </div>
        </button>
        <hr className="border-gray-500" />
        <button
          className="w-full  hover:bg-slate-700 transition-colors rounded-xl p-4 flex items-center gap-4 group"
          disabled
        >
          <div className="w-10 h-10 bg-[#5750A2] rounded-lg flex items-center justify-center">
            <img src="/assets/icons/content-logos/texture.png" alt="" />
          </div>
          <div className="text-left flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-medium">Generate Texture</h3>
              <span className="px-2 py-0.5 text-xs bg-[#5750A2] text-white rounded-full">
                Coming soon
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Generate texture from top AI generators.
            </p>
          </div>
        </button>
        <hr className="border-gray-500" />
        <button
          className="w-full  hover:bg-slate-700 transition-colors rounded-xl p-4 flex items-center gap-4 group"
          disabled
        >
          <div className="w-10 h-10 bg-[#5750A2] rounded-lg flex items-center justify-center">
            <img src="/assets/icons/content-logos/music.png" alt="" />
          </div>
          <div className="text-left flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-medium">Generate Music</h3>
              <span className="px-2 py-0.5 text-xs bg-[#5750A2] text-white rounded-full">
                Coming soon
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Generate music from top AI generators.
            </p>
          </div>
        </button>
      </div>
    </Modal>
  );
};

export default AILabModal;
