import React, { useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const FluChart = ({ fluType, fluData }) => {
  console.log(fluType, "dd");
  return (
    <>
      <LineChart
        yAxis={[{ label: "Cases", scaleType: "linear", id: "axis2" }]}
        series={fluData}
        xAxis={[
          {
            data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            label: "Month",
            id: "axis1",
          },
        ]}
        height={300}
        width={380}
      />
    </>
  );
};

export default FluChart;
