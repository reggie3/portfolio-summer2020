import { makeStyles } from "@material-ui/core/styles";

export const centered = {
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
};

const globalStyles = makeStyles(theme => ({
  centered,
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default globalStyles;

export const globalColors = {
  selectedToggleButtonIcon: "limegreen",
  unSelectedToggleButtonIcon: "lightgray",
};
