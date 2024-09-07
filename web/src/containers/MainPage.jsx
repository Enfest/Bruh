import Box from '@mui/material/Box';
import { Grid, Typography, Tab, Button, Icon, BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState } from 'react';

import LabTabs from "./Tab.jsx";
import ChartBar from "../components/ChartBar.jsx";
import { Main } from "../components/bar_component/BarDrawer.jsx";
import SsidChartIcon from '@mui/icons-material/SsidChart';
import MapIcon from '@mui/icons-material/Map';
import Test from './Test.jsx';
import Map from './TaipeiMap.jsx';

const MainPage = () => {

    const [section, setSection] = useState("");
    const [label, setLabel] = useState();


    return(
        <Box sx = {{ 
            width: "100%",
            alignContent: "space-around",
            }}>
            <ChartBar ></ChartBar>
            <Main>
            <Box sx={{width: "100%"}}>
                <BottomNavigation
                    showLabels
                    value={label}
                    onChange={(event, newValue) => {
                    setLabel(newValue);
                    }}
                    sx={{width: "100%"}}
                >
                    <BottomNavigationAction sx={{width: "50%"}} label="傳染病每月感染人數" icon={<SsidChartIcon />} />
                    <BottomNavigationAction sx={{width: "50%"}} label="傳染病區域分佈" icon={<MapIcon />} />
                </BottomNavigation>
            </Box>
            {label === 0? <Test />: (label === 1? <Map setSection={setSection} section={section} />:<></>)}
            
            </Main>
            {/* <Map setSection = {setSection} section = {section} setId = {setId}/> */}
        </Box>
        
    )

}

export default MainPage;