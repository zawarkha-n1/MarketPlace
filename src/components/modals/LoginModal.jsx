import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import RoundedOutlineButton from "./../common/buttons/RoundedOutlineButton";
import { GoogleLogin } from "@react-oauth/google";
import { useAppData } from "../../context/AppContext";

const LoginModal = ({ modalIsOpen, closeModal }) => {
  const navigate = useNavigate();
  const { user, handleLoginSuccess, handleLogout } = useAppData();

  const handleNavigate = () => {
    navigate("/create-model");
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="modal-content absolute top-24 right-8 w-fit"
      overlayClassName="modal-overlay"
    >
      <div className="">
        <RoundedOutlineButton buttonName="Google" />
      </div>
      <div onClick={closeModal}>
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
          />
        ) : (
          <div>
            <h2>Welcome, {user.name}</h2>
            <img src={user.picture} alt={user.name} />
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
