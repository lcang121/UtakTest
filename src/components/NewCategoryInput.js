import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../context/ThemeWrapper";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { createCategory } from "../Service/FirebaseServices";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const NewCategoryInput = () => {
  const [category, setCategory] = useState("");
  const [disabledButton, setDisabedButton] = useState(true);

  useEffect(() => {
    category.length >= 1 ? setDisabedButton(false) : setDisabedButton(true);
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(category);
    setCategory("");
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        "& > :not(style)": { m: 0.3 },
      }}
    >
      <TextField
        id="demo-helper-text-misaligned-no-helper"
        variant="standard"
        label="Enter a category..."
        placeholder="Enter a category..."
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />

      <Button
        size="medium"
        type="form"
        disabled={disabledButton}
        variant="contained"
        onClick={handleSubmit}
        style={{ textTransform: "none" }}
      >
        Add Category
      </Button>
    </Box>
  );
};

export default NewCategoryInput;
