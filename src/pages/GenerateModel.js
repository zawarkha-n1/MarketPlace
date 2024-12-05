import React, { useState } from "react";
import Headingpage from "../components/HeadingPage";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Model component to load the .glb file
function Model() {
  const gltf = useLoader(GLTFLoader, "/tree.glb"); // Load the 3D model from the public folder
  return <primitive object={gltf.scene} scale={1} />;
}

const GenerateModel = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false); // Loader state
  const [isRegenerating, setIsRegenerating] = useState(false); // Regenerate state
  const [showCanvas, setShowCanvas] = useState(false); // State to show the canvas after loader

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview URL for the image
      setUploadedImage(imageUrl);
      setIsGenerating(false); // Reset loader
      setIsRegenerating(false); // Reset regenerate state on new upload
      setShowCanvas(false); // Hide canvas until "Generate" is clicked
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null); // Remove the uploaded image
    setIsGenerating(false); // Reset loader
    setIsRegenerating(false); // Reset regenerate state
    setShowCanvas(false); // Hide canvas
  };

  const handleGenerateClick = () => {
    if (uploadedImage) {
      setIsGenerating(true); // Show loader for generate action
      setShowCanvas(false); // Hide the image and canvas while loading
      setTimeout(() => {
        setIsGenerating(false); // Hide loader
        setShowCanvas(true); // Show canvas after loading
        setIsRegenerating(true); // Enable regenerate button after generation
      }, 3000); // Simulate loading for 3 seconds
    }
  };

  const handleRegenerateClick = () => {
    setIsGenerating(true); // Show loader for regenerate action
    setIsRegenerating(false); // Disable regenerate button during regeneration
    setShowCanvas(false); // Hide the canvas while regenerating
    setTimeout(() => {
      setIsGenerating(false); // Hide loader
      setShowCanvas(true); // Show canvas again after regeneration
      setIsRegenerating(true); // Re-enable regenerate button after regeneration
    }, 3000); // Simulate loading for 3 seconds
  };

  const handleExampleClick = (imageSrc) => {
    // Prevent example click if generating or regenerating
    if (isGenerating || isRegenerating) return;

    // Set the clicked example image as the uploaded image
    setUploadedImage(imageSrc);
    setIsGenerating(false); // Reset loader when example is selected
    setIsRegenerating(false); // Reset regenerate state on example selection
    setShowCanvas(false); // Hide canvas until "Generate" is clicked
  };

  return (
    <div className="min-h-screen bg-[#14141F] flex flex-col items-center justify-start">
      {/* Heading Section */}
      <Headingpage
        pagename={"Generate 3D Model with AI"}
        secondheading={"Pages"}
      />

      {/* Upload Box Section */}
      <div className="mt-12 w-full max-w-4xl px-4">
        {/* Upload Title */}
        <h2 className="text-white text-lg font-urbanist font-bold mb-4">
          Upload File
        </h2>

        {/* Upload Box */}
        <div
          className="relative rounded-lg bg-[#1F1F2B] flex flex-col items-center justify-center text-center p-8"
          style={{
            height: uploadedImage || isGenerating ? "auto" : "150px", // Adjust height dynamically
          }}
          onClick={
            !uploadedImage && !isGenerating && !isRegenerating
              ? () => document.getElementById("fileInput").click()
              : undefined
          }
        >
          {isGenerating ? (
            // Show loader if generating
            <div className="loader w-10 h-10 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
          ) : uploadedImage ? (
            <>
              {/* Cross Button (Hidden when generating or regenerating) */}
              {!isRegenerating && !isGenerating && (
                <button
                  className="absolute top-4 right-2 font-bold text-gray-500 hover:text-white rounded-full w-6 h-6 flex items-center justify-center"
                  style={{
                    fontSize: "20px",
                  }}
                  onClick={handleRemoveImage}
                >
                  ✕
                </button>
              )}

              {/* Render Image until generation */}
              {!showCanvas && (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-w-full max-h-96 object-contain"
                />
              )}

              {/* Render Canvas (3D Model) after generation */}
              {showCanvas && !isGenerating && (
                <Canvas
                  camera={{ position: [0, 1, 3], fov: 50 }}
                  style={{ height: "100%", width: "100%" }}
                >
                  <ambientLight intensity={0.5} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    intensity={1}
                  />
                  <Model />
                  <OrbitControls />
                </Canvas>
              )}
            </>
          ) : (
            // Placeholder text when no image is uploaded
            <>
              <p className="text-gray-400 font-urbanist">
                Drag & Drop Or Choose Image
              </p>
              <p className="text-gray-500 font-urbanist text-sm">
                PNG, JPG. Max 200mb.
              </p>
            </>
          )}
          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Generate Button and Credits */}
        <div className="flex justify-end items-center mt-4">
          {uploadedImage && (
            <span className="text-white font-urbanist mr-4 mt-1">
              Credits Used: 10 EXA
            </span>
          )}

          {/* Show Generate Button Only When Regenerate Button is Not Visible */}
          {!isRegenerating && (
            <button
              className="py-2 px-6 rounded-[50px] bg-[#A19CD2] text-[#595959] font-bold"
              onClick={handleGenerateClick}
              disabled={isGenerating || isRegenerating}
            >
              Generate
            </button>
          )}

          {/* Regenerate Button */}
          {isRegenerating && !isGenerating && (
            <button
              className="py-2 px-6 rounded-[50px] bg-[#343444] text-white font-bold flex items-center ml-4"
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

      {/* Examples Section */}
      <div className="w-full max-w-4xl mt-12 px-3">
        <h3 className="text-white text-lg font-urbanist font-bold mb-4">
          Examples
        </h3>
        <div className="flex space-x-2 overflow-x-auto">
          {Array(10)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-[20px] flex-shrink-0"
                style={{
                  backgroundColor: "#8A7FFF", // Set the background color to #8A7FFF
                }}
                onClick={() => handleExampleClick(`/${index + 1}.png`)} // Handle example click
              >
                {/* Use the image from the public folder */}
                <img
                  src={`/${index + 1}.png`} // Use dynamic image path (1.png, 2.png, etc.)
                  alt={`Example ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GenerateModel;
