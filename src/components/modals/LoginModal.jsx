import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import RoundedOutlineButton from "./../common/buttons/RoundedOutlineButton";
import { GoogleLogin } from "@react-oauth/google";
import { useAppData } from "../../context/AppContext";
import axios from "axios";

const LoginModal = ({ modalIsOpen, closeModal }) => {
  const navigate = useNavigate();
  const { handleLoginSuccess } = useAppData();

  const handleNavigate = () => {
    navigate("/create-model");
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="modal-content absolute top-24 right-8 w-fit bg-[#2C2C47] rounded-xl p-6"
      overlayClassName="modal-overlay"
    >
      <div className="w-full text-left mb-4">
        <h2 className="text-white text-xl font-semibold">
          Login in with Google
        </h2>
      </div>
      <div onClick={closeModal}>
        <div
          className="border-2 border-[#5750A2] rounded-full  inline-block"
          style={{ width: "fit-content" }}
        >
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
            type="standard"
            theme="filled_black"
            size="large"
            text="continue_with"
            shape="pill"
            logo_alignment="center"
            width="400"
            locale="en"
          />
        </div>
      </div>
      {/* <div
        onClick={closeModal}
        className="border-2 border-[#5750A2] rounded-full inline-block mt-4 bg-[#2C2C47] hover:bg-[#33335A] transition duration-200"
        style={{ width: "400px" }}
      >
        <button
          className="w-full py-3 text-center text-white font-medium text-lg"
          onClick={handleEmailSignIn}
        >
          Sign in with Email
        </button>
      </div> */}
    </Modal>
  );
};

export default LoginModal;
