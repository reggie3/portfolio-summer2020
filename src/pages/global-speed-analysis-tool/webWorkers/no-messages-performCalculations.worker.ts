import {
  AnalysisArea,
  GsatLocation,
  MarkerTypes,
  AnalysisResult,
} from '../models';
import * as THREE from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { Vector3, Object3D, Vector } from 'three';
import { getFaceId } from '../utilities';

const EARTH_RADIUS = 6371;

export type WorkerAnalysisArea = {
  id: string;
  faces;
  vertices;
};

export type WorkerLocation = {
  position: Vector;
  maxRange: number;
  maxRangeDeviation: number;
  speed: number;
  speedDeviation: number;
  type: MarkerTypes;
};

type MarkerTypeTravelTimes = {
  [MarkerTypes.ENEMY]: number;
  [MarkerTypes.FRIENDLY]: number;
  [MarkerTypes.NEUTRAL]: number;
};

export type WinTally = {
  [MarkerTypes.ENEMY]: number;
  [MarkerTypes.FRIENDLY]: number;
  [MarkerTypes.NEUTRAL]: number;
};

export type FaceStats = {
  color: THREE.Color;
  wins: {
    [MarkerTypes.ENEMY]: number;
    [MarkerTypes.FRIENDLY]: number;
    [MarkerTypes.NEUTRAL]: number;
  };
};

export type AnalyisAreaStats = {
  wins: {
    [MarkerTypes.ENEMY]: number;
    [MarkerTypes.FRIENDLY]: number;
    [MarkerTypes.NEUTRAL]: number;
  };
};

export interface PerformCalculationsProps {
  analysisAreas: AnalysisArea[];
  locations: GsatLocation[];
  numberOfRuns: number;
  setProgress?: (progress: number) => void;
}

const getLocationsByMarkerType = (
  locations: WorkerLocation[],
  markerType: MarkerTypes
): WorkerLocation[] => {
  return locations.filter((location) => location.type === markerType);
};

// get the shortest travel time to a sample point from all markers of a type
export const getShortestTravelTimeByMakerType = (
  locations: WorkerLocation[],
  position: Vector3
): number => {
  const travelTimes: number[] = [];
  locations.forEach((location) => {
    const distance = getDistanceFromLocationMarkerToSamplePoint(
      location,
      position
    );
    travelTimes.push(getTravelTime(distance, location));
  });

  return travelTimes.length ? Math.min(...travelTimes) : Infinity;
};

const getDistanceFromLocationMarkerToSamplePoint = (
  location: WorkerLocation,
  position: Vector3
): number => {
  const vector3Position = new Vector3(position.x, position.y, position.z);
  const vector3Location = new Vector3(
    // @ts-ignore x not found
    location.position.x,
    // @ts-ignore y not found
    location.position.y,
    // @ts-ignore z not found
    location.position.z
  );
  const distance =
    Math.acos(vector3Location.normalize().dot(vector3Position.normalize())) *
    EARTH_RADIUS;
  return distance;
};

const getFaceColorBasedOnWins = (
  faceStats: FaceStats,
  numberOfRuns: number
): THREE.Color => {
  const color = new THREE.Color(
    faceStats.wins[MarkerTypes.ENEMY] / numberOfRuns,
    faceStats.wins[MarkerTypes.NEUTRAL] / numberOfRuns,
    faceStats.wins[MarkerTypes.FRIENDLY] / numberOfRuns
  );

  // console.log(color.getHexString());
  return color;
};

const getInitialFaceStats = (): FaceStats => {
  return {
    wins: {
      [MarkerTypes.ENEMY]: 0,
      [MarkerTypes.FRIENDLY]: 0,
      [MarkerTypes.NEUTRAL]: 0,
    },
    color: new THREE.Color('orange'),
  } as FaceStats;
};

