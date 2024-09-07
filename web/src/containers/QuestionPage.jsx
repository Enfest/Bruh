//react import
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { sha256 } from "js-sha256";
//mui import
import { Typography, Box, Divider, TextField, Button } from "@mui/material";
import React from "react";
//component import
import { useTheme } from "@mui/material/styles";
import lodash, { set } from "lodash";
import useQuery from "./hooks/useQuery";
import { getQuestion, postQuestion } from "./hooks/useQuestions";
import Question from "../components/Question.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Zoom from "@mui/material/Zoom";
import { useInViewport } from "../containers/hooks/isInView.js";

const QuestionPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [hash, setHash] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const query = useQuery();
    const location = useLocation();
    const navigate = useNavigate();
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
        setLoading(true);
        console.log("handleNextPage");
        handlePost();
        // turn off after 1 second
    };
    const handlePost = async () => {
        try {
            const response = await handleFetch(() => postQuestion(location, questions));
            console.log("response: ", response);
            setLoading(false);
            setError(null);
            const { _hash } = response;
            if (_hash) {
                navigate(`?hash=${_hash}`);
            } else {
                console.error("No hash returned");
                navigate(`?hash=${hash}`);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    const handleGet = async () => {
        try {
            const data = await handleFetch(() => getQuestion(location));
            const { hash, questions, title, description } = data;
            setHash(hash);
            setTitle(title);
            setDescription(description);
            setQuestions(questions);

            setData(data);
            setLoading(false);
            setError(null);
            onChange("hash", hash);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    const handleFetch = async (callBack) => {
        const response = await callBack();
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(JSON.stringify(data));
        setLoading(false);
        return data;
    };
    useEffect(() => {
        handleGet();
    }, []);
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setLoading(false);
    //     }, 1000);
    //     return () => clearTimeout(timeout);
    // }, [loading]);

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
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    key={`${key}-butt-wrapper`}
                >
                    {!loading ? (
                        <Button
                            key={`${key}-next-butt`}
                            variant="contained"
                            onClick={() => handleNextPage()}
                            sx={{ ...theme?.select.MenuProps.PaperProps.style, width: 300 }}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            key={`${key}-submitted-butt`}
                            variant="secondary"
                            sx={{ ...theme?.select.MenuProps.PaperProps.style, width: 300 }}
                        >
                            <CircularProgress />
                        </Button>
                    )}
                    <Typography
                        key={`${key}-error`}
                        variant="subtitle2"
                        component="div"
                        color="error"
                        sx={{ display: error ? "block" : "none" }}
                    >
                        {error}
                    </Typography>
                </div>
            </Zoom>
        </Box>
    );
};

export default QuestionPage;
