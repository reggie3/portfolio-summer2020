import * as React from "react";
import "./styles/styles.css";
import App from "./App";
import { AppProvider } from "./Context";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faEdit,
  faEye,
  faEyeSlash,
  faMapMarkerAlt,
  faTimesCircle,
  faDrawPolygon,
  faChevronCircleDown,
  faChevronCircleUp,
  faChevronCircleLeft,
  faChevronCircleRight,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCheckSquare,
  faCoffee,
  faTrash,
  faEdit,
  faEye,
  faEyeSlash,
  faMapMarkerAlt,
  faTimesCircle,
  faDrawPolygon,
  faChevronCircleDown,
  faChevronCircleUp,
  faChevronCircleLeft,
  faChevronCircleRight,
  faRunning
);

export default () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};
