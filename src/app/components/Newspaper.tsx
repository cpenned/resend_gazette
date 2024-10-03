"use client";
import { PresentationControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const NewsPaperMesh = () => {
  const { scene } = useGLTF("/newspaper.glb");

  return <primitive object={scene} scale={0.01} />;
};

const Newspaper = () => {
  return (
    <Canvas
      dpr={[1, 4]}
      style={{ height: "min(40vh, 600px)" }}
      camera={{ fov: 50 }}
    >
      {/* "Newspaper" (https://skfb.ly/6TNOr) by Jeremy E. Grayson is licensed under */}
      {/* altered 10/2/24 by Chris Pennington */}
      {/* Creative Commons Attribution */}
      {/* (http://creativecommons.org/licenses/by/4.0/). */}

      <PresentationControls
        speed={0.4}
        global
        polar={[-0.1, Math.PI / 4]}
        zoom={1.2}
      >
        <Stage environment={"warehouse"}>
          <NewsPaperMesh />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
};
export default Newspaper;
