import MaterialTable, {
  MTableAction,
  MTableToolbar,
} from "@material-table/core";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const DETAIL_COLS = [
  {
    field: "varietyName",
    title: "Variety",
    validate: (row) =>
      (row.varietyName || "").length === 0 ? "Product must have a name" : true,
  },
  {
    field: "varietyPrice",
    title: "Price",
    type: "currency",
    currencySetting: {
      currencyCode: "php",
    },
    validate: (row) =>
      (row.varietyPrice || "").length === 0
        ? "This field can't be blank"
        : true,
  },
  {
    field: "varietyCost",
    title: "Cost",
    type: "currency",
    currencySetting: {
      currencyCode: "php",
    },
    validate: (row) =>
      (row.varietyCost || "").length === 0 ? "This field can't be blank" : true,
  },
  {
    field: "varietyStocks",
    title: "Stocks",
    type: "numeric",
    validate: (row) =>
      (row.varietyStocks || "").length === 0
        ? "This field can't be blank"
        : true,
  },
];

const NewVarietyDialog = ({
  openDialog,
  rowData,
  handleVarietyChange,
  handleCloseDialog,
}) => {
  const addButtonRef = useRef();
  const [data, setData] = useState([]);

  const handleClose = () => {
    setData([]);
    handleCloseDialog();
  };

  const handleSubmit = () => {
    handleVarietyChange(data, rowData.id);
    handleClose();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <MaterialTable
          components={{
            Toolbar: (props) => {
              const propsCopy = { ...props };
              propsCopy.showTitle = false;
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "Row",
                    alignItems: "Center",
                  }}
                >
                  <Typography variant="h5">Add Product Varieties</Typography>
                  <Box sx={{ width: "0px", background: "red" }}>
                    <MTableToolbar {...propsCopy} />
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => addButtonRef.current.click()}
                  >
                    Add Variety
                  </Button>
                </div>
              );
            },

            Action: (props) => {
              if (
                typeof props.action === typeof Function ||
                props.action.tooltip !== "Add"
              ) {
                return <MTableAction {...props} />;
              } else {
                return (
                  <div ref={addButtonRef} onClick={props.action.onClick} />
                );
              }
            },
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
          options={{
            paging: false,
            search: false,
            showTitle: true,
            actionsColumnIndex: -1,
          }}
          data={data}
          columns={DETAIL_COLS}
          editable={{
            onRowAdd: (newData) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  newData.id = uuidv4();
                  setData([...data, newData]);
                  resolve();
                }, 500);
              });
            },
            onRowUpdate: (newData, oldData) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const target = dataUpdate.find(
                    (el) => el.id === oldData.tableData.id
                  );
                  const index = dataUpdate.indexOf(target);
                  dataUpdate[index] = newData;

                  setData([...dataUpdate]);
                  resolve();
                }, 500);
              });
            },
            onRowDelete: (oldData) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const target = dataDelete.find(
                    (el) => el.id === oldData.tableData.id
                  );
                  const index = dataDelete.indexOf(target);
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                }, 500);
              });
            },
          }}
        />
      </DialogContent>
      <DialogActions style={{ paddingRight: "25px" }}>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => handleSubmit()} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewVarietyDialog;
