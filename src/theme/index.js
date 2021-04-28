import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto"].join(","),
    fontSize: 12,
  },
    palette: {
      common:{white: "#fff",black: "#000",},
      primary: { light: "#b36cdf", main: "#9d43d6", dark: "#8429bc" },
  },
});
export default theme;
