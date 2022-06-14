import MaterialTable from "@material-table/core";
import { Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { updateTable, createProduct } from "../Service/FirebaseServices";

const SELECTION_COLS = [
  { field: "productName", title: "Product" },
  { field: "productPrice", title: "Price" },
  { field: "productCost", title: "Cost" },
  { field: "productStocks", title: "Stocks" },
];
var EDITABLE_DATA = {
  id: 2,
  productName: "Joe",
  productPrice: "12",
  productCost: "21",
  productStocks: "112",
};

var dummyData = [
  {
    id: 2,
    productName: "Joe",
    productPrice: "12",
    productCost: "21",
    productStocks: "112",
  },
];

export default function ProductTable({ categoryData, categoryId }) {
  const [updatedData, setUpdatedData] = useState(categoryData);
  useEffect(() => {
    setUpdatedData(categoryData);
  }, []);

  var productsArray = [];
  Object.keys(updatedData.products).map((id, i) => {
    return productsArray.push(updatedData.products[id]);
  });
  console.log(productsArray);

  const [data, setData] = useState(productsArray);
  console.log(data);

  //   useEffect(() => {
  //     createProduct("qweq", props.id);
  //   }, []);

  const handleRowAdd = (newData) => {
    setData(newData);
    console.log(newData);
    createProduct(newData, categoryId);
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
      <Button onClick={() => handleRowAdd(EDITABLE_DATA)}>asdadasd</Button>
      <MaterialTable
        data={data}
        columns={SELECTION_COLS}
        editable={{
          onBulkUpdate: (changes) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                let copyData = [...data];
                setData(getNewDataBulkEdit(changes, copyData));
                resolve();
              }, 1000);
            });
          },
          onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
          onRowUpdateCancelled: (rowData) =>
            console.log("Row editing cancelled"),
          onRowAdd: (newData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.id = "uuid-" + Math.random() * 10000000;
                //   const myData = [...data, newData];
                handleRowAdd(newData);
                //   console.log(myData);
                resolve();
              }, 100);
            });
          },
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                // In dataUpdate, find target
                const target = dataUpdate.find(
                  (el) => el.id === oldData.tableData.id
                );
                const index = dataUpdate.indexOf(target);
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000);
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
