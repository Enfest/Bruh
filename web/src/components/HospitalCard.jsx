//react import
import { useEffect, useState, useCallback } from "react";
import { sha256 } from "js-sha256";
//mui import
import { Typography, TextField } from "@mui/material";
import React from "react";

import MultipleSelectChip from "./MultipleSelectChip.jsx";
import SingleSelect from "./SingleSelect.jsx";
import lodash from "lodash";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import { useInViewport } from "../containers/hooks/isInView.js";

const HospitalCard = ({ id, name, clinic, avatarURL, googleMapURL, clinicURL, distance }) => {
    const key = sha256(id + name + clinic + avatarURL + googleMapURL + clinicURL + distance);
    const ref = React.useRef(null);
    const { isVisible, update } = useInViewport(ref);
    return (
        <Zoom
            key={`${key}-q-wrapper`}
            in={isVisible}
            style={{ transitionDelay: isVisible ? `100ms` : "0ms" }}
            ref={ref}
        >
            <Paper key={`${key}-background-2`} elevation={2} sx={{ padding: "10px" }}>
                <Typography variant="subtitle1" component="div" key={`${key}-description`}>
                    {description}
                </Typography>
                <div
                    style={{ display: "flex", justifyContent: "center" }}
                    key={`${key}-wrapper`}
                ></div>
            </Paper>
        </Zoom>
    );
};

export default HospitalCard;
