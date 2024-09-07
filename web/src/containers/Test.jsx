import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import FluButton from "../components/FluButton";
import FluChart from "../components/FluChart";
const series1 = [
  {
    id: "series-1",
    data: [1337, 1291, 1257, 1295, 1285, 1209, 1029, 872, 933, 994, 1070, 1051],
    label: "<15歲",
  },
  {
    id: "series-2",
    data: [102, 130, 110, 123, 104, 119, 90, 71, 104, 110, 111, 107],
    label: ">15歲",
  },
  {
    id: "series-3",
    data: [1439, 1421, 1367, 1418, 1389, 1328, 1119, 943, 1037, 1104, 1181, 1158],
    label: "感染總人數",
  },
]; //腸病毒
const series2 = [{ label: "感染人數s", data: [25, 12, 31, 7, 7, 2, 4, 6, 6, 2, 4, 11] }]; //登革熱
const series3 = [
  {
    label: "感染人數",
    data: [191, 120, 130, 151, 170, 309, 290, 141, 298, 579, 876, 345],
  },
]; // COVID;
const Test = () => {
  const [fluType, setFluType] = React.useState("腸病毒");
  const [fluData, setFluData] = React.useState([
    { label: "感染人數", data: [25, 12, 31, 7, 7, 2, 4, 6, 6, 2, 4, 11] },
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
    <Box sx={{ width: "100%", alignContent: "space-around" }}>
      <FluButton handleClick={handleClick} fluType={fluType} />

      <FluChart fluType={fluType} fluData={fluData} />
    </Box>
  );
};

export default Test;
