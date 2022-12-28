// color design tokens export
export const colorCodes = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000",
    },
    primary: {
      50: "#E6FBFF",
      100: "#CCF7FE",
      200: "#99EEFD",
      300: "#66E6FC",
      400: "#33DDFB",
      500: "#00D5FA",
      600: "#00A0BC",
      700: "#006B7D",
      800: "#00353F",
      900: "#001519",
    },
  };
  
  // Material UI THEME SETTINGS
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                dark: colorCodes.primary[200],
                main: colorCodes.primary[500],
                light: colorCodes.primary[800],
              },
              neutral: {
                dark: colorCodes.grey[100],
                main: colorCodes.grey[200],
                mediumMain: colorCodes.grey[300],
                medium: colorCodes.grey[400],
                light: colorCodes.grey[700],
              },
              background: {
                default: colorCodes.grey[900],
                alt: colorCodes.grey[800],
              },
            }
          : {
              // palette values for light mode
              primary: {
                dark: colorCodes.primary[700],
                main: colorCodes.primary[500],
                light: colorCodes.primary[50],
              },
              neutral: {
                dark: colorCodes.grey[700],
                main: colorCodes.grey[500],
                mediumMain: colorCodes.grey[400],
                medium: colorCodes.grey[300],
                light: colorCodes.grey[50],
              },
              background: {
                default: colorCodes.grey[10],
                alt: colorCodes.grey[0],
              },
            }),
      },
      typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };