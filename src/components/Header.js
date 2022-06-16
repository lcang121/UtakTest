import React, { useContext } from "react";
import { BookContext } from "../context/ThemeWrapper";
import NewCategoryInput from "./NewCategoryInput";
import { Box, Typography } from "@mui/material";

const Navbar = () => {
  const { books } = useContext(BookContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingY: "30px",
      }}
    >
      <Typography variant="h4">Restaurant Inventory Tracking System</Typography>
      <NewCategoryInput />
    </Box>
  );
};

export default Navbar;
