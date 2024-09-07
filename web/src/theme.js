import { createTheme } from "@mui/material/styles";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const theme = createTheme({
    palette: {
        primary: {
            light: "#4dabf5",
            main: "#2196f3",
            dark: "#1769aa",
            contrastText: "#fff",
        },
        secondary: {
            light: "#f73378",
            main: "#f50057",
            dark: "#ab003c",
            contrastText: "#fff",
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
