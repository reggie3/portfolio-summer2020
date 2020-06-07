import { createMuiTheme } from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import { clr_accent_dark } from "./colors"

export const MyCustomTheme = createMuiTheme({
  palette: {
    primary: {
      main: clr_accent_dark,
    },
    secondary: green,
    background: {
      paper: "#3b3b3b",
    },
  },
  typography: {
    body1: {
      fontFamily: `Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      color: "eee",
    },
    body2: {
      color: "eee",
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    /*
button: {fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif", fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, letterSpacing: "0.02857em", …},
caption: {fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif", fontWeight: 400, fontSize: "0.75rem", lineHeight: 1.66, letterSpacing: "0.03333em"}
fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
fontSize: 14
fontWeightBold: 700
fontWeightLight: 300
fontWeightMedium: 500
fontWeightRegular: 400
h1: {fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif", fontWeight: 300, fontSize: "6rem", lineHeight: 1.167, letterSpacing: "-0.01562em"}
h2: {fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif", fontWeight: 300, fontSize: "3.75rem", lineHeight: 1.2, letterSpacing: "-0.00833em"}
h3: {fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif", fontWeight: 400, fontSize: "3rem", lineHeight: 1.167, letterSpacing: "0em"}
h4: {fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif", fontWeight: 400, fontSize: "2.125rem", lineHeight: 1.235, letterSpacing: "0.00735em"}
h5: {fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif", fontWeight: 400, fontSize: "1.5rem", lineHeight: 1.334, letterSpacing: "0em"}
h6: {fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif", fontWeight: 500, fontSize: "1.25rem", lineHeight: 1.6, letterSpacing: "0.0075em"} */
  },
})

/*
  background-color: var(--clr-bg-dark) !important;
  color: var(--clr-text) !important;
  */
