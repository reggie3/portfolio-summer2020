import * as React from "react";
import { GeometryTypes, AnalysisArea } from "../models";
import { Vector3 } from "three";
import { AppColors } from "./utilities/colors";

const MARKER_SIZE = 0.01;

export interface AnalysisAreaMarkersProps {
  analysisArea: AnalysisArea;
}

const AnalysisAreaMarkers = ({
  analysisArea,
}: AnalysisAreaMarkersProps): React.ReactElement => {
  const { id, polygon } = analysisArea;

  return (
    <>
      {polygon.map((vertex: Vector3, index: number) => {
        return (
          <mesh key={`${id}-${index}`} position={vertex}>
            <sphereBufferGeometry
              attach="geometry"
              args={[MARKER_SIZE]}
              name={GeometryTypes.LOCATION_MARKER}
            />
            <meshPhysicalMaterial
              attach="material"
              color={AppColors.AnalysisAreaMarker}
            />
          </mesh>
        );
      })}
    </>
  );
};

export default AnalysisAreaMarkers;
