//react import
import { useEffect, useState } from "react";

//mui import
import {
    Typography,
    Box,
    Chip,
    Divider,
    Stack,
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    TextField,
    Button,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

// set selected text to bold
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function MultipleSelectChip({ placeholder, options, id, onChange, defaultValue }) {
    const theme = useTheme();
    const [vals, setVals] = React.useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const parsedValue = typeof value === "string" ? value.split(",") : value;
        setVals(parsedValue);
        onChange(parsedValue);
    };
    useEffect(() => {
        console.log("MultipleSelectChip, ", placeholder, defaultValue, options);
        setVals(defaultValue ?? []);
    }, [defaultValue]);
    return (
        <div>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id={`${id}-label`}>{placeholder}</InputLabel>
                <Select
                    labelId={`${id}-label`}
                    id={id}
                    multiple
                    value={vals ?? []}
                    onChange={handleChange}
                    input={<OutlinedInput id={`${id}-input`} label={placeholder} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip
                                    key={`${id}-${value}`}
                                    label={value}
                                    variant="outlined" // [CHANGE ME], color sucks
                                    color="primary"
                                />
                            ))}
                        </Box>
                    )}
                    // MenuProps={theme.select.MenuProps}
                >
                    {options.map((val) => (
                        <MenuItem
                            key={`${id}-${val}`}
                            value={val}
                            style={getStyles(val, vals, theme)}
                        >
                            {val}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MultipleSelectChip;
