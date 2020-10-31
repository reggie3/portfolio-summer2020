import * as React from "react";
import "./styles/styles.css";
import App from "./App";
import AppProvider from "./Components/Context";

export default () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};
