import * as React from "react";
import { makeStyles, AppBar, Button, LinearProgress } from "@material-ui/core";
import { useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  GlobeClickStates,
  AnalysisArea,
  Constants,
  GsatLocation,
  AnalysisResult,
  WorkerProgressMessage,
} from "../../models";
import { ActionTypes, ApplicationState, DispatchActions } from "../Context";
import ClickStateControls from "./ClickStateControls";
import performCalculationsWorker from "../../webWorkers/performCalculationsWorker";
import BootstrapInput from "../Common/BootstrapInput";
import {
  WorkerAnalysisArea,
  WorkerLocation,
} from "../../webWorkers/performCalculations.worker";
import { colorizeAnalysisAreas } from "../utilities/colorizeAnalysisAreas";
import styled from "styled-components";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
export interface ControlsMenuProps {
  analysisAreas: AnalysisArea[];
  appState: ApplicationState;
  dispatch: React.Dispatch<DispatchActions>;
  locations: GsatLocation[];
}

export interface ControlsMenuState {}

const isInProgressAnalysisAreaValid = (
  analysisAreas: AnalysisArea[]
): boolean => {
  const inProgressAnalysisArea: AnalysisArea = analysisAreas.find(
    (analysisArea: AnalysisArea) => {
      return analysisArea.id === Constants.TEMP;
    }
  );
  if (inProgressAnalysisArea?.polygon.length < 3) {
    return false;
  }
  return true;
};

const handleDeactivatePlacePolygonPoint = (
  dispatch: React.Dispatch<DispatchActions>,
  newValue: GlobeClickStates,
  analysisAreas: AnalysisArea[]
) => {
  const isValid: boolean = isInProgressAnalysisAreaValid(analysisAreas);
  if (isValid) {
    dispatch({
      type: ActionTypes.SAVE_ANALYSIS_AREA,
      payload: {
        name: `Area ${Date.now()}`,
      },
    });
    updateClickValue(dispatch, newValue);
  }
};

const updateClickValue = (
  dispatch: React.Dispatch<DispatchActions>,
  newValue: GlobeClickStates
) => {
  dispatch({
    type: ActionTypes.SET_GLOBE_CLICK_STATE,
    payload: {
      globeClickState: newValue,
    },
  });
};

const isRunButtonDisabled = (
  analysisAreas: AnalysisArea[],
  locations: GsatLocation[],
  numberOfRuns: number
): boolean => {
  return (
    !analysisAreas.filter(area => area.id !== Constants.TEMP).length ||
    !locations.length ||
    !numberOfRuns
  );
};

