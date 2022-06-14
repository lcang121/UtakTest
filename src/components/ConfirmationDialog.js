import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const useRemoveCategory = () => {
  const [open, setOpen] = useState(false);
  const MyRemoveCategory = ({ onAgree, categoryName }) => {
    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm {categoryName} Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this category? All products inside
            it will be deleted as well.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            fullWidth
            variant="outlined"
            disableElevation
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            fullWidth
            variant="contained"
            disableElevation
            onClick={() => {
              onAgree();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return { open, setOpen, MyRemoveCategory };
};
