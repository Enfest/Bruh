import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import data from "../../../stomach.json";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FluButton from "../components/FluButton";
import FluChart from "../components/FluChart";
const Test = () => {
  console.log(data);
  const [fluType, setFluType] = React.useState("腸病毒");
  const handleClick = (e) => {
    setFluType(e);
  };
  useEffect(() => {
    console.log(fluType);
  }, [fluType]);
  const lineChartsParams = {
    series: [
      {
        id: "series-1",
        data: [3, 4, 1, 6, 5],
        label: "<15歲",
      },
      {
        id: "series-2",
        data: [4, 3, 1, 5, 8],
        label: ">15歲",
      },
      {
        id: "series-3",
        data: [4, 2, 5, 4, 1],
        label: "總計",
      },
    ],
    xAxis: [{ data: [0, 3, 6, 9, 12], scaleType: "linear", id: "axis1" }],
    height: 400,
  };
  return (
    <Box sx={{ width: "100%", alignContent: "space-around" }}>
      <FluButton handleClick={handleClick} fluType={fluType} />

      <FluChart fluType={fluType} />
    </Box>
  );
};

export default Test;
