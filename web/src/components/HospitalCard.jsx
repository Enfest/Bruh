//react import
import { useEffect, useState, useCallback } from "react";
import { sha256 } from "js-sha256";
//mui import
import { Typography, TextField, Divider, Paper, Zoom, Fab, Button } from "@mui/material";
import React from "react";

import { useInViewport } from "../containers/hooks/isInView.js";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";

const HospitalCard = ({ id, name, clinic, avatarURL, googleMapURL, clinicURL, distance }) => {
    const key = sha256(id + name + clinic + avatarURL + googleMapURL + clinicURL + distance);
    const ref = React.useRef(null);
    const { isVisible, update } = useInViewport(ref);
    const theme = useTheme();

    return (
        <Zoom
            key={`${key}-wrapper`}
            in={isVisible}
            style={{ transitionDelay: isVisible ? `100ms` : "0ms" }}
            ref={ref}
        >
            <Paper
                key={`${key}-bg`}
                elevation={2}
                sx={{
                    padding: "10px",
                    width: "400px",
                    height: "200px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <Paper
                    key={`${key}-avatar-bg`}
                    elevation={0}
                    sx={{
                        padding: "10px",
                        width: "30%",
                        height: "90%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        key={`${key}-avatar`}
                        alt={`${name} | ${clinic}`}
                        src={avatarURL || "https://via.placeholder.com/150"}
                        sx={{ height: "100px", width: "100px" }}
                    />
                    <Paper
                        elevation={0}
                        sx={{
                            width: "100%",
                            height: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Typography key={`${key}-name`} variant="subtitle1" component="div">
                            {name}
                        </Typography>
                        <Typography key={`${key}-clinic`} variant="subtitle1" component="div">
                            {clinic}
                        </Typography>
                    </Paper>
                </Paper>
                <Divider orientation="vertical" flexItem />
                {/* <div style={{ backgroundColor: "black", width: "2px", height: "100%" }}></div> */}
                <Paper
                    key={`${key}-card-right`}
                    elevation={0}
                    sx={{
                        padding: "10px",
                        width: "70%",
                        height: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Paper
                        key={`${key}-card-right-top`}
                        elevation={0}
                        sx={{
                            // padding: "10px",
                            width: "100%",
                            height: "50%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <Typography key={`${key}-distance`} variant="subtitle1" component="div">
                            {`距離您：${distance}`}
                        </Typography>
                        <Button
                            key={`${key}-map-butt`}
                            variant="outlined"
                            onClick={() => (window.location.href = googleMapURL)}
                            sx={{
                                ...theme?.select.MenuProps.PaperProps.style,
                                width: "150px",
                                height: "50px",
                                borderRadius: "40px",
                            }}
                        >
                            <Avatar
                                key={`${key}-google-map`}
                                alt={`${name} | ${clinic}`}
                                src={"assets/google-maps-pin.png"}
                                sx={{ height: "40px", width: "40px" }}
                            ></Avatar>
                            {"Show Map"}
                        </Button>
                    </Paper>
                    <Paper
                        key={`${key}-card-right-bottom`}
                        elevation={0}
                        sx={{
                            width: "100%",
                            height: "40%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Button
                            key={`${key}-clinic-url`}
                            variant="contained"
                            onClick={() => (window.location.href = clinicURL)}
                            sx={{
                                ...theme?.select.MenuProps.PaperProps.style,
                                width: "80%",
                                height: "100%",
                                borderRadius: "40px",
                            }}
                        >
                            點我預約
                        </Button>
                    </Paper>
                </Paper>
            </Paper>
        </Zoom>
    );
};

export default HospitalCard;
