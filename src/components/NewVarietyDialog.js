import MaterialTable, {
  MTableAction,
  MTableToolbar,
} from "@material-table/core";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import fireDb from "../firebase";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  },
  {
    field: "varietyCost",
    title: "Cost",
    type: "currency",
    currencySetting: {
      currencyCode: "php",
    },
  },
  {
    field: "varietyStocks",
    title: "Stocks",
    type: "numeric",
  },
];

const NewVarietyDialog = ({
  rowData,
  handleVarietyChange,
  handleOpenDialog,
}) => {
  console.log(rowData);
  const addButtonRef = useRef();
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveData = () => {
    console.log(data);
  };

  const handleSubmit = (data, id) => {
    handleVarietyChange(data, id);
    setData([]);
    setOpen(false);
  };
  // useEffect(() => {
  //   if (typeof rowData.rowData.variety != "undefined") {
  //     console.log(typeof rowData.rowData.variety);
  //     var varietyArray = [];
  //     // console.log(Object.keys(rowData.rowData.products[0].).length);
  //     Object.keys(rowData.rowData.variety).map((id, i) => {
  //       return varietyArray.push(rowData.rowData.variety[id]);
  //     });
  //     setData(varietyArray);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof rowData.rowData.variety != "undefined") {
  //     fireDb
  //       .child(`Categories/${categoryId}/products/`)
  //       .on("value", (snapshot) => {
  //         if (snapshot.val() !== null) {
  //           var updatedRowData = [...snapshot.val()];
  //           const target = updatedRowData.find((el) => el.id === rowData.id);
  //           setData(target.variety);
  //         } else {
  //           setData([]);
  //         }
  //       });
  //     return () => {
  //       setData([]);
  //     };
  //   }
  // }, []);

  return (
    <Dialog
      open={open}
      onClose={() => handleSubmit([], rowData.id)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <MaterialTable
          // actions={[
          //   {
          //     icon: () => (

          //     ),
          //     tooltip: "Add new variety",
          //     position: "toolbar",
          //   },
          // ]}
          // title="Add Product Variety"
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
            // headerStyle: { backgroundColor: "royalblue", color: "white" },
          }}
          data={data}
          columns={DETAIL_COLS}
          editable={{
            onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
            onRowUpdateCancelled: (rowData) =>
              console.log("Row editing cancelled"),
            onRowAdd: (newData) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  newData.id = uuidv4();
                  setData([...data, newData]);
                  resolve();
                }, 100);
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
                }, 100);
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
                }, 100);
              });
            },
          }}
        />
      </DialogContent>
      <DialogActions style={{ paddingRight: "25px" }}>
        <Button onClick={() => handleSubmit([], rowData.id)}>Cancel</Button>
        <Button
          onClick={() => handleSubmit(data, rowData.id)}
          autoFocus
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewVarietyDialog;
