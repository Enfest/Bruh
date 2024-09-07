import Box from "@mui/material/Box";
import {
    Grid,
    Card,
    Typography,
    Tab,
    Button,
    Icon,
    BottomNavigation,
    BottomNavigationAction,
    Avatar,
} from "@mui/material";
import React, { useState } from "react";

import { Main } from "../components/bar_component/BarDrawer.jsx";
import ClinicBar from "../components/ClinicBar.jsx";
import QuestionPage from "./QuestionPage.jsx";
const ClinicPage = () => {
    const [section, setSection] = useState("");
    const [label, setLabel] = useState(1);

    return (
        <Box
            sx={{
                width: "100%",
                alignContent: "space-around",
            }}
        >
            <ClinicBar></ClinicBar>
            <Main>
                <QuestionPage />
            </Main>
            {/* <Map setSection = {setSection} section = {section} setId = {setId}/> */}
        </Box>
    );
};

export default ClinicPage;
