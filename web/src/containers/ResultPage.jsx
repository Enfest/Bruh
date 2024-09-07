import Box from "@mui/material/Box";
import { CardMedia, CardContent, Card, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import { Main } from "../components/bar_component/BarDrawer.jsx";
import MainBar from "../components/MainBar.jsx";
import { useNavigate } from "react-router-dom";
import ResultBar from "../components/ResultBar.jsx";
import ClinicNavigationPage from "./ClinicNavigationPage.jsx";

const ResultPage = () => {
    const [section, setSection] = useState("");
    const [label, setLabel] = useState(1);

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: "100%",
                alignContent: "space-around",
            }}
        >
            <ResultBar></ResultBar>
            <Main>
            <ClinicNavigationPage />  
            </Main>
            {/* <Map setSection = {setSection} section = {section} setId = {setId}/> */}
        </Box>
    );
};

export default ResultPage;
