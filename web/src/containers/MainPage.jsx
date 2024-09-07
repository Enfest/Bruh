import ConcertCard from "../components/Card.jsx";
import EventCard from "../components/Card.jsx";
import Box from "@mui/material/Box";

import { concerts } from "../informations/concert_information.js";
import { Grid, Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%", alignContent: "space-around" }}>
            <Grid container spacing={2}>
                {concerts.map((concert, index) => (
                    <Grid item xs={6}>
                        <ConcertCard
                            name={concert.name}
                            img={concert.img}
                            sale_time={concert.sale_time}
                            perform_time={concert.perform_time}
                            index={index}
                        />
                    </Grid>
                ))}
            </Grid>
            <Divider />
            <Button variant="contained" onClick={() => navigate("/classification")}>
                分類
            </Button>
            <Button variant="contained" onClick={() => navigate("/clinicNavigation")}>
                Clinic Navigation
            </Button>
        </Box>
        // <EventCard />
    );
};

export default MainPage;
