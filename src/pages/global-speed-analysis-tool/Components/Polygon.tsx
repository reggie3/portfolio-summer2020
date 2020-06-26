import * as React from "react";
import { AnalysisArea } from "../models";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier.js";
import { DispatchActions, ActionTypes } from "../Context";
import { getGeometryCentroid } from "../utilities";

const SURFACE_DISPLACEMENT = 1.0005;

export interface PolygonProps {
  analysisArea: AnalysisArea;
  dispatch: React.Dispatch<DispatchActions>;
}

const getGeometryFromVertices = (vertices: Vector3[]): THREE.Geometry => {
  var geometry = new THREE.Geometry();
  var holes = [];
  geometry.vertices = vertices;

  const triangles = THREE.ShapeUtils.triangulateShape(vertices, holes);

  for (var i = 0; i < triangles.length; i++) {
    geometry.faces.push(
      new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2])
    );
  }

  return geometry;
};

const getTesselatedGeomtery = (geometry: THREE.Geometry): THREE.Geometry => {
  const clonedGeometry: THREE.Geometry = geometry.clone();
  const tessellateModifier = new TessellateModifier(0.01);
  try {
    for (let x = 0; x < 25; x++) {
      tessellateModifier.modify(clonedGeometry);
      // console.log('tesselate pass : ', x);
    }
  } catch (error) {
    console.warn(error);
  }

  clonedGeometry.faceVertexUvs[0] = [];

  clonedGeometry.faces.forEach(function (face) {
    // @ts-ignore
    var components = ["x", "y", "z"].sort((a, b) => {
      return Math.abs(face.normal[a]) > Math.abs(face.normal[b]);
    });

    var v1 = clonedGeometry.vertices[face.a];
    var v2 = clonedGeometry.vertices[face.b];
    var v3 = clonedGeometry.vertices[face.c];

    clonedGeometry.faceVertexUvs[0].push([
      new THREE.Vector2(v1[components[0]], v1[components[1]]),
      new THREE.Vector2(v2[components[0]], v2[components[1]]),
      new THREE.Vector2(v3[components[0]], v3[components[1]]),
    ]);
  });

  clonedGeometry.uvsNeedUpdate = true;

  return clonedGeometry;
};

const getCurveGeometry = (geometry: THREE.Geometry): THREE.Geometry => {
  const clonedGeometry: THREE.Geometry = geometry.clone();

  for (let i = 0; i < clonedGeometry.vertices.length; i++) {
    try {
      clonedGeometry.vertices[i] = clonedGeometry.vertices[i].setLength(
        SURFACE_DISPLACEMENT
      );
    } catch (error) {
      console.warn(error);
    }
  }
  return clonedGeometry;
};

const Polygon = ({ analysisArea, dispatch }: PolygonProps) => {
  const { polygon } = analysisArea;
  const [geometry, setGeometry] = useState<THREE.Geometry>(null);
  const [tessellatedGeometry, setTessellatedGeometry] = useState<
    THREE.Geometry
  >(null);
  const [curvedGeometry, setCurvedGeometry] = useState<THREE.Geometry>(null);
  const spotLight = useRef();
  // useHelper(spotLight, SpotLightHelper, 'teal');

  useEffect(() => {
    setGeometry(getGeometryFromVertices(polygon));
  }, [polygon]);

  useEffect(() => {
    if (geometry) {
      setTessellatedGeometry(getTesselatedGeomtery(geometry));
    }
  }, [geometry]);

  useEffect(() => {
    if (tessellatedGeometry) {
      setCurvedGeometry(getCurveGeometry(tessellatedGeometry));
    }
  }, [tessellatedGeometry]);

  useEffect(() => {
    if (curvedGeometry) {
      const material = new THREE.MeshPhongMaterial({
        shininess: 0,
        flatShading: true,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        wireframe: false,
        vertexColors: true,
      });
      const polygonMesh = new THREE.Mesh(curvedGeometry, material);
      dispatch({
        type: ActionTypes.SET_ANALYSIS_AREA_MESH,
        payload: {
          analysisArea,
          centerPoint: getGeometryCentroid(curvedGeometry, polygonMesh),
          polygonMesh,
        },
      });
    }
  }, [curvedGeometry]);

  return (
    <>
      {analysisArea.polygonMesh && (
        <>
          <primitive object={analysisArea.polygonMesh} />
          <spotLight
            ref={spotLight}
            position={analysisArea.centerPoint.setLength(1.25)}
            intensity={0.5}
          />
        </>
      )}
    </>
  );
};

export default Polygon;
