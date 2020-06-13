import * as React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import { GlobalAppState, AppContext } from '../../Context';

interface RunSimulationDrawerProps {
  isLocationDrawerVisible: boolean;
  onCloseDrawer: () => void;
}

const useStyles = makeStyles({
  root: {
    width: 250,
    flexDirection: 'column',
    padding: 10,
  },
});

const RunSimulationDrawer: React.SFC<RunSimulationDrawerProps> = ({
  isLocationDrawerVisible,
  onCloseDrawer,
}) => {
  const [state, dispatch]: [
    GlobalAppState,
    React.Dispatch<any>
  ] = React.useContext(AppContext);
  const { locations, analysisAreas } = state;
  const classes = useStyles();

  return (
    <Drawer
      anchor={'bottom'}
      open={isLocationDrawerVisible}
      onClose={onCloseDrawer}
    >
      <div className={classes.root}>
        <p>Run Simulation Drawer</p>
      </div>
    </Drawer>
  );
};

export default RunSimulationDrawer;
