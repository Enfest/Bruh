//react import
import { useEffect, useState, useCallback } from "react";
import { sha256 } from "js-sha256";
//mui import
import { Typography, TextField } from "@mui/material";
import React from "react";

import MultipleSelectChip from "./MultipleSelectChip.jsx";
import SingleSelect from "./SingleSelect.jsx";
import lodash from "lodash";

const Question = ({ id, type, title, description, options, onChange, theme, query }) => {
    const [parsedOption, setParsedOption] = useState([]);
    const [textValue, setTextValue] = useState("");
    const key = sha256(type + title + description + JSON.stringify(options));
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
        <>
            <Typography variant="subtitle1" component="div" key={`${key}-description`}>
                {description}
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }} key={`${key}-wrapper`}>
                {{
                    MULTISELECT: (
                        <MultipleSelectChip
                            key={key}
                            id={id}
                            placeholder={title}
                            options={parsedOption}
                            onChange={(v) => onChange(id, v)}
                            defaultValue={query.getAll(id)}
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
                        />
                    ),
                    TEXT: (
                        <TextField
                            key={key}
                            id={id}
                            sx={{ m: 1, width: 300 }}
                            label={title}
                            variant="outlined"
                            // value={textValue ?? ""}
                            value={query.get(id) ?? ""}
                            // defaultValue={query.get(id) ?? ""}
                            onChange={(e) => {
                                onChange(id, e.target.value);
                                // debounce({ id: id, value: e.target.value });
                                setTextValue(e.target.value);
                            }}
                            inputProps={theme.select.MenuProps.PaperProps}
                        />
                    ),
                }[type] || null}
            </div>
        </>
    );
};

export default Question;
