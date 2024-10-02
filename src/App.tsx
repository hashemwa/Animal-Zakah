import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CamelsZakah } from "./components/Camels";
import { CowsZakah } from "./components/Cows";
import { SheepZakah } from "./components/Sheep";
import { Nav } from "./components/Nav";
import { Box, Card, Typography } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            width: { xs: "100vw", sm: "500px" },
            height: { xs: "100vh", sm: "700px" },
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: { xs: 0, sm: 3 },
            borderRadius: { xs: 0, sm: "10px" },
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "700",
              backgroundColor: "#006766",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
              color: "white",
            }}
          >
            Animal Zakah
          </Typography>
          <Nav />
          <Routes>
            <Route path="/" element={<CamelsZakah />} />
            <Route path="/cows" element={<CowsZakah />} />
            <Route path="/sheep" element={<SheepZakah />} />
          </Routes>
        </Card>
      </Box>
    </BrowserRouter>
  );
}

export default App;
