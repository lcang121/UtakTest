import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BookContextProvider from "./context/BookContext";
import BookList from "./components/BookList";
import NewBookForm from "./components/NewCategoryInput";
import Container from "@mui/material/Container";
import CategoryCard from "./components/CategoryCard";
import { Box, Button, Typography, Divider } from "@mui/material";
import NewCategoryInput from "./components/NewCategoryInput";
import emptyIcon from "./assets/empty state.png";
import Masonry from "@mui/lab/Masonry";
import fireDb from "./firebase";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fireDb.child("Categories").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  return (
    <div className="App">
      <BookContextProvider>
        <Container
          maxWidth="xl"
          style={{
            marginTop: 30,
            marginBottom: 30,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />
          <Divider variant="middle" />
          {Object.keys(data).length === 0 ? (
            <Box
              sx={{
                height: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // background: "red",
              }}
            >
              <Typography variant="h5">There's nothing here yet.</Typography>
              <Box sx={{ padding: "30px" }}>
                <img src={emptyIcon} width="150px" height="150px"></img>
              </Box>
              <Typography color="#757575">
                Start by creating a new category!
              </Typography>
              <NewCategoryInput />
            </Box>
          ) : (
            <Box sx={{ paddingTop: "20px" }}>
              <Masonry columns={1} spacing={1}>
                {Object.keys(data).map((id, i) => {
                  return (
                    <Box key={i}>
                      <CategoryCard data={data[id]} id={id} />
                    </Box>
                  );
                })}
              </Masonry>
            </Box>
          )}
        </Container>
        {/* <Navbar />
        <BookList />
        <NewBookForm /> */}
      </BookContextProvider>
    </div>
  );
}

export default App;