import React from "react";
import Modal from "react-modal";

const ConfirmationModal = ({ handleNavigation, modalIsOpen, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="modal-content absolute w-fit"
      overlayClassName="modal-overlay"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-[#1F1F2B] rounded-lg p-8 text-center max-w-md w-full">
          <h2 className="text-[#FFFFFF] font-urbanist text-[29.22px] font-bold mb-4">
            Congratulation!
          </h2>
          <p className="text-[#FFFFFF] font-urbanist text-[18px] mb-6">
            You have successfully purchased the product. It can be accessed from
            the library.
          </p>
          <button
            className="bg-[#5750A2] text-white font-urbanist text-[20.46px] font-bold py-3 px-6 rounded-lg"
            onClick={handleNavigation}
          >
            Go to My Library
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
