import React, { useState, useRef, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { updateCategory, removeCategory } from "../Service/FirebaseServices";
import { useRemoveCategory } from "./ConfirmationDialog";
import NewCategoryInput from "./NewCategoryInput";
import { refType } from "@mui/utils";
import ProductTable from "./ProductTable";

const SmallButton = styled(Button)({
  variant: "contained",
  fontSize: "12px",
  margin: "3px",
  textTransform: "none",
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(-180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const handleRemoveCategory = (id) => {
  removeCategory(id);
};

const handleUpdateCategory = (categoryName, id) => {
  updateCategory(categoryName, id);
};

export default function CategoryCard(props) {
  const addActionRef = useRef();
  const categoryRef = useRef(null);
  const {
    MyRemoveCategory,
    open,
    setOpen: setRemoveCategoryDialog,
  } = useRemoveCategory();
  const [expanded, setExpanded] = React.useState(true);
  const [isEditingMode, setIsEditingMode] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [updatedCategory, setUpdatedCategory] = useState(
    props.data.categoryName
  );
  const handleKeyPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      return true;
    } else return false;
  };

  return (
    <Card>
      <MyRemoveCategory
        onAgree={() => handleRemoveCategory(props.id)}
        categoryName={props.data.categoryName}
      />
      <Box
        bgcolor="primary.light"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",

          paddingX: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box>
            <ExpandMore
              onClick={handleExpandClick}
              expand={expanded}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          {isEditingMode ? (
            <OutlinedInput
              style={{ background: "#ffffff" }}
              ref={categoryRef}
              autoFocus
              onFocus={(e) => e.target.select()}
              id="contained-basic"
              // label="contained"
              variant="contained"
              value={updatedCategory}
              onChange={(e) => {
                setUpdatedCategory(e.target.value);
              }}
              onKeyPress={(e) => {
                if (handleKeyPress(e)) {
                  handleUpdateCategory(updatedCategory, props.id);
                  setIsEditingMode(false);
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    type="form"
                    sx={{ p: "10px" }}
                    aria-label="save changes"
                    onClick={() => {
                      handleUpdateCategory(updatedCategory, props.id);
                      setIsEditingMode(false);
                    }}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    <CheckIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton
                    sx={{ p: "10px" }}
                    aria-label="undo changes"
                    onClick={() => setIsEditingMode(false)}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <Typography variant="h5">{props.data.categoryName}</Typography>
          )}
          {/* <Button
            onClick={() => handleUpdateCategory(updatedCategory, props.id)}
          >
            Submit Change
          </Button> */}
        </Box>
        <CardHeader
          action={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
              }}
            >
              <Box>
                <SmallButton
                  onClick={() => addActionRef.current.click()}
                  variant="contained"
                  size="small"
                >
                  Add Product
                </SmallButton>
                <SmallButton
                  onClick={() => {
                    setIsEditingMode(true);
                  }}
                  variant="contained"
                  size="small"
                >
                  Rename
                </SmallButton>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <SmallButton
                  // onClick={() => handleRemoveCategory(props.id)}
                  onClick={() => setRemoveCategoryDialog(true)}
                  variant="contained"
                  size="small"
                >
                  Delete Category
                </SmallButton>
              </Box>
            </Box>
          }
        />
      </Box>

      <Collapse in={expanded} timeout="auto">
        <ProductTable
          categoryData={props.data}
          categoryId={props.id}
          ref={addActionRef}
        />
      </Collapse>
    </Card>
  );
}