const getTravelTime = (distance: number, location: WorkerLocation): number => {
  const {
    maxRange = Infinity,
    maxRangeDeviation = 0,
    speed,
    speedDeviation = 0,
  } = location;
  let calculatedMaxRange =
    maxRange === 0
      ? Infinity
      : Math.floor(
          Math.random() *
            (maxRange + maxRangeDeviation - maxRange - maxRangeDeviation) +
            maxRange -
            maxRangeDeviation
        );
  let calculatedSpeed = Math.floor(
    Math.random() * (speed + speedDeviation - speed - speedDeviation) +
      speed -
      speedDeviation
  );

  // console.log(calculatedMaxRange, calculatedSpeed);

  if (distance > calculatedMaxRange) {
    return Infinity;
  }

  return distance / calculatedSpeed;
};

export const getWinnerBasedOnTravelTimes = (
  markerTypeTravelTimes: MarkerTypeTravelTimes
): MarkerTypes => {
  let fastest = Object.keys(markerTypeTravelTimes).reduce((a, b) =>
    markerTypeTravelTimes[a] < markerTypeTravelTimes[b] ? a : b
  );

  // console.log(fastest);
  switch (fastest) {
    case MarkerTypes.ENEMY:
      return MarkerTypes.ENEMY;
    case MarkerTypes.FRIENDLY:
      return MarkerTypes.FRIENDLY;
    case MarkerTypes.NEUTRAL:
      return MarkerTypes.NEUTRAL;
  }
};

const getMarkerLocationsByType = (
  locations: WorkerLocation[]
): {
  friendlyLocations: WorkerLocation[];
  enemyLocations: WorkerLocation[];
  neutralLocations: WorkerLocation[];
} => {
  const friendlyLocations = getLocationsByMarkerType(
    locations,
    MarkerTypes.FRIENDLY
  );
  const enemyLocations = getLocationsByMarkerType(locations, MarkerTypes.ENEMY);
  const neutralLocations = getLocationsByMarkerType(
    locations,
    MarkerTypes.NEUTRAL
  );

  return {
    friendlyLocations,
    enemyLocations,
    neutralLocations,
  };
};

const getFaceTravelTimes = ({
  enemyLocations,
  friendlyLocations,
  neutralLocations,
  face,
  vertices,
}: {
  enemyLocations: WorkerLocation[];
  friendlyLocations: WorkerLocation[];
  neutralLocations: WorkerLocation[];
  face: THREE.Face3;
  vertices: THREE.Vector3[];
}) => {
  var v1 = vertices[face.a];
  var v2 = vertices[face.b];
  var v3 = vertices[face.c];

  // calculate the centroid
  var position = new THREE.Vector3();
  position.x = (v1.x + v2.x + v3.x) / 3;
  position.y = (v1.y + v2.y + v3.y) / 3;
  position.z = (v1.z + v2.z + v3.z) / 3;

  return {
    [MarkerTypes.FRIENDLY]: getShortestTravelTimeByMakerType(
      friendlyLocations,
      position
    ),
    [MarkerTypes.ENEMY]: getShortestTravelTimeByMakerType(
      enemyLocations,
      position
    ),
    [MarkerTypes.NEUTRAL]: getShortestTravelTimeByMakerType(
      neutralLocations,
      position
    ),
  };
};

const calculateWinPercentages = (
  winTally: WinTally,
  totalNumberOfFaces: number
): {
  enemy: number;
  friendly: number;
  neutral: number;
} => {
  return {
    enemy: winTally.ENEMY / totalNumberOfFaces,
    friendly: winTally.FRIENDLY / totalNumberOfFaces,
    neutral: winTally.NEUTRAL / totalNumberOfFaces,
  };
};

const getAnalysisAreaStatsFromFaceStats = (winTally: WinTally): WinTally => {
  const total = winTally.ENEMY + winTally.FRIENDLY + winTally.NEUTRAL;
  return {
    [MarkerTypes.ENEMY]: winTally.ENEMY / total,
    [MarkerTypes.FRIENDLY]: winTally.FRIENDLY / total,
    [MarkerTypes.NEUTRAL]: winTally.NEUTRAL / total,
  };
};

