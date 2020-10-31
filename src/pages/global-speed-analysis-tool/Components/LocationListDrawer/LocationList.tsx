import * as React from "react";
import { DispatchActions } from "../Context";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { GsatLocation } from "../../models";

import { LocationListItem } from "./LocationListItem";
import { infoTextHeader } from "../../styles/styles";

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
    return <p style={infoTextHeader}>No Locations Defined </p>;
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
