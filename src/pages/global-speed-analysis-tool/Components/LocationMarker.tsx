import * as React from 'react';
import {
  GeometryTypes,
  MarkerTypes,
  GsatLocation,
  LocationIcon,
} from '../models';
import { AppColors } from '../colors';
import { useState } from 'react';
import * as THREE from 'three';

export interface LocationMarkerProps {
  location: GsatLocation;
}

const getMarkerColor = (icon: LocationIcon): string => {
  switch (icon.type) {
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
  const locationMarkerID = `${GeometryTypes.LOCATION_MARKER}-${id}`;
  const { position, size } = icon;
  const [hovered, setHover] = useState(false);
  const markerColor = getMarkerColor(icon);
  return location.isVisible ? (
    <pointLight args={[new THREE.Color(markerColor), 2, 50]}>
      <mesh
        key={locationMarkerID}
        position={position}
        name={locationMarkerID}
        onClick={onLocationMarkerClicked}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      >
        <sphereBufferGeometry
          attach="geometry"
          args={[size]}
          name={GeometryTypes.LOCATION_MARKER}
        />
        <meshStandardMaterial attach="material" color={markerColor} />
      </mesh>
    </pointLight>
  ) : null;
};

export default LocationMarker;
