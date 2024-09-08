import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useWebsite } from "./containers/hooks/WebsiteContext.jsx";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import AddMap from "./containers/AddMap.jsx";
import MainPage from "./containers/MainPage.jsx";
import ChartPage from "./containers/ChartPage.jsx";
import ResultPage from "./containers/ResultPage.jsx";

import ClinicPage from "./containers/ClinicPage.jsx";
import Hos from "./containers/Hos.jsx";
import theme from "./theme.jsx";
import ClinicNavigationPage from "./containers/ClinicNavigationPage.jsx";
import ScrollToTop from "./components/scrollToTop.jsx";
import MapPage from "./containers/MapPage.jsx";

function App() {
  const [open, setOpen] = useState(false);
  const { iflog, isManager } = useWebsite();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Box>
          {/* <Bar open={open} setOpen={setOpen}></Bar> */}
          {/* <Main open={open}> */}
          {/* <Box sx = {{ width: "100%"}} > */}
          {/* <DrawerHeader> */}
          <Routes>
            <Route path="/statistic" element={<ChartPage />} />
            <Route path="/finddoctor" element={<MapPage />} />
            <Route path="/classification" element={<ClinicPage />} />
            <Route path="/classification/result" element={<ResultPage />} />
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
