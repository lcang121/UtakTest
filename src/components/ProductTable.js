import MaterialTable, {
  MTableAction,
  MTableToolbar,
} from "@material-table/core";
import { Typography, Button, Box, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { updateProduct } from "../Service/FirebaseServices";
import { v4 as uuidv4 } from "uuid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { forwardRef } from "react";

const SELECTION_COLS = [
  {
    field: "productName",
    title: "Product",
    validate: (row) =>
      (row.productName || "").length < 3
        ? "Product must have at least 3 chars"
        : true,
  },
  {
    field: "productPrice",
    title: "Price",
    type: "currency",
  },
  { field: "productCost", title: "Cost", type: "currency" },
  { field: "productStocks", title: "Stocks", type: "numeric" },
];

const ProductTable = forwardRef(({ categoryData, categoryId }, ref) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Object.keys(categoryData).length > 1) {
      var productsArray = [];
      console.log(Object.keys(categoryData.products).length);
      Object.keys(categoryData.products).map((id, i) => {
        return productsArray.push(categoryData.products[id]);
      });
      setData(productsArray);
    }
  }, [categoryData]);

  useEffect(() => {
    updateProduct(data, categoryId);
  }, [data]);

  return (
    <Box style={{ padding: "20px" }}>
      <MaterialTable
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
          paging: false,
          search: false,
          showTitle: false,
          //   toolbar: false,
          toolbarButtonAlignment: "left",
          actionsColumnIndex: -1,
        }}
        icons={{
          Add: () => <AddCircleIcon color="primary" fontSize="large" />,
        }}
        data={data}
        columns={SELECTION_COLS}
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
            console.log(data);
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
    </Box>
  );
});

export default ProductTable;
