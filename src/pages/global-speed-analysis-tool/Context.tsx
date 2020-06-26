import {
  GsatLocation,
  Modals,
  ModalInfo,
  Point,
  GlobeClickStates,
  AnalysisArea,
  Constants,
  AnalysisResult,
  SamplePoint,
} from "./models";
import { v4 as uuidv4 } from "uuid";
import React, { useReducer } from "react";
import logger from "use-reducer-logger";
import { Vector3 } from "three";

export enum ActionTypes {
  ADD_LOCATION = "ADD_LOCATION",
  DELETE_LOCATION = "DELETE_LOCATION",
  UPDATE_LOCATION = "UPDATE_LOCATION",
  TOGGLE_LOCATION_VISIBILTY = "TOGGLE_LOCATION_VISIBILTY",
  UPDATE_SCENARIO_INFORMATION = "UPDATE_SCENARIO_INFORMATION",
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_ALL_MODALS = "CLOSE_ALL_MODALS",
  CLOSE_MODAL = "CLOSE_MODAL",
  UPDATE_MODAL = "UPDATE_MODAL",
  UPDATE_DIMENSIONS = "UPDATE_DIMENSIONS",
  SET_GLOBE_CLICK_STATE = "SET_GLOBE_CLICK_STATE",
  TOGGLE_LOCATION_LIST = "TOGGLE_LOCATION_LIST",
  UPDATE_ANALYSIS_AREA = "UPDATE_ANALYSIS_AREA",
  DELETE_ANALYSIS_AREA = "DELETE_ANALYSIS_AREA",
  SAVE_ANALYSIS_AREA = "SAVE_ANALYSIS_AREA",
  TOGGLE_ANALYSIS_AREA_VISIBILTY = "TOGGLE_ANALYSIS_AREA_VISIBILTY",
  ADD_POINT_TO_TEMP_ANALYSIS_AREA = "ADD_POINT_TO_TEMP_ANALYSIS_AREA",
  SET_ANALYSIS_AREA_MESH = "SET_ANALYSIS_AREA_MESH",
  ADD_ANALYSIS_AREA_RESULTS = "ADD_ANALYSIS_AREA_RESULTS",
  SET_NUMBER_OF_RUNS = "SET_NUMBER_OF_RUNS",
  SET_NUMBER_OF_COMPLETED_RUNS = "SET_NUMBER_OF_COMPLETED_RUNS",
}

export interface GlobalAppState {
  appState: ApplicationState;
  locations: GsatLocation[];
  analysisAreas: AnalysisArea[];
  modals: ModalInfo[];
}

export interface ApplicationState {
  analysisResults: AnalysisResult[];
  dimensions: Point;
  globeClickState: GlobeClickStates;
  isLocationDrawerVisible: boolean;
  numberOfRuns: number;
  numberOfCompletedRuns: number;
}

export const applicationState: ApplicationState = {
  analysisResults: [],
  dimensions: [0, 0],
  globeClickState: GlobeClickStates.NONE,
  isLocationDrawerVisible: false,
  numberOfRuns: 1,
  numberOfCompletedRuns: 0,
};
export type ApplicationStateAction = {
  payload?: {
    analysisResult?: AnalysisResult;
    analysisResults?: AnalysisResult[];
    dimensions?: Point;
    globeClickState?: GlobeClickStates;
    numberOfRuns?: number;
    numberOfCompletedRuns?: number;
  };
  type: ActionTypes;
};

export const applicationReducer = (
  applicationState: ApplicationState,
  action: ApplicationStateAction
): ApplicationState => {
  switch (action.type) {
    case ActionTypes.SET_NUMBER_OF_COMPLETED_RUNS:
      return {
        ...applicationState,
        numberOfCompletedRuns: action.payload.numberOfCompletedRuns,
      };
    case ActionTypes.UPDATE_DIMENSIONS:
      return {
        ...applicationState,
        dimensions: action.payload.dimensions,
      };
    case ActionTypes.SET_GLOBE_CLICK_STATE:
      return {
        ...applicationState,
        globeClickState: action.payload.globeClickState,
      };
    case ActionTypes.TOGGLE_LOCATION_LIST:
      return {
        ...applicationState,
        isLocationDrawerVisible: !applicationState.isLocationDrawerVisible,
      };
    case ActionTypes.ADD_ANALYSIS_AREA_RESULTS:
      return {
        ...applicationState,
        analysisResults: [
          ...applicationState.analysisResults,
          ...action.payload.analysisResults,
        ],
      };
    case ActionTypes.SET_NUMBER_OF_RUNS:
      return {
        ...applicationState,
        numberOfRuns: action.payload.numberOfRuns,
      };
    default:
      return applicationState;
  }
};

export const scenarioState = {};

export const analysisAreasState: AnalysisArea[] = [];

export type AnalysisAreaAction = {
  payload?: {
    analysisArea?: AnalysisArea;
    centerPoint?: Vector3;
    polygonMesh?: THREE.Mesh;
    name?: string;
    newPoint?: Vector3;
    samplePoints?: SamplePoint[];
  };
  type: ActionTypes;
};

