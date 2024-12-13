import React, { useState, useEffect } from "react";
import Headingpage from "../components/HeadingPage";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RectAreaLightUniformsLib } from "three/examples/jsm/Addons.js";

function Model({ glbUrl }) {
  const gltf = useLoader(GLTFLoader, glbUrl);
  return <primitive object={gltf.scene} scale={1} />;
}

const GenerateModel = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // Save the actual file
  const [isGenerating, setIsGenerating] = useState(false); // Loader state
  const [isRegenerating, setIsRegenerating] = useState(false); // Regenerate state
  const [showCanvas, setShowCanvas] = useState(false); // State to show the canvas after loader
  const [glbFileUrl, setGlbFileUrl] = useState(null); // State for the GLB file URL
  const [previousGlbFileUrl, setPreviousGlbFileUrl] = useState(null); // To track the previous GLB file URL

  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      setShowCanvas(false);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // For preview URL
      setUploadedImage(imageUrl); // Show the preview image
      setUploadedFile(file); // Save the actual file
      localStorage.setItem("uploadedImage", imageUrl); // Save image URL to localStorage
      console.log("Image uploaded:", file);
      setIsGenerating(false); // Reset loader
      setIsRegenerating(false); // Reset regenerate state on new upload
      setShowCanvas(false); // Hide canvas until "Generate" is clicked
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null); // Remove the uploaded image
    setUploadedFile(null); // Remove the actual file
    localStorage.removeItem("uploadedImage"); // Clear the image URL from localStorage
    console.log("Image removed from localStorage");
    setIsGenerating(false); // Reset loader
    setIsRegenerating(false); // Reset regenerate state
    setShowCanvas(false); // Hide canvas
  };

  const handleGenerateClick = async () => {
    if (!localStorage.getItem("authToken")) {
      alert("Please login first to generate Model");
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
        console.error("Error fetching or uploading example image:", error);
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
      console.error("No file or image selected for regeneration");
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
      console.error("Error during regeneration:", error);
      setIsGenerating(false); // Hide loader if there is an error
    }
  };

  const uploadImage = async (imageFile) => {
    const formData = new FormData();

    if (typeof imageFile === "string") {
      // Handle case where imageFile is a URL (e.g., selected example)
      try {
        const response = await fetch(imageFile); // Fetch the image as a Blob
        const blob = await response.blob(); // Convert to Blob
        formData.append("file", blob, "example.png"); // Append the Blob as a file
      } catch (error) {
        console.error("Error fetching or uploading example image:", error);
        return;
      }
    } else {
      // Normal file upload
      formData.append("file", imageFile); // Append the image file to FormData
    }

    try {
      console.log("Uploading image to API...");
      const response = await fetch("http://172.16.15.209:8000/get_mesh", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const fileBlob = await response.blob(); // Get the file as a Blob
        const fileUrl = URL.createObjectURL(fileBlob); // Create a URL for the Blob

        // Log the GLB file URL
        console.log("GLB file URL:", fileUrl);

        // Only update the GLB URL if it's different from the previous one
        if (fileUrl !== previousGlbFileUrl) {
          setGlbFileUrl(fileUrl); // Update GLB URL state with the new file
          setPreviousGlbFileUrl(fileUrl); // Track the previous GLB URL
        } else {
          console.log(
            "The model is the same as the previous one, skipping update."
          );
        }
      } else {
        console.error("Error uploading image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  //   const uploadImage = async (imageFile) => {
  //     const formData = new FormData();

  //     if (typeof imageFile === "string") {
  //       // Handle case where imageFile is a URL (e.g., selected example)
  //       try {
  //         const response = await fetch(imageFile); // Fetch the image as a Blob
  //         const blob = await response.blob(); // Convert to Blob
  //         formData.append("file", blob, "example.png"); // Append the Blob as a file
  //       } catch (error) {
  //         console.error("Error fetching or uploading example image:", error);
  //         return;
  //       }
  //     } else {
  //       // Normal file upload
  //       formData.append("file", imageFile); // Append the image file to FormData
  //     }

  //     try {
  //       console.log("Uploading image to API...");
  //       const response = await fetch("http://172.16.15.209:8000/get_mesh", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         const fileBlob = await response.blob(); // Get the file as a Blob
  //         const fileUrl = URL.createObjectURL(fileBlob); // Create a URL for the Blob

  //         // Log the GLB file URL
  //         console.log("GLB file URL:", fileUrl);

  //         // Trigger file download
  //         saveAs(fileBlob, "generated_model.glb"); // Trigger download with FileSaver.js

  //         // Only update the GLB URL if it's different from the previous one
  //         if (fileUrl !== previousGlbFileUrl) {
  //           setGlbFileUrl(fileUrl); // Update GLB URL state with the new file
  //           setPreviousGlbFileUrl(fileUrl); // Track the previous GLB URL
  //         } else {
  //           console.log(
  //             "The model is the same as the previous one, skipping update."
  //           );
  //         }
  //       } else {
  //         console.error("Error uploading image:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     }
  //   };
  const handleExampleClick = (imageSrc) => {
    // Prevent example click if generating or regenerating
    if (isGenerating || isRegenerating) return;

    console.log("Example clicked:", imageSrc);

    // Set the clicked example image URL directly
    const imageUrl = imageSrc; // Directly use the image URL (e.g., "/1.png")

    // Set the uploaded image URL to show as the preview
    setUploadedImage(imageUrl);
    setUploadedFile(null); // Reset the uploaded file since we're using an image URL

    // Save the image URL to localStorage (optional, for persistence)
    localStorage.setItem("uploadedImage", imageUrl);

    // Reset other states
    setIsGenerating(false); // Reset loader
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

      <div className="mt-12 w-full max-w-4xl px-4">
        {/* Upload Title */}
        <h2 className="text-white text-lg font-urbanist font-bold mb-4">
          Upload File
        </h2>

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
              {showCanvas && !isGenerating && glbFileUrl && (
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

        <div className="w-full max-w-4xl mt-12 px-0">
          <h3 className="text-white text-lg font-urbanist font-bold mb-4">
            Examples
          </h3>
          <div className="flex space-x-2 ">
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
    </div>
  );
};

export default GenerateModel;
