//react import
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { sha256 } from "js-sha256";
//mui import
import {
    Typography,
    Box,
    Divider,
    TextField,
    Button,
    IconButton,
    Grid,
    Avatar,
    Paper,
} from "@mui/material";
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
import { question, validHash } from "../informations/question";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const QuestionPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [hash, setHash] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const [activedIndex, setActivedIndex] = useState(0);
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
        const newVal = { ...oldVals, [name]: value };
        if (JSON.stringify(oldVals) !== JSON.stringify(newVal)) {
            setSearchParams({ ...oldVals, [name]: value });
        }
    };
    const handleNextPage = () => {
        setLoading(true);
        // console.log("handleNextPage");
        handlePost();
    };
    const handlePost = async () => {
        try {
            console.log("handlePost");
            const response = await handleFetch(() => {
                console.log("location", location);
                return postQuestion(location, questions);
            });
            console.log("response: ", response);
            if (!response.success) {
                throw new Error(response.error);
            }

            setLoading(false);
            setError(null);
            setActivedIndex(0);

            const { hash: _hash } = response;
            if (_hash) {
                setHash(_hash);
                navigate(`?hash=${_hash}`);
            } else {
                // navigate(0);
                setError("Cannot Fetch Next Question.");
                setLoading(false);
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
            if (hash) setHash(hash);
            if (title) setTitle(title);
            if (description) setDescription(description);
            if (questions) setQuestions(questions);

            setData(data);
            setLoading(false);
            setError(null);
            console.log("hash", hash);
            onChange("hash", hash);
        } catch (error) {
            setError(error.message);
            setLoading(false);
            setHash("iamhash");

            setTitle("This is Title");
            setDescription("This is Description");
            setQuestions(question);
        }
    };
    const handleFetch = async (callBack) => {
        const response = await callBack();
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        // console.log(JSON.stringify(data));
        setLoading(false);
        return data;
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const _hash = searchParams.get("hash");
        if (hash !== _hash || !validHash.test(hash)) {
            console.log("refetching, hash: ", hash, _hash);
            handleGet();
        }
    }, [hash, location.hash]);
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
            {" "}
            <Grid container sx={{ width: "100%" }} spacing={2}>
                <Grid item>
                    <Avatar alt="robot" src="assets/robot.jpg" />
                </Grid>
                <Grid item alignContent="center">
                    <Paper
                        sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                        elevation={0}
                    >
                        <Typography variant="body">{title}</Typography>
                    </Paper>
                    {description && description !== "<INIT>" ? (
                        <Paper
                            sx={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                            elevation={0}
                        >
                            <Typography variant="body">{description}</Typography>
                        </Paper>
                    ) : null}
                </Grid>
            </Grid>
            {questions?.map((v, index) => {
                return (
                    <Question
                        key={`${key}-question` + JSON.stringify(v)}
                        id={`${v.id}`}
                        visible={index <= activedIndex}
                        type={v.type}
                        title={v.title}
                        description={v.description}
                        options={v.options}
                        onChange={onChange}
                        theme={theme}
                        query={query}
                        handlBlur={(e) => {
                            console.log(activedIndex);
                            setActivedIndex(activedIndex + 1);
                        }}
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
                        alignItems: "end",
                        opacity: questions.length <= activedIndex ? "100" : "0",
                        transitionDuration: "500ms",
                        transitionDelay: "200ms",
                    }}
                    key={`${key}-butt-wrapper`}
                >
                    {!loading ? (
                        <Button
                            key={`${key}-next-butt`}
                            variant="contained"
                            onClick={() => handleNextPage()}
                            startIcon={<DoubleArrowIcon />}
                            sx={{ ...theme?.select.MenuProps.PaperProps.style, width: "100px" }}
                            disabled={questions.length > activedIndex}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            key={`${key}-submitted-butt`}
                            variant="secondary"
                            sx={{ ...theme?.select.MenuProps.PaperProps.style, width: "100px" }}
                            disabled={questions.length > activedIndex}
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
