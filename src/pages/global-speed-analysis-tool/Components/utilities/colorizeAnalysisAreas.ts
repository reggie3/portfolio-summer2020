import { AnalysisArea, AnalysisResult } from "../../models";
import * as THREE from "three";
import { getFaceId } from "./utilities";

export const colorizeAnalysisAreas = (
  analysisAreas: AnalysisArea[],
  analysisAreaResults: AnalysisResult[]
) => {
  analysisAreas.forEach(analysisArea => {
    const geometry = analysisArea.polygonMesh.geometry as THREE.Geometry;

    const { faceStatsMap } = analysisAreaResults.find(
      analysisAreaResult => analysisAreaResult.id === analysisArea.id
    );

    geometry.faces.forEach((face: THREE.Face3) => {
      const faceId = getFaceId(face);
      const color = faceStatsMap.get(faceId).color;
      // face.color.set(color);
      face.color = color;
    });
    //geometry.colorsNeedUpdate = true;
    geometry.elementsNeedUpdate = true;
  });
};
