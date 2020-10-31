import { Vector3 } from "three";
import {
  AnalyisAreaStats,
  FaceStats,
} from "../../webWorkers/performCalculations.worker";

export enum Constants {
  TEMP = "TEMP",
}
export enum GlobeClickStates {
  NONE = "NONE",
  PLACE_MARKER = "PLACE_MARKER",
  PLACE_POLYGON_POINT = "PLACE_POLYGON_POINT",
}

export enum GeometryTypes {
  GLOBE = "GLOBE",
  LOCATION_MARKER = "LOCATION_MARKER",
}

export enum MarkerTypes {
  FRIENDLY = "FRIENDLY",
  ENEMY = "ENEMY",
  NEUTRAL = "NEUTRAL",
}

export enum Modals {
  ABOUT = "ABOUT",
  LOCATION_MARKER = "LOCATION_MARKER",
}

export type LocationIcon = {
  position: THREE.Vector3;
  size: number;
  type?: MarkerTypes;
};

export interface GsatLocation {
  id?: string;
  isVisible?: boolean;
  name?: string;
  icon?: LocationIcon;
  maxRange?: number;
  maxRangeDeviation?: number;
  speed?: number;
  speedDeviation?: number;
}

export type ScenarioInfo = {
  name: string;
  description: string;
};

export type ModalInfo = {
  isOpen: boolean;
  name: Modals;
  params?: ModalParams;
};

export type ModalParams = {
  position?: Point;
  location?: GsatLocation;
};

export type Point = [number, number];

export type AnalysisArea = {
  centerPoint: Vector3;
  hasBeenAnalyzed: boolean;
  id: string | Constants.TEMP;
  isVisible: boolean;
  name?: string;
  polygon: Vector3[];
  polygonMesh: THREE.Mesh;
  samplePoints: SamplePoint[];
};

export type SamplePoint = {
  location: Vector3;
  color: THREE.Color;
};

export type AnalysisResult = {
  id: string;
  analysisAreaStatsMap?: Map<string, AnalyisAreaStats>;
  elapsedRunTimeMillis: number;
  timeRanMillis: number;
  faceStatsMap?: Map<string, FaceStats>;
  // TODO: add math va
  friendlyWinPercentage: number;
  enemyWinPercentage: number;
  neutralWinPercentage: number;
};

export type WorkerProgressMessage = {
  id: string;
  completedRuns: number;
  progress: number;
};
