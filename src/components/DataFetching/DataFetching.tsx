import React, { useEffect } from "react";
import axios from "axios";

const DataFetching = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3333/api/data");
        console.log("Data received:", response.data);
        // Do something with the data here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return <div>DataFetching</div>;
};

export default DataFetching;
