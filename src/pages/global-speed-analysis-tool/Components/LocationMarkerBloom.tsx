import * as React from 'react';
import {
  GeometryTypes,
  MarkerTypes,
  GsatLocation,
  LocationIcon,
} from '../models';
import { AppColors } from '../colors';
import { useState, Suspense } from 'react';
import { EffectComposer, SSAO, Bloom } from 'react-postprocessing';

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

  return location.isVisible ? (
    <Suspense fallback={null}>
      <group>
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
          <meshStandardMaterial
            attach="material"
            color={getMarkerColor(icon)}
          />
        </mesh>
      </group>
      <EffectComposer smaa>
        <Bloom />
        <SSAO />
      </EffectComposer>
    </Suspense>
  ) : null;
};

export default LocationMarker;
