import React, { createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const AppContext = createContext();

const theme = createTheme({
  typography: {
    fontFamily: ["Inter"],
  },
});

const ContextProvider = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>
    </ThemeProvider>
  );
};

export default ContextProvider;
