import React, { Suspense } from "react";
import "./App.css";
import { MirrorScene } from "components/Scene";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 70 }}>
        <color attach="background" args={["black"]} />
        <Suspense fallback={<Html>Loading!</Html>}>
          <MirrorScene text="panzerstadt" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
