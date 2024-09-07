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

const QuestionPage = ({ title, description, questions, handleNextPage }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const theme = useTheme();
    const query = useQuery();
    const location = useLocation();
    const key = sha256(title + description + JSON.stringify(questions));

    const onChange = (name, value) => {
        const oldVals = {};
        for (const key of searchParams.keys()) {
            const val = searchParams.getAll(key);
            oldVals[key] = val;
        }
        setSearchParams({ ...oldVals, [name]: value });
    };
    console.log(getQuestion(location));
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
                {title}
            </Typography>
            <Typography
                key={`${key}-page-description`}
                variant="subtitle2"
                component="div"
                color="text.secondary"
            >
                {description}
            </Typography>
            {questions?.map((v) => {
                return (
                    <div key={`${key}-q-wrapper` + JSON.stringify(v)}>
                        <Divider key={`${key}-divider` + JSON.stringify(v)} />
                        <Question
                            key={`${key}-question` + JSON.stringify(v)}
                            id={`${v.id}`}
                            type={v.type}
                            title={v.title}
                            description={v.description}
                            options={v.options}
                            onChange={onChange}
                            theme={theme}
                            query={query}
                        />
                    </div>
                );
            })}
            <div style={{ display: "flex", justifyContent: "center" }} key={`${key}-butt-wrapper`}>
                <Button
                    key={`${key}-next-butt`}
                    variant="contained"
                    onClick={() => handleNextPage()}
                    sx={{ ...theme.select.MenuProps.PaperProps.style, width: 300 }}
                >
                    Next
                </Button>
            </div>
        </Box>
    );
};

export default QuestionPage;
