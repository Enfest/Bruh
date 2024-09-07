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
import MainPage from "./containers/MainPage.jsx";
import Login from "./containers/Login.jsx";
import ManagerPage from "./containers/ManagerPage.jsx";
import { Main, DrawerHeader } from "./components/bar_component/BarDrawer.jsx";
import CheckoutPage from "./containers/CheckoutPage.jsx";
import Register from "./containers/RegisterPage.jsx";

import theme from "./theme.js";
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
                    <Main open={open}>
                        {/* <Box sx = {{ width: "100%"}} > */}
                        {/* <DrawerHeader> */}
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/login" element={<Login />}></Route>
                            <Route
                                path="/manager"
                                element={isManager ? <ManagerPage /> : <Login />}
                            />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/find" element={<FindPage />} />
                            <Route path="/register" element={<Register />}></Route>
                            <Route path="/getin" element={<GetIn />}></Route>
                            <Route
                                path="/classification"
                                element={
                                    <QuestionPage
                                        title={"This is a Title"}
                                        description={"This is a description"}
                                        questions={question}
                                    />
                                }
                                exact
                            ></Route>
                            <Route
                                path="/clinicNavigation"
                                element={<ClinicNavigationPage />}
                                exact
                            ></Route>
                        </Routes>
                        {/* </DrawerHeader> */}
                        {/* </Box> */}
                    </Main>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
