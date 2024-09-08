import Box from "@mui/material/Box";
import {
  Grid,
  Typography,
  Tab,
  Button,
  Icon,
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useState } from "react";

import LabTabs from "./Tab.jsx";
import MapBar from "../components/MapBar.jsx";
import { Main } from "../components/bar_component/BarDrawer.jsx";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import MapIcon from "@mui/icons-material/Map";
import Test from "./Test.jsx";
import AddMap from "./AddMap.jsx";

const MapPage = () => {
  const [section, setSection] = useState("");
  const [label, setLabel] = useState();
  const [add, setAdd] = useState("Both");
  const [used, setUsed] = useState(false);
  return (
    <Box
      sx={{
        width: "100%",
        alignContent: "space-around",
      }}
    >
      <MapBar></MapBar>
      <Main>
        <Card sx={{ width: "100%" }}>
          <AddMap add={add} />
          <CardContent>
            <Typography variant="body">選擇查詢資訊</Typography>
            <Box>
              <FormControl>
                {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="家醫科診所"
                    control={<Radio />}
                    label="家醫科診所"
                    onClick={() => {
                      setAdd("family");
                      setUsed(true);
                    }}
                    checked={add == "family"}
                  />
                  <FormControlLabel
                    value="兒科診所"
                    control={<Radio />}
                    label="兒科診所"
                    onClick={() => {
                      setAdd("child");
                      setUsed(true);
                    }}
                    checked={add == "child"}
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Both"
                    onClick={() => {
                      setAdd("Both");
                      setUsed(true);
                    }}
                    checked={!used || add == "Both"}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      </Main>
      {/* <Map setSection = {setSection} section = {section} setId = {setId}/> */}
    </Box>
  );
};

export default MapPage;
