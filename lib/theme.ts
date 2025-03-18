import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#48a74c",
    },
    background: {
      default: "#f5f5f5",
    },
    secondary: {
      main: "#1a1a1a",
      "100": "#1a1a1a",
      "200": "#2a2a2a",
      "300": "#444",
      "400": "#3D8E41",
      "500": "#C4C3C3",
    },
    grey: {
      "100": "#E6E6E6",
      "200": "#161616",
      "300": "#707070",
      "400": "#f0f0f0",
      "500": "#666666",
      "600" : "f3fdf3"
    },
    warning: {
      main: "#ed1f03",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
