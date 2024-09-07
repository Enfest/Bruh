import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import mapdata from '../utils/1';
import {geoCentroid} from 'd3-geo';
import { Typography } from '@mui/material';
import {gsap} from 'gsap';
const Map = ({setSection, section, setId}) => {

  const comp = React.useRef();
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
        fill: '#E3E7E9',
      });
    }, comp);

    return () => ctx.revert();
  });

  return (
    <ComposableMap
      projection='geoMercator'
      // style={{ backgroundColor: 'pink' }}
      projectionConfig={{
          center: [130, 38],
          scale: 1000,
          
      }}
      fill='#E3E7E9'
      stroke='#FFFFFF'
      stroke-width={3}
      height={600}
    >
      <Geographies geography={mapdata.data} ref={(section === "")? comp: () => {}}>
        {(geographies) => {
          return (
            <>
              {geographies.geographies.map((geo) => {
                const stateName = geo.properties.name;
                const id = geo.properties.id;
                return (
                  <Geography
                    onClick={() => {
                      console.log(stateName)
                      setSection(stateName)
                      setId(id)
                    }}
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default:{
                        outline: "none"
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
  );
};

export default Map;