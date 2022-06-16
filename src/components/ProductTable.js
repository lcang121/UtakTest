import MaterialTable, {
  MTableAction,
  MTableToolbar,
} from "@material-table/core";
import { Typography, Button, Box, Paper } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { updateProduct, updateProductChild } from "../Service/FirebaseServices";
import { v4 as uuidv4 } from "uuid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { forwardRef } from "react";
import ProductVarietyTable from "./ProductVarietyTable";
import NewVarietyDialog from "./NewVarietyDialog";
import fireDb from "../firebase";

const ProductTable = forwardRef(({ categoryData, categoryId }, ref) => {
  const SELECTION_COLS = [
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
    },
    {
      field: "productCost",
      title: "Cost",
      type: "currency",
      currencySetting: {
        currencyCode: "php",
      },
    },
    { field: "productStocks", title: "Stocks", type: "numeric" },
  ];

  const colscols = (rowData) => {
    return [
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
        hidden: typeof rowData.variety != "undefined" ? true : false,
        currencySetting: {
          currencyCode: "php",
        },
      },
      {
        field: "productCost",
        title: "Cost",
        type: "currency",
        hidden: typeof rowData.variety != "undefined" ? true : false,
        currencySetting: {
          currencyCode: "php",
        },
      },
      {
        field: "productStocks",
        title: "Stocks",
        type: "numeric",
        hidden: typeof rowData.variety != "undefined" ? true : false,
      },
    ];
  };

  const tableRef = useRef(0);
  const addActionRefChild = useRef();
  const [data, setData] = useState([]);
  const [currentRowData, setCurrentRowData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  //   useEffect(() => {
  //     if (Object.keys(categoryData).length > 1) {
  //       var productsArray = [];
  //       //   console.log(Object.keys(categoryData.products).length);
  //       Object.keys(categoryData.products).map((id, i) => {
  //         return productsArray.push(categoryData.products[id]);
  //       });
  //       setData(productsArray);
  //       console.log(productsArray);
  //     }
  //   }, [categoryData]);

  useEffect(() => {
    if (Object.keys(categoryData).length > 1) {
      fireDb
        .child(`Categories/${categoryId}/products/`)
        .on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            var updatedRowData = [...snapshot.val()];
            // const target = updatedRowData.find((el) => el.id === newRowData.id);
            setData(updatedRowData);
          } else {
            setData([]);
          }
        });
    }
  }, [categoryData]);

  //   useEffect(() => {
  //     if (typeof data.variety != "undefined") {
  //       fireDb
  //         .child(`Categories/${categoryId}/products/`)
  //         .on("value", (snapshot) => {
  //           if (snapshot.val() !== null) {
  //             var updatedRowData = [...snapshot.val()];
  //             const target = updatedRowData.find((el) => el.id === data.id);
  //             // setData(target.variety);
  //             return;
  //           } else {
  //             setData([]);
  //           }
  //         });
  //       return () => {
  //         setData([]);
  //       };
  //     }
  //   }, [categoryData]);

  // return () => {
  //   setData([]);
  // };
  //   }
  // }, []);

  //   useEffect(() => {
  //     updateProduct(data, categoryId);
  //   }, [data]);

  const handleVarietyChange = (varietyData, rowId) => {
    const dataUpdate = [...data];
    const target = dataUpdate.find((el) => el.id === rowId);
    const index = dataUpdate.indexOf(target);
    dataUpdate[index].variety = varietyData;
    updateProduct([...dataUpdate], categoryId);
    setData([...dataUpdate]);
    setOpenDialog(false);
    setCurrentRowData([]);
  };

  const handleAddNewVariety = (varietyData, rowId) => {
    const dataUpdate = [...data];
    const target = dataUpdate.find((el) => el.id === rowId);
    const index = dataUpdate.indexOf(target);
    dataUpdate[index].variety = varietyData;
    updateProduct([...dataUpdate], categoryId);
    setData([...dataUpdate]);
    setOpenDialog(false);
    setCurrentRowData([]);
    window.location.reload();
  };

  const handleOpenDialog = () => {};

  const handleSetCurrentRowData = (rowData) => {
    setCurrentRowData(rowData);
  };

  return (
    <Box style={{ padding: "20px" }}>
      <MaterialTable
        tableRef={tableRef}
        actions={[
          (rowData) =>
            typeof rowData.variety != "undefined"
              ? console.log(data)
              : {
                  icon: () => <AddCircleIcon />,
                  tooltip: "Add Variety",
                  onClick: (event, rowData) => {
                    {
                      console.log(data);
                      typeof rowData.variety != "undefined"
                        ? addActionRefChild.current.click() // check if variety obj exists
                        : handleSetCurrentRowData(rowData);
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
              if (typeof rowData != "undefined") {
                if (typeof rowData.variety != "undefined") {
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
              if (typeof rowData != "undefined") {
                if (typeof rowData.variety != "undefined") {
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
              if (typeof rowData != "undefined") {
                if (typeof rowData.variety != "undefined") {
                  return { color: "#D0D5DD" };
                } else {
                  return { color: "black" };
                }
              }
            },
          },
        ]}
        //   detailPanel={[
        //     (rowData) => ({
        //       // typeof rowData.variety != "undefined"?

        //       icon: typeof rowData.variety != "undefined" ? null : () => null,
        //       // openIcon: () => null,
        //       disabled: typeof rowData.variety != "undefined" ? null : () => null,
        //       render: (rowData) => {
        //         // rowData is now updated, so changes took place
        //         return (
        //           <ProductVarietyTable
        //             rowData={rowData}
        //             handleVarietyChange={handleVarietyChange}
        //             categoryId={categoryId}
        //             ref={addActionRefChild}
        //           />
        //         );
        //       },
        //     }),
        //   ]}

        editable={{
          onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
          onRowUpdateCancelled: (rowData) =>
            console.log("Row editing cancelled"),
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
            console.log(newData);
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
        // detailPanel={(rowData) => {
        //   disabled: true;
        //   console.log(rowData);
        //   return (
        //
        //   );
        // }}

        // detailPanel={[
        //   {

        //     disabled: false,
        //     defaultExpanded: true,
        //     render: (rowData) => {
        //       //   setCurrentRowData(rowData);
        //       return (
        //         <ProductVarietyTable
        //           rowData={rowData}
        //           handleVarietyChange={handleVarietyChange}
        //           categoryId={categoryId}
        //           ref={addActionRefChild}
        //         />
        //       );
        //     },
        //   },
        // ]}
        // onRowClick={(event, rowData, togglePanel) => {
        //   togglePanel();
        //   console.log("asdasdasd");
        // }}

        detailPanel={[
          (rowData) => ({
            // typeof rowData.variety != "undefined"?

            icon: typeof rowData.variety != "undefined" ? null : () => null,
            // openIcon: () => null,
            disabled: typeof rowData.variety != "undefined" ? null : () => null,
            render: (rowData) => {
              // rowData is now updated, so changes took place
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
      {/* <NewVarietyDialog /> */}
      {currentRowData.length !== 0 ? (
        <NewVarietyDialog
          rowData={currentRowData}
          handleVarietyChange={handleVarietyChange}
          handleAddNewVariety={handleAddNewVariety}
          categoryId={categoryId}
          handleOpenDialog={handleOpenDialog}
        />
      ) : null}
    </Box>
  );
});

export default ProductTable;
