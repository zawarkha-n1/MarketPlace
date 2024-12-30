import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Model({ glbUrl }) {
  const gltf = useLoader(GLTFLoader, glbUrl);

  // We'll attach a ref to the actual glTF.scene
  // so we can measure its bounding box
  const objectRef = useRef();

  // State to store the calculated position/scale
  const [modelPosition, setModelPosition] = useState([0, 0, 0]);
  const [modelScale, setModelScale] = useState([1, 1, 1]);

  useEffect(() => {
    if (!gltf || !gltf.scene) return;

    // Ensure our <primitive> is already in the DOM
    if (!objectRef.current) return;

    // 1) Compute the bounding box
    const box = new THREE.Box3().setFromObject(objectRef.current);
    const size = new THREE.Vector3();
    box.getSize(size); // size.x, size.y, size.z
    const center = new THREE.Vector3();
    box.getCenter(center);

    // 2) Move (translate) the model so its center is at [0, 0, 0]
    // We do that by shifting it by -center
    const reposition = center.multiplyScalar(-1);

    // 3) Scale the model uniformly so the largest dimension is ~1.5 units
    const maxDimension = Math.max(size.x, size.y, size.z);
    const desiredSize = 1.5; // pick any "standard" size you like
    const scaleFactor = desiredSize / maxDimension;

    setModelPosition([reposition.x, reposition.y, reposition.z]);
    setModelScale([scaleFactor, scaleFactor, scaleFactor]);
  }, [gltf]);

  return (
    <group position={modelPosition} scale={modelScale}>
      {/* The ref so we can measure bounding box */}
      <primitive ref={objectRef} object={gltf.scene} />
    </group>
  );
}
