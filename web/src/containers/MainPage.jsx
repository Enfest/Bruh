import Box from '@mui/material/Box';
import { CardMedia, CardContent, Card, Typography, Grid } from "@mui/material";
import React, { useState } from 'react';

import LabTabs from "./Tab.jsx";
import ChartBar from "../components/ChartBar.jsx";
import { Main } from "../components/bar_component/BarDrawer.jsx";
import SsidChartIcon from '@mui/icons-material/SsidChart';
import MapIcon from '@mui/icons-material/Map';
import Test from './Test.jsx';
import Map from './TaipeiMap.jsx';
import MainBar from '../components/MainBar.jsx';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

    const [section, setSection] = useState("");
    const [label, setLabel] = useState(1);

    const navigate = useNavigate();


    return(
        <Box sx = {{ 
            width: "100%",
            alignContent: "space-around",
            }}>
            <MainBar ></MainBar>
            <Main>
            <Card sx={{width: "100%"}} onClick={()=>{navigate("/statistic")}}>
                <CardMedia
                    sx={{ height: 200 }}
                    image="https://www.google.com/maps/vt/data=P18rrcaDYDix2m0iG9ITpiRQuaccrIkOhkM-CABM-VbINhU24SuPicEcjNhWasYdyqGM0qwGoDdn4TIdcQ54nMjEoImg6ceaLgS8UH5K3yPBrz2fdpF6X6hwwHba46E_tmkldoPPXhMns4y1tgnw9O5mZ9oITa8kjBYIDkYoN3CqRRlzqX323hxyBntigezl-y3VjTVRQiWbX2kmlHeREjXyPPAw_OJsI-VS2wr4rVUNCN9o7pWgwRQ_teydjcdGtuxLESIPhMpSsl1tW3R9-UdTy5zS3bjTYER3zykzlxYq9BByNKCisEITml9_SmtAAm9b7sawEZqlzCndU8no4yzd9DU"
                    title="map"
                />
                <CardContent>
                    <Typography gutterBottom variant="body" sx={{fontWeight: 200}}>
                        統計資料
                    </Typography>
                    <Typography variant="h3" component="div">
                        臺北市近期傳染病統計
                    </Typography>
                </CardContent>

            </Card>
            <Box sx={{height: "10px"}}></Box>
            <Card sx={{width: "100%"}} onClick={()=>{navigate("/finddoctor")}}>
                <CardMedia
                    sx={{ height: 200 }}
                    image="https://www.google.com/maps/vt/data=P18rrcaDYDix2m0iG9ITpiRQuaccrIkOhkM-CABM-VbINhU24SuPicEcjNhWasYdyqGM0qwGoDdn4TIdcQ54nMjEoImg6ceaLgS8UH5K3yPBrz2fdpF6X6hwwHba46E_tmkldoPPXhMns4y1tgnw9O5mZ9oITa8kjBYIDkYoN3CqRRlzqX323hxyBntigezl-y3VjTVRQiWbX2kmlHeREjXyPPAw_OJsI-VS2wr4rVUNCN9o7pWgwRQ_teydjcdGtuxLESIPhMpSsl1tW3R9-UdTy5zS3bjTYER3zykzlxYq9BByNKCisEITml9_SmtAAm9b7sawEZqlzCndU8no4yzd9DU"
                    title="map"
                />
                <CardContent>
                    <Typography gutterBottom variant="body" sx={{fontWeight: 200}}>
                        就近看診
                    </Typography>
                    <Typography variant="h3" component="div">
                        附近診所查詢
                    </Typography>
                </CardContent>

            </Card>
            <Box sx={{height: "10px"}}></Box>
            <Card sx={{width: "100%"}} onClick={()=>{navigate("/classification")}}>
                <CardMedia
                    sx={{ height: 200 }}
                    image="https://www.google.com/maps/vt/data=P18rrcaDYDix2m0iG9ITpiRQuaccrIkOhkM-CABM-VbINhU24SuPicEcjNhWasYdyqGM0qwGoDdn4TIdcQ54nMjEoImg6ceaLgS8UH5K3yPBrz2fdpF6X6hwwHba46E_tmkldoPPXhMns4y1tgnw9O5mZ9oITa8kjBYIDkYoN3CqRRlzqX323hxyBntigezl-y3VjTVRQiWbX2kmlHeREjXyPPAw_OJsI-VS2wr4rVUNCN9o7pWgwRQ_teydjcdGtuxLESIPhMpSsl1tW3R9-UdTy5zS3bjTYER3zykzlxYq9BByNKCisEITml9_SmtAAm9b7sawEZqlzCndU8no4yzd9DU"
                    title="map"
                />
                <CardContent>
                    <Typography gutterBottom variant="body" sx={{fontWeight: 200}}>
                        輔助掛號
                    </Typography>
                    <Typography variant="h3" component="div">
                        看診小助手
                    </Typography>
                </CardContent>

            </Card>
            </Main>
            {/* <Map setSection = {setSection} section = {section} setId = {setId}/> */}
        </Box>
        
    )

}

export default MainPage;