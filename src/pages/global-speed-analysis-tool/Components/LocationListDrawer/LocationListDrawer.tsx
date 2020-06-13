import * as React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import LocationList from './LocationList';
import {
  GlobalAppState,
  AppContext,
  ActionTypes,
  DispatchActions,
} from '../../Context';
import AnalysisAreaList from './AnalysisAreasList';
import HorizontalRule from '../Common/HorizontalRule';

interface LocatonListDrawerProps {
  isLocationDrawerVisible: boolean;
  onCloseDrawer: () => void;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(255,255,255,.3)',
    flexDirection: 'column',
    padding: 10,
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
      anchor={'right'}
      open={isLocationDrawerVisible}
      onClose={onCloseDrawer}
    >
      <div className={classes.root}>
        <LocationList dispatch={dispatch} locations={locations} />
        <AnalysisAreaList
          dispatch={dispatch}
          analysisAreas={analysisAreas}
          analysisResults={analysisResults}
        />
      </div>
    </Drawer>
  );
};

export default LocatonListDrawer;
