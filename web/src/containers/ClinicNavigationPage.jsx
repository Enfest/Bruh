//react import
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { sha256 } from "js-sha256";
//mui import
import { Typography, Box, Divider, TextField, Button } from "@mui/material";
import React from "react";
//component import
import { useTheme } from "@mui/material/styles";
import lodash from "lodash";
import useQuery from "./hooks/useQuery";
import { getQuestion, postQuestion } from "./hooks/useQuestions";
import Question from "../components/Question.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import HospitalCard from "../components/HospitalCard.jsx";

const hpData = [
    {
        id: "1",
        name: "name",
        clinic: "clinic",
        avatarURL: "https://via.placeholder.com/150",
        googleMapURL: "https://www.google.com/maps",
        clinicURL: "https://www.google.com",
        distance: "1km",
    },
];

const ClinicNavigationPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [submitted, setSubmitted] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [suggestionLoading, setSuggestionLoading] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const query = useQuery();
    const location = useLocation();
    const key = "123";

    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gap: 2,
            }}
            key={`${key}-wrapper`}
        >
            <Paper
                key={`${key}-caring-words-background`}
                elevation={1}
                sx={{
                    padding: "10px",
                    width: "90%",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: dialogLoading ? "center" : "space-between",
                    alignItems: dialogLoading ? "center" : "flex-start",
                    justifySelf: "center",
                }}
            >
                {!dialogLoading ? (
                    <>
                        <Typography variant="h5" component="div" key={`${key}-page-title`}>
                            title
                        </Typography>
                        <Typography variant="h3" component="div" key={`${key}-page-title`}>
                            title
                        </Typography>
                    </>
                ) : (
                    <CircularProgress />
                )}
                <Paper
                    key={`${key}-caring-words-background`}
                    elevation={0}
                    sx={{
                        width: "100%",
                        height: "50px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        justifySelf: "flex-start",
                    }}
                >
                    <Typography key={`${key}-page-description`} variant="h5" component="div">
                        description
                    </Typography>
                </Paper>
            </Paper>
            <Paper
                key={`${key}-question-background`}
                elevation={0}
                sx={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "90%",
                }}
            >
                {hpData.map((hp) => (
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
            </Paper>
            <div style={{ display: "flex", justifyContent: "center" }} key={`${key}-butt-wrapper`}>
                {!submitted ? (
                    <Button
                        key={`${key}-next-butt`}
                        variant="contained"
                        onClick={() => (window.location.href = "https://chatgpt.com/?model=auto")}
                        sx={{ ...theme.select.MenuProps.PaperProps.style, width: 300 }}
                    >
                        To Chat Bot
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
