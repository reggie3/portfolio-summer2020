import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Earth from "./Components/Earth";
import SkyDome from "./Components/SkyDome";
import useBoundingclientrect from "@rooks/use-boundingclientrect";
import { GsatLocation, AnalysisArea, Constants } from "./models";
import LocationMarker from "./Components/LocationMarker";
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  ReactThreeFiber,
} from "react-three-fiber";
import React, { useRef, useEffect, Dispatch, useContext } from "react";
import {
  ActionTypes,
  AppContext,
  GlobalAppState,
  DispatchActions,
} from "./Context";
import ModalsContainer from "./Components/Modals/ModalsContainer";
import LocationListDrawer from "./Components/LocationListDrawer/LocationListDrawer";
import { CssBaseline } from "@material-ui/core";
import ControlsMenu from "./Components/Controls/ControlMenu";
import Polygon from "./Components/Polygon";
import AnalysisAreaMarkers from "./Components/AnalysisAreaMarkers";
import ReturnHomeButton from "../../components/ReturnHomeButton";

// get rid of intrinsic elements TSX error
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}
extend({ OrbitControls });

const CameraControls = () => {
  const orbitRef = useRef(null);
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

const App = () => {
  const rootRef = useRef();
  const getBoundingClientRect = useBoundingclientrect(rootRef);

  const [state, dispatch]: [
    GlobalAppState,
    Dispatch<DispatchActions>
  ] = useContext(AppContext);
  const { analysisAreas, locations } = state;
  const { dimensions, isLocationDrawerVisible } = state.appState;

  useEffect(() => {
    if (getBoundingClientRect) {
      const { width = 0, height = 0 } = getBoundingClientRect;
      if (
        (width && width !== dimensions[0]) ||
        (height && height !== dimensions[1])
      ) {
        dispatch({
          type: ActionTypes.UPDATE_DIMENSIONS,
          payload: {
            dimensions: [
              getBoundingClientRect?.width ?? 0,
              getBoundingClientRect?.height ?? 0,
            ],
          },
        });
      }
    }
  }, [dimensions, getBoundingClientRect]);

  const onCloseDrawer = () => {
    dispatch({
      type: ActionTypes.TOGGLE_LOCATION_LIST,
    });
  };

  console.log(state);
  return (
    <>
      <div
        ref={rootRef}
        style={{
          display: "flex",
          backgroundColor: "black",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              position: "fixed",
              left: "2rem",
              top: "1rem",
              width: "2rem",
              height: "2rem",
              zIndex: 10,
            }}
          >
            <ReturnHomeButton />
          </div>
          <CssBaseline />
          <Canvas
            camera={{ position: [0, 0, 5], fov: 40, far: 10000 }}
            shadowMap
          >
            <ambientLight />
            <spotLight
              intensity={0.1}
              position={[20, 20, 20]}
              shadow-bias={-0.00005}
              angle={Math.PI / 6}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              castShadow
            />
            <CameraControls />
            <Earth
              analysisAreas={state.analysisAreas}
              dispatch={dispatch}
              globeClickState={state.appState.globeClickState}
            />
            <SkyDome />
            {state.locations.map((location: GsatLocation) => {
              console.log("*** rendering location", location);
              return <LocationMarker key={location.id} location={location} />;
            })}
            {state.analysisAreas.map((analysisArea: AnalysisArea) => {
              if (analysisArea.id === Constants.TEMP) {
                return (
                  <AnalysisAreaMarkers
                    key={analysisArea.id}
                    analysisArea={analysisArea}
                  />
                );
              } else {
                return (
                  <Polygon
                    key={analysisArea.id}
                    analysisArea={analysisArea}
                    dispatch={dispatch}
                  />
                );
              }
            })}
          </Canvas>
          <ModalsContainer />

          <ControlsMenu
            analysisAreas={analysisAreas}
            appState={state.appState}
            dispatch={dispatch}
            locations={locations}
          />
        </div>
      </div>
      <LocationListDrawer
        isLocationDrawerVisible={isLocationDrawerVisible}
        onCloseDrawer={onCloseDrawer}
      />
    </>
  );
};

export default App;
