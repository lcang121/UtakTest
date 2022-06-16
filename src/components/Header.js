import React from "react";
import NewCategoryInput from "./NewCategoryInput";
import { Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingY: "30px",
      }}
    >
      <Typography variant="h4">Inventory Tracking App</Typography>
      <NewCategoryInput />
    </Box>
  );
};

export default Navbar;
