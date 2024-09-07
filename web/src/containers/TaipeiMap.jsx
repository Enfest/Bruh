import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker} from 'react-simple-maps';
import mapdata from '../utils/1';
import {geoCentroid} from 'd3-geo';
import { Card, CardContent, Typography, Divider, Box, Slider, Stack, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';
import {gsap} from 'gsap';
import { dis_data, dis_month, dis_title } from '../utils/disease_sec';
const Map = ({setSection, section}) => {

  const comp = React.useRef();
  const [month, setMonth] = useState(11);
  const [type, setType] = useState(6);
  // const null_comp = React.use

  React.useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.theState', {
        duration: 0.6,
        stagger: 0.3,
        ease: 'back',
        y: 96,
        opacity: 0,
      });
      gsap.from('.theMarkers', {
        duration: 0.6,
        stagger: 0.3,
        opacity: 0,
      });
      let tl = gsap.timeline();
      tl.to('.theCountry', {
        fill: '#fcf2df',
      });
    }, comp);

    return () => ctx.revert();
  });

  return (
    <Card align="center" sx={{width: "100%"}}>
    <CardContent>
      <Typography variant="h3" style={{fontWeight:500}}>
        臺北市常見傳染疾病區域統計表
      </Typography>
      <Divider></Divider>
      <Box sx={{height: "15px"}}>
      </Box>
      <ComposableMap
        projection='geoMercator'
        // style={{ backgroundColor: 'pink' }}
        projectionConfig={{
            center: [130, 38],
            scale: 1000,
            
        }}
        fill='#fcf2df'
        stroke='#FFFFFF'
        stroke-width={3}
        height={600}
      >
        
        <Geographies geography={mapdata.data} >
          {(geographies) => {
            return (
              <>
                {geographies.geographies.map((geo, index) => {
                  const stateName = geo.properties.name;
                  const id = geo.properties.id;
                  return (
                    <Geography
                      onClick={() => {
                        console.log(stateName)
                        setSection(stateName)
                      }}
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default:{
                          outline: "none",
                          fill: dis_data[month][type][index]
                        },
                        hover: {
                          fill: '#93D4DF',
                          outline: "none"
                        },
                        pressed: { 
                          outline: "none"
                        },
                      }}
                      className='theState theCountry'
                    />
                  );
                })}

                {geographies.geographies.map((geo) => {
                  const provinceCenter = geoCentroid(geo);
                  console.log(provinceCenter)
                  return (
                    <Marker key={geo.rsmKey} coordinates={geo.properties.placement} className='theMarkers'>
                      <text style={{
                        fill: '#475259',
                        strokeWidth: 0,
                        fontSize: 20
                        }}
                        textAnchor='middle'
                        >
                        {geo.properties.name}
                        </text>
                    </Marker>
                  );
                })}
              </>
            );
          }}
        </Geographies>
      </ComposableMap>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <Typography variant='body' sx={{fontSize: 12}}>2023年8月</Typography>
        <Slider defaultValue={11} step={1} marks min={0} max={11} onChange={(e) => {setMonth(e.target.value)}}/>
        <Typography variant='body' sx={{fontSize: 12}}>2024年7月</Typography>
      </Stack>
      <FormControl>
      <Typography variant="body1">傳染病分類</Typography>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
          {dis_title.map((dis, index)=>(<FormControlLabel value={index} control={<Radio />} onClick={() => {setType(index)}} label={dis_title[index]} />))}
      </RadioGroup>
    </FormControl>
    </CardContent>
    </Card>
  );
};

export default Map;