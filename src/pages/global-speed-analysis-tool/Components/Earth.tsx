import * as React from "react";
import EarthView from "./Earth.view";
import { PointerEvent as RNFPointerEvent } from "react-three-fiber";
import {
  Point,
  MarkerTypes,
  GlobeClickStates,
  GsatLocation,
  AnalysisArea,
  Modals,
} from "../models";
import { DispatchActions, ActionTypes } from "../Context";

interface EarthProps {
  analysisAreas: AnalysisArea[];
  dispatch: React.Dispatch<DispatchActions>;
  globeClickState: GlobeClickStates;
}

const Earth = ({ analysisAreas, dispatch, globeClickState }: EarthProps) => {
  const onCreateLocation = (location: GsatLocation, clickLocation: Point) => {
    dispatch({
      type: ActionTypes.OPEN_MODAL,
      payload: {
        name: Modals.LOCATION_MARKER,
        params: { position: clickLocation, location },
      },
    });
  };

  const onGlobeClicked = (event: RNFPointerEvent) => {
    // @ts-ignore Property 'geometry' does not exist on type 'Object3D'

    const clickLocation: Point = [event.pageX, event.pageY];
    switch (globeClickState) {
      case GlobeClickStates.PLACE_MARKER:
        const location: GsatLocation = {
          icon: {
            position: event.point,
            size: 0.01,
            type: MarkerTypes.FRIENDLY,
          },
          isVisible: true,
          speed: 22,
          maxRange: 0,
        };

        onCreateLocation(location, clickLocation);
        break;

      case GlobeClickStates.PLACE_POLYGON_POINT:
        dispatch({
          type: ActionTypes.ADD_POINT_TO_TEMP_ANALYSIS_AREA,
          payload: {
            newPoint: event.point,
          },
        });
        break;
    }
  };

  return <EarthView onGlobeClicked={onGlobeClicked} />;
};

export default Earth;
