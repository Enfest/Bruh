import ConcertCard from "../components/Card.jsx";
import EventCard from "../components/Card.jsx"
import Box from '@mui/material/Box';

import {concerts} from "../informations/concert_information.js";
import { Grid, Typography } from "@mui/material";
import React, { useState } from 'react';
import Map from "./TaipeiMap.jsx";

const MainPage = () => {

    const [section, setSection] = useState("");
    const [id, setId] = useState("");
    return(
        <Box sx = {{ 
            width: "100%",
            alignContent: "space-around",
            }}>
            <Typography>
                This is {section} {id}
            </Typography>
            <Map setSection = {setSection} section = {section} setId = {setId}/>
        </Box>
        // <EventCard />
    )

}

export default MainPage;