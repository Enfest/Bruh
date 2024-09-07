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
import ChartPage from "./containers/ChartPage.jsx";
import { Main, DrawerHeader } from "./components/bar_component/BarDrawer.jsx";
// import { Map } from "./containers/"

import ClinicPage from "./containers/ClinicPage.jsx";

import theme from "./theme.jsx";
import FindPage from "./containers/PersonalPage.jsx";
import QuestionPage from "./containers/QuestionPage.jsx";
import GetIn from "./containers/GetIn.jsx";
import { question } from "./informations/question.js";
import ClinicNavigationPage from "./containers/ClinicNavigationPage.jsx";
import ScrollToTop from "./components/scrollToTop.jsx";
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
                        <Route path="/finddoctor" element={<AddMap />} />
                        <Route path="/classification" element={<ClinicPage />} />
                        <Route path="/clinicNavigation" element={<ClinicNavigationPage />} />
                        <Route path="/" element={<MainPage />} />
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
