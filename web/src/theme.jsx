import { createTheme } from "@mui/material/styles";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#5ab4c5",
            light: "#93d4df",
            dark: "#356c77",
            contrastText: "rgba(255,255,255,0.87)",
        },
        secondary: {
            main: "#f5ba4b",
            contrastText: "rgba(255,255,255,0.87)",
            dark: "#ad7b2b",
            light: "#f4d69e",
        },
        error: {
            main: "#d45251",
            light: "#e29494",
        },
        warning: {
            main: "#fd853a",
            light: "#f4b992",
            contrastText: "rgba(255,255,255,0.87)",
        },
        background: {
            paper: "#ffffff",
        },
        success: {
            main: "#76a732",
        },
        text: {
            primary: "#30383d",
            secondary: "#475259",
            disabled: "#475259",
            hint: "#30383d",
        },
    },
    typography: {
        h1: {
            fontSize: 36,
            lineHeight: 1.33,
        },
        h2: {
            fontSize: 24,
            lineHeight: 1.33,
        },
        h3: {
            fontSize: 16,
            lineHeight: 1.37,
        },
        caption: {
            fontSize: 12,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: 14,
            lineHeight: 1.43,
        },
        body2: {
            fontSize: 14,
        },
    },
    select: {
        itemHeight: ITEM_HEIGHT,
        itemPaddingTop: ITEM_PADDING_TOP,
        MenuProps: {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP * 2,
                    width: 250,
                },
            },
        },
    },
});

export default theme;
