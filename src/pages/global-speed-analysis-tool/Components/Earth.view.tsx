import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { PointerEvent as RNFPointerEvent } from "react-three-fiber";
import { TextureLoader, Texture } from "three";
import { GeometryTypes } from "../models";

interface EarthViewProps {
  onGlobeClicked: (e: RNFPointerEvent) => void;
}

RectAreaLightUniformsLib.init();

const EarthView = ({ onGlobeClicked }: EarthViewProps) => {
  const [earthTexture, setEarthTexture] = useState<Texture>(null);
  const [bumpTexture, setBumpTexture] = useState<Texture>(null);

  useEffect(() => {
    setEarthTexture(
      new TextureLoader().load(require("../assets/earth.jpg"), setEarthTexture)
    );

    setBumpTexture(
      new TextureLoader().load(require("../assets/bump.jpg"), setBumpTexture)
    );
  }, []);

  if (earthTexture) {
    return (
      <>
        <rectAreaLight
          intensity={1}
          position={[10, 10, 10]}
          width={10}
          height={1000}
          onUpdate={self => self.lookAt(new THREE.Vector3(0, 0, 0))}
        />
        <rectAreaLight
          intensity={1}
          position={[-10, -10, -10]}
          width={1000}
          height={10}
          onUpdate={self => self.lookAt(new THREE.Vector3(0, 0, 0))}
        />
        <mesh onClick={onGlobeClicked}>
          <sphereBufferGeometry
            attach="geometry"
            args={[1, 64, 64]}
            name={GeometryTypes.GLOBE}
          />
          <meshStandardMaterial
            attach="material"
            map={earthTexture}
            bumpMap={bumpTexture}
            bumpScale={0.05}
          />
          {/*   <meshPhongMaterial
            attach="material"
            color="green"
            opacity={0.25}
            transparent
          /> */}
        </mesh>
      </>
    );
  }
  return null;
};

export default EarthView;
