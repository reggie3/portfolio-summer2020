import { GeometryTypes } from './models';
import * as THREE from 'three';

export const createGeometryName = (
  geometryName: GeometryTypes,
  id: string
): string => {
  return `${geometryName}|${id}`;
};

export const splitGeometryName = (
  geometryName: string
): { geometryType: GeometryTypes; id: string } => {
  const [geometryType, id] = geometryName.split('|');
  return {
    geometryType: covertGeometryTypeStringToEnum(geometryType),
    id,
  };
};

const covertGeometryTypeStringToEnum = (
  geometryTypeString: string
): GeometryTypes => {
  switch (geometryTypeString) {
    case 'LOCATION_MARKER':
      return GeometryTypes.LOCATION_MARKER;
    case 'GLOBE':
      return GeometryTypes.GLOBE;
    default:
      console.error(
        'Unknown geometryTypeString:',
        geometryTypeString,
        ' in covertGeometryTypeStringToEnum'
      );
  }
};

export const getGeometryCentroid = (
  geometry: THREE.Geometry,
  mesh: THREE.Mesh
): THREE.Vector3 => {
  geometry.computeBoundingBox();

  var centroid = new THREE.Vector3();
  centroid.addVectors(geometry.boundingBox.min, geometry.boundingBox.max);
  centroid.multiplyScalar(0.5);

  centroid.applyMatrix4(mesh.matrixWorld);

  return centroid;
};

export const formatPercent = (number: number): string => {
  return (number * 100).toFixed(0) + '%';
};

export const getFaceId = (face: THREE.Face3): string => {
  return `${face.a}-${face.b}-${face.c}`;
};
