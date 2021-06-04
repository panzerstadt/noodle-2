import React, { Suspense, useMemo, useRef } from "react";
import {
  CubeCamera,
  Html,
  Octahedron,
  OrbitControls,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Mirrors } from "./Mirrors";
import { TitleCopies, Title } from "./Text";
import { Layers } from "three";
import useSlerp from "utils/use-slerp";

export const MirrorScene = ({ text = "MIRRORS" }) => {
  const renderTarget = useMemo(
    () =>
      new THREE.WebGLCubeRenderTarget(1024, {
        format: THREE.RGBAFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
      }),
    []
  );

  const camera = useRef<THREE.CubeCamera>();
  const sphere = useRef<THREE.Mesh>();

  // TODO: explore the matcapTexture repo
  const [matcapTexture] = useMatcapTexture("C8D1DC_575B62_818892_6E747B");

  useFrame(({ gl, scene }) => {
    camera.current.update(gl, scene);
  });
  const group = useSlerp();

  return (
    <group name="mirrors-container" ref={group}>
      <Octahedron
        ref={sphere}
        layers={[1] as unknown as Layers}
        name="background"
        args={[20, 4]}
        position={[0, 0, 0]}
      >
        <meshMatcapMaterial
          matcap={matcapTexture}
          side={THREE.BackSide}
          transparent
          opacity={0.3}
          color="#FFFFFF"
        />
      </Octahedron>
      <Title text={text} name="title" layers={[0]} position={[0, 0, -10]} />
      <TitleCopies text={text} layers={[1]} />
      <cubeCamera
        layers={[1] as unknown as Layers}
        ref={camera}
        args={[0.1, 100, renderTarget]}
        position={[0, 0, 5]}
      />
      <Mirrors layers={[0, 1]} envMap={renderTarget.texture} />

      <OrbitControls />
      <ambientLight intensity={0.4} />
    </group>
  );
};