const ControlsMenu = ({
  analysisAreas,
  appState,
  dispatch,
  locations,
}: ControlsMenuProps) => {
  const [progress, setProgress] = useState<number>(0);
  const classes = useStyles();
  const { globeClickState, numberOfRuns, numberOfCompletedRuns } = appState;

  React.useEffect(() => {
    const progress = numberOfCompletedRuns / numberOfRuns;
    setProgress(Math.min(progress, 100));
  }, [numberOfCompletedRuns, numberOfRuns]);

  const onClickStateChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: GlobeClickStates
  ) => {
    // check to see if polygon is valid
    if (
      globeClickState === GlobeClickStates.PLACE_POLYGON_POINT &&
      newValue !== GlobeClickStates.PLACE_POLYGON_POINT
    ) {
      handleDeactivatePlacePolygonPoint(dispatch, newValue, analysisAreas);
    } else {
      updateClickValue(dispatch, newValue);
    }
  };

  const onToggleLocationListClicked = () => {
    dispatch({
      type: ActionTypes.TOGGLE_LOCATION_LIST,
    });
  };

  const onChangeNumberOfRuns = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberOfRuns: number = parseInt(event.currentTarget.value);

    dispatch({
      type: ActionTypes.SET_NUMBER_OF_RUNS,
      payload: {
        numberOfRuns: isNaN(numberOfRuns) ? 0 : numberOfRuns,
      },
    });
  };

  const getAnalysisAreaDataForWorker = (
    analysisArea: AnalysisArea
  ): WorkerAnalysisArea => {
    return {
      id: analysisArea.id,
      // @ts-ignore Property 'faces' does not exist on type 'BufferGeometry'
      faces: analysisArea.polygonMesh.geometry.faces,
      // @ts-ignore Property 'vertices' does not exist on type 'BufferGeometry'
      vertices: analysisArea.polygonMesh.geometry.vertices,
    };
  };

  const getLocationsDataForWorker = (
    locations: GsatLocation[]
  ): WorkerLocation[] => {
    return locations.map(location => {
      let workerLocation: WorkerLocation = {
        ...location,
        type: location.icon.type,
        position: location.icon.position,
      } as WorkerLocation;
      // @ts-ignore iconnot on workerLocation; it is on there because
      // we did a spread
      delete workerLocation.icon;

      return workerLocation;
    });
  };

  const onWorkerMessage = async (event: MessageEvent) => {
    // the worker's message is always the 2nd item in the array
    // not sure why though
    try {
      const message: WorkerProgressMessage = JSON.parse(event.data[2]);
      console.log(message.completedRuns);
      console.log("HERE", numberOfCompletedRuns);
      dispatch({
        type: ActionTypes.SET_NUMBER_OF_COMPLETED_RUNS,
        payload: { numberOfCompletedRuns: numberOfCompletedRuns + 1 },
      });
      setProgress(previousProgress => previousProgress + 1);
    } catch (error) {
      // don't really care if we can't parse the message
      // console.warn("onWorkerMessage error: ", error);
    }
  };

  const resetProgress = () => {
    dispatch({
      type: ActionTypes.SET_NUMBER_OF_COMPLETED_RUNS,
      payload: { numberOfCompletedRuns: 0 },
    });
    setProgress(0);
  };

  const runSimulation = async () => {
    resetProgress();

    const locationsWorkerData = getLocationsDataForWorker(locations);

    const workerPromises = analysisAreas.map(analysisArea => {
      const analysisAreaWorkerData = getAnalysisAreaDataForWorker(analysisArea);

      // performCalculationsWorker.onmessage = onWorkerMessage;

      return performCalculationsWorker.performCalculations(
        JSON.stringify({
          analysisArea: analysisAreaWorkerData,
          locations: locationsWorkerData,
          numberOfRuns,
        })
      );
    });

    const analysisResults = await Promise.all(workerPromises);
    colorizeAnalysisAreas(analysisAreas, analysisResults as AnalysisResult[]);
    saveAnalysisResults(analysisResults);
  };

  const saveAnalysisResults = (analysisResults: AnalysisResult[]) => {
    const analysisResultsWithoutFaceStats: AnalysisResult[] = analysisResults.map(
      result => {
        const newResult: AnalysisResult = { ...result };
        delete newResult.faceStatsMap;
        return newResult;
      }
    );
    dispatch({
      type: ActionTypes.ADD_ANALYSIS_AREA_RESULTS,
      payload: {
        analysisResults: analysisResultsWithoutFaceStats,
      },
    });
  };

  return (
    <>
      <AppBar position="fixed" className={classes.root}>
        <div className={classes.progressBarContainer}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color="secondary"
          />
        </div>
        <div className={classes.appBarBottomRow}>
          <ClickStateControls
            globeClickState={globeClickState}
            onClickStateChange={onClickStateChange}
          />
          <RunControlContainer>
            <BootstrapInput
              className={classes.runTextInput}
              onChange={onChangeNumberOfRuns}
              placeholder="Placeholder"
              value={numberOfRuns}
            />
            <Button
              variant="contained"
              onClick={runSimulation}
              disabled={isRunButtonDisabled(
                analysisAreas,
                locations,
                numberOfRuns
              )}
            >
              <DirectionsRunIcon fontSize="large" />
            </Button>
          </RunControlContainer>

          <Button
            variant="contained"
            color="secondary"
            onClick={onToggleLocationListClicked}
          >
            <ArrowBackIosIcon fontSize="large" />
          </Button>
        </div>
      </AppBar>
    </>
  );
};

export default ControlsMenu;

const RunControlContainer = styled.div`
  display: flex;
  flexdirection: row;
  justifycontent: center;
  alignitems: center;
`;

const useStyles = makeStyles({
  progressBarContainer: {},
  appBarBottomRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#1E90FFaa",
    justifyContent: "space-between",
    padding: 5,
    marginTop: 0,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    top: "auto",
    bottom: 0,
    backgroundColor: "#1E90FFaa",
    justifyContent: "space-between",
  },

  runControls: {
    display: "flex",
    alignItems: "center",
  },
  runTextInput: {
    marginRight: "5px",
    padding: "0px",
    width: "4rem",
    textAlign: "right",
  },
});
