import { createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";
const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },
});
export default Theme;
