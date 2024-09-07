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

const ClinicNavigationPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [submitted, setSubmitted] = useState(false);
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
            <Typography variant="h5" component="div" key={`${key}-page-title`}>
                title
            </Typography>
            <Typography
                key={`${key}-page-description`}
                variant="subtitle2"
                component="div"
                color="text.secondary"
            >
                description
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }} key={`${key}-butt-wrapper`}>
                {!submitted ? (
                    <Button
                        key={`${key}-next-butt`}
                        variant="contained"
                        onClick={() =>
                            (window.location.href =
                                "https://webreg.tpech.gov.tw/regonline1_1_2.aspx?chaid=&tab=&deptcode=0202&deptname=%E4%B8%80%E8%88%AC%E5%85%A7%E7%A7%91")
                        }
                        sx={{ ...theme.select.MenuProps.PaperProps.style, width: 300 }}
                    >
                        Next
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
