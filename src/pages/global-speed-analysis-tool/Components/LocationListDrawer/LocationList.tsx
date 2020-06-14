import * as React from "react";
import {
  GlobalAppState,
  AppContext,
  ActionTypes,
  DispatchActions,
} from "../../Context";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Theme,
  makeStyles,
  createStyles,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GsatLocation, Modals } from "../../models";
import { HideOrDisplayToggle } from "../Common/HideOrDisplayToggle";
import { MapItemControl } from "../Common/MapItemControl";
import { LocationListItem } from "./LocationListItem";

export interface LocationListProps {
  dispatch: React.Dispatch<DispatchActions>;
  locations: GsatLocation[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: 10,
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
      paddingBottom: 10,
      borderBottomColor: "goldenrod",
      marginBottom: 10,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

const LocationList: React.SFC<LocationListProps> = ({
  dispatch,
  locations,
}: LocationListProps) => {
  const classes = useStyles();

  if (!locations.length) {
    return (
      <Typography className={classes.heading}>No Locations Defined </Typography>
    );
  }

  return (
    <div className={classes.root}>
      {locations.map(location => (
        <LocationListItem
          key={location.id}
          dispatch={dispatch}
          location={location}
        />
      ))}
    </div>
  );
};

export default LocationList;
