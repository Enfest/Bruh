import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useWebsite } from "./containers/hooks/WebsiteContext.jsx";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Bar from "./components/Bar.jsx";
import Test from "./containers/Test.jsx";
import AddMap from "./containers/AddMap.jsx";
import MainPage from "./containers/MainPage.jsx";
import { Main, DrawerHeader } from "./components/bar_component/BarDrawer.jsx";
// import { Map } from "./containers/"
import Hos from "./containers/Hos.jsx";
import theme from "./theme.js";
import MapPage from "./containers/MapPage.jsx";

function App() {
  const [open, setOpen] = useState(false);
  const { iflog, isManager } = useWebsite();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box>
          {/* <Bar open={open} setOpen={setOpen}></Bar> */}
          {/* <Main open={open}> */}
          {/* <Box sx = {{ width: "100%"}} > */}
          {/* <DrawerHeader> */}
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/finddoctor" element={<MapPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/hos" element={<Hos />} />
          </Routes>
          {/* </DrawerHeader> */}
          {/* </Box> */}
          {/* </Main> */}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
