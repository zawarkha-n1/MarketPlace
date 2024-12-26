import React, { useState, useRef } from "react";
import Modal from "react-modal";

export default function MyProfileModal({ isOpen, onClose }) {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [name, setName] = useState("Sufianaslam111");
  const [email, setEmail] = useState("Sufianaslam111@gmail.com");
  const [image, setImage] = useState("/assets/placeholder.svg");
  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  if (!isOpen) return null;
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameEdit = () => {
    setIsNameEditable(true);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleEmailEdit = () => {
    setIsEmailEditable(true);
    setTimeout(() => emailInputRef.current?.focus(), 0);
  };

  const handleNameSave = () => {
    setIsNameEditable(false);
  };

  const handleEmailSave = () => {
    setIsEmailEditable(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative w-full max-w-md bg-[#343444] rounded-3xl pt-4 pb-8 space-y-6"
      overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center modal-overlay"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6">
        <h2 className="text-xl text-white font-medium">My Profile</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#252538] bg-[#42425A] rounded-full -mr-2"
        >
          <img
            src="/assets/icons/cross/cross.png"
            alt="Close"
            className="h-3 w-3"
          />
        </button>
      </div>

      <hr className="border-[#42425A]" />

      {/* Profile Image */}
      <div className="relative w-24 h-24 mx-auto">
        <img
          src={image}
          alt="Profile"
          className="w-24 h-24 rounded-full bg-black object-cover"
        />
        <button
          className="absolute bottom-0 right-0 bg-[#42425A] p-2 rounded-full hover:bg-slate-600"
          onClick={handleImageClick}
        >
          <img
            src="/assets/icons/edit/edit.png"
            alt="Edit"
            className="h-4 w-4"
          />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-4 px-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-1"
          >
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className="w-full px-3 py-2 bg-transparent border border-[#42425A] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#333346]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={!isNameEditable}
            />
            <button
              onClick={isNameEditable ? handleNameSave : handleNameEdit}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-600 rounded-full"
            >
              <img
                src={
                  isNameEditable
                    ? "/assets/icons/check/check-indigo.png"
                    : "/assets/icons/edit/pen.png"
                }
                alt={isNameEditable ? "Save" : "Edit"}
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-1"
          >
            Your Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              ref={emailInputRef}
              className="w-full px-3 py-2 bg-transparent border border-[#42425A] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#333346]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!isEmailEditable}
            />
            <button
              onClick={isEmailEditable ? handleEmailSave : handleEmailEdit}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-600 rounded-full"
            >
              <img
                src={
                  isEmailEditable
                    ? "/assets/icons/check/check-indigo.png"
                    : "/assets/icons/edit/pen.png"
                }
                alt={isEmailEditable ? "Save" : "Edit"}
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Associated Account */}
      <div className="px-6">
        <label className="block text-sm font-medium text-white mb-2">
          Associated account
        </label>
        <div className="bg-transparent border border-[#42425A] rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex bg-[#42425A] rounded-full items-center justify-center">
              <img
                src="/assets/icons/gooogle/gooogle.png"
                alt="Google"
                className="w-6 h-6"
              />
            </div>
            <div>
              <div className="text-white text-sm">Google</div>
              <div className="text-white text-sm">Muhammad sufia..</div>
            </div>
          </div>
          <button className="p-2 hover:bg-[#252538] rounded-full">
            <button className="bottom-0 right-0 bg-[#42425A] p-2 rounded-full hover:bg-[#252538]">
              <img
                src="/assets/icons/detach/detach.png"
                alt="detach"
                className="h-4 w-4"
              />
            </button>
          </button>
        </div>
      </div>

      {/* Delete Account Button */}
      <div className="px-6">
        <button className="w-full  bg-[#42425A] text-white py-3 rounded-lg hover:bg-[#252538] transition-colors">
          Delete my account
        </button>
      </div>
    </Modal>
  );
}
