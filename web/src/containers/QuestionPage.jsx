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
import Zoom from "@mui/material/Zoom";
import { useInViewport } from "../containers/hooks/isInView.js";

const QuestionPage = ({ title, description, questions }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [submitted, setSubmitted] = useState(false);
    const theme = useTheme();
    const query = useQuery();
    const location = useLocation();
    const key = sha256(title + description + JSON.stringify(questions));
    const ref = React.useRef(null);
    const { isVisible, update } = useInViewport(ref);

    const onChange = (name, value) => {
        const oldVals = {};
        for (const key of searchParams.keys()) {
            const val = searchParams.getAll(key);
            oldVals[key] = val;
        }
        setSearchParams({ ...oldVals, [name]: value });
    };
    const handleNextPage = () => {
        setSubmitted(true);
        // turn off after 1 second
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSubmitted(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [submitted]);

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
                {description == "<INIT>" ? "" : description}
            </Typography>
            {questions?.map((v, index) => {
                return (
                    <Question
                        key={`${key}-question` + JSON.stringify(v)}
                        id={`${v.id}`}
                        index={index}
                        type={v.type}
                        title={v.title}
                        description={v.description}
                        options={v.options}
                        onChange={onChange}
                        theme={theme}
                        query={query}
                    />
                );
            })}
            <Zoom
                key={`${key}-butt-zoom`}
                in={isVisible}
                style={{ transitionDelay: isVisible ? `50ms` : "0ms" }}
                ref={ref}
            >
                <div
                    style={{ display: "flex", justifyContent: "center" }}
                    key={`${key}-butt-wrapper`}
                >
                    {!submitted ? (
                        <Button
                            key={`${key}-next-butt`}
                            variant="contained"
                            onClick={() => handleNextPage()}
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
            </Zoom>
        </Box>
    );
};

export default QuestionPage;
