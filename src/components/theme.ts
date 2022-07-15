import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#F5F5F5"
    },
    primary: {
      main: "#005CB9"
    },
    secondary: {
      main: "#027800"
    }
  },
  typography: {
    allVariants: {
      color: "#15537D"
    },
    h1: {
      fontSize: "2.2rem",
      fontWeight: 600,
      "@media screen and (min-width: 600px)": {
        fontSize: "4.4rem",
        fontWeight: 600,
      }
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      "@media screen and (min-width: 600px)": {
        fontSize: "2.8rem",
        fontWeight: 600,
      }
    },
    h3: {
      fontSize: "2.0rem",
      fontWeight: 600,
      "@media screen and (min-width: 600px)": {
        fontSize: "2.0rem",
        fontWeight: 600,
      }
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 600,
      "@media screen and (min-width: 600px)": {
        fontSize: "1.6rem",
        fontWeight: 600,
      }
    },
    h5: {
      fontSize: "1.3rem",
      fontWeight: 600,
      "@media screen and (min-width: 600px)": {
        fontSize: "1.3rem",
        fontWeight: 600,
      }
    },
    subtitle1: {
      fontSize: "1.1rem",
      fontWeight: 600,
      lineHeight: "1.3rem",
      "@media screen and (min-width: 600px)": {
        fontSize: "1.8rem",
        fontWeight: 600,
        lineHeight: "2.5rem",
      }
    },
    fontFamily: [
      'Plus Jakarta Sans',
      'sans-serif'
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "solid 1px #EBEBEB",
          marginBottom: 40,
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
          borderRadius: 0
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textDecoration: "none",
          fontSize: "0.9em",
          color: "#15537D"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          height: "52px",
          boxShadow: "none",
          textTransform: "none",
          fontSize: "1.2rem"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        elevation: {
          borderRadius: "20px",
          border: "solid 1px #CBD9E0",
          boxShadow: "none"
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "&.Mui-disabled": {
              "& .MuiOutlinedInput-input": {
                textFillColor: "rgba(0, 0, 0, 1)",
                cursor: "pointer"
              }
            },
          },
          "& .MuiInputLabel-shrink": {
            color: "#005CB9"
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
          borderRadius: 0
        }
      }
    }
  }
});

export default theme;