import React, { createContext, useReducer } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

export const BookContext = createContext();

const theme = createTheme({
  typography: {
    fontFamily: ["Inter"],
  },
});

const BookContextProvider = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <BookContext.Provider value={{}}>{props.children}</BookContext.Provider>
    </ThemeProvider>
  );
};

export default BookContextProvider;
