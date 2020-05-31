import { createMuiTheme } from "@material-ui/core/styles"
import purple from "@material-ui/core/colors/purple"
import green from "@material-ui/core/colors/green"
import { orange } from "@material-ui/core/colors"

export const MyCustomTheme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: green,
  },
})
