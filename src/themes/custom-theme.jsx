import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
          default: "#121212",
          paper: "#1E1E1E",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b3b3b3",
        },
        primary: {
          main: "#90caf9",
        },
        secondary: {
          main: "#f48fb1",
        },
      },
      typography: {
        fontFamily: "Arial, Helvetica, sans-serif",
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none", 
              color: "#ffffff",
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              backgroundColor: "#1E1E1E", 
              color: "#ffffff", 
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: "#1E1E1E",
              color: "#ffffff",
            },
          },
        },
      },
    });

export default customTheme;
