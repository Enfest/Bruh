//react import
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { sha256 } from "js-sha256";
//mui import
import { Typography, Box, Divider, TextField, Button, Grid, Avatar } from "@mui/material";
import React from "react";
//component import
import { useTheme } from "@mui/material/styles";
import useQuery from "./hooks/useQuery";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import HospitalCard from "../components/HospitalCard.jsx";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { getResult } from "./hooks/useQuestions.js";

const hpData = [
    {
        id: "1",
        name: "name",
        clinic: "clinic",
        avatarURL: "../assets/robot.jpg",
        googleMapURL: "https://www.google.com/maps",
        clinicURL: "https://www.google.com",
        distance: "1km",
    },
];

const ClinicNavigationPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [submitted, setSubmitted] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [HPdata, setHPData] = useState(hpData);
    const [suggestionLoading, setSuggestionLoading] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const key = "ClinicNavigationPage";
    const handleGet = async (hash) => {
        try {
            const data = await handleFetch(() => getResult(hash));
            const { hash, questions, title, description } = data;
            setHPData(data);
            setDialogLoading(false);
            setError(null);
        } catch (error) {
            setError(error.message);
            setDialogLoading(false);
        }
    };
    const handleFetch = async (callBack) => {
        const response = await callBack();
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(JSON.stringify(data));
        setDialogLoading(false);
        return data;
    };
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const hash = searchParams.get("hash");
        setDialogLoading(true);
        handleGet(hash);
    }, [location.hash]);
    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gap: 2,
            }}
            key={`${key}-wrapper`}
        >
            <Grid container sx={{ width: "100%" }} spacing={2}>
                <Grid item>
                    <Avatar alt="robot" src="../assets/robot.jpg" />
                </Grid>
                <Grid item alignContent="center">
                    <Typography variant="body">檢測結果</Typography>
                </Grid>
            </Grid>
            {!dialogLoading ? (
                <Grid container sx={{ width: "100%" }}>
                    <Typography variant="body">description</Typography>
                </Grid>
            ) : (
                <CircularProgress />
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {HPdata.map((hp) => (
                    <HospitalCard
                        key={`${key}-hp-${hp.id}`}
                        id={hp.id}
                        name={hp.name}
                        clinic={hp.clinic}
                        avatarURL={hp.avatarURL}
                        googleMapURL={hp.googleMapURL}
                        clinicURL={hp.clinicURL}
                        distance={hp.distance}
                    />
                ))}
            </Box>
            <div style={{ display: "flex", justifyContent: "center" }} key={`${key}-butt-wrapper`}>
                {!dialogLoading ? (
                    <Button
                        key={`${key}-next-butt`}
                        variant="contained"
                        onClick={() => navigate("/classification")}
                        sx={{ width: "100%" }}
                        startIcon={<RestartAltIcon />}
                    >
                        再測一次
                    </Button>
                ) : (
                    <Button
                        key={`${key}-submitted-butt`}
                        variant="secondary"
                        sx={{ ...theme.select.MenuProps.PaperProps.style, width: 300 }}
                    >
                        <CircularProgress />
                    </Button>
                )}
            </div>
        </Box>
    );
};

export default ClinicNavigationPage;
