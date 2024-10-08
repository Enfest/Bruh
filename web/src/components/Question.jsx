//react import
import { useEffect, useState, useCallback } from "react";
import { sha256 } from "js-sha256";
//mui import
import { Typography, TextField, Grid, Avatar, Box } from "@mui/material";
import React from "react";

import MultipleSelectChip from "./MultipleSelectChip.jsx";
import SingleSelect from "./SingleSelect.jsx";
import lodash from "lodash";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import { useInViewport } from "../containers/hooks/isInView.js";

const Question = ({
    id,
    type,
    title,
    description,
    options,
    onChange,
    theme,
    query,
    visible,
    handlBlur,
}) => {
    const [parsedOption, setParsedOption] = useState([]);
    const [textValue, setTextValue] = useState("");
    const key = sha256(type + title + description + JSON.stringify(options));
    const ref = React.useRef(null);
    const [textFocusedNum, setTextFocusedNum] = React.useState(0);
    const { isVisible, update } = useInViewport(ref);
    useEffect(() => {
        const valArray = options?.map((e) => (typeof e == "object" ? e.text : e));
        setParsedOption(valArray);
    }, []);
    // const debounce = useCallback(
    //     lodash.debounce(({ id, value }) => {
    //         onChange(id, value);
    //     }, 200),
    //     []
    // );
    // useEffect(() => setTextValue(query.get(id) ?? ""), [query.get(id)]);
    return (
        <Zoom
            key={`${key}-q-wrapper`}
            in={isVisible && visible}
            style={{ transitionDelay: isVisible && visible ? `100ms` : "0ms" }}
            ref={ref}
        >
            <Box key={`${key}-background-10`}>
                <Zoom
                    key={`${key}-bot-zoom`}
                    in={isVisible && visible}
                    style={{ transitionDelay: isVisible && visible ? `250ms` : "0ms" }}
                >
                    <Grid container sx={{ width: "100%" }} spacing={2}>
                        <Grid item>
                            <Avatar
                                alt="robot"
                                src="https://media.istockphoto.com/id/949119664/vector/cute-white-doctor-robot-modern-health-care-flat-editable-vector-illustration-clip-art.jpg?s=612x612&w=0&k=20&c=Tp7_la5mgePZ2mkOk_17jX0f-vorLZmbT9JOTDyG4gw="
                            />
                        </Grid>
                        <Grid item alignContent="center">
                            <Typography variant="body">{description}</Typography>
                        </Grid>
                    </Grid>
                </Zoom>
                <Zoom
                    key={`${key}-client-zoom`}
                    in={isVisible && visible}
                    style={{ transitionDelay: isVisible && visible ? `500ms` : "0ms" }}
                >
                    <Grid
                        container
                        sx={{ flexDirection: "row-reverse" }}
                        style={{ transitionDelay: isVisible && visible ? `300ms` : "0ms" }}
                    >
                        <Grid item alignContent="center">
                            <Avatar
                                alt="robot"
                                src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/icwLWAZKWyA8/v1/-1x-1.jpg"
                            />
                        </Grid>
                        <Grid item alignContent="center">
                            {/* <Typography variant='body'>我可以幫你什麼</Typography> */}
                            {{
                                MULTISELECT: (
                                    <MultipleSelectChip
                                        key={key}
                                        id={id}
                                        placeholder={title}
                                        options={parsedOption}
                                        onChange={(v) => onChange(id, v)}
                                        defaultValue={query.getAll(id)}
                                        handlBlur={handlBlur}
                                    />
                                ),
                                SELECT: (
                                    <SingleSelect
                                        key={key}
                                        id={id}
                                        placeholder={title}
                                        options={parsedOption}
                                        onChange={(v) => onChange(id, v)}
                                        defaultValue={query.get(id)}
                                        handlBlur={handlBlur}
                                    />
                                ),
                                TEXT: (
                                    <TextField
                                        key={key}
                                        id={id}
                                        sx={{ m: 1, width: 200 }}
                                        label={title}
                                        // value={textValue ?? ""}
                                        value={query.get(id) ?? ""}
                                        // defaultValue={query.get(id) ?? ""}
                                        onChange={(e) => {
                                            onChange(id, e.target.value);
                                            // debounce({ id: id, value: e.target.value });
                                            setTextValue(e.target.value);
                                        }}
                                        inputProps={theme.select.MenuProps.PaperProps}
                                        onFocus={() => setTextFocusedNum(textFocusedNum + 1)}
                                        onBlur={textFocusedNum < 2 ? handlBlur : null}
                                    />
                                ),
                            }[type] || null}
                        </Grid>
                    </Grid>
                </Zoom>
            </Box>
        </Zoom>
    );
};

export default Question;
