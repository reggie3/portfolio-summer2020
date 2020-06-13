import * as React from 'react';
import { Fab, makeStyles, Theme, createStyles } from '@material-ui/core';
import { HideOrDisplayToggle } from './HideOrDisplayToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface MapItemControlProps {
  isItemVisible: boolean;
  onDeleteItem: () => void;
  onEditItem: () => void;
  onToggleVisiblity: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    mapMarkerControlContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
  })
);

export function MapItemControl({
  isItemVisible,
  onDeleteItem,
  onEditItem,
  onToggleVisiblity,
}: MapItemControlProps) {
  const classes = useStyles();

  return (
    <div className={classes.mapMarkerControlContainer}>
      <Fab
        color="primary"
        size="small"
        onClick={onEditItem}
        className={classes.margin}
      >
        <FontAwesomeIcon icon={'edit'} size="lg" />
      </Fab>
      <HideOrDisplayToggle
        className={classes.margin}
        isVisible={isItemVisible}
        onToggleVisiblity={onToggleVisiblity}
      />
      <Fab
        color="secondary"
        size="small"
        onClick={onDeleteItem}
        className={classes.margin}
      >
        <FontAwesomeIcon icon={'trash'} size="lg" />
      </Fab>
    </div>
  );
}
