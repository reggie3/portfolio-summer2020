import * as React from "react";
import { Fab, makeStyles, Theme, createStyles } from "@material-ui/core";
import { HideOrDisplayToggle } from "./HideOrDisplayToggle";
import DeleteIcon from "@material-ui/icons/Delete";
export interface MapItemControlProps {
  isItemVisible: boolean;
  onDeleteItem: () => void;
  onEditItem: () => void;
  onToggleVisibility: () => void;
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
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
  })
);

export function MapItemControl({
  isItemVisible,
  onDeleteItem,
  onEditItem,
  onToggleVisibility,
}: MapItemControlProps) {
  const classes = useStyles();

  return (
    <div className={classes.mapMarkerControlContainer}>
      <HideOrDisplayToggle
        className={classes.margin}
        isVisible={isItemVisible}
        onToggleVisibility={onToggleVisibility}
      />
      <Fab
        color="secondary"
        size="small"
        onClick={onDeleteItem}
        className={classes.margin}
      >
        <DeleteIcon fontSize="large" />
      </Fab>
    </div>
  );
}
