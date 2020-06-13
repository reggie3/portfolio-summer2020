import * as React from "react";
import { Drawer, makeStyles, Button } from "@material-ui/core";
import LocationList from "./LocationList";
import { GlobalAppState, AppContext, DispatchActions } from "../../Context";
import AnalysisAreaList from "./AnalysisAreasList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LocatonListDrawerProps {
  isLocationDrawerVisible: boolean;
  onCloseDrawer: () => void;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(255,255,255,.3)",
    flexDirection: "column",
    padding: 10,
    flex: 1,
    display: "flex",
    minWidth: 300,
  },
});

const LocatonListDrawer: React.SFC<LocatonListDrawerProps> = ({
  isLocationDrawerVisible,
  onCloseDrawer,
}) => {
  const [state, dispatch]: [
    GlobalAppState,
    React.Dispatch<DispatchActions>
  ] = React.useContext(AppContext);
  const { analysisAreas, appState, locations } = state;
  const analysisResults = appState.analysisResults;
  const classes = useStyles();

  return (
    <Drawer
      anchor={"right"}
      open={isLocationDrawerVisible}
      onClose={onCloseDrawer}
      variant="persistent"
    >
      <div className={classes.root}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <LocationList dispatch={dispatch} locations={locations} />
          <AnalysisAreaList
            dispatch={dispatch}
            analysisAreas={analysisAreas}
            analysisResults={analysisResults}
          />
        </div>
        <Button variant="contained" color="secondary" onClick={onCloseDrawer}>
          <FontAwesomeIcon icon={"chevron-circle-right"} size="2x" />
        </Button>
      </div>
    </Drawer>
  );
};

export default LocatonListDrawer;
