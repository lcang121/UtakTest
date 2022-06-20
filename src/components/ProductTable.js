import MaterialTable, {
  MTableAction,
  MTableToolbar,
} from "@material-table/core";
import { Box, Paper } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { updateProduct } from "../Service/FirebaseServices";
import { v4 as uuidv4 } from "uuid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { forwardRef } from "react";
import ProductVarietyTable from "./ProductVarietyTable";
import NewVarietyDialog from "./NewVarietyDialog";
import fireDb from "../firebase";

const ProductTable = forwardRef(({ categoryData, categoryId }, ref) => {
  const tableRef = useRef(0);
  const addActionRefChild = useRef();
  const [data, setData] = useState([]);
  const [currentRowData, setCurrentRowData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (Object.keys(categoryData).length > 1) {
      fireDb
        .child(`Categories/${categoryId}/products/`)
        .on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            var updatedRowData = [...snapshot.val()];
            setData(updatedRowData);
          } else {
            setData([]);
          }
        });
    }
  }, [categoryData, categoryId]);

  const handleVarietyChange = (varietyData, rowId) => {
    const dataUpdate = [...data];
    const target = dataUpdate.find((el) => el.id === rowId);
    const index = dataUpdate.indexOf(target);
    dataUpdate[index].variety = varietyData;
    updateProduct([...dataUpdate], categoryId);
    setData([...dataUpdate]);
    setCurrentRowData([]);
    handleCloseDialog();
  };

  const handleSetCurrentRowData = (rowData) => {
    setCurrentRowData(rowData);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const checkIfUndefined = (data) => {
    if (typeof data === "undefined") return true;
    else return false;
  };

  return (
    <Box style={{ padding: "20px" }}>
      <MaterialTable
        tableRef={tableRef}
        actions={[
          (rowData) =>
            typeof rowData.variety != "undefined"
              ? null
              : {
                  icon: () => <AddCircleIcon />,
                  tooltip: "Add Variety",
                  onClick: (event, rowData) => {
                    if (checkIfUndefined(rowData.variety) === false) {
                      addActionRefChild.current.click();
                    } else {
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          handleSetCurrentRowData(rowData);
                          resolve(setOpenDialog(true));
                        }, 100);
                      });
                    }
                  },
                },
        ]}
        components={{
          Toolbar: (props) => (
            <div
              style={{
                height: "0px",
              }}
            >
              <MTableToolbar {...props} />
            </div>
          ),
          Action: (props) => {
            if (
              typeof props.action === typeof Function ||
              props.action.tooltip !== "Add"
            ) {
              return <MTableAction {...props} />;
            } else {
              return <div ref={ref} onClick={props.action.onClick} />;
            }
          },
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        options={{
          actionsCellStyle: {
            display: "flex",
            height: "60px",
            justifyContent: "center",
          },
          paging: false,
          search: false,
          showTitle: false,
          toolbarButtonAlignment: "left",
          actionsColumnIndex: -1,
          rowStyle: {
            backgroundColor: "#D0D5DD",
            borderTop: "10px solid white",
          },
        }}
        data={data}
        columns={[
          {
            field: "productName",
            title: "Product",
            validate: (row) =>
              (row.productName || "").length === 0
                ? "Product must have a name"
                : true,
          },
          {
            field: "productPrice",
            title: "Price",
            type: "currency",
            currencySetting: {
              currencyCode: "php",
            },
            cellStyle: (data, rowData) => {
              if (checkIfUndefined(rowData) === false) {
                if (checkIfUndefined(rowData.variety) === false) {
                  return { color: "#D0D5DD" };
                } else {
                  return { color: "black" };
                }
              }
            },
          },
          {
            field: "productCost",
            title: "Cost",
            type: "currency",
            currencySetting: {
              currencyCode: "php",
            },
            cellStyle: (data, rowData) => {
              if (checkIfUndefined(rowData) === false) {
                if (checkIfUndefined(rowData.variety) === false) {
                  return { color: "#D0D5DD" };
                } else {
                  return { color: "black" };
                }
              }
            },
          },
          {
            field: "productStocks",
            title: "Stocks",
            type: "numeric",
            cellStyle: (data, rowData) => {
              if (checkIfUndefined(rowData) === false) {
                if (checkIfUndefined(rowData.variety) === false) {
                  return { color: "#D0D5DD" };
                } else {
                  return { color: "black" };
                }
              }
            },
          },
        ]}
        editable={{
          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.id = uuidv4();
                setData([...data, newData]);
                updateProduct([...data, newData], categoryId);
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
                updateProduct([...dataUpdate], categoryId);
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
                updateProduct([...dataDelete], categoryId);
                resolve();
              }, 100);
            });
          },
        }}
        detailPanel={[
          (rowData) => ({
            icon:
              checkIfUndefined(rowData.variety) === false ? null : () => null,
            tooltip: "Show varieties",
            disabled:
              checkIfUndefined(rowData.variety) === false ? false : true,
            render: (rowData) => {
              return (
                <ProductVarietyTable
                  rowData={rowData}
                  handleVarietyChange={handleVarietyChange}
                  categoryId={categoryId}
                  ref={addActionRefChild}
                />
              );
            },
          }),
        ]}
      />
      <NewVarietyDialog
        openDialog={openDialog}
        closeDialog={handleCloseDialog}
        rowData={currentRowData}
        handleVarietyChange={handleVarietyChange}
        handleCloseDialog={handleCloseDialog}
      />
    </Box>
  );
});

export default ProductTable;
