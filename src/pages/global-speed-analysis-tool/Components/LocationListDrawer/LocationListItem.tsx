import * as React from "react";
import { GsatLocation, Modals, MarkerTypes } from "../../models";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapItemControl } from "../Common/MapItemControl";
import { ActionTypes, DispatchActions } from "../../Context";
import { ReactElement } from "react";
import SwitchableLabelInput from "../SwitchableLabelInput";
import { detailColor } from "../../colors";

enum ValueTypes {
  SPEED = "SPEED",
  SPEED_DEVIATION = "SPEED_DEVIATION",
  MAX_RANGE = "MAX_RANGE",
  MAX_RANGE_DEVIATION = "MAX_RANGE_DEVIATION",
}

export interface LocationListItemProps {
  dispatch: React.Dispatch<DispatchActions>;
  location: GsatLocation;
}

export function LocationListItem({
  dispatch,
  location,
}: LocationListItemProps) {
  const classes = useStyles();

  const onChangeValue = (
    valueType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(valueType, event.currentTarget.value);
  };

  const LocationDetails = (): React.ReactElement => {
    return (
      <div className={classes.locationDetailsContainer}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SwitchableLabelInput
            inputLabel="speed"
            label={
              <div className={classes.detailItem}>
                {`${location.speed} kph`}
                <p className={classes.detailLabel}>speed</p>
              </div>
            }
            onChangeValue={event => onChangeValue(ValueTypes.SPEED, event)}
            value={location.speed}
          />
          <SwitchableLabelInput
            inputLabel="speed variation"
            label={
              <div className={classes.detailItem}>
                {`${location.speedDeviation ?? 0} kph`}
                <p className={classes.detailLabel}>speed variation</p>
              </div>
            }
            onChangeValue={event =>
              onChangeValue(ValueTypes.SPEED_DEVIATION, event)
            }
            value={location.speedDeviation}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SwitchableLabelInput
            inputLabel="range"
            label={
              <div className={classes.detailItem}>
                {`${
                  !location.maxRange ? "Infinite" : location.maxRange + "  km"
                }`}
                <p className={classes.detailLabel}>Max Range</p>
              </div>
            }
            onChangeValue={event => onChangeValue(ValueTypes.MAX_RANGE, event)}
            value={location.maxRange}
          />
          <SwitchableLabelInput
            inputLabel="range variation"
            label={
              <div className={classes.detailItem}>
                {`${location.maxRangeDeviation ?? 0} km`}
                <p className={classes.detailLabel}>range variation</p>
              </div>
            }
            onChangeValue={event =>
              onChangeValue(ValueTypes.MAX_RANGE_DEVIATION, event)
            }
            value={location.maxRangeDeviation}
          />
        </div>
      </div>
    );
  };

  const Marker = (): React.ReactElement => {
    let marker: ReactElement;
    switch (location.icon.type) {
      case MarkerTypes.ENEMY:
        marker = <div className={classes.enemyMarker} />;
        break;
      case MarkerTypes.FRIENDLY:
        marker = <div className={classes.friendlyMarker} />;
        break;
      case MarkerTypes.NEUTRAL:
        marker = <div className={classes.neutralMarker} />;
        break;
    }
    return marker;
  };

  const onDeleteLocation = () => {
    dispatch({
      type: ActionTypes.DELETE_LOCATION,
      payload: {
        location,
      },
    });
  };

  const onToggleVisiblity = () => {
    dispatch({
      type: ActionTypes.TOGGLE_LOCATION_VISIBILTY,
      payload: {
        location,
      },
    });
  };

  const onEditLocation = () => {
    dispatch({
      type: ActionTypes.OPEN_MODAL,
      payload: {
        name: Modals.LOCATION_MARKER,
        params: { location },
      },
    });
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<FontAwesomeIcon icon={"chevron-circle-down"} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={classes.headerContainer}>
          <Marker />
          <Typography className={classes.heading}>{location.name}</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <LocationDetails />
      </ExpansionPanelDetails>
      <MapItemControl
        isItemVisible={location.isVisible}
        onDeleteItem={onDeleteLocation}
        onEditItem={onEditLocation}
        onToggleVisiblity={onToggleVisiblity}
      />
    </ExpansionPanel>
  );
}

const BASIC_MARKER_SIZE = 18;
const basicMarker = {
  width: BASIC_MARKER_SIZE,
  height: BASIC_MARKER_SIZE,
  borderRadius: BASIC_MARKER_SIZE / 2,
  marginRight: 8,
};
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
    detailItem: {
      flexDirection: "column",
    },
    detailLabel: {
      color: detailColor,
      fontSize: ".85em",
      position: "relative",
      top: "-8px",
    },
    headerContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 600,
    },
    locationDetailsContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
    },
    enemyMarker: { ...basicMarker, backgroundColor: "red" },
    friendlyMarker: { ...basicMarker, backgroundColor: "blue" },
    neutralMarker: { ...basicMarker, backgroundColor: "yellow" },
  })
);
