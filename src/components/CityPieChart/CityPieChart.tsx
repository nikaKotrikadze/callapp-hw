// CityPieChart.js

import React from "react";
import { Pie } from "@ant-design/charts";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useDataStore } from "../../store/dataStore";

const CityPieChart = () => {
  const navigate = useNavigate();
  const data = useDataStore((state) => state.data);

  const cityData = data.reduce((acc: any, curr: any) => {
    const city = curr.address?.city;
    if (city) {
      acc[city] = (acc[city] || 0) + 1;
    }
    return acc;
  }, {});

  // Converting cityData object into an array (of objects)
  const cityChartData = Object.entries(cityData).map(([city, count]) => ({
    city,
    count,
  }));

  const config = {
    appendPadding: 10,
    data: cityChartData,
    angleField: "count",
    colorField: "city",
    radius: 0.8,
    label: {
      type: "inner",
      offset: "-30%",
      content: "{name}\n{percentage}",
      style: {
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Button onClick={handleGoHome}>Go back to Home</Button>
      <Pie {...config} />
    </div>
  );
};

export default CityPieChart;
