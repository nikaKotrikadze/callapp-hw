import React from "react";
import { Pie } from "@ant-design/charts";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useDataStore } from "../../store/dataStore";
import { UserData } from "../../utils/UserData";
import { CityData } from "../../utils/CityData";

const CityPieChart = () => {
  const navigate = useNavigate();
  const data = useDataStore((state) => state.data);

  const cityData = data.reduce((acc: CityData, curr: UserData) => {
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
    appendPadding: 50,
    data: cityChartData,
    angleField: "count",
    colorField: "city",
    radius: 1,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <div style={{ height: 600, width: 600 }}>
        <h1> City Pie Chart </h1>
        <Pie {...config} />
        <Button onClick={handleGoHome}>Go back to the Table</Button>
      </div>
    </div>
  );
};

export default CityPieChart;
