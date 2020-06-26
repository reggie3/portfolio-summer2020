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

export const modalStyle = {
  border: "2px solid #000",
  padding: "16px 32px 24px",
  position: "relative",
  boxShadow:
    "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
  backgroundColor: " #fff",
  width: "33%",
  minWidth: "400px",
  maxWidth: "600px",
};
