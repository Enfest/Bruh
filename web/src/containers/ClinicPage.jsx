import Box from '@mui/material/Box';
import { Grid, Card, Typography, Tab, Button, Icon, BottomNavigation, BottomNavigationAction, Avatar } from "@mui/material";
import React, { useState } from 'react';

import { Main } from "../components/bar_component/BarDrawer.jsx";
import ClinicBar from '../components/ClinicBar.jsx';
const ClinicPage = () => {

    const [section, setSection] = useState("");
    const [label, setLabel] = useState(1);


    return(
        <Box sx = {{ 
            width: "100%",
            alignContent: "space-around",
            }}>
            <ClinicBar ></ClinicBar>
            <Main>
            <Grid container sx={{width: "100%"}} spacing={2}>
                <Grid item>
                    <Avatar alt="robot" src="https://media.istockphoto.com/id/949119664/vector/cute-white-doctor-robot-modern-health-care-flat-editable-vector-illustration-clip-art.jpg?s=612x612&w=0&k=20&c=Tp7_la5mgePZ2mkOk_17jX0f-vorLZmbT9JOTDyG4gw=" />
                </Grid>
                <Grid item alignContent="center">
                    <Typography variant='body'>我可以幫你什麼</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{flexDirection: "row-reverse"}} spacing={2}>
                <Grid item >
                    <Avatar align="right" alt="robot" src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/icwLWAZKWyA8/v1/-1x-1.jpg" />
                </Grid>
                <Grid item alignContent="center">
                    <Typography variant='body'>我可以幫你什麼</Typography>
                </Grid>
            </Grid>
            
            </Main>
            {/* <Map setSection = {setSection} section = {section} setId = {setId}/> */}
        </Box>
        
    )

}

export default ClinicPage;