import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

export default function BasicSelect({
    placeholder,
    options,
    id,
    onChange,
    defaultValue,
    handlBlur,
}) {
    const theme = useTheme();
    const [val, setVal] = React.useState("");
    const [focusedNum, setFocusedNum] = React.useState(0);

    const handleChange = (event) => {
        const value = event.target.value;
        setVal(value);
        onChange(value);
        setFocusedNum(focusedNum + 1);
        if (focusedNum < 1) {
            handlBlur();
        }
    };
    React.useEffect(() => {
        if (options.includes(defaultValue)) {
            setVal(defaultValue);
        } else {
            setVal("");
        }
    }, [defaultValue, options]);
    return (
        <Box sx={{ display: "block", m: 1, width: 200 }} alignContent="center">
            <FormControl fullWidth>
                <InputLabel id={`${id}-label`}>{placeholder}</InputLabel>
                <Select
                    labelId={`${id}-label`}
                    id={`${id}`}
                    value={val ?? ""}
                    label={placeholder}
                    onChange={handleChange}
                    MenuProps={theme.select.MenuProps}
                >
                    {options.map((v) => (
                        <MenuItem key={`${id}-${v}`} value={v}>
                            {v}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