/******************  Exported Function *******************/
export async function performCalculations(
  stringifiedParams: string
): Promise<AnalysisResult | string> {
  if (stringifiedParams) {
    const params = JSON.parse(stringifiedParams);
    const {
      analysisArea,
      locations,
      numberOfRuns,
    }: {
      analysisArea: WorkerAnalysisArea;
      locations: WorkerLocation[];
      numberOfRuns: number;
    } = params;

    if (analysisArea) {
      let analysisAreaStatsMap = new Map<string, AnalyisAreaStats>();
      let faceStatsMap = new Map<string, FaceStats>();

      const runStartTime = Date.now();

      // calculate the total winning percentages based on which side wins each face
      // triangle.  This value is cumulative across every analysis area and for all runs
      let totalFaceWinTally: WinTally = {
        [MarkerTypes.ENEMY]: 0,
        [MarkerTypes.FRIENDLY]: 0,
        [MarkerTypes.NEUTRAL]: 0,
      };
      let totalNumberOfFaces = 0; // keep track of the total number of faces across all areas and iterations

      // Stats for individual analysis areas for all runs
      let analysisAreaWinTally: WinTally = {
        [MarkerTypes.ENEMY]: 0,
        [MarkerTypes.FRIENDLY]: 0,
        [MarkerTypes.NEUTRAL]: 0,
      };

      for (let i = 0; i < numberOfRuns; i++) {
        const { faces, vertices } = analysisArea;
        totalNumberOfFaces += faces.length;

        faces.forEach((face: THREE.Face3) => {
          const faceId: string = getFaceId(face);
          const {
            enemyLocations,
            friendlyLocations,
            neutralLocations,
          } = getMarkerLocationsByType(locations);

          const travelTimes = getFaceTravelTimes({
            enemyLocations,
            friendlyLocations,
            neutralLocations,
            face,
            vertices,
          });

          const winner = getWinnerBasedOnTravelTimes(travelTimes);

          let updatedFaceStats: FaceStats = faceStatsMap.has(faceId)
            ? { ...faceStatsMap.get(faceId) }
            : getInitialFaceStats();

          switch (winner) {
            case MarkerTypes.ENEMY:
              analysisAreaWinTally[MarkerTypes.ENEMY]++;
              totalFaceWinTally[MarkerTypes.ENEMY]++;
              updatedFaceStats.wins[MarkerTypes.ENEMY]++;
              break;
            case MarkerTypes.FRIENDLY:
              analysisAreaWinTally[MarkerTypes.FRIENDLY]++;
              totalFaceWinTally[MarkerTypes.FRIENDLY]++;
              updatedFaceStats.wins[MarkerTypes.FRIENDLY]++;
              break;
            case MarkerTypes.NEUTRAL:
              analysisAreaWinTally[MarkerTypes.NEUTRAL]++;
              totalFaceWinTally[MarkerTypes.NEUTRAL]++;
              updatedFaceStats.wins[MarkerTypes.NEUTRAL]++;
              break;
          }

          faceStatsMap.set(faceId, updatedFaceStats);
        }); // end face loop
      } // end run noop

      // should be able to calculate analsysis area results here
      analysisAreaStatsMap.set(analysisArea.id, {
        wins: getAnalysisAreaStatsFromFaceStats(analysisAreaWinTally),
      });

      faceStatsMap.forEach((faceStats, faceId) => {
        const color = getFaceColorBasedOnWins(
          faceStatsMap.get(faceId),
          numberOfRuns
        );
        faceStatsMap.set(faceId, {
          ...faceStats,
          color,
        });
      });

      return {
        analysisAreaStatsMap,
        elapsedRunTimeMillis: Date.now() - runStartTime,
        faceStatsMap,
        id: analysisArea.id,
        timeRanMillis: Date.now(),
        ...calculateWinPercentages(totalFaceWinTally, totalNumberOfFaces),
      };
    }
  }
  return 'no params provided';
}
