import * as React from "react";
import { GsatLocation, Modals, MarkerTypes } from "../../models";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
} from "@material-ui/core";
import { MapItemControl } from "../Common/MapItemControl";
import { ActionTypes, DispatchActions } from "../Context";
import { ReactElement } from "react";
import { detailColor } from "../utilities/colors";
import LocationItemDataEntry from "../Common/LocationItemDataEntry";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
export interface LocationListItemProps {
  dispatch: React.Dispatch<DispatchActions>;
  location: GsatLocation;
}

export class LocationListItem extends React.Component<LocationListItemProps> {
  onChangeValue = (
    valueType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);

    this.props.dispatch({
      type: ActionTypes.UPDATE_LOCATION,
      payload: {
        location: {
          id: this.props.location.id,
          [valueType]: isNaN(value) ? 0 : value,
        },
      },
    });
  };

  onChangeMarkerType = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.dispatch({
      type: ActionTypes.UPDATE_LOCATION,
      payload: {
        location: {
          ...this.props.location,
          icon: {
            ...this.props.location.icon,
            type: MarkerTypes[event.target.value],
          },
        },
      },
    });
  };

  LocationDetails = (): React.ReactElement => {
    return (
      <LocationItemDataEntry
        location={this.props.location}
        onChangeMarkerType={this.onChangeMarkerType}
        markerTypeValue={this.props.location.icon.type}
        onChangeValue={(key, event) => {
          this.onChangeValue(key, event);
        }}
        showMarkerTypeSelect={false}
      />
    );
  };

  Marker = (): React.ReactElement => {
    let marker: ReactElement;
    switch (this.props.location.icon.type) {
      case MarkerTypes.ENEMY:
        marker = <div style={styles.enemyMarker} />;
        break;
      case MarkerTypes.FRIENDLY:
        marker = <div style={styles.friendlyMarker} />;
        break;
      case MarkerTypes.NEUTRAL:
        marker = <div style={styles.neutralMarker} />;
        break;
    }
    return marker;
  };

  onDeleteLocation = () => {
    this.props.dispatch({
      type: ActionTypes.DELETE_LOCATION,
      payload: {
        location: this.props.location,
      },
    });
  };

  onToggleVisibility = () => {
    this.props.dispatch({
      type: ActionTypes.TOGGLE_LOCATION_VISIBILITY,
      payload: {
        location: this.props.location,
      },
    });
  };

  onEditLocation = () => {
    this.props.dispatch({
      type: ActionTypes.OPEN_MODAL,
      payload: {
        name: Modals.LOCATION_MARKER,
        params: { location: this.props.location },
      },
    });
  };

  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={styles.headerContainer}>
            <this.Marker />
            <Typography style={styles.heading}>
              {this.props.location.name}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <this.LocationDetails />
        </ExpansionPanelDetails>
        <MapItemControl
          isItemVisible={this.props.location.isVisible}
          onDeleteItem={this.onDeleteLocation}
          onEditItem={this.onEditLocation}
          onToggleVisibility={this.onToggleVisibility}
        />
      </ExpansionPanel>
    );
  }
}

export default LocationListItem;

const BASIC_MARKER_SIZE = 18;
const basicMarker = {
  width: BASIC_MARKER_SIZE,
  height: BASIC_MARKER_SIZE,
  borderRadius: BASIC_MARKER_SIZE / 2,
  marginRight: 8,
};
const styles = {
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
  },
  heading: {
    fontSize: "15px",
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
  neutralMarker: { ...basicMarker, backgroundColor: "green" },
  formBodyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  formRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  textInput: {
    width: "11em",
  },
};
