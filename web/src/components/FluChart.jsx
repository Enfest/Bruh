import React, { useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const FluChart = (fluType) => {
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
    height: 300,
    width: 380,
  };

  return (
    <>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: "Month" }]}
        yAxis={[{ label: "Cases", scaleType: "linear", id: "axis2" }]}
        {...lineChartsParams}
      />
    </>
  );
};

export default FluChart;
