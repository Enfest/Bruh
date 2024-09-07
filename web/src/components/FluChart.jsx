import React, { useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts";

const FluChart = ({ fluType, fluData }) => {
  console.log(fluType, "dd");
  return (
    <>
      <BarChart
        yAxis={[{ scaleType: "linear", id: "axis1"}]}
        series={fluData}
        xAxis={[
          {
            data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            scaleType: "band",
            label: "2023 - 2024"
          },
        ]}
        height={300}
        width={380}
      />
    </>
  );
};

export default FluChart;
