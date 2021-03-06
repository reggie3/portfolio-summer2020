import * as React from "react";
import { Grid, TextField, InputAdornment, MenuItem } from "@material-ui/core";
import { GsatLocation, MarkerTypes } from "../../models";
import styled from "styled-components";

export enum ValueTypes {
  SPEED = "speed",
  SPEED_DEVIATION = "speedDeviation",
  MAX_RANGE = "maxRange",
  MAX_RANGE_DEVIATION = "maxRangeDeviation",
}

interface LocationItemDataEntryProps {
  location: GsatLocation;
  markerTypeValue: MarkerTypes;
  onChangeMarkerType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeValue: (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  showMarkerTypeSelect?: boolean;
}

const LocationItemDataEntry: React.FunctionComponent<LocationItemDataEntryProps> = ({
  location,
  markerTypeValue,
  onChangeMarkerType,
  onChangeValue,
  showMarkerTypeSelect = true,
}) => {
  return (
    <LocationDetailsContainer>
      {showMarkerTypeSelect && (
        <TextField
          label="Type"
          id="markerTypeSelect"
          value={markerTypeValue}
          onChange={onChangeMarkerType}
          select
        >
          <MenuItem value={MarkerTypes.FRIENDLY}>Friendly</MenuItem>
          <MenuItem value={MarkerTypes.ENEMY}>Enemy</MenuItem>
          <MenuItem value={MarkerTypes.NEUTRAL}>Neutral</MenuItem>
        </TextField>
      )}
      <Grid container justify="space-between">
        <Grid item>
          <TextField
            key={`${location.id}-speed`}
            fullWidth
            size="small"
            label="Travel Speed"
            onChange={event =>
              onChangeValue(
                ValueTypes.SPEED,
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            margin="dense"
            value={location.speed}
            InputProps={{
              endAdornment: <InputAdornment position="end">kph</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            key={`${location.id}-speed-deviation`}
            size="small"
            label="Speed Deviation"
            onChange={event =>
              onChangeValue(
                ValueTypes.SPEED_DEVIATION,
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            margin="dense"
            value={location.speedDeviation ?? 0}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">+/- kph</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item key={`${location.id}-max-range`}>
          <TextField
            label="Max Range"
            onChange={event =>
              onChangeValue(
                ValueTypes.MAX_RANGE,
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            margin="dense"
            value={location.maxRange ?? 0}
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item key={`${location.id}-max-range-deviation`}>
          <TextField
            label="Range Deviation"
            onChange={event =>
              onChangeValue(
                ValueTypes.MAX_RANGE_DEVIATION,
                event as React.ChangeEvent<HTMLInputElement>
              )
            }
            margin="dense"
            value={location.maxRangeDeviation ?? 0}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">+/- km</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </LocationDetailsContainer>
  );
};

export default LocationItemDataEntry;

/* const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    locationDetailsContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
    },

    textInput: {
      width: "11em",
    },
  })
); */

const LocationDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const TextInput = styled.div`
  width: 11em;
`;
