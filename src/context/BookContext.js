import React, { createContext, useReducer } from "react";
import { bookReducer } from "../reducer/bookReducer";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

export const BookContext = createContext();

const theme = createTheme({
  typography: {
    fontFamily: ["Arial"].join(","),
  },
});

const BookContextProvider = (props) => {
  const [books, dispatch] = useReducer(bookReducer, []);
  return (
    <ThemeProvider theme={theme}>
      <BookContext.Provider value={{ books, dispatch }}>
        {props.children}
      </BookContext.Provider>
    </ThemeProvider>
  );
};

export default BookContextProvider;
