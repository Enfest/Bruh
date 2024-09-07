//react import
import { useEffect, useState, useCallback } from "react";
import { sha256 } from "js-sha256";
//mui import
import { Typography, TextField, Divider, Paper, Zoom, Fab, Button, Box, Grid, CardMedia, Card, CardContent } from "@mui/material";
import React from "react";

import { useInViewport } from "../containers/hooks/isInView.js";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
            <Card
                key={`${key}-bg`}
                elevation={2}
                sx={{
                    padding: "10px",
                    width: "100%",
                    
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <Avatar
                    // sx={{width: "100%"}}
                    // key={`${key}-avatar`}
                    // alt={`${name} | ${clinic}`}
                    src={avatarURL || "https://static.vecteezy.com/system/resources/previews/036/372/442/non_2x/hospital-building-with-ambulance-emergency-car-on-cityscape-background-cartoon-illustration-vector.jpg"}
                    sx={{width: 100, height: 100}}
                />
                {/* <div style={{ backgroundColor: "black", width: "2px", height: "100%" }}></div> */}
                <CardContent
                    key={`${key}-card-right`}
                    elevation={0}
                    sx={{
                        padding: "10px",
                        width: "100%",
                        height: "90%",
                        display: "flex",
                        justifyContent: "space-evenly",
                        // alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h2" sx={{fontWeight: 700}}>{name}</Typography>
                    <Typography variant="h3" sx={{fontWeight: 300}}>{clinic}</Typography>
                    {/* <Box sx={{height: "10px"}} /> */}
                    <Typography key={`${key}-distance`} variant="h3">
                        {`距離您：${distance}`}
                    </Typography>
                    {/* <Box sx={{height: "10px"}} /> */}
                    <Button
                        key={`${key}-clinic-url`}
                        variant="contained"
                        onClick={() => (window.location.href = clinicURL)}
                        sx={{
                            ...theme?.select.MenuProps.PaperProps.style,
                            width: "100%",
                            // height: "100%",
                        }}
                        
                    >
                        點我預約
                    </Button>
                </CardContent>
            </Card>
        </Zoom>
    );
};

export default HospitalCard;
