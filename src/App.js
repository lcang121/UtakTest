import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ContextProvider from "./context/ThemeWrapper";
import Container from "@mui/material/Container";
import CategoryCard from "./components/CategoryCard";
import { Box, Typography, Divider } from "@mui/material";
import emptyIcon from "./assets/empty state.png";
import fireDb from "./firebase";
import useMediaQuery from "@mui/material/useMediaQuery";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 2,
  1250: 1,
};

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
      <ContextProvider>
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
              }}
            >
              <Typography variant="h5">There's nothing here yet.</Typography>
              <Box sx={{ padding: "30px" }}>
                <img
                  src={emptyIcon}
                  alt="empty state"
                  width="150px"
                  height="150px"
                ></img>
              </Box>
              <Typography color="#757575">
                Start by creating a new category!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ paddingTop: "20px" }}>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
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
      </ContextProvider>
    </div>
  );
}

export default App;
