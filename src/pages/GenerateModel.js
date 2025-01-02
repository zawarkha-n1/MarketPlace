import React, { useState, useEffect } from "react";
import Headingpage from "../components/HeadingPage";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RectAreaLightUniformsLib } from "three/examples/jsm/Addons.js";
import { useAppData } from "../context/AppContext";
import LoginModal from "../components/modals/LoginModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LowBalance from "../components/modals/LowBalancePopup";

function Model({ glbUrl }) {
  const gltf = useLoader(GLTFLoader, glbUrl);
  return <primitive object={gltf.scene} scale={1} />;
}

const GenerateModel = () => {
  const [isLowBalanceModalOpen, setIsLowBalanceModalOpen] = useState(false);

  const handleLowBalanceClose = () => {
    setIsLowBalanceModalOpen(false); // Close low balance modal
  };
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleOwned = () => {
    navigate("/library");
  };
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  function closeLoginModal() {
    setIsLoginModalOpen(false);
  }
  const { user, setExaCredits, setUser, exaCredits } = useAppData();
  const [isUploading, setIsUploading] = useState(false);
  const [titleImage, settitle] = useState(null);
  const [modeluploaded, setmodeluploaded] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // Save the actual file
  const [isGenerating, setIsGenerating] = useState(false); // Loader state
  const [isRegenerating, setIsRegenerating] = useState(false); // Regenerate state
  const [showCanvas, setShowCanvas] = useState(false); // State to show the canvas after loader
  const [glbFileUrl, setGlbFileUrl] = useState(null); // State for the GLB file URL
  const [previousGlbFileUrl, setPreviousGlbFileUrl] = useState(null); // To track the previous GLB file URL

  const handleAddToLibrary = async () => {
    if (!uploadedImage || !glbFileUrl) {
      alert("Please generate a 3D model first");
      return;
    }
    if (exaCredits < 10) {
      setIsLowBalanceModalOpen(true); // Show low balance modal if EXA balance is lower than the total bill
      return;
    }

    setIsUploading(true);

    try {
      console.log("Starting payment process...");

      // Call the payment API first
      const paymentResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/process-payment`,
        {
          email: user.email,
          paymentType: "onetime",
          amount: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authtoken")}`,
          },
        }
      );

      console.log("Payment Response:", paymentResponse.data);

      if (paymentResponse.data.success) {
        console.log(
          "Payment successful. Proceeding to add asset to library..."
        );

        // Update user credits after successful payment
        const updatedCredits = paymentResponse.data.newCredits;
        setExaCredits(updatedCredits);
        const updatedUser = { ...user, exaCredits: updatedCredits };
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        // Now proceed with the upload logic
        const glbResponse = await fetch(glbFileUrl);
        const glbBlob = await glbResponse.blob();

        // Convert image URL to Blob
        const imageResponse = await fetch(uploadedImage);
        const imageBlob = await imageResponse.blob();

        // Create FormData and append files
        const formData = new FormData();
        formData.append("model", glbBlob, "model.glb");
        formData.append("image", imageBlob);
        formData.append("email", user.email);
        formData.append("title", titleImage);

        // Send to your backend API
        const uploadResponse = await fetch(
          `${process.env.REACT_APP_BASE_URL}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload to library");
        }

        const { modelUrl, imageUrl } = await uploadResponse.json();

        console.log("Successfully uploaded to library:", {
          modelUrl,
          imageUrl,
        });

        // Show confirmation modal after successful upload
        setIsConfirmModalOpen(true);
        setmodeluploaded(true);
      } else {
        console.log("Payment failed:", paymentResponse.data.message);
      }
    } catch (error) {
      console.log("Error during payment or adding asset to library:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  useEffect(() => {
    const storedImage = sessionStorage.getItem("uploadedImage");
    if (storedImage) {
      setShowCanvas(false);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Allowed MIME types
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    // Check if uploaded file's MIME type is in the allowed list
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (PNG, JPG, or JPEG).");
      return;
    }

    // If valid, proceed
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl); // Show the preview
    setUploadedFile(file); // Save the file in state
    sessionStorage.setItem("uploadedImage", imageUrl);
    console.log("Image uploaded:", file);

    setIsGenerating(false);
    setIsRegenerating(false);
    setShowCanvas(false);
  };
  const uploadFile = (file) => {
    if (!file) return;

    // Allowed MIME types
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (PNG, JPG, or JPEG).");
      return;
    }

    // If valid, proceed
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setUploadedFile(file);
    sessionStorage.setItem("uploadedImage", imageUrl);
    console.log("Image uploaded:", file);
    setIsGenerating(false);
    setIsRegenerating(false);
    setShowCanvas(false);
    setmodeluploaded(false);
  };

  // 2. The file input's onChange can call the same helper
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    uploadFile(file);
  };

  // 3. The drop handler can also use the same helper
  const handleImageDrop = (file) => {
    uploadFile(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null); // Remove the uploaded image
    setUploadedFile(null); // Remove the actual file
    sessionStorage.removeItem("uploadedImage"); // Clear the image URL from sessionStorage
    console.log("Image removed from sessionStorage");
    setIsGenerating(false); // Reset loader
    setIsRegenerating(false); // Reset regenerate state
    setShowCanvas(false); // Hide canvas
  };

  const handleGenerateClick = async () => {
    if (!sessionStorage.getItem("authToken")) {
      setIsLoginModalOpen(true);

      return;
    }
    if (!uploadedFile && !uploadedImage) {
      alert("Please Uplaod image first");
      return;
    }

    setIsGenerating(true); // Show loader for generate action
    setShowCanvas(false); // Hide the image and canvas while loading

    if (uploadedFile) {
      // If the user uploaded a file, use it directly
      console.log("Generate button clicked with file:", uploadedFile);
      await uploadImage(uploadedFile); // Upload the file to the API
    } else if (uploadedImage) {
      // If an image URL is selected (example image), fetch it and upload as a Blob
      console.log("Generate button clicked with image URL:", uploadedImage);

      try {
        const response = await fetch(uploadedImage); // Fetch the image from the URL
        const blob = await response.blob(); // Convert the response to a Blob
        const exampleFile = new File([blob], "example.png", {
          type: blob.type,
        });

        console.log(
          "Fetched and created file from example image:",
          exampleFile
        );
        await uploadImage(exampleFile); // Upload the Blob as if it were a file
      } catch (error) {
        console.log("Error fetching or uploading example image:", error);
      }
    }

    // Simulate a loading delay
    setTimeout(() => {
      setIsGenerating(false); // Hide loader
      setShowCanvas(true); // Show canvas after loading
      setIsRegenerating(true); // Enable regenerate button after generation
    }, 3000);
  };

  const handleRegenerateClick = async () => {
    // Ensure that uploadedFile or uploadedImage is available before regenerating
    if (!uploadedFile && !uploadedImage) {
      console.log("No file or image selected for regeneration");
      return;
    }

    console.log("Regenerate button clicked.");

    setIsGenerating(true); // Show loader for regeneration
    setIsRegenerating(false); // Disable the regenerate button during regeneration
    setShowCanvas(false); // Hide the canvas while regenerating

    // Determine whether to use the uploaded file or the image URL for regeneration
    const fileToUpload = uploadedFile || uploadedImage;

    try {
      // Regenerate the 3D model
      await uploadImage(fileToUpload); // Send the image/file to the API

      // Simulate a delay for regeneration (adjust time as needed)
      setTimeout(() => {
        setIsGenerating(false); // Hide loader after regeneration
        setShowCanvas(true); // Show the canvas again after regeneration
        setIsRegenerating(true); // Re-enable regenerate button
      }, 3000);
    } catch (error) {
      console.log("Error during regeneration:", error);
      setIsGenerating(false); // Hide loader if there is an error
    }
  };

  // const uploadImage = async (imageFile) => {
  //   const formData = new FormData();

  //   if (typeof imageFile === "string") {
  //     // Handle case where imageFile is a URL (e.g., selected example)
  //     try {
  //       const response = await fetch(imageFile); // Fetch the image as a Blob
  //       const blob = await response.blob(); // Convert to Blob
  //       formData.append("file", blob, "example.png"); // Append the Blob as a file
  //     } catch (error) {
  //       console.log("Error fetching or uploading example image:", error);
  //       return;
  //     }
  //   } else {
  //     // Normal file upload
  //     formData.append("file", imageFile); // Append the image file to FormData
  //   }

  //   try {
  //     console.log("Uploading image to API...");
  //     const response = await fetch(
  //       "https://sf3d.tenant-7654b5-asrpods.ord1.ingress.coreweave.cloud/get_mesh",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       const fileBlob = await response.blob(); // Get the file as a Blob
  //       const fileUrl = URL.createObjectURL(fileBlob); // Create a URL for the Blob

  //       // Log the GLB file URL
  //       console.log("GLB file URL:", fileUrl);

  //       // Only update the GLB URL if it's different from the previous one
  //       if (fileUrl !== previousGlbFileUrl) {
  //         setGlbFileUrl(fileUrl); // Update GLB URL state with the new file
  //         setPreviousGlbFileUrl(fileUrl); // Track the previous GLB URL
  //       } else {
  //         console.log(
  //           "The model is the same as the previous one, skipping update."
  //         );
  //       }
  //     } else {
  //       console.log("Error uploading image:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.log("Error uploading image:", error);
  //   }
  // };

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    let imageFileName = "";

    if (typeof imageFile === "string") {
      // Handle case where imageFile is a URL (e.g., selected example)
      try {
        const response = await fetch(imageFile); // Fetch the image as a Blob
        const blob = await response.blob(); // Convert to Blob
        imageFileName = imageFile.split("/").pop(); // Extract file name from URL
        formData.append("file", blob, imageFileName); // Append the Blob as a file
      } catch (error) {
        console.log("Error fetching or uploading example image:", error);
        return;
      }
    } else {
      // Normal file upload
      imageFileName = imageFile.name; // Get the uploaded file's name
      formData.append("file", imageFile); // Append the image file to FormData
    }

    try {
      console.log("Uploading image to API...");
      const response = await fetch(
        "https://sf3d.tenant-7654b5-asrpods.ord1.ingress.coreweave.cloud/get_mesh",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const fileBlob = await response.blob(); // Get the file as a Blob
        const fileUrl = URL.createObjectURL(fileBlob); // Create a URL for the Blob

        // Log the GLB file URL
        console.log("GLB file URL:", fileUrl);

        // Only update the GLB URL if it's different from the previous one
        if (fileUrl !== previousGlbFileUrl) {
          setGlbFileUrl(fileUrl); // Update GLB URL state with the new file
          setPreviousGlbFileUrl(fileUrl); // Track the previous GLB URL

          // You can now add the Title as the file name (imageFileName)
          const title = imageFileName;
          const modelUrl = fileUrl; // You can use this or any URL your backend provides
          const imageUrl = uploadedImage;

          // Add to the 3D assets or upload to the backend as required
          const data = {
            Title: title, // Set the Title to the image file name
            imageUrl: imageUrl,
            modelUrl: modelUrl,
            created_at: new Date().toISOString(), // Current timestamp
          };
          settitle(data.Title);

          console.log("Generated 3D asset:", data);
        } else {
          console.log(
            "The model is the same as the previous one, skipping update."
          );
        }
      } else {
        console.log("Error uploading image:", response.statusText);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };
  // const handleExampleClick = (imageSrc) => {
  //   // Prevent example click if generating or regenerating
  //   if (isGenerating || isRegenerating) return;

  //   console.log("Example clicked:", imageSrc);

  //   // Set the clicked example image URL directly
  //   const imageUrl = imageSrc; // Directly use the image URL (e.g., "/1.png")

  //   // Set the uploaded image URL to show as the preview
  //   setUploadedImage(imageUrl);
  //   setUploadedFile(null); // Reset the uploaded file since we're using an image URL

  //   // Save the image URL to sessionStorage (optional, for persistence)
  //   sessionStorage.setItem("uploadedImage", imageUrl);

  //   // Reset other states
  //   setIsGenerating(false); // Reset loader
  //   setIsRegenerating(false); // Reset regenerate state on example selection
  //   setShowCanvas(false); // Hide canvas until "Generate" is clicked
  // };

  const handleExampleClick = (imageSrc) => {
    // Prevent example click if generating or regenerating
    if (isGenerating || isRegenerating) return;

    console.log("Example clicked:", imageSrc);

    // Set the clicked example image URL directly
    const imageUrl = `/examples/${imageSrc}`; // Use the examples folder

    // Set the uploaded image URL to show as the preview
    setUploadedImage(imageUrl);
    setUploadedFile(null); // Reset the uploaded file since we're using an image URL

    // Save the image URL to sessionStorage (optional, for persistence)
    sessionStorage.setItem("uploadedImage", imageUrl);

    // Reset other states
    setIsGenerating(false); // Reset loader
    setIsRegenerating(false); // Reset regenerate state on example selection
    setShowCanvas(false); // Hide canvas until "Generate" is clicked
  };
  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-start pb-8">
      {/* Heading Section */}
      <Headingpage pagename={"Generate 3D Model with AI"} />

      <div className="mt-2 w-full max-w-4xl px-4">
        {/* Upload Title */}
        <h2 className="text-white text-lg font-urbanist font-bold mb-4">
          Upload File
        </h2>

        <div
          className="relative rounded-lg bg-[#1F1F2B] flex flex-col items-center 
             justify-center text-center p-8"
          style={{
            height: "350px", // Fixed container height
          }}
          onDragOver={(event) => {
            // 1. Allow dropping by preventing default
            event.preventDefault();
          }}
          onDrop={(event) => {
            // 2. Prevent default so the file can be dropped
            event.preventDefault();

            // 3. Access the dropped files
            const droppedFiles = event.dataTransfer.files;
            if (droppedFiles && droppedFiles.length > 0) {
              // 4. Pass the first dropped file to your upload logic
              handleImageDrop(droppedFiles[0]);
            }
          }}
          onClick={
            !uploadedImage && !isGenerating && !isRegenerating
              ? () => document.getElementById("fileInput").click()
              : undefined
          }
        >
          {isGenerating ? (
            // Loader
            <div className="loader w-10 h-10 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
          ) : uploadedImage ? (
            <>
              {!isRegenerating && !isGenerating && (
                <button
                  className="absolute top-4 right-2 font-bold text-gray-500 hover:text-white 
                     rounded-full w-6 h-6 flex items-center justify-center"
                  style={{
                    fontSize: "20px",
                  }}
                  onClick={handleRemoveImage}
                >
                  ✕
                </button>
              )}

              {/* Only show <img> until generation */}
              {!showCanvas && (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="h-full w-auto object-contain"
                />
              )}

              {/* Render Canvas (3D Model) after generation */}
              {showCanvas && !isGenerating && glbFileUrl && (
                <Canvas
                  camera={{
                    // Move camera closer (e.g., from [0, 1, 3] to [0, 1, 2])
                    // to zoom in on the model
                    position: [0, 1, 2],

                    // Reduce FOV from 50 to 30 for a more zoomed view
                    fov: 30,
                  }}
                  style={{ height: "100%", width: "100%" }}
                >
                  {/* Increase ambient light for overall brightness */}
                  <ambientLight intensity={1} />

                  {/* Increase the spotlight intensity; you could also add multiple lights */}
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    // Higher intensity = brighter spotlight
                    intensity={1.5}
                  />

                  <Model glbUrl={glbFileUrl} />
                  <OrbitControls />
                </Canvas>
              )}
            </>
          ) : (
            <>
              <p className="text-gray-400 font-urbanist">
                Drag & Drop Or Choose Image
              </p>
              <p className="text-gray-500 font-urbanist text-sm">
                PNG, JPG. Max 500MB.
              </p>
            </>
          )}
          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            accept=".png, .jpg, .jpeg"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>

        {/* Generate Button and Credits */}
        <div
          className={`flex ${
            showCanvas ? "justify-between" : "justify-end"
          } items-center mt-4`}
        >
          {showCanvas && (
            <button
              className={`bg-[#5750A2] text-white rounded-3xl flex items-center text-center gap-2 px-6 py-3 ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleAddToLibrary}
              disabled={isUploading || modeluploaded}
            >
              {isUploading ? (
                <div className="loader w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              ) : (
                <img src="/assets/icons/library/library.png" alt="" />
              )}
              {isUploading ? "Adding to Library..." : "Add to My Library"}
            </button>
          )}
          <div className="flex items-center justify-end">
            <span className="text-white font-urbanist mr-4 mt-1">
              Credits Used: 10 EXA
            </span>

            {/* Show Generate Button Only When Regenerate Button is Not Visible */}
            {!isRegenerating && (
              <button
                className={`${
                  uploadedImage
                    ? "bg-[#5750A2] text-white"
                    : "bg-[#A19CD2] text-[#595959]"
                }  rounded-3xl flex items-center text-center gap-2 px-8 py-3`}
                onClick={handleGenerateClick}
                disabled={isGenerating || isRegenerating}
              >
                Generate
              </button>
            )}

            {/* Regenerate Button */}
            {isRegenerating && !isGenerating && (
              <button
                className="bg-[#343444] text-white rounded-3xl flex items-center text-center gap-2 px-8 py-3"
                onClick={handleRegenerateClick}
              >
                <img
                  src="/refresh.jpg"
                  alt="Regenerate"
                  className="w-4 h-4 mr-2"
                />
                Regenerate
              </button>
            )}
          </div>
        </div>

        <div className="w-full max-w-4xl mt-4 px-0">
          <h3 className="text-white text-lg font-urbanist font-bold mb-4">
            Examples
          </h3>
          <div className="flex space-x-2">
            {Array(6)
              .fill("") // Generate the examples dynamically
              .map((_, index) => (
                <div
                  key={index}
                  className="w-20 h-20 rounded-[20px] flex-shrink-0"
                  style={{
                    backgroundColor: "#2A2A37", // Set the background color to #2A2A37
                  }}
                  onClick={() => handleExampleClick(`example${index + 1}.png`)} // Update with the new example names
                >
                  {/* Use the image from the examples folder */}
                  <img
                    src={`/examples/example${index + 1}.png`} // Updated path to the 'examples' folder
                    alt={`Example ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {isLoginModalOpen && (
        <LoginModal
          modalIsOpen={isLoginModalOpen}
          closeModal={closeLoginModal}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmationModal
          handleNavigation={handleOwned}
          modalIsOpen={isConfirmModalOpen}
          closeModal={() => setIsConfirmModalOpen(false)}
          in3d={true}
        />
      )}
      {isLowBalanceModalOpen && (
        <LowBalance
          modalIsOpen={isLowBalanceModalOpen}
          closeModal={handleLowBalanceClose}
          text={`You want to Purchase more EXA's?`}
        />
      )}
    </div>
  );
};

export default GenerateModel;
