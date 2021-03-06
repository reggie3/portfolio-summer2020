import * as React from "react";
import { GlobeClickStates } from "../../models";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { makeStyles } from "@material-ui/core";
import { globalColors } from "../../styles/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import RoomIcon from "@material-ui/icons/Room";
import FormatShapesIcon from "@material-ui/icons/FormatShapes";
interface ClickStateControlsProps {
  globeClickState: GlobeClickStates;
  onClickStateChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: GlobeClickStates
  ) => void;
}

const useStyles = makeStyles({
  toggleButton: {
    width: "3rem",
  },
});

const getIconColor = (
  clickState: GlobeClickStates,
  selectedClickState: GlobeClickStates
): string => {
  return clickState === selectedClickState
    ? globalColors.selectedToggleButtonIcon
    : globalColors.unSelectedToggleButtonIcon;
};

const ClickStateControls: React.SFC<ClickStateControlsProps> = ({
  globeClickState,
  onClickStateChange,
}) => {
  let classes = useStyles();

  return (
    <ToggleButtonGroup
      value={globeClickState}
      exclusive
      onChange={onClickStateChange}
    >
      <ToggleButton
        key={1}
        value={GlobeClickStates.NONE}
        className={classes.toggleButton}
      >
        <HighlightOffIcon
          size="large"
          style={{
            color: getIconColor(GlobeClickStates.NONE, globeClickState),
          }}
        />
      </ToggleButton>
      <ToggleButton
        key={2}
        value={GlobeClickStates.PLACE_MARKER}
        className={classes.toggleButton}
      >
        <RoomIcon
          size="large"
          style={{
            color: getIconColor(GlobeClickStates.PLACE_MARKER, globeClickState),
          }}
        />
      </ToggleButton>
      <ToggleButton
        key={3}
        value={GlobeClickStates.PLACE_POLYGON_POINT}
        className={classes.toggleButton}
      >
        <FormatShapesIcon
          size="large"
          style={{
            color: getIconColor(
              GlobeClickStates.PLACE_POLYGON_POINT,
              globeClickState
            ),
          }}
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ClickStateControls;
