import {Box, Card, CardContent, Divider, Typography} from "@mui/material";
import React, { useEffect } from "react";
import FluButton from "../components/FluButton";
import FluChart from "../components/FluChart";
const series1 = [
  {
    id: "series-1",
    data: [1337, 1291, 1257, 1295, 1285, 1209, 1029, 872, 933, 994, 1070, 1051],
    label: "<15歲",
    color: "#71c5d5"
  },
  {
    id: "series-2",
    data: [102, 130, 110, 123, 104, 119, 90, 71, 104, 110, 111, 107],
    label: ">15歲",
    color: "#f0c87c"
  },
  {
    id: "series-3",
    data: [1439, 1421, 1367, 1418, 1389, 1328, 1119, 943, 1037, 1104, 1181, 1158],
    label: "感染總人數",
    color: "#e29494"
  },
]; //腸病毒
const series2 = [{ label: "感染人數", data: [25, 12, 31, 7, 7, 2, 4, 6, 6, 2, 4, 11], color: "#f0c87c" }]; //登革熱
const series3 = [
  {
    label: "感染人數",
    data: [191, 120, 130, 151, 170, 309, 290, 141, 298, 579, 876, 345],
    color: "#f0c87c"
  },
]; // COVID;
const Test = () => {
  const [fluType, setFluType] = React.useState("腸病毒");
  const [fluData, setFluData] = React.useState([
    { label: "感染人數", 
      data: [25, 12, 31, 7, 7, 2, 4, 6, 6, 2, 4, 11],
      color: "#f0c87c" },
  ]);
  const handleClick = (e) => {
    setFluType(e);
  };

  useEffect(() => {
    if (fluType == "腸病毒") {
      setFluData(series1);
    } else if (fluType == "登革熱") {
      setFluData(series2);
    } else {
      setFluData(series3);
    }
  }, [fluType]);
  useEffect(() => {
    console.log(fluData);
  }, [fluData]);
  return (
    <Card align="center" sx={{ width: "100%", alignContent: "center"}}>
      <CardContent>
      <Typography variant="h3" style={{fontWeight:500}}>
        臺北市傳染病每月感染人數統計表
      </Typography>
      <Divider></Divider>
      <FluChart fluType={fluType} fluData={fluData} />
      <Typography variant="caption" align="right" sx={{ width: "100%", alignContent: "right", fontWeight: 300}}>
          (感染人數/月份)
      </Typography>
      <FluButton handleClick={handleClick} fluType={fluType} />
      </CardContent>
    </Card>
  );
};

export default Test;