export const analysisAreaReducer = (
  analysisAreasState: AnalysisArea[],
  action: AnalysisAreaAction
): AnalysisArea[] => {
  switch (action.type) {
    case ActionTypes.SAVE_ANALYSIS_AREA:
      return analysisAreasState.map((analysisArea: AnalysisArea) => {
        if (analysisArea.id === Constants.TEMP) {
          return {
            ...analysisArea,
            id: analysisArea.id = uuidv4(),
            name: action.payload.name,
          };
        } else {
          return analysisArea;
        }
      });
    case ActionTypes.SET_ANALYSIS_AREA_MESH:
      return analysisAreasState.map((analysisArea: AnalysisArea) => {
        if (analysisArea.id === action.payload.analysisArea.id) {
          return {
            ...analysisArea,
            centerPoint: action.payload.centerPoint,
            polygonMesh: action.payload.polygonMesh,
            samplePoints: action.payload.samplePoints,
          };
        } else {
          return analysisArea;
        }
      });
    case ActionTypes.ADD_POINT_TO_TEMP_ANALYSIS_AREA:
      const doesTempAnalysisAreaExist: boolean = !!analysisAreasState.find(
        analysisArea => analysisArea.id === Constants.TEMP
      );
      if (doesTempAnalysisAreaExist) {
        return analysisAreasState.map((analysisArea: AnalysisArea) => {
          if (analysisArea.id !== Constants.TEMP) {
            return analysisArea;
          } else
            return {
              ...analysisArea,
              polygon: [...analysisArea.polygon, action.payload.newPoint],
            };
        });
      } else {
        return [
          ...analysisAreasState,
          {
            id: Constants.TEMP,
            polygon: [action.payload.newPoint],
          } as AnalysisArea,
        ];
      }
    case ActionTypes.DELETE_ANALYSIS_AREA:
      return analysisAreasState.filter((analysisArea: AnalysisArea) => {
        return analysisArea !== action.payload.analysisArea;
      });
    case ActionTypes.TOGGLE_ANALYSIS_AREA_VISIBILTY:
      return analysisAreasState.map((analysisArea: AnalysisArea) => {
        if (analysisArea.id !== action.payload.analysisArea.id) {
          return analysisArea;
        } else
          return {
            ...analysisArea,
            isVisible: !analysisArea.isVisible,
          };
      });
    case ActionTypes.UPDATE_ANALYSIS_AREA:
      return analysisAreasState.map((analysisArea: AnalysisArea) => {
        if (analysisArea.id !== action.payload.analysisArea.id) {
          return analysisArea;
        } else
          return {
            ...analysisArea,
            ...action.payload.analysisArea,
          };
      });
    default:
      return analysisAreasState;
  }
};

export const locationsState: GsatLocation[] = [];

export type LocationAction = {
  payload: {
    location: GsatLocation;
  };
  type: ActionTypes;
};

export const locationReducer = (
  locationsState: GsatLocation[],
  action: LocationAction
): GsatLocation[] => {
  switch (action.type) {
    case ActionTypes.ADD_LOCATION:
      return [
        ...locationsState,
        { ...action.payload.location, id: uuidv4(), isVisible: true },
      ];
    case ActionTypes.DELETE_LOCATION:
      return locationsState.filter((location: GsatLocation) => {
        return location !== action.payload.location;
      });
    case ActionTypes.TOGGLE_LOCATION_VISIBILTY:
      return locationsState.map((location: GsatLocation) => {
        if (location.id !== action.payload.location.id) {
          return location;
        } else
          return {
            ...location,
            isVisible: !location.isVisible,
          };
      });
    case ActionTypes.UPDATE_LOCATION:
      return locationsState.map((location: GsatLocation) => {
        if (location.id !== action.payload.location.id) {
          return location;
        } else
          return {
            ...location,
            ...action.payload.location,
          };
      });
    default:
      return locationsState;
  }
};

export const modalsState: ModalInfo[] = [
  { name: Modals.LOCATION_MARKER, isOpen: false },
  { name: Modals.ABOUT, isOpen: false },
];

export type ModalAction = {
  payload: { name?: Modals; update?: Partial<ModalInfo>; params?: object };
  type: ActionTypes;
};

export const modalsReducer = (
  modalsState: ModalInfo[],
  action: ModalAction
): ModalInfo[] => {
  switch (action.type) {
    case ActionTypes.OPEN_MODAL:
      return modalsState.map((modal: ModalInfo) => {
        if (modal.name === action.payload.name) {
          modal.isOpen = true;
          modal.params = action.payload.params;
        }
        return modal;
      });

    case ActionTypes.CLOSE_MODAL:
      return modalsState.map((modal: ModalInfo) => {
        if (modal.name === action.payload.name) {
          modal.isOpen = false;
          modal.params = {};
        }
        return modal;
      });

    case ActionTypes.CLOSE_ALL_MODALS:
      return modalsState.map((modal: ModalInfo) => {
        return { ...modal, isOpen: false, params: {} };
      });

    case ActionTypes.UPDATE_MODAL:
      return modalsState.map((modal: ModalInfo) => {
        if (modal.name === action.payload.name) {
          return {
            ...modal,
            params: { ...modal.params, ...action.payload.update },
          };
        }
        return modal;
      });

    default:
      return modalsState;
  }
};

const combineReducers = slices => (prevState, action) =>
  // I like to use array.reduce, you can also just write a for..in loop
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action),
    }),
    prevState
  );

// Create the context so that the we can share the dispatch and state
// across the components
export const AppContext = React.createContext(null);
export const AppProvider = ({ children }) => {
  const [state, dispatch]: [GlobalAppState, React.Dispatch<any>] = useReducer(
    /* combineReducers({
      analysisAreas: logger(analysisAreaReducer),
      appState: logger(applicationReducer),
      locations: logger(locationReducer),
      modals: logger(modalsReducer),
    }), */
    combineReducers({
      analysisAreas: analysisAreaReducer,
      appState: applicationReducer,
      locations: locationReducer,
      modals: modalsReducer,
    }),
    {
      analysisAreas: analysisAreasState,
      appState: applicationState,
      locations: locationsState,
      modals: modalsState,
    } as GlobalAppState
  );

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export type DispatchActions =
  | AnalysisAreaAction
  | ApplicationStateAction
  | ModalAction
  | LocationAction;
