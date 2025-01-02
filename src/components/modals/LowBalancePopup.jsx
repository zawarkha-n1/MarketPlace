import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
const LowBalance = ({ modalIsOpen, closeModal, text }) => {
  const navigate = useNavigate();
  const handleCansel = () => {
    closeModal();
    return;
  };
  const handleConfirm = () => {
    closeModal();
    navigate("/plans");
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="modal-content absolute"
      overlayClassName="modal-overlay"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-[#343444] rounded-3xl px-12 py-12 text-center max-w-md w-full relative">
          <h2 className="text-[#FFFFFF] font-urbanist text-[29.22px] font-bold mb-4">
            Low Balance
          </h2>
          <p className="text-[#FFFFFF] font-urbanist text-[18px] mb-10 w-full justify-center">
            You want to Purchase more EXA's ?
          </p>
          <div className="flex gap-4">
            <button
              className="hover:bg-[#5750A2] bg-transparent border-2 border-[#DEDEDE80] hover:border-[#5750A2]  text-white font-urbanist text-[20.46px] py-3 px-6 w-[100%] text-center rounded-[30px]"
              onClick={handleCansel}
            >
              Cancel
            </button>
            <button
              className="bg-[#5750A2] text-white font-urbanist text-[20.46px] py-3 px-6 w-[100%] text-center rounded-[30px]"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-[#252538] bg-[#42425A] absolute top-3 right-3"
          >
            <img
              src="/assets/icons/cross/cross.png"
              alt="Close"
              className="h-3 w-3"
            />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LowBalance;
