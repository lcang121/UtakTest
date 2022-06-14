import MaterialTable from "@material-table/core";
import { Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  updateTable,
  createProduct,
  editProduct,
} from "../Service/FirebaseServices";
import { v4 as uuidv4 } from "uuid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const SELECTION_COLS = [
  { field: "productName", title: "Product" },
  { field: "productPrice", title: "Price" },
  { field: "productCost", title: "Cost" },
  { field: "productStocks", title: "Stocks" },
];
var EDITABLE_DATA = [
  {
    id: "2",
    productName: "Joe",
    productPrice: "12",
    productCost: "21",
    productStocks: "112",
  },
];

export default function ProductTable({ categoryData, categoryId }) {
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

  const handleRowAdd = (newData) => {
    setData([newData]);
    createProduct(newData, categoryId);
  };

  const handleRowEdit = (newData, productId) => {
    setData([newData]);
    editProduct(newData, categoryId, productId);
  };

  // Helper function
  function getNewDataBulkEdit(changes, copyData) {
    // key matches the column data id
    const keys = Object.keys(changes);
    for (let i = 0; i < keys.length; i++) {
      if (changes[keys[i]] && changes[keys[i]].newData) {
        // Find the data item with the same key in copyData[]
        let targetData = copyData.find((el) => el.id === keys[i]);
        if (targetData) {
          let newTargetDataIndex = copyData.indexOf(targetData);
          copyData[newTargetDataIndex] = changes[keys[i]].newData;
        }
      }
    }
    return copyData;
  }

  return (
    <>
      <Button
        onClick={() => {
          console.log(EDITABLE_DATA);
          handleRowAdd(EDITABLE_DATA);
        }}
      >
        asdadasd
      </Button>
      <MaterialTable
        options={{
          paging: false,
          search: false,
          showTitle: false,
          toolbarButtonAlignment: "left",
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
              //   newData.id = uuidv4();
              //   const myData = [...data, newData];
              console.log(newData);
              handleRowAdd(newData);
              //   console.log(myData);
              resolve();
            });
          },
          onRowUpdate: (newData, oldData) => {
            console.log(data);
            return new Promise((resolve, reject) => {
              //   setTimeout(() => {
              // const dataUpdate = [...data];
              // // In dataUpdate, find target
              // const target = dataUpdate.find(
              //   (el) => el.id === oldData.tableData.id
              // );
              // const index = dataUpdate.indexOf(target);
              // dataUpdate[index] = newData;
              // setData([...dataUpdate]);
              handleRowEdit(newData, data.id);
              resolve();
              //   }, 1000);
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
              }, 1000);
            });
          },
        }}
      />
    </>
  );
}
