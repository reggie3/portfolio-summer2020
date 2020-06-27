import * as React from "react";
import {
  GeometryTypes,
  MarkerTypes,
  GsatLocation,
  LocationIcon,
} from "../models";
import { AppColors } from "../colors";
import { useState, useEffect } from "react";
import * as THREE from "three";
import { HTML } from "drei";
import { AnimatePresence } from "framer-motion";
import { mapLabelVariants, MapLabel } from "./mapLabelVariants";
import { infoTextSmall } from "../styles/styles";

export interface LocationMarkerProps {
  location: GsatLocation;
}

const getMarkerColor = (markerType: MarkerTypes): string => {
  switch (markerType) {
    case MarkerTypes.FRIENDLY:
      return AppColors.friendlyLocation;
    case MarkerTypes.ENEMY:
      return AppColors.enemyLocation;
    case MarkerTypes.NEUTRAL:
      return AppColors.neutralLocation;
    default:
      return AppColors.friendlyLocation;
  }
};

const onLocationMarkerClicked = () => {};

const LocationMarker = ({ location }: LocationMarkerProps) => {
  const { id, icon } = location;
  const { type } = icon;
  const locationMarkerID = `${GeometryTypes.LOCATION_MARKER}-${id}`;
  const { position, size } = icon;
  const [hovered, setHover] = useState(false);
  const [markerColor, setMarkerColor] = useState<string>("purple");

  useEffect(() => {
    console.log(getMarkerColor(type));
    setMarkerColor(getMarkerColor(type));
  }, [type]);

  return location.isVisible ? (
    <pointLight args={[new THREE.Color(markerColor), 2, 50]}>
      <mesh
        key={locationMarkerID}
        position={position}
        name={locationMarkerID}
        onClick={onLocationMarkerClicked}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}
        scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      >
        <sphereBufferGeometry
          attach="geometry"
          args={[size]}
          name={GeometryTypes.LOCATION_MARKER}
        />
        <meshStandardMaterial attach="material" color={markerColor} />

        {/*  <HTML>
          <AnimatePresence>
            {hovered && (
              <MapLabel
                variants={mapLabelVariants}
                initial={"initial"}
                exit={"hidden"}
                animate={"visible"}
                // @ts-ignore
                style={infoTextSmall}
              >
                {location.name}
              </MapLabel>
            )}
          </AnimatePresence>
        </HTML> */}
      </mesh>
    </pointLight>
  ) : null;
};

export default LocationMarker;
