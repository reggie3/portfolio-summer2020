import * as React from "react";
import { GeometryTypes, MarkerTypes, GsatLocation } from "../models";
import { AppColors } from "../colors";
import { useState, useEffect } from "react";
import * as THREE from "three";
import { HTML, Sphere } from "drei";
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

  console.log("rendering locationMarker", getMarkerColor(type));
  console.log(location.icon);
  console.log("isVisible: ", location.isVisible);
  if (location.isVisible) {
    return (
      <pointLight args={[new THREE.Color(getMarkerColor(type)), 2, 50]}>
        <Sphere
          key={locationMarkerID}
          position={position}
          name={locationMarkerID}
          args={[size]}
          onClick={onLocationMarkerClicked}
          onPointerOver={e => setHover(true)}
          onPointerOut={e => setHover(false)}
          scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        >
          <meshBasicMaterial
            attach="material"
            color={getMarkerColor(type) ?? "purple"}
          />
          <HTML>
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
          </HTML>
        </Sphere>
      </pointLight>
    );
  }
};

export default LocationMarker;
