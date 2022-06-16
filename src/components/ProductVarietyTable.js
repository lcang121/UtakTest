import MaterialTable, {
  MTableAction,
  MTableToolbar,
} from "@material-table/core";
import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import fireDb from "../firebase";

const DETAIL_COLS = [
  {
    field: "varietyName",
    title: "Variety",
    validate: (row) =>
      (row.varietyName || "").length === 0 ? "Variety must have a name" : true,
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

const ProductVarietyTable = forwardRef(
  ({ rowData, handleVarietyChange, categoryId }, ref) => {
    const newRowData = rowData.rowData;

    const [data, setData] = useState([]);
    const [refreshTable, setRefreshTable] = useState();
    const addButtonRef = useRef();

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

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
    <button onClick={forceUpdate}>Force re-render</button>;

    useEffect(() => {
      // if (typeof rowData.rowData.variety != "undefined") {
      fireDb
        .child(`Categories/${categoryId}/products/`)
        .on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            var updatedRowData = [...snapshot.val()];
            const target = updatedRowData.find((el) => el.id === newRowData.id);
            setData(target.variety);
            return;
          } else {
            setData([]);
          }
        });
      return () => {
        setData([]);
      };
      // }
    }, []);

    return (
      <>
        {typeof rowData.rowData.variety != "undefined" ? (
          <Box
            style={{
              padding: "10px 10px 20px 50px",
              backgroundColor: "#E4E7EC",
            }}
          >
            <MaterialTable
              style={{
                backgroundColor: "#E4E7EC",
              }}
              components={{
                // Toolbar: (props) => (
                //   <div
                //     style={{
                //       height: "0px",
                //     }}
                //   >
                //     <MTableToolbar {...props} />
                //   </div>
                // ),
                // Action: (props) => {
                //   if (
                //     typeof props.action === typeof Function ||
                //     props.action.tooltip !== "Add"
                //   ) {
                //     return <MTableAction {...props} />;
                //   } else {
                //     return <div ref={ref} onClick={props.action.onClick} />;
                //   }
                // },
                Container: (props) => <Paper {...props} elevation={0} />,
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
                      <Typography variant="h5"></Typography>
                      <Box sx={{ width: "0px", background: "red" }}>
                        <MTableToolbar {...propsCopy} />
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => addButtonRef.current.click()}
                      >
                        Add More
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
              }}
              options={{
                paging: false,
                search: false,
                showTitle: false,
                actionsColumnIndex: -1,
                headerStyle: { backgroundColor: "#E4E7EC" },
              }}
              data={data}
              columns={DETAIL_COLS}
              editable={{
                onRowAddCancelled: (rowData) =>
                  console.log("Row adding cancelled"),
                onRowUpdateCancelled: (rowData) =>
                  console.log("Row editing cancelled"),
                onRowAdd: (newData) => {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      newData.id = uuidv4();
                      setData([...data, newData]);
                      handleVarietyChange([...data, newData], newRowData.id);
                      setRefreshTable(Math.random());
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
                      handleVarietyChange([...dataUpdate], newRowData.id);
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
                      handleVarietyChange([...dataDelete], newRowData.id);
                      resolve();
                    }, 100);
                  });
                },
              }}
            />
          </Box>
        ) : null}
      </>
    );
  }
);
export default ProductVarietyTable;
